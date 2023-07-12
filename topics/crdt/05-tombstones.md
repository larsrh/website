---
subtitle: "Part 5: Tombstones"
---

{% include float_picture.html src="topics/crdt/tombstones.jpg" text="A bunch of tombstones in a cemetery" %}

## What's happening in this episode?

I ended the last episode with a bit of a cliffhanger (again!).
We reviewed two different CRDTs (G-Counters and G-Sets) and learned how these two are actually the same structure underneath: a `Map` with two different value types.
But an important problem hasn't been solved yet: how to delete values.
The difficulty arises because – implemented naively – deletion breaks monotonicity.
Consider a G-Set {1, 2, 3}.
If you delete the 1, you arrive at {2, 3}.
But the previous set {1, 2, 3} is not a subset of {2, 3}!
Later, when merging, we don't know if 1 has been deleted or was never there to begin with, as can be seen in the following transcript:

1. Alice and Bob both start with the set {2, 3}.
2. Internet connection fails.
3. Alice adds 1 to the set.
4. Bob adds 1 to the set.
5. Alice deletes 1 from the set.
6. Internet connection is restored.

Is the result {1, 2, 3} or {2, 3}?
The naive implementation says the former because it'll just take the union of both sets.
The way to avoid this is by using _tombstones._

{% include float_picture.html src="topics/crdt/marx_and_engels.jpg" text="A spectre is haunting Europe—the spectre of commutativity" %}

## The Ghost of Values Past

The idea behind tombstones is quickly explained:
you never actually delete values, just mark them as deleted.

Alright, that's it for today, stay tuned for the next episode.

I'm kidding.
Of course, the idea is simple, but there's a lot of stuff we still need to figure out.
For example, how do we represent the deleted values?
What will the programming interface be like?

Let's start with the most basic example, the Two-Phase-Set (or 2P-Set).
The intended semantics is _remove bans_, i.e., a value that has been removed is banned from ever being added again.
This is why it's called “Two Phase”: a value travels through the two phases of _being_ a member of the set and _having been_ a member of the set.
Applied to the above transaction between Alice and Bob, the result would've been {2, 3}, because Alice' deletion takes priority over Bob's addition.
Note that time does not play a role here; even if steps 4 and 5 were swapped, the result would still be {2, 3}.

Traditionally, 2P-Sets are implemented as a pair of G-Sets called _A_ and _R_ (for “Added” and “Removed”).
Adding an element _x_ adds it to _A_.
Removing an element _x_ adds it to _R_ (assuming it is also in _A_, so that you can't remove an element that was never in the 2P-Set).
In other words, the set _R_ must always be a subset of the set _A_.
The actual set of currently-present elements are all elements of _A_ that are not in _R_ (the _set difference,_ in mathematical terms).

Let's apply this to the exchange from earlier.
In the following table, the numbering is the same as above, but without the connection stuff, so steps 2 and 6 don't really exist here:

| Step | Actress      | Action             | Alice's _A_  | Alice's _R_  | Bob's _A_   | Bob's _R_ |
| ---- | ------------ | ------------------ | ------------ | ------------ | ----------- | --------- |
| 1    |              | (_start_)          | {2, 3}       | {}           | {2, 3}      | {}        |
| 3    | Alice        | add 1              | {1, 2, 3}    | {}           | {2, 3}      | {}        |
| 4    | Bob          | add 1              | {1, 2, 3}    | {}           | {1, 2, 3}   | {}        |
| 5    | Alice        | delete 1           | {1, 2, 3}    | {1}          | {1, 2, 3}   | {}        |

Merging a 2P-Set works by merging the two constituent G-Sets individually.
In our example, this results in _A_ = {1, 2, 3} and _R_ = {1}.
The difference between those sets is {2, 3}, meaning, 1 has been deleted and 2 and 3 remain in the set.

This implementation is simple enough, right?
A possible optimization is that deleting elements could also delete the element from _A_, instead of just adding it to _R_.
Then, the table can be changed as follows:

| Step | Actress      | Action             | Alice's _A_  | Alice's _R_  | Bob's _A_   | Bob's _R_ |
| ---- | ------------ | ------------------ | ------------ | ------------ | ----------- | --------- |
| 1    |              | (_start_)          | {2, 3}       | {}           | {2, 3}      | {}        |
| 3    | Alice        | add 1              | {1, 2, 3}    | {}           | {2, 3}      | {}        |
| 4    | Bob          | add 1              | {1, 2, 3}    | {}           | {1, 2, 3}   | {}        |
| 5    | Alice        | delete 1           | {2, 3}       | {1}          | {1, 2, 3}   | {}        |

Then, we wouldn't have to look at _R_ when figuring out what elements are in the 2P-Set currently.
On the other hand, _A_ wouldn't be a G-Set anymore, complicating the merge algorithm (but it's still possible to implement it).

