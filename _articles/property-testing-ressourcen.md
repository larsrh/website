---
title: "Ressourcen über Property-based Testing"
pub_date: 2023-05-06
lang: de
---

Hat man das Prinzip des Property-based Testing (oder „eigenschaftsbasiertem Testing“) einmal verstanden, steht man oft vor einer neuen Herausforderung:
Es ist gar nicht so einfach, von spezifischen Testfällen auf Eigenschaften umzudenken und die bisherigen Tests zu verallgemeinern.

In diesem Post sammle ich als Begleitmaterial [zu meinem Vortrag](https://jax.de/core-java-jvm-languages/eigenschaftsbasiertes-testen/) verschiedene Ressourcen, die den Einstieg erleichtern.

* [jqwik](https://jqwik.net) ist eine Bibliothek für Property-based Testing in Java.
  Sie verfügt über eine ausführliches [Handbuch](https://jqwik.net/docs/current/user-guide.html).
* John Hughes hat ein [Tutorial über Property-based Testing](https://research.chalmers.se/en/publication/517894) geschrieben, worin er fünf verschiedene Arten von Properties erklärt.
  Alternativ gibt es den [gleichen Inhalt als Vortrag](https://www.youtube.com/watch?v=zvRAyq5wj38).
* Johannes Link, Hauptautor von jqwik, hat John Hughes’ Artikel von Haskell [nach Java+jqwik übersetzt](https://johanneslink.net/how-to-specify-it/).
* Stefan Macke schreibt auf Heise Developer über [JUnit Quickcheck](https://github.com/pholser/junit-quickcheck) (eine Alternative zu jqwik) und [benennt auch dort mehrere Arten von Properties](https://www.heise.de/hintergrund/Property-based-Testing-mit-JUnit-QuickCheck-3935767.html).
* Der Vortrag basiert auf meinem [Artikel über „fast-check”](https://www.innoq.com/de/articles/2023/02/testing-fast-check/), eine Bibliothek für Property-based Testing in JavaScript und TypeScript.

Ergänzungen nehme ich gerne entgegen!
