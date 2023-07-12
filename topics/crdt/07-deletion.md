---
subtitle: "Part 7: Registers and Deletion"
toc: false
---

## What's happening in this episode?

In the [previous episode](../06-time), I've spent quite a bit of time on notions of time in distributed systems.
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

Our goal is that this cell should be able to store arbitrary data and allows for non-monotonic updates.
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

I understand that the explanation of LWW-Registers may be a little anticlimactic.
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
Let's assume that the steps are also the timestamps and check out what our Map+LWW-Register composition would be doing here.
A quick note on the notation: I still use the arrow (→) syntax to denote entries of a map.
But the values are now LWW-Registers that I express as a pair of (_value_, _time_).
For example, Alice and Bob's start state is {2 → (`false`, 1)}, which can be constructed in JavaScript as follows:

```
const initial = new Map();
initial.set(2, new LWWRegister(false, new Date(1)));
initial
```

Let's look at the table now.

| Step | Actress | Action    | Alice                                   | Bob                                          |
| ---- | ------- | --------- | --------------------------------------- | -------------------------------------------- |
| 1    |         | (_start_) | {2 → (`false`, 1)}                      | {2 → (`false`, 1)}                           |
| 2    | Alice   | add 1     | {1 → (`false`, 2), 2 → (`false`, 1)}    | {2 → (`false`, 1)}                           |
| 3    | Alice   | delete 1  | {1 → (`true`, 3), 2 → (`false`, 1)}     | {2 → (`false`, 1)}                           |
| 4    | Bob     | add 1     | {1 → (`true`, 3), 2 → (`false`, 1)}     | {1 → (`false`, 4), 2 → (`false`, 1)}         |

{% include float_picture.html src="topics/crdt/cranberries.jpg" text="Irish rock band 'The Cranberries', presumably singing about LWW-Registers" %}

Because Bob's timestamp for `1` is higher (4 > 3), his addition wins.
I personally believe that this semantics is much more useful than the semantics of a 2P-Set, because elements are allowed to come back from the dead 🧟.

The above composition can – and should be! – wrapped in a dedicated map type that manages the timestamps.
Keep in mind that it requires some amounts of configuration to ensure the preconditions, especially how to construct a global, monotonic “clock”.

## Multiple Values

We now know how a LWW-Register works.
Its semantics is easily explained: literally the last write wins.
This can be lifted into a map where addition and deletion are equal operations.

But I promised you in the introduction that there is another possibility.
The _Multi-Value Register_ (_MV-Register_) does not assume the presence of an ordered clock across all nodes.
Instead, it relies on a _vector clock_.
Initially, I wanted to introduce those in the [previous episode](../06-time), but it was already too long.
So, let's talk about it here.

The basic principle of a vector clock is the same as for a Lamport clock.
The clock does not measure real time; rather, it increments whenever an event occurs.
Each node keeps its own clock.
The difference now is that _each_ node keeps _each other node's_ clock, too (i.e., a “vector” of clocks).
When a message is sent, the sending node increases only its own clock, but includes a copy of the entire vector in the message.
On the other side when a message is received, the receiving node again increments its own clock, and for everyone else's clock, it takes the maximum of the own vector and the received vector.

<div>
  <img src="{% asset topics/crdt/vector-clock.svg @path %}" alt="see text below for a description">
</div>

In this diagram, we can again see three nodes _A_, _B_, and _C_ sending messages to each other.
The first message from _C_ to _B_ causes _C_ to increase its own clock to 1.
Similarly, when _B_ receives that first message, it updates its knowledge of _C_'s clock (1) and increases its own clock to 1.
The second message is sent from _B_ to _A_.
_B_ increases its own clock to 2, but keeps all other entries in the vector the same.
It also propagates its knowledge of _C_'s clock to _A_, such that _A_ ends up with _A_ = 1, _B_ = 2, and _C_ = 1.

The first nontrivial merge happens when _A_ receives its second message.
At that point, _C_'s knowledge is _B_ = 3 and _C_ = 3, but _A_'s knowledge is _B_ = 2 and _C_ = 1.
Consequently, _A_ updates its clocks to _A_ = 3, _B_ = 3, and _C_ = 3.