The set _R_ contains a “memory” of old values that will never again appear in the 2P-Set.
This is why it is sometimes called the _tombstone_ set.

{% include float_picture.html src="topics/crdt/morpheus.jpg" text="Morpheus (the Matrix character) saying: What if I told you that this is actually a special case of a general abstraction that we have already introduced in this series" %}

## 2P-Sets are also Maps

In the last episode, I've told you that G-Sets are special cases of maps.
Notably, maps where the value type is a lattice, and where update operations need to be monotonic.

Turns out, this can also be used to model 2P-Sets.
How?
Well, first observe that in the non-optimized version I've introduced above, a value _x_ can have three different states:

1. it is neither in _A_ nor in _R_
2. it is in _A_ but not in _R_
3. it is in both in _A_ and in _R_

Now we want to model both _A_ and _R_ as a single map _S_ that describes each element's state.
The idea is that the elements of _A_ and _R_ are keys in the map and the corresponding values are booleans.
Each possible state of an element _x_ can be represented as follows:

1. _x_ is not defined in the map
2. _x_ is defined in the map and has the value `false` (read: “_not_ yet deleted”)
3. _x_ is defined in the map and has the value `true` (read: “_yes_ now this thing has actually been deleted”)

Let's reconsider the transaction from above, but with just this single map _S_:

| Step | Actress | Action    | Alice's _S_                             | Bob's _S_                                    |
| ---- | ------- | --------- | --------------------------------------- | -------------------------------------------- |
| 1    |         | (_start_) | {2 → `false`, 3 → `false`}              | {2 → `false`, 3 → `false`}                   |
| 3    | Alice   | add 1     | {1 → `false`, 2 → `false`, 3 → `false`} | {2 → `false`, 3 → `false`}                   |
| 4    | Bob     | add 1     | {1 → `false`, 2 → `false`, 3 → `false`} | {1 → `false`, 2 → `false`, 3 → `false`}      |
| 5    | Alice   | delete 1  | {1 → `true`, 2 → `false`, 3 → `false`}  | {1 → `false`, 2 → `false`, 3 → `false`}      |

