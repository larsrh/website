---
title: "How to test proper{t,l}y"
date: 2019-07-15
abstract: |
  Writing unit tests is pretty much established practice and in addition to that, property testing has caught up on popularity.
  Most functional languages have one, sometimes even many implementations.
  But “property testing” has a lot of aspects: randomized or exhaustive, minimization and generalization of counter examples, custom generators and filters, to name a few.
  Very often, property tests don't exploit all the features of the framework.
  In this talk, I'll give an overview of the state of the art of property testing and show some common use cases, techniques and pitfalls.
slides:
  file: "slides"
  length: 37
video: { id: "OPD1V8ZOL2U" }
conferences:
  - conference: "flatMap(Oslo)"
    location: Oslo, Norway
    date: 2016-05-02
    link: "http://2016.flatmap.no/hupel.html#session"
    slides: "https://speakerdeck.com/larsrh/how-to-test-proper-l-t-y"
    recording: "https://vimeo.com/165852636"
  - conference: "Scala Matsuri"
    date: 2019-06-29
    location: Tokyo, Japan
    link: "http://2019.scalamatsuri.org/index_en.html"
    slides: "https://speakerdeck.com/larsrh/how-to-test-proper-t-l-y-scala-matsuri-edition"
    recording: "https://www.youtube.com/watch?v=OPD1V8ZOL2U"
  - conference: "Munich Scala User Group"
    date: 2019-08-21
    location: Munich, Germany
    link: "https://www.meetup.com/ScalaMuc/events/262805286/"
    slides: "https://speakerdeck.com/larsrh/how-to-test-proper-t-l-y-scala-matsuri-edition"
    recording: "https://www.youtube.com/watch?v=BPDKN0kuDFQ"
  - conference: "Belgian Scala User Group"
    date: 2019-10-22
    location: Leuven, Belgium
    link: "https://www.meetup.com/BeScala/events/265114733"
    slides: "https://speakerdeck.com/larsrh/how-to-test-proper-t-l-y-scala-matsuri-edition"
---

## FAQ

How can I come up with properties?
: There are a bunch of resources on this.
  Oskar Wickström has done a [case study](https://wickstrom.tech/programming/2019/03/02/property-based-testing-in-a-screencast-editor-introduction.html) for a non-trivial program (screencast editor).
  The code is in Haskell, but the general ideas should apply to other programs written in a (purely) functional style.
  A recent paper on the topic from John Hughes, pioneer of property testing, [How to Specify it!](https://research.chalmers.se/publication/517894/file/517894_Fulltext.pdf) is a readable guide to writing properties.
  Johannes Link, author of a property testing library in Java, has [translated this guide to Java](https://johanneslink.net/how-to-specify-it/).

How can I introduce properties in my existing code base?
: In my experience, introducing property testing is easier, the more functional and modular the code is.
  Writing integration-test-style properties is possible, but much more difficult than unit-test-style.
  The problem is that managing state in properties is much harder than in single examples.
  Consequently, the first step towards a solution is plain and simple refactoring.
  This [Devoxx talk](https://www.youtube.com/watch?v=5pwv3cuo3Qk) by Romeu Moura may give some additional guidance.
