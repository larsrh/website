---
title: 1000 auf einen Streich
date: 2023-06-16
lang: de
abstract: |
  Das man als Entwickler:in nicht nur Code, sondern auch Tests zu schreiben hat, ist ein alter Hut.
  Trotzdem ist es für viele eine lästige und monotone Arbeit.
  Außerdem ist es noch lange nicht garantiert, dass Unit-Tests auch wirklich alle Grenz- und sonstigen Fälle abdecken.
  Ein moderner Ansatz ist eigenschaftsbasiertes Testen, bei dem eine abstrakte Bedingung spezifiziert und dann vom Testframework automatisch überprüft wird.
  In diesem Vortrag gebe ich einen Überblick und zeige Beispiele, in welchen Domänen diese praktisch einsetzbar sind.
slides:
  file: "slides"
  length: 67
video:
  id: "f8825b09-595f-4baa-ad5a-3cecfbd093bd"
  site: "bunny"
  thumb: "https://vz-93be2149-5a4.b-cdn.net/f8825b09-595f-4baa-ad5a-3cecfbd093bd/thumbnail_f94f2bcd.jpg?v=1686976882"
  duration: "1H05M09S"
conferences:
  - conference: "JAX"
    date: 2023-05-10
    location: Mainz, Germany
    link: "https://jax.de/core-java-jvm-languages/eigenschaftsbasiertes-testen/"
    slides: "https://speakerdeck.com/larsrh/1000-auf-einen-streich"
    recording: "#recording"

---

## Errata

Folie 51 ist für jqwik nicht korrekt, da `size` eine untergeordnete Rolle bei den Generatoren spielt.
Danke an Johannes Link für [den Hinweis](https://det.social/@jlink/110546883965843184).

## Artikel

Der Vortrag basiert auf meinem [Artikel über „fast-check”](https://www.innoq.com/de/articles/2023/02/testing-fast-check/), eine Bibliothek für Property-based Testing in JavaScript und TypeScript.
Weitere Ressourcen über das Thema habe ich [hier gesammelt]({% link _articles/property-testing-ressourcen.md %}).
