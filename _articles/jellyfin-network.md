---
title: "Running Jellyfin DLNA in Docker with isolated networking"
date: 2026-10-07
lang: en
highlight: true
---

_Jellyfin_ is a [free software media system](https://jellyfin.org/) that you can host at home.
It supports [DLNA](https://jellyfin.org/docs/general/post-install/networking/dlna/), which allows you to stream media files directly to a range of compatible clients, including VLC and Smart TVs.
The documentation of the DLNA plugin advises that you must run Jellyfin with `network_mode: host` in Docker, otherwise UPnP will not work.
Here, I describe how I managed to do it with `ipvlan` to achieve a basic degree of network isolation.

## Background: DLNA and UPnP

UPnP is a protocol based on UDP multicast packages for discovering devices and services in a network.
In particular, clients and servers communicate via the [_Simple Service Discovery Protocol_](https://en.wikipedia.org/wiki/Simple_Service_Discovery_Protocol) _(SSDP)_ to search and advertise, well, services.

As far as I can tell, SSDP uses two messages:

- Clients send a `M-SEARCH` message via UDP multicast on port 1900, requesting a certain service type (such as a media server).
- Servers that offer the requested service respond with `NOTIFY` directly to a client with UDP unicast. Alternatively, they can announce their existence globally using `NOTIFY` with multicast.

Therefore, clients can choose whether to actively solicit with `M-SEARCH` or to simply wait for incoming `NOTIFY`.

Strangely, the pair of `M-SEARCH` and `NOTIFY` are formatted like HTTP request and response.
The [IETF draft](https://datatracker.ietf.org/doc/html/draft-cai-ssdp-v1-03) gives the following example:

```
NOTIFY * HTTP/1.1
Host: 239.255.255.250:reservedSSDPport
NT: blenderassociation:blender
NTS: ssdp:alive
USN: someunique:idscheme3
AL: <blender:ixl><http://foo/bar>
Cache-Control: max-age = 7393
```

Note the line `ssdp:alive`, which tells clients that the server is active.
Conversely, it is good practice to send `ssdp:byebye` when they shut down.

The actual service description is in the line `AL` or `LOCATION`.
For media servers, it should be an XML file that is served by actual HTTP, like so (for Jellyfin):

```
LOCATION: http://192.168.178.1:8096/dlna/1a521809-1e94-47f0-8c29-7f7a685e6d64/description.xml
```

From what I've read, DLNA is a brand name for a certain subset of UPnP message formats, designed to increase interoperability between media servers and streaming clients.
However, what all flavours of UPnP appear to have in common is that they [do not support](https://mastodon.hupel.info/@lars/117398268102457540) HTTPS nor host names.

## Background: My home lab setup

I need to write this up in a separate post, but here's the quick story.

My home lab is running on an [HP ProLiant MicroServer Gen 10]({% link _articles/storage-server.md %}).
I used to install software directly on the host Debian OS, but now I'm slowly migrating towards a setup based on Docker Compose.

Most of my services are proxied behind [nginx-proxy](https://hub.docker.com/r/jwilder/nginx-proxy/), using a wildcart TLS certificate for my internal subdomain (something like `*.local.example.org`).
They are not connected to the internet, but a local DNS allows me to route them to my proxy.

To increase security, each service gets its own internal Docker network.
The proxy has access to each network, but the services cannot talk to each other.

## Jellyfin and networking

Enter Jellyfin.

Jellyfin provides a web server, which I could easily integrate into the setup (internal network, connect it to nginx-proxy, serve locally with TLS).
This looks roughly as follows in Docker Compose:

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    devices:
      - /dev/dri:/dev/dri
    environment:
      VIRTUAL_HOST: jellyfin.local.example.org
      VIRTUAL_PORT: 8096
      JELLYFIN_PublishedServerUrl: https://jellyfin.local.example.org
    networks:
      jellyfin-service:

  nginx-proxy:
    image: nginx:1.31.6
    restart: unless-stopped
    container_name: nginx-proxy
    ports:
      - "443:443"
    networks:
      - nginx
      - jellyfin-service
      # all the other services ...

networks:
  jellyfin-service:
    internal: true
```

Adding DLNA support turned out to be more challenging.

Jellyfin's documentation flat out requires you to use `network_mode: host`, which completely prevents any service isolation.

I'll spare you my process of figuring out how to do it otherwise and will just give you the solution:

```yaml
services:
  jellyfin:
    # same as above but also:
    networks:
      jellyfin-service:
      jellyfin-upnp:
        ipv4_address: 192.168.1.194

networks:
  jellyfin-service:
    internal: true
  jellyfin-upnp:
    driver: ipvlan
    driver_opts:
      ipvlan_mode: l2
      parent: enp2s0f0
    enable_ipv6: false
    ipam:
      config:
        - subnet: 192.168.1.192/30
```

This does a number of things:

1. It allocates an additional virtual network adapter with a static IP address to the Jellyfin service.
2. This adapter is more or less directly connected to `enp2s0f0`, which in my case is the physical host network adapter.
3. The `ipvlan` driver allows Jellyfin to send out `NOTIFY` packages, using the IP address 192.168.1.194.
4. All of Jellyfin's ports are exposed only on the static address 192.168.1.194.
5. Jellyfin's web client continues to be available under `https://jellyfin.local.example.org`.

I chose the IP range `192.168.1.192/30` specifically to be “after” what my DHCP server allocates, so that there cannot be any collision.

For some reason, Jellyfin does not respond to `M-SEARCH` packages, so you have to enable the option “Blast Alive Messages” in the DLNA plugin's settings.
This causes Jellyfin to periodically send `NOTIFY` messages unprompted.[^notify]
I've tested this with various clients; it works well enough for me.

There is one disadvantage.
Because all ports are exposed under 192.168.1.194, you can access the web interface using HTTP via `http://192.168.1.194:8096`.
While annoying, I believe this to be necessary, since DLNA is incapable of using TLS.
Having a separate IP address and virtual adapter would allow me to set up some `iptables` rules, or segregate the clients into a VLAN, or other tricks.

Perhaps there is a way to _only_ expose the service discovery XML file via plain HTTP and re-route the media content via TLS.[^pr]
But that is a story for another time.

[^notify]: I should also add that since Jellyfin is connected to multiple Docker networks, it will advertise itself on each one, including the internal networks that cannot be reached from outside. This means that clients will actually find multiple Jellyfin (identical) instances with different IP addresses. I think this is a bug, but because clients discard services with non-routable IP addresses, it still works.

[^pr]: Jellyfin itself appears to [struggle with DLNA and TLS](https://github.com/jellyfin/jellyfin/pull/4729), too.
