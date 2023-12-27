---
title: "My local DNS setup"
date: 2021-03-05
lang: en
---

[A few years ago,]({% link _articles/storage-server.md %}) I wrote about the hardware setup of my home server.
Recently, I've decided to put it to work beyond storing mere data and mirroring my IMAP server.
I was annoyed by the weird behaviour of local name resolution of my home router, so why not operate my own DNS server?

Since I also wanted a few hosts in my local network to be reachable like `ssh host1`, I also set up a DHCP server that announces the correct search domain.
But let's talk about DNS first.

My local DNS server should satisfy three criteria:

1. fast recursive lookup
2. DNSSEC validation
3. authoritative for a few hosts in my LAN

Like most good stories, this one [started in the ArchWiki](https://wiki.archlinux.org/title/Domain_name_resolution).[^1]
I quickly narrowed it down to [Unbound](https://www.nlnetlabs.nl/projects/unbound/about/).
I run Debian on that server, so the installation was just an `apt install unbound` away.

As usual, the Debian package maintainers have provided a baseline configuration that I just had to adapt to my tastes.
If you install `unbound-anchor` too, you should also get DNSSEC.
The [ArchWiki page on Unbound](https://wiki.archlinux.org/title/Unbound) has instructions on testing the DNSSEC setup.

I added two more things to the configuration.
First, I created the directory `/etc/unbound/server.conf.d` for additional local zones.
In the main configuration, I included the contents of that directory as follows:

```
server:
        include: "/etc/unbound/server.conf.d/*.conf"
```

Note that the `include` statement here _must_ go below `server`, otherwise it will not work.

With that in place, I added a file for my LAN hosts:

```
# /etc/unbound/server.conf.d/intranet.conf

local-zone: "intranet.hupel.info." static
local-data: "host1.intranet.hupel.info.        IN A 192.168.0.5"
local-data: "host2.intranet.hupel.info.        IN A 192.168.0.6"
local-data-ptr: "192.168.0.5  host1.intranet.hupel.info"
local-data-ptr: "192.168.0.6  host2.intranet.hupel.info"
```

Now I get lookup and reverse lookup for a bunch of my devices with static addresses.

Finally, I downloaded a [blocklist with adservers](https://pgl.yoyo.org/adservers/serverlist.php?hostformat=unbound&showintro=0&mimetype=plaintext) and saved it as `/etc/unbound/server.conf.d/blocklist.conf`.
Any request to those adservers will be redirected to 127.0.0.1, which effectively gives me a decent ad filter for all devices in my LAN, including my phone.
Credits go to Peter Lowe for providing this list;[^2] conveniently available in Unbound format.

Moving on to the DHCP server.
This one was very simple to setup.
I installed the `isc-dhcp-server` package and edited the `/etc/dhcp/dhcpd.conf` file.

I only had to adapt the following settings:

```
option domain-name "intranet.hupel.info";
option domain-name-servers 192.168.0.2; # IP address of the server

subnet 192.168.0.0 netmask 255.255.255.0 {
  range 192.168.0.100 192.168.0.200;
  option routers 192.168.0.1;
}

```

... and that was about it.
Now, whenever I use a local host name, the domain `intranet.hupel.info` gets appended automatically based on DHCP configuration, and Unbound can resolve it correctly.[^3]

The DNS + DHCP setup is nothing fancy, but it's been serving me well so far.

**Update:**
Prompted by a [Twitter conversation](https://twitter.com/jeeger/status/1402873948413562882) in June 2021, I wanted to make sure that Unbound caches properly.
In order to figure that out, I had to add a few more lines to the config file:

```
remote-control:
        control-enable: yes
        control-interface: 127.0.0.1
```

This allows the CLI utility `unbound-control` to query various pieces of information from the DNS server.
For example, I can dump the cache:

```
$ sudo unbound-control dump_cache
START_RRSET_CACHE
;rrset 79968 1 0 8 3
ping.archlinux.org.     79968   IN      CNAME   redirect.archlinux.org.

... lots more ...
```

As of writing this update, the cache contains approximately 17k lines, including the DNS root servers.

According to `unbound-control stats_noreset`, about half of my DNS requests are served from the cache, and the median response time is 26 ms (average being 53 ms), although I'm not entirely sure I'm interpreting those numbers correctly.

[^1]: Despite its name, it is a really useful resource for all Linux distributions.

[^2]: Bonus points if you wrote a cronjob that auto-updates the list; I couldn't be bothered.

[^3]: Yes, my router could do that before too, even automatically based on the hostnames. No, that was not sufficient, since I also want to resolve hostnames from another network that's behind another router.
