---
title: "CRDTs: Part 3"
subtitle: "Part 3: Lattices"
progress: 50
---

{% include float_picture.html src="topics/crdt/pie.jpg" text="A tasty lattice" %}

## What's happening in this episode

So far, we've learned about partial orderings.
Those are essentially functions that can tell whether or not a thing is smaller than another thing.
This is essential for defining _monotonic_ operations, for example inserting an element into a set, which never makes the set smaller.

But one important piece of the puzzle is still missing.
After all, we don't just want to compare data, we also want to _merge_ data that has diverged on two different machines.

Consider the following chain of events.

1. Alice and Bob start with the set containing just 1.
2. Internet connection fails.
3. Alice adds a 2.
4. Bob adds a 3.
5. Internet connection is restored.

Clearly, the set after merging should be 1, 2, 3.
That's what you'd expect!
But how can this notion be described mathematically?
The answer is _lattices_.

<br style="clear: both;">

{% include float_picture.html src="topics/crdt/hasse.svg" text="Hasse diagram of powerset of 3" %}

## Lattices? Lattices.

Remember this diagram from the previous episode?
I told you it shows a partial ordering of sets.
There's an arrow pointing from {_x_} to {_x_, _z_} because the former is a subset of the latter.
But the diagram _actually_ shows a different algebraic structure (they just happen to coincide): a _lattice_.
We know this word from real life, but what does it mean in this context?

