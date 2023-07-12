---
title: "CRDTs: Part 1"
subtitle: "Part 1: Preliminaries"
toc: false
---

Dear reader!
If you're reading this, that's most likely because you've pointed your browser to my website and/or followed a link to this page.
Perfect conditions for motivating what all this is about.
(If you're unsure whether this series is worth reading, check out the [testimonials](#testimonials).)

## The web is a truly distributed application platform

{% include float_picture.html src="topics/crdt/world.jpg" text="A network of nodes" %}

That's right.
When you're building a web application, you absolutely, positively have to care about the distributed aspect of the web.
(Unless your application is stateless, like my website.)

What does this mean?
You may have a bunch of users.
These users may be manipulating their data from a variety of devices.
Some devices may have a slow Internet connection.
Devices may go offline at any point in time.

Sometimes, application developers punt on this issue:
the mobile app displays "You're offline" and won't let you see your data (best case), or silently discard information (worst case).

One particular piece in the puzzle of building distributed applications is to figure out the _storage_.
Ideally, this storage should be resilient towards users that may become unavailable, concurrent edits, and so on.

Enter _Conflict-free Replicated Data Types_.
A glorious example of Computer Science naming that actually Makes Sense™, they attempt to provide a flexible solution to the storage problem.
The fundamental idea is this:
You have data.
This data is stored on multiple _replicas_.
CRDTs describe how to coordinate these replicas to always arrive at a consistent state.

Note that there are two different categories of CRDTs: _state-based_ and _op-based_.
Both serve the same purpose, but work in different ways and come with their own design trade-offs.
In this series, I'm mostly going to focus on state-based CRDTs.

## About CRDTs

{% include float_picture.html src="topics/crdt/cool.webp" text="Abed Nadir thinks CRDTs are cool" %}

That's it!
You now understand the idea behind CRDTs.

Of course, that's only half the story.
There are at least two sides to understanding CRDTs deeply.

1. Knowing all the varieties (counters, maps, sets, ...) and how they can be embedded in application software.
2. Diving into the mathematical background (lattices! partial orderings! wooooooo) powering their implementations.

In this series, I want to focus on the second aspect and explain everything that's needed in a bottom-up fashion using interactive notebooks, diagrams and code notation that's familiar with a large amount of programmers: JavaScript.
I'll be employing a few libraries for testing code and visualizing data, but otherwise, there are no further dependencies.
The research papers that describe them often assume a great deal of background knowledge in abstract algebra.
I'll try to introduce just the necessary knowledge gently.

If however, you want to learn more about their use, this series is not for you.
But fear not: there are tons of resources to check out, e.g. [crdt.tech](https://crdt.tech/).
There's no tracking on this page so I won't even notice if you're gone 🤷

Still here?
Cool. _Cool, cool, cool._

But before we can strap in and talk about CRDTs, we first need to get some paperwork out of the way.

## How to work with this document

All code snippets here are live: this page functions similarly to Jupyter Notebook.
The main difference is that all code is executed in your browser; there's no roundtrip to a backend service.
Snippets are evaluated when a page is loaded and can be re-evaluated by clicking the _Run_ button.
Feel free to change any snippet to your liking, but note that subsequent snippets are not automatically re-run.
If you want to reset the session, e.g. because you deleted some code, just reload the page.
Your code is not saved between reloads!

## Tests

This page has a built-in test runner.
It takes named _properties_ that should be checked.
The term _property_ is overloaded in programming, so let me be clear: I'm not talking about properties in an object; instead I'm talking about functions that may take arguments and return a truth value.
In other words, a property is a predicate that should be evaluated on ideally all inputs to see if it always holds.

In the following example, we have two properties, one is valid, the other one isn't.
They are defined using the [fast-check](https://github.com/dubzzz/fast-check/) library, which is available under the `fc` object.

```
checkAll({
  "succeed": fc.property(fc.string(), x => x == x),
  "fail": fc.property(fc.string(), x => x != x)
});
```

Under the hood, fast-check automatically generates 100 different inputs.
Granted, 100 different inputs is not exactly _all inputs_, but since there are infinitely many strings, we can't exactly do that, can we?
fast-check will call the function (e.g. `x => x == x`) with the inputs as specified (`fc.string()` generates ASCII strings with only printable characters).
If the function ever returns `false` or throws an exception, the property is marked as failed.
Otherwise, it's marked as successful.

Fortunately, we can also use [Chai](https://www.chaijs.com/) assertions inside our properties to get rich error messages:

```
checkAll({
  "succeed": fc.property(fc.string(), x => assert.equal(x, x)),
  "fail": fc.property(fc.string(), x => assert.notEqual(x, x))
});
```

The great thing about fast-check is that it will automatically show you the _smallest_ (and hopefully simplest) input it could find where the property failed.
This is called the _counterexample_.
There could be many counterexamples, but here, we only show one.

```
checkAll({
  "strlen": fc.property(fc.string(), x => assert.isAtMost(x.trim().length, 5))
});
```

You'll see in the results a failure where the counterexample has length 6 and does not just consist of spaces.

Note that a property could be invalid and we'd still not notice it because fast-check didn't generate that input for us.
That's a risk we have to live with.

## Playground

Intrigued?
Why not play around with the test runner a little.
Of course, you could modify the code boxes above, but maybe you were afraid to.
So, I prepared a special playground just for you.
Go wild!

```
checkAll({
  "be-creative": null
});
```

Feel free to consult the [fast-check documentation](https://github.com/dubzzz/fast-check/blob/v1.24.1/documentation/1-Guides/Arbitraries.md) about which data generators there are.

## Printing

The runner can also print different kinds of outputs, e.g. arrays.
Note that only the last expression in a snippet is printed.

```
1 + 1;

[
  "this",
  "is",
  "an",
  "array"
]
```

If you define variables without `var` (or `const` or `let`), they can be accessed in subsequent snippets.
I will use that throughout the series.

We can define different printing for a particular object using the `interactiveRender` symbol.
It can be declared as a method and will be invoked by the runner automatically:

```
class Test {
  constructor(value) {
    this.value = value;
  }

  [interactiveRender]() {
    return `Hi ${this.value}!`;
  }
}

new Test("reader")
```

## Onwards

You are now ready to proceed with the actual introduction.
[Go here](../02-contracts) to learn all about contracts.

## Testimonials

People on The Internet™ seem to enjoy these posts:

{% include quote.html url="https://twitter.com/jeadorf/status/1276235893586702336" author="Julius Adorf" text="Great read. This is as entertaining as educational." %}
{% include quote.html url="https://twitter.com/dfkaye/status/1279152170869207040" author="David Kaye" text="I found this incredibly accessible, as I have at best a shallow grasp of this kind of mathematics." %}
{% include quote.html url="https://twitter.com/pchapuis/status/1355849874718285829" author="Pierre Chapuis" text="[This series] is the most thorough introduction to CRDTs for programmers I have seen so far, and I wish it had existed a few years back when I had to introduce colleagues to CRDTs." %}
{% include quote.html url="https://twitter.com/SamBroner" author="Sam Broner" text="An excellent educational tool that fills that huge void between theoretical CRDT algorithms and practical application. I've strongly suggested that new team members take a pass through Lars' work as a practical primer on eventual consistency and conflict free replicated data types." %}
{% include quote.html url="https://chaos.social/@blinry" author="blinry" text="I wanted to get into CRDTs, and wow, your interactive introduction is so helpful! Thanks for writing it! <3" %}

## References

* Map by TheAndrasBarta on [Pixabay](https://pixabay.com/photos/world-europe-map-connections-1264062/)
* Abed Nadir on [Giphy](https://giphy.com/gifs/community-abed-cool-2HONNTJbRhzKE)
