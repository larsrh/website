---
layout: article
title: "Fahrradstrecken in & um München"
---

Auf dieser Seite sammle ich Beschreibungen für Tages- oder Halbtagestouren in & um München.
Alle Strecken bin ich selbst gefahren.
Trotzdem rate ich allen dazu, die Strecken unter Berücksichtigung der eigenen Kondition zu planen.
Insbesondere empfehle ich, lieber „zu kurze“ als „zu lange“ Strecken zu fahren sowie Punkte zur vorzeitigen Rückkehr einzuplanen.
Für letzteres bieten sich insbesondere S-Bahn-Haltestellen an, da man in der S-Bahn bequem [Fahrräder transportieren](https://www.muenchen.de/verkehr/fahrrad/fahrradmitnahme.html) kann.

<ul>
  {% for page in site.pages %}
    {% if page.path contains 'topics/cycling/' %}
      <li><a href="{{ page.url }}">{{ page.subtitle }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