Just like a partial ordering, a lattice is a structure that has an operation (here, it's called _join_) that has to satisfy some properties.
The join operation is used to merge two values and produce a "bigger" value.

For sets, the join operation is defined to be set union.
Intuitively, this makes sense: we can always merge them, order doesn't matter, and the result is always a superset of both constituent sets.
All of these are properties that are crucial for CRDTs.
It shouldn't matter whether Bob pulls Alice's data first or vice versa; they should always end up with the same common state.

Let's go through the laws that a lattice has to satisfy one by one.

1. _Associativity_ states that the parentheses don't matter.
  Formally speaking, _x_ ∨ (_y_ ∨ _z_) = (_x_ ∨ _y_) ∨ _z_ must hold
  (mathematicians usually write ∨ for join).
  You know associativity from adding and multiplying numbers.
2. _Commutativity_ states that the order of joining doesn't matter.
  Formally, _x_ ∨ _y_ must be equal to _y_ ∨ _x_.
  Adding and multiplying numbers is also commutative.
3. _Idempotence_ might seem a little odd, but it's nonetheless an important property.
  It states that joining a value to itself always returns the value itself.
  This is not something that numbers typically do.
  Unless you consider taking the maximum of two numbers.

In order to implement this operation for sets, once again we'll need to monkey patch (yolo) the set union operation.
I'm also starting to get annoyed by the verbose `Set` constructor, so I'll define my own, concise version.

<br style="clear: both;">

```
{% include topics/crdt/lib-set-union.js %}
assert.deepEqual(set(1).union(set(2)), set(1, 2));
```

Cool.[^footnote-monkey]

Enough with the paperwork, let's define the lattice for sets together with its laws.

```
{% include topics/crdt/lib-lattice.js %}
const intSetGen = fc.set(fc.integer()).map(set);

checkAll(contracts.lattice(lattices.set, intSetGen));
```

This follows the exact same pattern as the partial ordering contract we saw in the previous part.

At this point I have to tell you that I lied to you again.
The structure that's defined above is actually not a lattice, but only a semilattice; more precisely, a _join-semilattice_.
The reason is that a lattice also needs another operation: _meet_, the opposite of _join_.
For sets, that would be intersection.
But this is not relevant for now.
So I'll start quietly using semilattice now.

## There ...

You may have noticed that the above definitions do not require any ordering.
That's no accident.
It's possible to define a lattice without worrying about the ordering of the elements.
_But wait_, you might say, _this subset diagram is exactly the same as in the previous episode!_
And you'd be right.
So what is the connection between lattices and partial orderings?

Intuitively speaking, when we have two values and join them together, we should obtain something that is greater-than-or-equal-to the original values.
And that's precisely the trick.
We can define what less-than-or-equal-to means based just on the join operation!

This is a pattern that is applied throught algebra.
We have two seemingly different abstract structures and can then define one in the terms of the other.

You may already know an example of this: subtraction.
We can describe _x_ - _y_ equivalently as _x_ + (- _y_).
It turns out that mathematicians prefer the latter representation, because it makes talking about the properties of - and + easier.
But both representations can be transformed into one another.

What we have seen above is one possible definition of a semilattice.
Here's another one.

Assume we have a partial ordering ≤ for a set of values _a_, _b_, ...
Let's call that set _M_.
If we additionally know that for each pair of values in _M_, there is a _least upper bound_ that's also in _M_, then we can construct a semilattice.
The least upper bound of _a_ and _b_ is defined to be a value _c_ where _a_ ≤ _b_ and _a_ ≤ _c_ (so much is obvious, since it's an _upper_ bound) and there's no other element _d_ that's closer to _a_ and _b_ than _c_.
Formally: _c_ is least upper bound if

1. _c_ is in _M_, and
2. _a_ ≤ _c_, and
3. _b_ ≤ _c_, and
4. for all _d_ in _M_, either:
   * _c_ ≤ _d_, or
   * _d_ ≤ _a_, or
   * _d_ ≤ _b_

Let's make this concrete.
Consider the natural numbers 0, 1, 2, ...
We pick _a_ = 2 and _b_ = 3.
Naturally, _c_ = 5 would be an upper bound of both 2 and 3, since clearly 2 ≤ 5 and 3 ≤ 5.
But unfortunately there's another number that's closer: 3.
So, _c_ = 5 violates the last constraint.

The magic of this definition is that the join operation falls out of it: it is the least upper bound.
When joining two values, you'll get exactly the smallest possible value that's just larger-than-or-equal-to the inputs.
We can also apply that to sets.
It wouldn't make sense if the set union would just add extra elements, right?

Now we have constructed a semilattice from a partial ordering.

## ... and back again

But can we also go back?
Yes we can!
Any lattice can also be used to define a partial ordering.
Buy a lattice, get a partial ordering for free!

The construction is kind of funny.
Again, consider two values _a_ and _b_.
Let's also assume that _a_ ≤ _b_.
What is the join of these two elements?
As an example, take the sets _a_ = {1, 2} and _b_ = {1, 2, 3}.
The answer is that the union of _a_ and _b_ is _b_ itself, because _a_ is already included in _b_.

Turns out, this also holds in general.
We can define that _a_ ≤ _b_ holds precisely when _a_ ∨ _b_ = _b_.

Let's try it for another case:
_a_ = {1} and _b_ = {2}.
Their union is {1, 2}.
So, neither is a subset of the other.
Neat, right?

We can also write this down in code:

```
const partialOrderingOfLattice = lattice => ({
  isLeq: (x, y) => deepEqual(lattice.join(x, y), y)
});

const smallSetGen = gen => fc.set(gen, 5).map(elems => new Set(elems));

checkAll(
  contracts.partialOrdering(
    partialOrderingOfLattice(lattices.set),
    smallSetGen(fc.integer())
  )
);
```

This uses the `deepEqual` function from Chai because `==` won't give the results we want when comparing sets.

But now you may ask, _why haven't you shown the code for the opposite direction_?
_They want to see how to implement a lattice based on a partial ordering_, a voice says, _the people are becoming restless!_

To which I'll have to say:
Sorry, no can do.
That tiny little "for all _d_ in _M_ ..." in the construction?
Hard to implement.
Especially because there might be infinitely many values in _M_.

## Now what?

Depending on the context, it may be more convenient to talk about one representation or the other one.
And when implementing the algebras, it may yet be more convenient to talk about both of them at the same time!
It is completely fine to implement both the join and the ≤ operations for a particular type of values, maybe because that's more efficient.

## References

* Pie by Danil Aksenov on [Unsplash](https://unsplash.com/photos/bkXzABDt08Q)

[^footnote-monkey]: If you don't like this monkey business, then tough luck.
