---
title: Neuigkeiten in Scala 3
lang: de
abstract: |
  Seit geraumer Zeit in Arbeit, erschien die finale Version von Scala 3.0 im Mai 2021.
  Höchste Zeit, sich die verschiedenen Neuerungen anzuschauen.
  Denn es wurden nicht nur alte Features gestrichen, sondern auch die existierenden aufpoliert und konsistenter gestaltet.
  So gibt es beispielsweise vereinfachte Aufzählungstypen, die auch für Neulinge leichter verständlich sind.
  Darüber hinaus wagt Scala 3 auch den Schritt in Richtung Whitespace-basierter Syntax.
  Insgesamt hat das Team um Martin Odersky ein interessantes Paket geschnürt, so dass Programmieren in Scala noch mehr Spaß macht als früher.
  Auch für Fans von Kotlin und Java 8+ ist etwas dabei.
slides:
  file: "slides"
  length: 18
video: { yt: "ojTP3iCpmDE" }
conferences:
  - conference: "INNOQ Technology Lunch"
    year: 2021
    date: "11. August"
    location: Online
    link: "https://www.meetup.com/de-DE/INNOQ-Technology-Lunch/events/279730962/"
    slides: "https://speakerdeck.com/larsrh/was-ist-neu-in-scala-3"
    recording: "https://www.youtube.com/watch?v=ojTP3iCpmDE"
  - conference: "IT-Tage"
    year: 2021
    date: "7. Dezember"
    location: Online
    link: "https://www.ittage.informatik-aktuell.de/programm/2021/neuigkeiten-in-scala-3.html"
    slides: "https://speakerdeck.com/larsrh/was-ist-neu-in-scala-3"
  - conference: "JavaLand"
    year: 2022
    date: "15. März"
    location: Brühl, Deutschland
    link: "https://shop.doag.org/javaland/2022/agenda/"
    slides: "https://speakerdeck.com/larsrh/was-ist-neu-in-scala-3"
---

## Code-Beispiele

```scala
// Enumerations
enum Colour:
  case Cyan, Magenta, Red

enum BrushType:
  case Pencil(colour: Colour)
  case Ink(colour: Colour, tilt: Float)
  case Smudge(force: Int)
  case Eraser

case class Brush(size: Int, brushType: BrushType)

// optionale Klammern
trait Semigroup[T]:
  def combine(x: T, y: T): T

  extension (xs: List[T])
    def combineAll: T =
      xs.reduceLeft(combine)

given Semigroup[String] with
  def combine(x: String, y: String): String =
    x + y

def fact(n: Int): Int =
  if n <= 0 then
    1
  else
    n * fact(n - 1)

// neue Implicits
case class Circle(x: Double, y: Double, radius: Double)

extension (c: Circle) def circumference: Double =
  c.radius * math.Pi * 2

trait Semigroup[T] {
  def combine(x: T, y: T): T

  def combineAll(xs: List[T]): T =
    xs.reduceLeft(combine)

  extension (xs: List[T]) def combineAll: T =
    xs.reduceLeft(combine)
}

given Semigroup[String] with {
  def combine(x: String, y: String): String =
    x + y
}

// opake Typen
object Time {
  opaque type Milliseconds = Int
  opaque type Seconds = Int

  extension (num: Int) def seconds: Seconds =
    num

  extension (num: Seconds) def toMillis: Milliseconds =
    num * 1000
}
```

## Artikel

Zu diesem Thema habe ich zwei Artikel geschrieben, die jeweils frei online verfügbar sind:

* [Stufe 3: Neuerungen in der dritten Version der Programmiersprache Scala](https://www.innoq.com/de/articles/2021/06/stufe-3/)
* [Die Top 5 der Neuerungen in Scala 3](https://www.innoq.com/de/articles/2021/08/top5-neuerungen-scala/)
