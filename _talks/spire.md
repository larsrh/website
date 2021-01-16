---
title: Numeric Programming with Spire
abstract: |
  Numeric programming is a notoriously difficult topic. For number crunching, e.g. solving systems of linear equations, we need raw performance.
  However, using floating-point numbers may lead to inaccurate results. On top of that, as functional programmers, we’d really like to abstract over concrete number types, which is where abstract algebra comes into play.
  This interplay between abstract and concrete, and the fact that everything needs to run on finite hardware, is what makes good library support necessary for writing fast & correct programs.
  Spire is such a library in the Typelevel Scala ecosystem.
  This talk is an introduction to Spire, showcasing the ‘number tower’, real-ish numbers and how to obey the law.
speakerdeck: "1c85f64818c548c68044654b16ad2adc"
video: { vimeo: "296367334" }
conferences:
  - conference: "J On The Beach"
    year: 2019
    date: May 16th
    location: Marbella, Spain
    link: "https://www.jonthebeach.com/"
    recording: "https://www.youtube.com/watch?v=8pNzWzH5NUc"
    slides: "https://speakerdeck.com/larsrh/numeric-programming-with-spire-ksug-edition"
  - conference: "Scala Hamburg"
    year: 2019
    date: May 2nd
    location: Hamburg, Germany
    link: "https://www.meetup.com/Scala-Hamburg/events/259340037/"
    slides: "https://speakerdeck.com/larsrh/numeric-programming-with-spire-ksug-edition"
  - conference: "Kraków Scala User Group"
    year: 2019
    date: February 21st
    location: Kraków, Poland
    link: "https://www.meetup.com/Krakow-Scala-User-Group/events/258677272/"
    slides: "https://speakerdeck.com/larsrh/numeric-programming-with-spire-ksug-edition"
  - conference: "Scala Romandie"
    year: 2018
    date: December 18th
    location: Lausanne, Switzerland
    link: "https://www.meetup.com/Scala-Romandie/events/255055382/"
    slides: "https://speakerdeck.com/larsrh/numeric-programming-with-spire-scala-italy-edition"
  - conference: "Scala Italy"
    year: 2018
    date: September 14th
    location: Florence, Italy
    link: "http://2018.scala-italy.it/"
    recording: "https://vimeo.com/296367334"
    slides: "https://speakerdeck.com/larsrh/numeric-programming-with-spire-scala-italy-edition"
  - conference: "Munich Scala User Group"
    year: 2018
    date: June 13th
    location: Munich, Germany
    link: "https://www.meetup.com/ScalaMuc/events/250936958/"
    slides: "https://speakerdeck.com/larsrh/numeric-programming-with-spire-lx-scala-edition"
  - conference: "LX Scala"
    year: 2018
    date: June 8th
    location: Lisbon, Portugal
    link: "http://www.lxscala.com/schedule/"
    slides: "https://speakerdeck.com/larsrh/numeric-programming-with-spire-lx-scala-edition"
  - conference: "Scala Portugal"
    year: 2016
    date: June 25th
    location: Lisbon, Portugal
    link: "https://www.meetup.com/Scala-Portugal/events/231961828/"
    slides: "https://speakerdeck.com/larsrh/numeric-programming-with-spire"

---

## Interview at J On The Beach

<iframe width="560" height="315" src="https://www.youtube.com/embed/Pd2eQSiCOjg" allowfullscreen></iframe>

## Testimonials

{% twitter https://twitter.com/ChuckMiskyes/status/1040587122049265664 %}
{% twitter https://twitter.com/stefanobaghino/status/1040594669284012032 %}

## Demo code

All code snippets are tested with version 0.15.0 and assume the following imports:

```scala
import spire._
import spire.algebra._
import spire.math._
import spire.implicits._
import spire.laws._
import spire.syntax.literals._
import org.scalacheck._
```

### Maps

```scala
val cities1 = Map("Portugal" -> List("Lisbon"), "Spain" -> List("Madrid"))
val cities2 = Map("Portugal" -> List("Coimbra"))

cities1 |+| cities2
```

### Laws

```scala
RingLaws[Int].ring.all.check()
RingLaws[Float].ring.all.check()
```

### Monoids

```scala
val score = r"5/7"

def twice[A : AdditiveMonoid](a: A) = a + a

twice(score)
twice(3)
twice(Map("Score" -> score))

score.toBigDecimal()
```

### Reals

```scala
Real.pi
Real.pi.doubleValue()
Real.pi.toRational(1).toBigDecimal()
Real.pi.toRational(2).toBigDecimal()
Real.pi.toRational(4).toBigDecimal()
```

### Rationals and Intervals

```scala
val score = r"5/7"

val confidence = score ± r"1/7"

confidence.intersects(r"3/4" ± r"1/8")
confidence.intersect(r"3/4" ± r"1/8")
```
