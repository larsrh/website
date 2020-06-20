---
title: "CRDTs: Part 5 (side note)"
subtitle: "Part 5, side note: Abstract Data Types"
progress: 90
toc: false
prev: 05-tombstones
next: 06-time
---

This is a side note on the concept of Abstract Data Types applied to CRDT implementations.
Feel free to skip this; I won't use it later in the series.

I told you in [Part 5](05-tombstones) that we can use a common data structure (`Map`) to power different kinds of CRDTs, including 2P-Sets.
However, to prevent nonsensical operations, we may only expose a subset of the operations on that data structure.
It turns out that we can express this a little more formally, and potentially use that as a basis of a functional (in the “Functional Programming” sense) implementation.
For this, we need two assumptions:

1. Our data structures are immutable.
2. We _reify_ changes to the data structures as a value (i.e. a function).

To give you a concrete example:

```
MonotonicMap = class {
  constructor(partialOrdering, entries) {
    this.map = new Map(entries);
    this.partialOrdering = partialOrdering;
  }
  update(key, fn) {
    let newValue;
    if (this.map.has(key)) {
      const oldValue = this.map.get(key);
      newValue = fn(oldValue);
      if (!this.partialOrdering.isLeq(oldValue, newValue))
        throw new Error(`Non-monotonic update for ${key}`);
    }
    else {
      newValue = fn();
    }

    const newMap = new Map([...this.map]);
    newMap.set(key, newValue);

    return new MonotonicMap(
      this.partialOrdering,
      newMap
    );
  }
}

const mmap = new MonotonicMap(orderings.any, [["alice", 1], ["bob", 0]]);

let mmap2 = mmap.update("bob", n => n + 1); // ok

assert.throws(() => mmap.update("alice", n => n - 1), /monotonic/); // not ok

mmap2
```

Instead of providing a fixed set of operations to update the map, we provide a generic _combinator_ (there it is again!) that applies arbitrary state updates, as long as they're monotonic.
We say that a state update function _f_ is monotonic if:

1. _f_() is a value (called when there is no previous value in the map) and
2. for any _x_, _f_(_x_) ≥ _x_

Now we can define – per CRDT – what concrete operations there are:

| CRDT          | Operation  | State update function |
| ------------- | ---------- | --------------------- |
| G-Counter     | increase   | `n => (n || 0) + 1`   |
| G-Set         | add        | `() => {}`            |
| 2P-Set        | add        | `() => false`         |
| 2P-Set        | remove     | `() => true`          |

Here's an example of how we could use this:

```
const twoPSet = {
  add: () => false,
  remove: () => true
};

const empty = new MonotonicMap(orderings.any);

const withX = empty.update("x", twoPSet.add);

const withoutX = withX.update("x", twoPSet.remove);

// boom
const withXAgain = withoutX.update("x", twoPSet.add);
```

Without writing any domain-specific code, the `update` method figured out that we can't readd a removed element and complained.

Note that the operations only apply to one key at a time.
This means that, for a given `Map` with key type `K` and value type `V`, the type for the state update is `V? => V` (where `V?` means `V` or `undefined`).

There are two further possibilites to extend this notion.
Firstly, we could allow the state update function to throw an error.
The table above currently allows removing an element for a 2P-Set that was never in.
Instead, the function could check if the argument is `undefined` and abort the update.

Secondly, we could want to update multiple keys atomically.
In that case, the update function would no longer be a function, but a `Map<K, V? => V>`.
The `update` method on `MonotonicMap` would iterate through the keys of the map and apply each state update.

In case you've used React before, this should sound oddly familiar.
The state of React Components [works similarly](https://reactjs.org/docs/state-and-lifecycle.html):

> When you call `setState()`, React merges the object you provide into the current state.

However, React does not enforce that the actual update of the values is monotonic.

Unfortunately, the lack of a type system and true information hiding in JavaScript makes a fully-fledged implementation of CRDTs in this style cumbersome.