If this sounds familiar to you, that's because it is.
You've seen that exact kind of thing before in this series: I'm talking about G-Counters.
In [episode #4](../04-combinators), I've told you that they can be modeled as a set mapping replica names to the current value of the counter.
The merge operation works by taking the maximum for each key–value pair in the map.
Surely this means that we're onto something.

But how can we use this to implement a register?
The key idea is that we can use vector clocks to detect _write conflicts_.
For this to work, we need all replicas to store a “database” of writes and the full state of the vector clock when the write happened.
Why is this important?
Let's consider another scenario.

1. Alice and Bob both start with the register containing 1.
2. Alice writes 2.
3. Bob writes 3.

The difficulty in resolving this conflict is that by just looking at this sequence of events, we don't actually know what the correct resolution would be!
If Bob knows about Alice's write, then he probably made a conscious decision to set the value to 3 (maybe he incremented by 1).
On the other hand, if he didn't know, then he may have made a mistake.
Maybe he wanted to increment by 2 (3 = 1 + 2), so the correct write should've been 4.

Using a vector clock, this situation can be detected easily.
Whenever someone writes a value into the register, they also record the current state of their vector clock.
In code:

```
class MVRegister {
  constructor(value, ...times) {
    this.value = value;
    this.times = times;
  }
}
```

We could've equally well used a map for the times instead of an array.
The precise details don't matter too much at this point.

Now let's say Alice and Bob want to merge their MV-Registers.
They first have to compare the timestamp, just like for a LWW-Register.
But whereas in a LWW-Register, they just compare two numbers, here they have to compare an entire vector.
There are three possible cases:

1. Alice's vector clock is ≥ Bob's vector clock.
   This comparison works exactly the same way as the partial ordering we've defined for maps, that is, that is, each entry in Alice's vector clock must be ≥ the corresponding entry in Bob's vector clock.
   If this is true, then we know that Alice's causal history contains all the events of Bob's causal history.
   In other words, Alice has complete knowledge of everything that Bob has seen so far, which means that Alice's state of the register wins.
2. Conversely, if Bob's vector clock is ≥ Alice's vector clock, then Bob's state wins.
3. If the two vector clocks are incomparable, then we have a concurrent write.

Case #2 occurs in the above scenario when there is no connection loss between Alice's and Bob's write.
Case #3 occurs when there is a connection loss right after the start.
It means that both writes happened concurrently and we don't really know which one is “better” than the other.

{% include float_picture.html src="topics/crdt/both.webp" text="Why don't we have both?" %}

So what do we do?
The name “Multi-Value Register” already gives it away.
We keep both writes.
In our scenario, the contents of the MV-Register would be (written in prose):

* _value_ = 2 where
  * Alice's clock = 1
  * Bob's clock = 0
* _value_ = 3 where
  * Alice's clock = 0
  * Bob's clock = 1

The more participants in a network, the more different values this could contain.
For example, Carol could appear for a sudden.
Carol sends us a MV-Register that she'd created together with Dave:

* _value_ = 4 where
  * Carol's clock = 8
  * Dave's clock = 9
* _value_ = 0 where
  * Carol's clock = 3
  * Dave's clock = 11

Neither value's vector clock is ≥ any other value's vector clock.
Consequently, the MV-Register now simultaneously contains {0, 2, 3, 4}.
In that sense, an MV-Register is really unlike any hardware register because it may contain an arbitrary set of values.

You might be wondering how such a mess could ever be cleaned up?
Well, future writes might do that.
Let's say Alice, Bob, Carol and Dave come together and merge all their registers, arriving at the values {0, 2, 3, 4}.
Now Alice comes along and writes the sum of all these values (9).
At this point, her clock knowledge is Alice = 2, Bob = 1, Carol = 8, Dave = 11.
She now can discard all other values, because:

* her causal history includes everyone else's causal history, because
* her vector clock is ≥ everyone else's vector clocks, because
* all of them synced their values successfully and Alice was the last person to perform a write.

Whenever Alice propagates her MV-Register to the others, they can also discard 0, 2, 3, and 4, because they are “subsumed” by Alice's write.
They can safely assume that Alice has seen all those writes, somehow took them into account and computed the new value.

## What's next?

There's a ton more to tell about the use cases and “anomalies” (i.e. possibly unexpected behaviour) of LWW- and MV-Registers.
But, given that this post is already way past 2500 words and I care only about the maths, I'm calling it a day now.

We're nearing the end of this series on the foundations of CRDTs.
So far, I've shown you the basic building blocks for CRDTs: lattices, partial orderings, monotonicity, clocks, and combinators.
All that's left for me is to:

* talk about some practical matters,
* give some pointers to further literature, and
* link to some ready-to-use libraries.

Head on over to the [final episode now]({% link topics/crdt/08-outlook.md %}).
Then, I'll send you on your journey of building great distributed applications.

## References

* Cabinet by Nuno Silva on [Unsplash](https://unsplash.com/photos/wmYP3jGL5wo)
* Dramatic Chipmunk on [Giphy](https://giphy.com/gifs/meh-just-saying-captainsparklez-p8BOVqc17KVy0)
* Dates by M. Dhifallah on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Dattes_deglet_from_Biskra.jpg&oldid=424918943), CC-BY-SA 3.0
* The Cranberries by Alterna2 on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:The_Cranberries_en_Barcelona_8.jpg&oldid=335325268), CC-BY 2.0
* Vector Clock by Duesentrieb on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Vector_Clock.svg&oldid=146144768), CC-BY-SA 3.0
