---
title: "CRDTs: Part 5"
subtitle: "Part 5: Tombstones"
progress: 70
prev: 04-combinators
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
The naive implementation says the former, because it'll just take the union of both sets.
The way to avoid this is by using _tombstones._

## The Ghost of Values Past

The idea behind tombstones is quickly explained:
you never actually delete values, just mark them as deleted.

Alright, that's it for today, stay tuned for the next episode.

I'm kidding.
Of course, the idea is simple, but there's a lot of stuff we still need to figure out.
For example, how do we represent the deleted values?
What will the programming interface be like?

Let's start with the most basic example, the Two-Phase-Set (or 2P-Set).
The intended semantics is _remove wins_, i.e., a value that has been removed can never be added again.
This is why it's called “Two Phase”: a value travels through the two phases of _being_ member of the set and _having been_ member of the set.
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

In the last part, I've told you that G-Sets are special cases of maps.
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
This is where thing get important: _`true` has priority over `false`_.
In other words: _the partial ordering for boolean is defined in a way that `false` ≤ `true`_ (as you would expect in JavaScript).

{% include float_picture.html src="topics/crdt/payoff.jpg" text="Abstracting would pay off? Unbelievable!" %}

This also implies that when updating the map, it is only allowed to transition a `false` to a `true` (as you would expect from the semantics of a 2P-Set).
This guarantees that an element of the 2P-Set can never come back from the dead.
Adding a new key is always allowed, although the concrete implementation would probably want to make sure that you can't directly add a `true` element, since that would be kinda pointless (not harmful though, just pointless: why would you want to delete an element that has never existed?).

But the key takeaway is that even deletion fits neatly into our lattice-partial-ordering framework.
That's a relief, right?
All that work finally paying off.

## References

* Stone Church, Hamilton, Canada by Scott Rodgerson on [Unsplash](https://unsplash.com/photos/ZLHBjxbCCEc)
