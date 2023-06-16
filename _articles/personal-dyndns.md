---
title: "How to build your own personal DynDNS service"
date: 2021-10-08
lang: en
---

<link rel="stylesheet" href="{% asset rouge.css @path %}">

Consumer-grade internet subscriptions typically come with NAT and dynamically-assigned IP addresses.
In order to reach [my home server]({% link _articles/storage-server.md %}) from the outside, I decided to build my own dynamic DNS service.
The reason was twofold:

1. I found the existing providers I had used in the past to be annoying.
2. I wanted to learn how it works.

I already have a [local DNS server]({% link _articles/local-dns.md %}) running, but I used it for recursive lookups and ad-blocking purposes.
The configuration is maintained manually.
Also, a dynamic DNS server obviously needs to have a stable IP address, so I had to resort to use a virtual machine somewhere in a datacenter.
Fortunately, those are inexpensive.[^footnote-vm]

While browsing the web for possible existing implementations, I quickly realized that while there are tons of DNS server implementations, I actually had to build my own script to update the configuration.
There did not seem to be any off-the-shelf solution for this use case whose popularity I had underestimated.
Anyhow, nothing a bit of glue, duct tape, and Python can't fix.
But note that I did not want to wrangle DNSSEC, so I'm conveniently leaving that part out.[^footnote-dnssec]

Here's the plan:

* install a DNS server that is authoritative for a subdomain (here: `mydyn.domain.tld`) of some domain,
* make sure that the parent zone (here: `domain.tld`) contains an `NS` record pointing to the server,
* on the same DNS server also install a web server that processes updates, and
* add a cronjob to the local clients to make HTTP requests to the web server.

## Installing a DNS server

