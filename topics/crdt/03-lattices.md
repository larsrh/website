---
title: "CRDTs: Part 3"
subtitle: "Part 3: Lattices"
progress: 30
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

Once again we'll need to monkey patch (yolo) the set union operation.
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

Formally speaking, such a lattice (actually, a _join-semilattice_, to be precise) always _induces_ a partial ordering.
That is, when defining a lattice, we don't actually need to know the underlying partial ordering since it can always be derived from the join operation.

## References

* Pie by Danil Aksenov on [Unsplash](https://unsplash.com/photos/bkXzABDt08Q)

[^footnote-monkey]: If you don't like this monkey business, then tough luck.
