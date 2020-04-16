---
title: "CRDTs: Part 2"
subtitle: "Part 2: Algebras & contracts"
progress: 90
---

## What's happening in this episode

Let's consider a real-world example of distributed computing: you have a set containing the elements 1 and 2 that's replicated across two devices, Alice's and Bob's computers.
As long as Alice and Bob only add elements, synchronizing their sets is trivial.
You just have to take the intersection of all elements.
If Alice adds an element, she sends that to Bob, and Bob adds it (and vice versa).
But what do you do in the following order of events:

1. Alice and Bob start with the set containing 1 and 2.
2. Internet connection fails.
3. Alice adds a 3 and then deletes the 3 again.
4. Bob adds a 3.
5. Internet connection is restored.

What should the end result be?
1, 2, 3? Or just 1, 2?

This problem is caused by destructive updates.
We just don't have enough information to figure this out.
CRDTs solve this by only allowing _monotonic_ updates.
In other words, any operation must make the data structure "larger".
In this post, we'll look at how that notion means.

By the way, there are CRDT sets that allow deletion of elements.
But they need to capture extra metadata, e.g. when the deletion happened, in order to make sense of conflicting operations.

## Order! Orderrrr!

{% include float_picture.html src="topics/crdt/bercow.png" text="John Bercow, former Speaker of the House, presumably uttering his signature phrase" %}

Sometimes, we need to compare two values and see which one is "bigger".
In JavaScript, the most basic way to do that would be to use the `<` operator.
It returns a boolean that indicates that the left value is less than than the right value, according to some form of "less than" semantics.

When talking about complex datatypes, just using `<` doesn't cut it.
There could be some special rules about comparisons.
JavaScript often doesn't help us a lot:

<br style="clear: both;">

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

One of these will always be true.
For the purpose of this series, we're only interested in the `<=` operator, i.e., "less-than-or-equal-to".

But note that we might talk about things that might be uncomparable.
How can this be useful?
Consider the subset relationship.
We can have a set {1, 2} and a set {1, 3}.
Both have a common element: 1.
But neither is a subset of the other.
So, we could neither claim that {1, 2} ≤ {1, 3} nor {1, 3} ≤ {1, 2}.

After getting this business done, let's talk about algebras.

## Algebraic abstractions

