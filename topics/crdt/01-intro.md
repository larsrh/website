---
title: "CRDTs: Part 1"
subtitle: "Part 1: Preliminaries"
progress: 90
toc: false
---

Dear reader! It seems you want to learn about those _Conflict-free Replicated Datatypes_ that are all the rage now.
If however you have no idea what they are, there are tons of resources to check out, e.g. [crdt.tech](https://crdt.tech/).

Now, if there are so many freely-available resources about them, you might wonder, what is this document good for?
Simple.
I assume that you know what CRDTs are good for and might want to use them in your own project, but you'll want to get a handle on their mathematical foundations.
The research papers that describe them often assume a great deal of background knowledge in abstract algebra.

But here, I want to explain everything that's needed in a bottom-up fashion using interactive notebooks, diagrams and code notation that's familiar with a large amount of programmers: JavaScript.
I'll be employing a few libraries for testing code and visualizing data, but otherwise, there are no further dependencies.

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
[Go here](02-contracts) to learn all about contracts.