We start with choosing a DNS server software.
For me, [Knot DNS](https://www.knot-dns.cz/) fit the bill, and I installed it with `apt install knot` on an Ubuntu machine.
The configuration file sits at `/etc/knot/knot.conf`.
By default, it is quite small, and we have to extend it substantially.

Here it is in its entirety, which I will explain in detail below:

```yaml
server:
    listen: [ 10.11.12.13@53, 127.0.0.1@5353 ]
    user: knot:knot

log:
  - target: syslog
    any: info

key:
  - id: sftdyn
    algorithm: hmac-sha512
    secret: kFJd7k6xH8FYToPRgJf7AAkiMUmSoiX2aAAvoUSHcttgn7slf2REBNsw8tvvawCYOIpSr3cgEvoa7fpOKpEXNQ==

acl:
  - id: sftdyn_acl
    key: sftdyn
    action: update
    address: 127.0.0.1

template:
  - id: default
    storage: "/var/lib/knot"
    file: "%s.zone"
    acl: [ sftdyn_acl ]

zone:
  - domain: mydyn.domain.tld
```

We start with the `server` section that defines the user under which it runs (can be left unchanged) and the interfaces it will listen on.
By default, the latter is `[ 0.0.0.0@53, ::@53 ]`, which I have changed to only listen on the public interface for queries, and on `localhost` with a different port for updates (this will become important later).

Knot DNS only allows authenticated updates.
The script needs to demonstrate its authorization before it is allowed to change the DNS zone.
In order to generate credentials, run:

```
$ keymgr -t sftdyn hmac-sha512
# hmac-sha512:sftdyn:kFJd7k6xH8FYToPRgJf7AAkiMUmSoiX2aAAvoUSHcttgn7slf2REBNsw8tvvawCYOIpSr3cgEvoa7fpOKpEXNQ==
key:
  - id: sftdyn
    algorithm: hmac-sha512
    secret: kFJd7k6xH8FYToPRgJf7AAkiMUmSoiX2aAAvoUSHcttgn7slf2REBNsw8tvvawCYOIpSr3cgEvoa7fpOKpEXNQ==
```

You can choose any identifier in place of `sftdyn`.[^footnote-name]
Paste the `key` section into the config and ignore the comment for now, which contains the same secret but in a different format.

Next we need to declare an access control list to allow local updates to the zone.
Make sure to give the same key name in `acl.key` as in `key.id`.
Again, the ACL identifier can be chosen arbitrarily.

Finally, we need to define the zone.
While it is possible to define it without using a zone template, I put it here because you may have additional zones you want to serve (like me) and it quickly becomes confusing without using templates.
The default template is called, well, `default`, and is applied automatically to all zones that do not specify another template.
In the definition I configure the storage directory `/var/lib/knot`; together with the file pattern that means that the zone file has the full path `/var/lib/knot/mydyn.domain.tld.zone`.
When Knot receives a query for a domain, it looks for the entries in that zone file.

It took me a while to figure out the basic configuration in the zone file.
Turns out, each zone needs to start with a `SOA` record (“Start of Authority”).
Here's what it looks like in my example:

```
mydyn.domain.tld.         30      SOA     hostname.of.my.vm. myemail.hostname.of.my.vm. 2021100503 3600 15 86400 3600
```

Yeah, I know.
The syntax of this entry is plain weird, and I recommend you reading this up, but you definitely cannot skip any of those items.
I tried being clever but that came back to bite me multiple times in the progress.

For good measure (I don't know if it's actually required), include the following self-referential entry as well:

```
mydyn.domain.tld.         30      NS      hostname.of.my.vm.
```

This should contain the same host name as above, and should be identical to the `NS` entry in the parent zone.
(The latter of which you need because otherwise no recursive resolver will know whom to ask for your dynamic subdomains.)

Don't forget to reload the configuration, and we're ready to try this out.

## Configure the parent DNS server

The registrar of your domain should let you set an `NS` record for the dynamic DNS server.
To test it out, try the following (Linux):

```
$ host -t NS mydyn.domain.tld hostname.of.my.vm
Using domain server:
Name: hostname.of.my.vm
Address: 10.11.12.13#53
Aliases:

mydyn.domain.tld name server hostname.of.my.vm.
```

This means that the DNS server knows about itself and can respond to queries.
You can also test out a non-existing domain:

```
$ host foobar.mydyn.domain.tld
Host foobar.mydyn.domain.tld not found: 3(NXDOMAIN)
```

Cool.
Let's move on to the web server.

## Installing a web server

Since I'm a traditionalist, I am running an Apache HTTPD on the virtual machine.
I have set up another subdomain `mydynupdate.domain.tld` to act as entry point for the updating script.
While it would have been possible to use `mydyn.domain.tld`, I like to keep these two aspects separate.
(Of course I had to create another `A` record in the `domain.tld` zone for `mydynupdate`.)

We are now creating a “virtual host” in Apache in the file `/etc/apache2/sites-available/dynupdate.conf`:

```
$ cat /etc/apache2/sites-available/dynupdate.conf
<VirtualHost *:80>
  ServerName mydynupdate.domain.tld
  DocumentRoot /var/www/dyn
  WSGIScriptAlias / /var/www/dyn/update.py
  <Directory /var/www/dyn>
    Require all granted
  </Directory>
</VirtualHost>
```

Don't forget to enable the `mod_wsgi` module and the above virtual host:

```
$ a2ensite dynupdate.conf
$ a2enmod wsgi
$ systemctl reload apache2
```

But note that the above file does not represent the final configuration yet:
I used the `certbot` command to add a Let's Encrypt certificate, which shuffled around the configuration a bit.
In particular, it moves the `WSGIScriptAlias` and `Directory` directives to the HTTPS-enabled virtual host, and adds a permanent redirect from HTTP to HTTPS.
I strongly suggest you do the same: `certbot` is so easy to use that you have no excuse not to.
In case of Apache, the invocation looked something like:

```
$ certbot -d mydynupdate.domain.tld --apache
```

Now we have two things left to do:
actually deploy the client and server side scripts that process update requests.
As you may have guessed from the above configuration, I have used Python and WSGI.

## The server-side script

The Python script will reside at `/var/www/dyn/update.py`.
Thanks to the `WSGIScriptAlias` directive in the Apache configuration, all requests below `https://mydynupdate.domain.tld` will be routed to that script.

It is important that the script only accepts update requests from legitimate clients.
To prevent unauthorized use, we can utilize multiple techniques, ranging from HTTP Basic Authentication to client certificates.
To keep things simple, secret URL paths will do.
I used my password manager to generate a random alphanumeric string.

When the URL has been validated, the script needs to generate a DNS update request and send it to Knot via the command `knsupdate`.
This is an executable binary, so we use the Python function `subprocess.run`.
The update request comprises five parts:

1. Server selection (`127.0.0.1:5353`)
2. DNS server secret (the one generated by `keymgr` above)
3. Zone selection (`mydyn.domain.tld.`, note the trailing dot)
4. Deleting the old record
5. Inserting the new record

If we would not delete the old record, we would just accumulate a list of historic IP addresses, since DNS records do not have to be unique.
The IP address belonging to the new record is extracted from the HTTP request environment, so the client script does not have to include it in the request body.

Below is the full code with comments, extended with the ability to deal with multiple dynamic subdomains.

```python
import sys
import subprocess
import ipaddress

# secret path mapping
# key: the URL path that the client script invokes
# value: the dynamic subdomain name that is updated by Knot
paths = {
        '/qBrdpeQi8W2Vi4shaJLwqdpO/loc1': 'loc1',
        '/2boiVSgm0okW1X8U6b97t13p/loc2': 'loc2'
}

# main function invoked by Apache on request
def application(env, start_response):
    # get the client IP address
    ip = env['REMOTE_ADDR']

    # parse the IP address
    # should never fail, but add error handling regardless
    try:
        ip = ipaddress.IPv4Address(ip).exploded
    except Exception as err:
        print(err)
        start_response('500 INTERNAL SERVER ERROR', [('Content-Type','text/plain')])
        return [b"FAIL"]

    # get the URL path of the request
    path = env['PATH_INFO']

    # check if the path matches a known path
    if not path in paths:
        start_response('404 NOT FOUND', [('Content-Type','text/plain')])
        return [b"FAIL"]

    # read the DNS secret in the following format:
    # hmac-sha512:keyname:base64
    with open("/etc/local/dyndns/key", "r") as f:
        key = f.read()

    # construct the update request
    domain = paths[path]
    lines = [
            "server 127.0.0.1 5353",
            f"key {key}",
            "zone mydyn.domain.tld.",
            f"update delete {domain}.mydyn.domain.tld. A",
            f"update add {domain}.mydyn.domain.tld. 30 A {ip}",
            "send"
    ]

    # run the update through knsupdate
    try:
        subprocess.run("knsupdate", input = '\n'.join(lines), encoding = 'us-ascii', check = True)
        start_response('200 OK', [('Content-Type','text/plain')])
        return [f"SUCCESS {ip}".encode("us-ascii")]

    except Exception as err:
        print(err)
        start_response('500 INTERNAL SERVER ERROR', [('Content-Type','text/plain')])
        return [b"FAIL"]
```

For this script to work, save the commend from the output of `keymgr` into the file `/etc/local/dyndns/key`.
The file should be readable for the user under which the Apache server runs, but not to anyone else.

```
$ cat /etc/local/dyndns/key
hmac-sha512:sftdyn:kFJd7k6xH8FYToPRgJf7AAkiMUmSoiX2aAAvoUSHcttgn7slf2REBNsw8tvvawCYOIpSr3cgEvoa7fpOKpEXNQ==
```

Quick reminder that you should obviously generate your own key instead of copy-pasting from here.

Note that the line `server 127.0.0.1 5353` corresponds to the `listen` setting in the Knot configuration.
We are using multiple safety mechanisms here:
the updating only works when you supply the secret, and if you do it through the special port on `localhost`.
Furthermore, the WSGI script ensures that there can be no invalid or unexpected zone updates, since it validates the incoming IP address and path.

## The client-side script

Now we just need to ensure that the clients routinely invoke the WSGI script.
Many consumer routers allow you to set a custom dynamic DNS URL, here: `https://mydynupdate.domain.tld/qBrdpeQi8W2Vi4shaJLwqdpO/loc1`.
If that works, all done.

If not, create a shell script with the following content:

```shell
#!/usr/bin/env bash
curl --fail -s -o /dev/null "https://mydynupdate.domain.tld/qBrdpeQi8W2Vi4shaJLwqdpO/loc1" || ( echo "CURL FAILED" && exit 1 )
```

... and tell cron to invoke it every hour (or more frequently, if you wish):

```
$ crontab -l
0 * * * * /home/lars/ddns.sh
```

To be on the safe side, I rely on both mechanisms.
Occasionally (about once or twice a month), the HTTP call fails and cron sends me a mail.
I could try debugging this but at the same time it works well enough and I never had an outage so far.

_Congratulations, we're done!_

Test the setup with `host`:

```
$ host loc1.mydyn.domain.tld
loc1.mydyn.domain.tld has address 44.45.46.47
```

## A note on IPv6

My personal internet subscription supports dual-stack IPv4 and IPv6.
However, I'm just interested in setting a DNS record for the IPv4 address.
This means I had to ensure that `mydynupdate.domain.tld` is not accessible from IPv6, which is simple:
define an `A` record but no `AAAA` record.

If you want to both, you need to call the script from the client twice, once with v4, and once with v6.
The reason for that is that the Python script can only see the IP address which you use for the request, but not any others.

Alternatively, you could also extend the client and server scripts so that the client includes other IP addresses in the request body.

[^footnote-vm]: I already have a VM for other purposes, so I didn't have to buy one just to run a dynamic DNS.
[^footnote-dnssec]: Hypocritical – I know – since I have DNSSEC validation enabled in my local network.
[^footnote-name]: By now I have already forgotten what “sft” is supposed to stand for.
