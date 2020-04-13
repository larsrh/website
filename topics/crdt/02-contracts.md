---
title: "CRDTs: Part 2"
subtitle: "Part 2: Algebras & contracts"
---

⚠ **Under construction** ⚠


## Order! Orderrrr!

Sometimes, we need to compare two values and see which one is "bigger".
In JavaScript, the most basic way to do that would be to use the `<` operator.
It returns a boolean that indicates that the left value is less than than the right value, according to some form of "less than" semantics.

When talking about complex datatypes, just using `<` doesn't cut it.
There could be some special rules about comparisons.
JavaScript often doesn't help us a lot:

```
[
  [] < "foobar",
  ["hi"] < {x: "y"}
]
```

Ideally those two things should be "incomparable".
But JavaScript with its type coercions will always try to give an answer.

## Comparing things

What we do instead is: capture the notion of "comparability" into a separate interface.
As you know, JavaScript does not have interfaces.
But first, we need to talk about the result of a comparison.
In standard JS we'd have the following cases:

* less than
* equal to
* greater than.

This may be too restrictive.
For example, it is mathematically just fine to define a compare operation that can produce an unknown result.
How can this be useful?
Consider the subset relationship.
We can have a set containing `[1, 2]` and `[1, 3]`.
Both have a common element: 1.
But neither is a subset of the other.

Consequently, we define a special class that can assume four different states:

* less than
* equal to
* greater than
* "unknown" or "uncomparable" or however you want to call it

For good measure, we also add in a flip method that turns the state around: it turns less-than into greater-than and vice versa.

```
{% include crdt/lib-order.js %}
```

We're not supposed to create instances of `Order` ourselves.
Instead, use the predefined states in the `order` object.
Let's try them out:

```
[
  order.lt,
  order.lt.flip(),
  order.lt.flip() == order.gt,
  order.lt.isLeq,
  order.unknown.isLeq
]
```

Okay, cool.
Let's test some more:

```
orderGen = fc.constantFrom(...Object.values(order));

checkAll({
  "double-flip": fc.property(orderGen, o => o.flip().flip() == o),
});
```

See what we did here?
We defined a generator for objects from the `Order` class (`orderGen`) and then checked that for each one, double-flipping gives you back the original one.
No more writing these unit tests by hand.
Granted, there are two downsides:

1. We only have four different values for `Order`.
   This was not a huge time-saver.
2. fast-check doesn't know it's just four.
   Yet it generates 100 inputs (i.e. each case ~25 times).
   That's just a waste.

While both arguments make sense, this example serves as an introduction for larger examples where we will use more complicated generators and properties.

After getting all that business done, let's talk about algebras.

## Algebraic abstractions

The `Order` class is all fine and well.
But we somehow need to "enrich" the standard JS comparisons to return one of these objects instead of a plain boolean.
I'm not interested in somehow monkey-patching that (I don't even know if that'd be possible), so instead I'm defining my own protocol how this should work.
The idea is similar to the [`Comparator`](https://www.baeldung.com/java-comparator-comparable) interface in Java:
we have an object that has just a single method `compare` that takes two arguments and returns the correct order.

Since there are no interfaces in JavaScript, we'll just have to make do with some examples:

```
const numberComparator = {
    compare: (x, y) => x < y ? order.lt : x == y ? order.eq : order.gt
};

const stringComparator = {
    compare: (x, y) => x < y ? order.lt : x == y ? order.eq : order.gt
};

[
  numberComparator.compare(1, 3),
  numberComparator.compare(2, 2),
  stringComparator.compare("hi", "there"),
  stringComparator.compare("this is", "dog")
]
```

You may have two questions.

1. _Why is this not just a plain function? Why wrap it into an object?_
   Because we'll add a few more functions later.
2. _Both comparators are actually identical._
   That's not a question, but fine.
   It's true, this is basically a thing that takes the regular `<` and `==` and turns that into a comparator for any type.

We can make it a little more concise by taking the second point into account:

```
const anyComparator = {
    compare: (x, y) => x < y ? order.lt : x == y ? order.eq : order.gt
};

[
  anyComparator.compare(1, 3),
  anyComparator.compare(2, 2),
  anyComparator.compare("hi", "there"),
  anyComparator.compare("this is", "dog")
]
```

Although now we'll have to be a little more careful so that we don't accidentally mix two different types.

The key ingredient for a successful abstraction is not just the interface, but also the _contract_.
We want these comparators to satisfy some constraints.
The mathematical name for the contract I'm going to show next is _partial ordering_.
The "ordering" part should be self-explanatory.
The "partial" part comes from the fact that the comparator may fail to produce an order for two arguments (as explained above).

Such a partial ordering needs to satisfy two laws:

1. any value must be equal to itself (_reflexitivity_)
2. if you have three values _x_, _y_, and _z_, and you know that _x ≤ y_, then _y ≤ z_ (_transitivity_)

This math-speak can be translated into a contract as follows:

```
{% include crdt/lib-partialorder.js %}
```

What's going on there?
We define a function that should return a contract for a given instance (the partial ordering) and a generator for values (the values that can be compared).
Also, in order to keep things neat and tidy, I've put them into some objects.

Check out how the contract can be used:

```
Promise.all([
  checkAll(contracts.partialOrdering(orderings.any, fc.integer())),
  checkAll(contracts.partialOrdering(orderings.any, fc.string()))
])
```
