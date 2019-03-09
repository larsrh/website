---
---

var larsFacts = [
  {% for fact in site.data.facts %}
    "{{ fact | escape }}",
  {% endfor %}
]
