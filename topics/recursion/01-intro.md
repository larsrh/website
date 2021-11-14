---
title: "Recursion: Part 1"
subtitle: "Part 1: Preliminaries"
toc: false
---

Hello friend!
You are probably a practicing programmer.
Otherwise you wouldn't have ended up 'round these parts.
But even if you aren't, as long as you'd like to learn about recursion, welcome!

{% include float_picture.html src="topics/recursion/recursion-see-recursion.jpg" text="Recursion, see recursion" %}

I started writing this series because I got annoyed.
Like, really annoyed.
You have probably seen a variant of this joke (see picture) before.
It may look funny, but in my opinion, it is rather unhelpful in grasping the essence of recursion.
Because, get this:
_Infinite recursion is not a thing._
There, I said it.
Do I have your attention now?
Good.

## What, if anything, is recursion?

Explaing precisely this is the point of this series.
The branches of mathematics and computer science that deal with recursion are rich and I would like to guide you towards a deeper understanding.

We will discuss

* the basics of _set theory,_ the substrate on which mathematics is performed,[^footnote-set]
* the construction of _natural numbers,_ where we revisit everyone's favourite proof technique,
* the concept of _computability,_ where we talk about for which sets the computer can say yes or no,
* the _Lambda Calculus,_ a sort of weird stripped-down functional programming language that allows us to get a `fix`,
* relations that are _well-founded,_ a notion that the Bavarian mathematician Emmy Noether came up with,

We will decidedly _not_ talk about hardware because hardware is stupid and I hate it.
(Truth is that I don't know anything about hardware.)

## How to work with this document

All code snippets here are live: this page functions similarly to Jupyter Notebook.
The main difference is that all code is executed in your browser; there's no roundtrip to a backend service.
Snippets are evaluated when a page is loaded and can be re-evaluated by clicking the _Run_ button.
Feel free to change any snippet to your liking, but note that subsequent snippets are not automatically re-run.
If you want to reset the session, e.g. because you deleted some code, just reload the page.
Your code is not saved between reloads!

## Playground

Intrigued?
Why not play around with it a little?
So, I prepared a special playground just for you.
You can type in anything to your heart's content!
Go wild!

```
const x = "Hello";
const y = "world";
[{x, y}, `${x} ${y}`]
```

If you mess up the code, you'll get a red box:

```
this is invalid syntax
```
## Onwards

You are now ready to proceed with the actual introduction.
[Go here]({% link topics/recursion/02-sets.md %}) to learn all about set theory.

[^footnote-set]: For all three of you who dislike set theory, yes, it is _one possible_ substrate.
