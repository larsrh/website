---
layout: article
title: "Digital currency"
---

This is an archive of posts relating to my work on digital currency at Giesecke+Devrient.
I post those on LinkedIn and [host copies here](https://indieweb.org/PESOS).

{% assign pages = site.pages | where_exp: "item", "item.path contains 'topics/digital-currency/'" | sort: "date" %}

<ul>
  {% for page in pages %}
    <li><a href="{{ page.url }}">{{ page.title }}</a> ({{ page.date }})</li>
  {% endfor %}
</ul>
