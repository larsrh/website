---
title: "CRDTs: Part 7"
subtitle: "Part 7: Registers and Deletion"
progress: 40
toc: false
prev: 06-time
---

## What's happening in this episode?

In the [previous episode](06-time), I've spent quite a bit of time on notions of time in distributed systems.
While we didn't learn any new CRDTs, we learned some concepts that are important to understand updates and deletion in CRDTs.
The basic problem is how to resolve conflicts that arise by two users concurrently updating the same piece of information.
G-Sets and 2P-Sets solve this problem by forbidding a large class of possible operations:
G-Sets will never lose elements, and 2P-Sets will never find elements again after they've been lost.

This is unsatisfactory in more complex applications.
An oft-cited example is a shopping basket in an online shop.
G-Sets are definitely out: shoppers would certainly want to remove items from their basket.
But 2P-Sets are also out, because fickle shoppers may decide to buy that item after all.
Throw in the problem that many shops have web and mobile applications and you have a perfect mess.
Luckily, our good friends [Marc, Nuno, Carlos, and Marek](https://hal.inria.fr/inria-00555588/) have some more ideas in store.

{% include float_picture.html src="topics/crdt/cabinet.jpg" text="A wooden cabinet with many drawers" %}

## Registers

Let's first take a step back.
Previous episodes have introduced and used a generic map construction that allows to work with multiple values in a uniform way.
But today, I only want to talk about _atomic cells_ that store only one value, or possibly multiple values that logically belong together.
These are also called _registers_.
The simplest possible cell would be an object that stores one item:

```
class Cell {
  constructor(value) {
    this.value = value;
  }
}
```

Out goal is that this cell should be able to store arbitrary data and allows for non-monotonic updates.
The data may not even _have_ a notion of monotonicity.
We can't achieve this goal with the `Cell` class: it is not clear how we can assign a lattice semantics if we know nothing about the value.

Before we can fix this, we have to dispense with the notion of “register” as in “processor register”.
In a CPU, a register is a small piece of storage that can be quickly accessed.
Here, “small” means something like 32 or 64 bit.
Registers have no additional structure except for being a vector of bits.
This is _not_ what we mean with register in the context of a CRDT.

A register may contain arbitrary data with some additional metadata on top.
Precisely what kind of metadata varies across different register implementations.
Furthermore, registers in the CRDT context _do not_ behave like CPU registers.
Assignments may be done concurrently by different threads and merging may:

1. discard all concurrent assignments but one,
2. keep all concurrent assignments.

{% include float_picture.html src="topics/crdt/chipmunk.webp" text="Dramatic chipmunk" %}

We'll look at both possibilities now.
Their main difference: _time_.

## Last Write Wins

Shapiro et al. write, rather unexcitedly:

> A Last-Writer-Wins Register (LWW-Register) creates a total order of assignments by associating a timestamp with each update.

_But is that even a well-defined total order,_ you, the esteemed reader, are asking yourself; _for there are no global, totally-ordered timestamps in a distributed system_.
Clearly you have paid attention to Lamport!
Otherwise you wouldn't have thought this exact sequence of words.
Are our dear friends lying?
No, they aren't.
They're just supposing:

> Timestamps are assumed unique, totally ordered, and consistent with causal order.

Lamport himself suggests how to obtain such timestamps, e.g. by including some per-replica identifiers.
But for now, let's assume that all nodes magically have access to the real UTC time.
Here's how the register can be implemented:

```
{% include topics/crdt/lib-lww.js %}

new LWWRegister(1);
```

When you re-run the snippet, you'll notice that the time changes, as expected.
Conveniently, `Date` objects can be compared with `<`.
To demonstrate this, we'll have to fiddle around a little with promises:

```
(async () => {
  const date1 = new Date();
  const date2 = await new Promise(resolve => {
    setTimeout(() => resolve(new Date()), 500);
  });
  return date1 < date2;
})();
```

{% include float_picture.html src="topics/crdt/dates.jpg" text="There's an ordering for Dates, but I'm not sure whether there's an ordering on dates." %}

If you have trouble reading this, no worries.
The key point is: `<` works as expected on dates.
Consequently, we can implement a lattice for LWW-Registers as follows:

```
lattices.lww = {
  join: (reg1, reg2) =>
    reg1.time < reg2.time ? reg2 : reg1
};

const lwwGen =
  fc.tuple(fc.hexaString(), fc.date())
    .map(([value, time]) => new LWWRegister(value, time));

checkAll(contracts.lattice(lattices.lww, lwwGen));
```

Did you expect the contract to pass?
Yes? No?
If not, you were probably wondering about what happens if there are two registers with the same timestamp but different values.
This shouldn't happen according to the assumptions of LWW-Registers, but it may happen when `fast-check` generates values.
The answer is that one of the two values is being discarded.
That's not nice, but it is what you get when you ignore the assumptions.

{% include float_picture.html src="topics/crdt/composition.jpg" text="My Little Pony: Composition is Magic" %}

I understand that the explanation LWW-Registers may be a little anticlimactic.
They literally only store a single piece of metadata that is used to impose a total ordering.
But again, their power lies within their composition.
I'll give you an example.

Recall the implementation of a 2P-Set.
We use the actual data that we want to store as keys in the `MonotonicMap`.
The values of that map are either `true` or `false`, with `false` meaning “not deleted yet” and `true` meaning “deleted forever”.
We could never flip back from `true` to `false`, because there is no other boolean that's larger than `true`.
But now consider a slightly modified version:
Instead of using `true` and `false` in the map, we use LWW-Registers _containing_ `true` or `false`.
Let me explain, using a concrete scenario:

1. Alice and Bob both start with the set {2}.
2. Alice adds 1 to the set.
3. Alice deletes 1 from the set.
4. Bob adds 1 to the set.

In 2P-Set semantics, Bob's action would be discarded.
Let's assume that the steps are also the timestamps and check out what our Map+LWW-Register composition would be doing here:

| Step | Actress | Action    | Alice                                   | Bob                                          |
| ---- | ------- | --------- | --------------------------------------- | -------------------------------------------- |
| 1    |         | (_start_) | {2 → (1, `false`)}                      | {2 → (1, `false`)}                           |
| 2    | Alice   | add 1     | {1 → (2, `false`), 2 → (1, `false`)}    | {2 → (1, `false`)}                           |
| 3    | Alice   | delete 1  | {1 → (3, `true`), 2 → (1, `false`)}     | {2 → (1, `false`)}                           |
| 4    | Bob     | add 1     | {1 → (3, `true`), 2 → (1, `false`)}     | {1 → (4, `false`), 2 → (1, `false`)}         |

Because Bob's timestamp for `1` is higher (4 > 3), his addition wins.

## References

* Cabinet by Nuno Silva on [Unsplash](https://unsplash.com/photos/wmYP3jGL5wo)
* Dramatic Chipmunk on [Giphy](https://giphy.com/gifs/meh-just-saying-captainsparklez-p8BOVqc17KVy0)
* Dates by M. Dhifallah on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Dattes_deglet_from_Biskra.jpg&oldid=424918943), CC-BY-SA 3.0
