---
title: OptimusPrimeT
abstract: |
  Everybody knows monads by now, so a talk about monads would hardly be worthwhile.
  Let's take it to the next level: monad transformers.
  You'll learn what they are, how they naturally emerge in your code base and how to make good use of them in Scala – and maybe even how to create your own.
slides:
  file: "slides"
  length: 39
  width: 960
video: { vimeo: "128466888" }
conferences:
  - conference: "Lambda World"
    year: 2015
    date: October 24th
    location: Cádiz, Spain
    link: "https://www.youtube.com/playlist?list=PL4yAk3UBuBSobwxE4M_2V9DGMOUrkZGfa"
    slides: "https://speakerdeck.com/larsrh/optimusprimet-cats-edition"
    recording: "https://www.youtube.com/watch?v=QUPsrxzE6I0"
  - conference: "flatMap(Oslo)"
    year: 2015
    date: April 27th
    location: Oslo, Norway
    link: "http://2015.flatmap.no/hupel.html#session"
    slides: "https://speakerdeck.com/larsrh/optimusprimet-cats-edition"
    recording: "https://vimeo.com/128466888"
  - conference: "Scala.io"
    year: 2014
    date: October 24th
    location: Paris, France
    link: "https://scala.io/2014/talks.html#/#BGS-827"
    slides: "https://speakerdeck.com/larsrh/optimusprimet"
    recording: "https://www.youtube.com/watch?v=lN5viUFz21U"
---

## Errata

Unfortunately, there is a mistake in all of the 2014–2015 slide sets which SpeakerDeck won't let me fix.
In the slide where `map2` is implemented in terms of `flatMap`, the inner `flatMap` should be `map`.