We somehow need to provide a `<=` operator to work on e.g. sets.
JavaScript doesn't allow operator overloading, so instead I'm defining my own protocol how this should work.
The idea is similar to the [`Comparator`](https://www.baeldung.com/java-comparator-comparable) interface in Java:
we have an object that has just a single method `compare` that takes two arguments and returns the correct order.

Since there are no interfaces in JavaScript, we'll just have to make do with some examples:

```
const numberComparator = {
  isLeq: (x, y) => x <= y
};

const stringComparator = {
  isLeq: (x, y) => x <= y
};

[
  numberComparator.isLeq(1, 3),
  numberComparator.isLeq(2, 2),
  stringComparator.isLeq("hi", "there"),
  stringComparator.isLeq("this is", "dog")
]
```

You may have two questions.

1. _Why is this not just a plain function? Why wrap it into an object?_
   Because we'll add a few more functions later.
2. _Both comparators are actually identical._
   That's not a question, but fine.
   It's true, this is basically a thing that takes the regular `<=` and turns that into a comparator for any type.

We can make it a little more concise by taking the second point into account:

```
const anyComparator = {
  isLeq: (x, y) => x <= y
};

[
  anyComparator.isLeq(1, 3),
  anyComparator.isLeq(2, 2),
  anyComparator.isLeq("hi", "there"),
  anyComparator.isLeq("this is", "dog")
]
```

Although now we'll have to be a little more careful so that we don't accidentally mix two different types.
Keep in mind that – even though JavaScript has no types – we are implicitly carrying around a set of values in the background.
JavaScript doesn't prevent us from comparing a number to a string, but mathematically speaking, that wouldn't make sense.

## Contractual obligations

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

* The contract comprises two properties in total.
  These properties correspond to the laws we've seen above (reflexitivity, transitivity).
  Each property is defined using fast-check and the generator that's passed into the contract.
* Reflexitivity is defined in a way that comparing `x` to itself must always return `true`.
  This is asserted using Chai's `ok` assertion.
* Transitivity is a little more complicated.
  Recall the verbal definition from above: we have three values and two preconditions.
  So, first of all we tell fast-check that we want to invoke the generator three times.
  Inside the property, we can use `fc.pre` to check the preconditions.
  If any of the preconditions is false, fast-check aborts the current run and re-generates new inputs.
  Only then we check that _x_ ≤ _z_ according to the partial ordering.
  fast-check attempts this as many times as needed to reach 100 complete runs.

Check out how the contract can be used:

```
Promise.all([
  checkAll(contracts.partialOrdering(orderings.any, fc.integer())),
  checkAll(contracts.partialOrdering(orderings.any, fc.string()))
])
```

Unfortunately, I lied above when I said that a partial ordering needs to satisfy two laws.
It actually needs to satisfy a third law:
If both _x_ ≤ _y_ and _y_ ≤ _x_ hold, then _x_ must equal _y_ (_antisymmetry_).
Unfortunately, this is very hard to test in general, so I omitted it above.
But we'll have to keep it in mind for the future.

By the way: default JavaScript equality can't always save us, because comparisons like this fail (unexpectedly, at least to me):

```
assert.equal(new Set([1, 2]), new Set([1, 2]));
```

Luckily, Chai can save us there:

```
assert.deepEqual(new Set([1, 2]), new Set([1, 2]));
// or as a plain function
assert.ok(deepEqual(new Set([1, 2]), new Set([1, 2])));
```

A partial ordering is a prototypical example of an _algebra_:
an abstract structure that deal with a set of values (e.g. strings), operations on those values (e.g. ≤), and their relationships (e.g. transitivity).

## Types and generators

Above, I wrote:

> Keep in mind that – even though JavaScript has no types – we are implicitly carrying around a set of values in the background.
> JavaScript doesn't prevent us from comparing a number to a string, but mathematically speaking, that wouldn't make sense.

The contracts also depend on the fact that we only check the partial ordering for one type of values at a time.
This is what the fast-check generators are supposed to do:
enumerate as many different values of the same type as possible.

At the same time, it may be possible to define two different implementations of a partial ordering for the same type (details and example see below).
So it also doesn't make sense to talk about "the partial ordering of numbers", as that isn't uniquely defined.

A more accurate phrasing would be "the partial ordering of numbers according to the natural definition of ≤".
Or, as we'll see later "the partial ordering of sets according to the subset relationship".

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
This is quite possible to write in JavaScript, and for that we'll use the built-in `Set` type of JavaScript.
Unfortunately, it has no `isSubsetOf` method, so we'll just monkey-patch it (yolo):

<br style="clear:both;">

```
{% include topics/crdt/lib-set.js %}
assert.ok(new Set([1, 2]).isSubsetOf(new Set([1, 2, 3])));
assert.notOk(new Set([1, 3]).isSubsetOf(new Set([1, 2])));
```

What's going on here?
We implement the subset relationship by going over every element in the first set and checking if it's contained in the second set.

Now, let's go ahead and define the partial ordering accordingly:

```
{% include topics/crdt/lib-partialorder-set.js %}
```

Having said that, we'll need to check the properties.
You'll see that I've used custom generators (for technical reasons).
The inputs generated by fast-check may be too large, so I'm constraining them to strings of maximum size 3 and sets to maximum size 5.

```
const smallStringGen = fc.hexaString(3);
const smallSetGen = gen => fc.set(gen, 5).map(elems => new Set(elems));

Promise.all([
  checkAll(contracts.partialOrdering(orderings.set, smallSetGen(fc.integer()))),
  checkAll(contracts.partialOrdering(orderings.set, smallSetGen(smallStringGen)))
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
  isLeq: (x, y) => {
    throw new Error("unimplemented");
  }
}

checkAll(contracts.partialOrdering(divOrdering, fc.nat(100)));
```

## Conclusion

Remember the beginning of this episode:

> CRDTs solve this by only allowing _monotonic_ updates.
> In other words, any operation must make the data structure "larger".

We can apply our newly-found knowledge to this situation.
Any operation that manipulates our sets must respect the partial ordering we've defined above.
Let's see this in action:

```
const insertElement = (element, set) => new Set([...set.values(), element]);

checkAll({
  "insert-makes-bigger":
    fc.property(fc.integer(), fc.array(fc.integer()), (element, array) => {
      const set = new Set(array);
      const newSet = insertElement(element, set);
      assert.ok(orderings.set.isLeq(set, newSet));
    })
});
```

We're asserting here that `insertElement` produces a new set that is always greater-than-or-equal-to the original set.
(After all, we could be inserting the same element again, in which case the new set is equal to the original set.)

Congratulations!
You've seen your first CRDT.
This one is actually called _Grow-Only Set_ (or _GSet_ for short).
As the name indicates, it can only grow, but never shrink.
This data structure obeys all the laws that are expected from a law-abiding CRDT, although we haven't seen all the laws yet.
Also, it isn't all that useful, because well, sometimes you want to delete things.
We'll learn about other set CRDTs later in this series.

## What's next?

In the [next episode](03-lattices), we'll look at some more complicated algebraic interfaces.
Spoiler: more order!

## References

* John Bercow by UK Parliament on [YouTube](https://www.youtube.com/watch?v=yztSL08SgVY), CC-BY 3.0
* Hasse diagram by KSmrq on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Hasse_diagram_of_powerset_of_3.svg&oldid=368528490), CC-BY-SA 3.0
* Lattice of divisors by Watchduck on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Infinite_lattice_of_divisors.svg&oldid=379240153), public domain
