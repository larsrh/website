---
title: Functional Mocking
abstract: |
  Mocking is an infamous technique from object-oriented programming.
  The goal is to be able to test stateful systems in small pieces by simulating the behaviour of certain objects.
  The problem with mocking is that it usually requires heavyweight frameworks and clutters test code.
  There are countless rants on that topic, but this talk isn't one.
  Instead, we'll explore the functional approach in Haskell: Designing a small language supporting the desired behaviour, and then writing interpreters which can execute its semantics in various ways.
  Testing I/O code was never easier.
video: { vimeo: 125038982 }
conferences:
  - conference: "Lambda Days"
    year: 2015
    date: February 26th
    location: Kraków, Poland
    link: "http://www.lambdadays.org/lambdadays2015/lars-hupel"
    recording: "https://vimeo.com/125038982"
    slides: "https://speakerdeck.com/larsrh/functional-mocking"
  - conference: "Regensburg Haskell Meetup"
    year: 2015
    date: March 16th
    location: Regensburg, Germany
    link: "https://www.meetup.com/Regensburg-Haskell-Meetup/events/220597934/"
    slides: "https://speakerdeck.com/larsrh/free-functors-and-monads"
  - conference: "Oslo Socially Functional Programmers"
    year: 2015
    date: June 23rd
    location: Oslo, Norway
    link: "https://web.archive.org/web/20151003155233/https://www.meetup.com/Oslo-Socially-Functional/events/223097000/"
    slides: "https://speakerdeck.com/larsrh/functional-mocking-oslosfp-edition"

---

## Demo code

[View on GitHub Gist](https://gist.github.com/larsrh/5cd5652c25ec84b8852c)

<script src="https://gist.github.com/larsrh/5cd5652c25ec84b8852c.js"></script>