Now, how does merging work?
In exactly the same way as before!
Alice and Bob compare their two maps.
If either of them has any key that's lacking in the other's map, it just gets added unchanged (we don't have that in our example scenario).
If they have a common key but disagree on its value, they have to merge the value.
This is where things get important: _`true` has priority over `false`_.
In other words: _the partial ordering for boolean is defined in a way that `false` ≤ `true`_ (as you would expect in JavaScript).

{% include float_picture.html src="topics/crdt/payoff.jpg" text="Abstracting would pay off? Unbelievable!" %}

This also implies that when updating the map, it is only allowed to transition a `false` to a `true` (as you would expect from the semantics of a 2P-Set).
This guarantees that an element of the 2P-Set can never come back from the dead.
Adding a new key is always allowed, although the concrete implementation would probably want to make sure that you can't directly add a `true` element since that would be kinda pointless (not harmful though, just pointless: why would you want to delete an element that has never existed?).

But the key takeaway is that even deletion fits neatly into our lattice-partial-ordering framework.
That's a relief, right?
All that work finally paying off.

## No Free Lunch

We've now learned that we can get the following CRDTs “for free”:

* G-Set
* G-Counter
* 2P-Set

In case you were wondering at what point I'm going to show the code, the answer is “not in this episode because there's no new code to show”.
All the pieces have been implemented already, and all the contracts have been checked.

And yet.
There's no free lunch.

While the underlying algebraic structures can neatly be composed to yield larger structures, an actual real-world CRDT library would not expose those directly to the user.
Recall the sentence from earlier:

> Notably, maps where the value type is a lattice, and where update operations need to be monotonic.

This is quite a strong requirement.

Let's say you have a `Map<string, number>` in JavaScript.
Nobody prevents you from decrementing the numbers in the map, or deleting entries altogether.
This is fine when using any old `Map`.
But we're not dealing with any old maps, we're superimposing the lattice semantics on them.
Trying to merge maps that have been updated non-monotonically breaks our entire construction, and what's worse, we wouldn't even notice!

Instead, we'll have to wrap maps somehow to enforce monotonic updates.
In JavaScript, we can make a design decision whether to create a new class or to create a `Proxy` that intercepts calls to an underlying map (so that we can use the map as a regular `Map`).
For demo purposes, I'll sketch the first option below.

```
class MonotonicMap {
  constructor(partialOrdering, entries) {
    this.map = new Map(entries);
    this.partialOrdering = partialOrdering;
  }

  get(key) {
    return this.map.get(key);
  }

  has(key) {
    return this.map.has(key);
  }

  set(key, value) {
    if (this.has(key)) {
      const oldValue = this.get(key);
      if (!this.partialOrdering.isLeq(oldValue, value))
        throw new Error(`Non-monotonic update for ${key}`);
    }

    this.map.set(key, value);
  }
}

const mmap = new MonotonicMap(orderings.any, [["alice", 1], ["bob", 0]]);

mmap.set("bob", 1); // ok
assert.throws(() => mmap.set("alice", 0), /monotonic/); // not ok

mmap
```

This map is generic in that it works for any partial ordering and prevents non-monotonic updates.
Consequently, it doesn't even offer a `delete` operation.
We could also implement a `merge` operation directly on `MonotonicMap`, but we need to take care to somehow handle merging two maps that have different orderings attached (this is difficult in many programming languages, including JavaScript; see [here for a possible approach in Scala](https://typelevel.org/blog/2016/11/17/heaps.html)).
In the end, this will greatly depend on your domain and how far you are willing to go for robustness, i.e., ruling out nonsensical operations.

## Encapsulating state

Arguably, the `MonotonicMap` implementation is still not quite useful for application developers.
But we can use it as a foundation to implement e.g. a 2P-Set, whose `delete(key)` method performs a `set(key, true)` on the underlying map.
That way, you could provide an interface that makes sense from a _domain_ point of view that delegates to an implementation that makes sense from an _algebraic_ point of view.
Luckily, we don't have to invent this programming pattern, since it has already been described in the 1970s as _Abstract Data Types_.
We could, for example, describe the contract of a 2P-Set as follows:

Initial State
: _A_ = {}, _R_ = {}

Invariant
: _R_ is subset of _A_

Operation elements
: return _A_ - _R_

Operation add(_e_)
: set _A_ := _A_ + {_e_}

Operation remove(_e_)
: check that _e_ is in _A_, then set _R_ := _R_ + {_e_}, otherwise fail

In other words, the above describes the _interface_ of a 2P-Set, whereas the `MonotonicMap` with an appropriate lattice describes the _implementation_.

If you're curious about a more formal treatment of this, check out [this side note](../05a-adt).
Otherwise, feel free to skip it.

## What's next?

We've seen how CRDTs can cope with deletion of values.
But so far, this has been really restricted: once a value is out, it's out.
There are two different ways to make this a bit more flexible.
One of them requires a notion of time.
So, the [next episode](../06-time) will talk about time and causality in distributed systems.

## References

* Stone Church, Hamilton, Canada by Scott Rodgerson on [Unsplash](https://unsplash.com/photos/ZLHBjxbCCEc)
* Marx and Engels on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Marx_and_Engels.jpg&oldid=398478366)
