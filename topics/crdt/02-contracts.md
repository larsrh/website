---
title: "CRDTs: Part 2"
subtitle: "Part 2: Algebras & contracts"
progress: 90
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
{% include topics/crdt/lib-order.js %}
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
2. if you have three values _x_, _y_, and _z_, and you know that _x_ ≤ _y_ and _y_ ≤ _z_, then _x_ ≤ _z_ (_transitivity_)

This math-speak can be translated into a contract as follows:

```
{% include topics/crdt/lib-partialorder.js %}
```

What's going on there?
We define a function that should return a contract for a given instance (the partial ordering) and a generator for values (the values that can be compared).
Also, in order to keep things neat and tidy, I've put them into some objects.

Let's look at the definition of this contract in detail.

* The contract comprises three properties in total.
  Each property is defined using fast-check and the generator that's passed into the contract.
* The first two properties correspond to the laws we've seen above (reflexitivity, transitivity).
  I've also added another law that's strictly speaking not necessary but very useful.
* Reflexitivity is defined in a way that comparing `x` to itself must return `order.eq`.
  This is asserted using Chai's `equal` assertion.[^footnote-equal]
* Transitivity is a little more complicated.
  Recall the verbal definition from above: we have three values and two preconditions.
  So, first of all we tell fast-check that we want to invoke the generator three times.
  Inside the property, we can use `fc.pre` to check the preconditions.
  If any of the preconditions is false, fast-check aborts the current run and re-generates new inputs.
  Only then we check that _x_ ≤ _z_ according to the partial ordering.
  fast-check attempts this as many times as needed to reach 100 complete runs.
* The mathematical definition uses the ≤ comparison operator (or `<=` in JavaScript), whereas our definition uses `<`.
  That's why I added the `isLeq` convenience method to the `Order` class.
* Finally, the extra property is for flipping around a comparison.
  Surely, comparing _y_ to _x_ ought to give the exact opposite result than _x_ to _y_.

Check out how the contract can be used:

```
Promise.all([
  checkAll(contracts.partialOrdering(orderings.any, fc.integer())),
  checkAll(contracts.partialOrdering(orderings.any, fc.string()))
])
```

## Preconditions

As an aside: fast-check is smart about the retry strategy.
If we supply it with an impossible precondition, it'll print an error message _without_ any counterexamples.

```
checkAll({
  impossible: fc.property(fc.integer(), x => {
    fc.pre(x < x);
    assert.ok(true);
  })
})
```

## (Im)partiality

{% include float_picture.html src="topics/crdt/hasse.svg" text="Hasse diagram of powerset of 3" %}

So far we've only seen some orderings for types of values that can always be compared.
Let's look at sets next, where the `compare` operation may be partial.
I mentioned above that we can compare sets according to the subset relationship.
This is shown in the diagram: an arrow from set _S_ to _T_ means _S_ is a subset of _T_.
Of course, any set is also a subset of itself.

We can formally define the subset relationship as follows: _S_ is a subset of _T_ if all elements of _S_ are contained in _T_.
This is quite possible to write in JavaScript, but we'll have to discuss a few set operations first.
Before you ask: I strongly dislike the built-in `Set` type of JavaScript, so I'll pretend it doesn't exist.
We'll use plain arrays instead.

Of course, this means that our "sets" could have duplicate elements, but we'll deal with that later.

<br style="clear:both;">

```
const example = [1, 2, 3];

assert.ok(example.some(x => x > 2));
assert.notOk(example.some(x => x < 0));

assert.notOk(example.every(x => x > 2));
assert.ok(example.every(x => x > 0));
```

We can use `some` to check if some function is truthy for all elements in the array.
Conversely, `every` will check if all elements satisfy the function.
No surprises there, I think.

Now, let's go ahead and define what it means to compare two sets.

```
{% include topics/crdt/lib-partialorder-set.js %}
```

What's going on here?
We implement the subset relationship by going over every element in the first set and finding an equivalent element in the second set.
For that, we don't use JavaScript's built-in equality, but rather pass in a partial ordering for the elements.
This is a pattern that will occur frequently, so take note: given a valid partial ordering for a type of elements, we construct a valid partial ordering for the type of sets containing those elements.
In other words: if we have an ordering for `number`, we now have one for `Array<number>`.

You may wonder why I've done the subset check in both directions.
That's because we need to figure out if both sets are in fact equal (if _S_ is a subset of _T_ and also _T_ is a subset of _S_, then surely _S_ = _T_).

Before we check lawfulness, let's first go through some examples.

```
const cmp = (x, y) => orderings.set(orderings.any).compare(x, y);

assert.equal(cmp([1, 2], [1, 2, 3]), order.lt);
assert.equal(cmp([1, 2], [1, 2, 1]), order.eq);
assert.equal(cmp([1, 2], [1, 3]), order.unknown);
```

See how our partial order treats the sets `[1, 2]` and `[1, 2, 1]` as equals?
Nice.

Let's go ahead and check the properties.
You'll see that I've used custom generators (for technical reasons).
The inputs generated by fast-check may be too large, so I'm constraining them to strings of maximum size 3 and sets of maximum size 5.

```
const smallStringGen = fc.hexaString(3);
const smallSetGen = gen => fc.array(gen, 5);

Promise.all([
  checkAll(contracts.partialOrdering(orderings.set(orderings.any), smallSetGen(fc.integer()))),
  checkAll(contracts.partialOrdering(orderings.set(orderings.any), smallSetGen(smallStringGen)))
])
```

I encourage you to play around with the definitions and see what breaks.

## Alternative orderings

{% include float_picture.html src="topics/crdt/lattice_of_divisors.svg" text="A partial ordering based on division" %}

For any given type, there may be multiple different, but still valid notions of "less than".
The diagram shows a definition based on divisibility: _x_ ≤ _y_ if _x_ divides _y_.
For example, 10 divides 20, so 10 < 20, but 12 and 20 can't be compared.

Feel free to implement this as an exercise (or don't, I'm not your boss).

There are also a few trivial orderings out there; e.g. the ordering that returns `eq` for all possible inputs.
But those are only useful in rare situations.

<br style="clear: both;">

```
const divOrdering = {
  compare: (x, y) => {
    throw new Error("unimplemented");
  }
}

checkAll(contracts.partialOrdering(divOrdering, fc.nat(100)));
```

## What's next?

In the next episode, we'll look at some more complicated algebraic interfaces.
Spoiler: more order!

## References

* Hasse diagram by KSmrq on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Hasse_diagram_of_powerset_of_3.svg&oldid=368528490), CC-BY-SA 3.0

[^footnote-equal]: We could have equally well used strict equality, but in this case, it makes no difference.
