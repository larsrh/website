---
title: OptimusPrimeT
date: 2015-03-24
abstract: |
  Everybody knows monads by now, so a talk about monads would hardly be worthwhile.
  Let's take it to the next level: monad transformers.
  You'll learn what they are, how they naturally emerge in your code base and how to make good use of them in Scala – and maybe even how to create your own.
slides:
  file: "slides"
  length: 39
  width: 960
video: { id: "lN5viUFz21U", site: yt }
conferences:
  - conference: "Lambda World"
    date: 2015-10-24
    location: Cádiz, Spain
    link: "https://www.youtube.com/playlist?list=PL4yAk3UBuBSobwxE4M_2V9DGMOUrkZGfa"
    slides: "https://speakerdeck.com/larsrh/optimusprimet-cats-edition"
    recording: "https://www.youtube.com/watch?v=QUPsrxzE6I0"
  - conference: "flatMap(Oslo)"
    date: 2015-04-27
    location: Oslo, Norway
    link: "http://2015.flatmap.no/hupel.html#session"
    slides: "https://speakerdeck.com/larsrh/optimusprimet-cats-edition"
  - conference: "Scala.io"
    date: 2014-10-24
    location: Paris, France
    slides: "https://speakerdeck.com/larsrh/optimusprimet"
    recording: "https://www.youtube.com/watch?v=lN5viUFz21U"
---

## Errata

Unfortunately, there is a mistake in all of the 2014–2015 slide sets.
In the slide where `map2` is implemented in terms of `flatMap`, the inner `flatMap` should be `map`.
