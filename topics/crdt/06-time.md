---
title: "CRDTs: Part 6"
subtitle: "Part 6: Time and Causality"
progress: 90
toc: false
prev: 05-tombstones
---

Let's talk about distributed systems.

In the previous episodes, I've shown you “event logs” like these:

1. Alice and Bob start with the set containing just 1.
2. Internet connection fails.
3. Alice adds a 2.
4. Bob adds a 3.
5. Internet connection is restored.

In a distributed system, Alice and Bob would use different nodes in a network.
Even though the event log pretends to be linearly ordered, this is not how reality in such a network works.
For example, since the connection failed in Step 2, neither Alice nor Bob know who of them added their respective element first.
As far as they are concerned, they performed these steps _independently_ of each other.

But why is that important?
Well, sometimes we want to impose an order on events.
But the theory of distributed systems teaches us that that is very hard.

In his seminal paper [“Time, clocks, and the ordering of events in a distributed system”](https://doi.org/10.1145/3335772.3335934), Leslie Lamport outlines the fundamental notions of time and causality in networks.
I will try to give a summary in this post that's required to understand CRDTs, liberally using quotes from the paper.

In the introduction, Lamport writes:

> The concept of time is fundamental to our way of thinking. It is derived from the more basic concept of the order in which events occur. […]
> The concept of the temporal ordering of events pervades our thinking about systems. […]
> However, we will see that this concept must be carefully reexamined when considering events in a distributed system.

The analogy Lamport uses are clocks.
When ordering events, us humans look at the time that these events happened – using a wristwatch or some other clock – and then compare the time.
For example, an event that happened on 1970-01-01 00:00:00 UTC is said to have happened _before_ another event that happened on 2038-01-19 03:14:08 UTC, because 1970-01-01 00:00:00 UTC < 2038-01-19 03:14:08 UTC.
Timezone shenanigans aside, this is very convenient for human life because we can _always_ tell the ordering of two events.

{% include float_picture.html src="topics/crdt/bigclock.jpg" text="For a distributed system, you are going to need a big clock (e.g. the Ghibli Clock in Tokyo)" %}

In a distributed system, you don't get that luxury.
Lamport defines such a system as “a collection of distinct processes which are spatially separated” – e.g., running on different physical nodes – “which communicate with one another by exchanging messages”.
We generally assume that exchanging messages takes time, for example by sending them over a network cable.

The key insight (if you take away only one thing, it should be this):
_In a distributed system, events occuring across processes can only be ordered through messages._
What does that mean?
If process _A_ performs some action, and process _B_ performs some action, they know nothing about their respective orders.
_Only_ if process _A_ sends a message _M_ to process _B_, then we know that _sending_ the message must have happened before _receiving_ that message.

When I first read about this, it seemed “too obvious”, but it is actually a profound insight.
The consequence is that events in a distributed system are only partially ordered, and we call that ordering _causality_.

Lamport proceeds to define this relation which he calls → (read: “happened before”):

> 1. If _a_ and _b_ are events in the same process, and _a_ comes before _b_, then _a_ → _b_.
> 2. If _a_ is the sending of a message by one process and _b_ is the receipt of the same message by another process, then _a_ → _b_.
> 3. If _a_ → _b_ and _b_ → _c_ then _a_ → _c_.
>
> Two distinct events _a_ and _b_ are said to be concurrent if neither _a_ → _b_ nor _b_ → _a_.

This should sound oddly familiar to you, my dear reader.
In fact, the third rule is transitivity, and the entire thing defines → to be a partial ordering.
Note though that there is a small difference in the way Lamport defines this and the way I defined this in [in an earlier episode](02-contracts):
→ is not reflexive, so it would be more accurate to compare → to < on numbers (instead of ≤).

The second important consequence of this insight is that if two events are concurrent, then they cannot causally affect each other.
If you reconsider Alice's and Bob's event log, that means that Steps 3 and 4 are independent by construction.
It even turns out that according to this model, it doesn't really matter whether the network connection gets lost or not; all that matters is whether or not they (successfully) exchange messages.

To make this concrete, consider the following example of a distributed system with three nodes:

<div class="text-center">
  <img src="/img/topics/crdt/lamport-clock.svg" class="img-fluid" alt="see text below for a description">
</div>

Let's unpack this, since there's a lot going on there.

We have three nodes, called _A_, _B_, and _C_.
Each event in this diagram has a number assigned to it in a little box, which we can ignore for now.
More importantly, each node assigns a label to an event as it occurs within that node.
For example, node _C_ sends a message to node _B_.
The sending event is assigned the label _C_₁, the receiving event the label _B_₁.
We can say that _C_₁ has caused the following events:

* _B_₁
* everything that _C_ does after _C_₁ (even if _B_₁ hasn't happened yet)
* everything that _B_ does after _B_₁

The diagram proceeds with _B_ sending a message to _A_.
The sending is now assigned _B_₂ and the receipt _A_₁.
Observe how the “local” label in _A_ has a smaller number than in _B_, yet _B_₂ → _A_₁ holds.
By transitivity, _C_₁ → _A_₁ also holds.

Independently of _A_, _B_ sends another message to _C_, labelled with _B_₃ and _C_₂.
We say that _B_₃ and _A_₁ are concurrent.
Locally, we can always say that <em>X<sub>i</sub></em> → <em>X<sub>j</sub></em> for any node _X_ if _i_ < _j_, but for different nodes, we need to look at their communication.

There's more happening in the diagram, but by now, I think you get the idea.

Before we move on, let's take a quick look at the numbers in the little boxes.
You'll notice that each node has its own number; they all start with zero; and they vaguely increase from left to right, giving an impression of global time.
This is called a _Lamport clock_.
It's not quite global time, but it's a nifty mechanism to synchronize clocks across different machines.
The idea is as follows:

* when sending a message from _X_ to _Y_, you increment the local clock of _X_ and include the incremented value along with the payload in the message
* when receiving a message from _X_ on _Y_, you compare your local clock on _Y_ with the one you've received on _X_, take whichever's the largest, and increment

Try tracing this concept through the diagram above.
For example: when _C_ sends its first message, it includes the Lamport time 1 in the message.
When _B_ receives that message, local time is still 0.
_B_ notices that the received time is 1, so uses that, and adds 1, bringing local clock in _B_ to 2.

Keep in mind that the Lamport time is not a global ordering of events!
Despite the fact that _B_₃ and _A_₁ both happen at time 4, they're concurrent.
We do know though that whenever an event _a_ happens before _b_ (i.e. _a_ → _b_), then the Lamport clock at _a_ must be smaller than at _b_.[^footnote-global]
This is ensured by incrementing the clock when sending and receiving a message.

{% include float_picture.html src="topics/crdt/bladerunner.webp" text="Harrison Ford saying 'What do you want' in Blade Runner 2049" %}

Are you still here?
Good.
Because now I can tell you what all of this has to do with CRDTs.
So, let's talk about ~~replicants~~ replicas.
We're going to take a closer look at the [Shapiro paper](https://hal.inria.fr/inria-00555588/) that I referenced in [Episode 4](04-combinators).
Recall the definition of state-based CRDTs: they

1. have a join-semilattice
2. only support _monotonic_ operations

So far, so good.
We've covered that in previous episodes.

But what I actually haven't told you is one of the central guarantees that this definition gives us.
Shapiro et al. call it – in academic modesty – “Proposition 2.1” (it should've been a Theorem):

> Any two object replicas of a CvRDT eventually converge, assuming the system transmits payload infinitely often between pairs of replicas over eventually-reliable point-to-point channels.

Let's unpack this.

The term _CvRDT_ stands for _Convergent Replicated Data Type_ and is synonymous with state-based CRDT (the latter term now being preferred).
The statement now claims something about _convergence_ of _object replicas_ that exchange messages.
This deserves some further explanation.

Our basic assumption here is that we have a distributed network of nodes.
Each node stores the same CRDT, but may be at a different state.
At some point, Alice knows that the set contains the elements {1, 2} and Bob knows that the set contains {2, 3}.
Whenever they feel like it (or when they have carrier pigeons available), they can send their state to each other.

For example, Alice tells Bob that her set has the elements {1, 2}, which will cause Bob to update his set to {1, 2, 3}.
Bob may do the same in reverse.
_Payload_ refers to the internal state of the CRDT, here: the set containing elements.
This is the data that is exchanged between nodes.
For a 2P-Set, that would be two sets (or a map, according to the generic representation).

_Convergence_ now means that if Alice and Bob keep sending each other updates, and these updates will be delivered at some point, that they end up at the same state.
It may take a while, but it only takes finitely many carrier pigeons to converge.

If you're happy with what you've read so far and are not overly interested in abstract symbols, then you can call it a day; there's not much more happening in this episode.
However, if you're like me, you can stay for a little longer and read about the formal definition of convergence.
Note that [the side note on abstract data types](05a-adt) is necessary for understanding the following.

We first start with the _causal history_ of a replica.
Let _x_ be any object and _x_<sub>_i_</sub> the various replicas of that object.
Furthermore, assume that _f_ is any monotonic state update function, and `join` is the usual join operation on the lattice for _x_.

Now we can define the causal history _CH_ as a set of operations (quoted from the paper):

1. initially, _CH_(_x_<sub>_i_</sub>) = {}
2. after executing _f_, _CH_(_f_(_x_<sub>_i_</sub>)) = _CH_(_x_<sub>_i_</sub>) ∪ {f}
3. after joining, _CH_(`join`(_x_<sub>_i_</sub>, _x_<sub>_j_</sub>)) = _CH_(_x_<sub>_i_</sub>) ∪ _CH_(_x_<sub>_j_</sub>)

This history essentially provides a trace of operations that have occured on a replica.
Note that the history is unordered, and operations are unique (in other words, if two replicas apply the “same” state update, that results in two distinct operations).
Some authors prefer an ordered list, but for defining convergence, this one seems more convenient to me.

An immediate consequence of this definition is that causal ordering relation coincides with the subset relation of this history.
Let's say we want to compare the events _a_ and _b_.
If the causal history at point _a_ is a subset of the causal history at point _b_, then _a_ → _b_.
In this scenario, an event can either be:

* a monotonic state update
* sending your state to someone else
* receiving someone else's state

Let's look at another diagram.

<div class="text-center">
  <img src="/img/topics/crdt/convergence.svg" class="img-fluid" alt="see text below for a description">
</div>

This is the same scenario as above, where Alice adds 2 to her set and Bob adds 3 to his.
Before they exchange messages, the causal history of Alice is {_add_(2)}.
For Bob, it is {_add_(3)}.
This means that both events are concurrent, since neither history is a subset of the other.
When Alice sends her set to Bob, his causal history is now {_add_(2), _add_(3)}.
We also know that both _add_(3) and _add_(2) have logically happened before the join, because both are subsets of Bob's causal history at this point.

Finally, let's look at the formal definition of convergence.
Then we can move on to investigate why Proposition 2.1 holds.

Quoted from the paper:
Two replicas _x_<sub>_i_</sub> and _x_<sub>_j_</sub> of an object _x_ converge eventually if:

1. _CH_(_x_<sub>_i_</sub>) = _CH_(_x_<sub>_j_</sub>) implies that the states of _x_<sub>_i_</sub> and _x_<sub>_j_</sub> are equivalent (_safety_)
2. for each _f_ in _CH_(_x_<sub>_i_</sub>), _f_ will be in _CH_(_x_<sub>_j_</sub>) eventually (_liveness_)

After all you've seen so far in this series, this should be common sense.
A join operation shouldn't invent or destroy any values from other nodes, and it should include the correct values at some point.

Let's conclude by revisiting Proposition 2.1:

> Any two object replicas of a CvRDT eventually converge, assuming the system transmits payload infinitely often between pairs of replicas over eventually-reliable point-to-point channels.

The reason why this holds is because we've set up the `join` operation and the monotonic updates accordingly.
The `join` of two objects is always defined; this guarantees liveness.
Safety is ensured because `join` is also commutative.

{% include float_picture.html src="topics/crdt/timey.webp" text="The Doctor explaining that time is more like a big ball of wibbly-wobbly, timey-wimey... stuff" %}

To conclude:
even though uniform, global time is hard to define in a distributed system, we still have a formal notion of causality.
Equipped with this, we can also define the unique properties of CRDTs, namely that they eventually arrive at the same state on all nodes, assuming that the replicas can deliver updates to each other.
In the next episode, we will use some of that knowledge to look at more sophisticated notions of deletion.

## References

* NTV Big Clock by Another Beliver on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Tokyo,_2019_-_532.jpg&oldid=384490276), CC-BY-SA 4.0
* Lamport Clock by Duesentrieb on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Lamport-Clock-en.svg&oldid=145578944), CC-BY-SA 3.0
* Harrison Ford in Blade Runner 2049 on [Giphy](https://giphy.com/gifs/trailer-blade-runner-2049-xUA7bemrKXq2O7lK9i)
* Doctor Who on [Giphy](https://giphy.com/gifs/bbcamerica-doctor-who-time-timey-wimey-efU9WbFkGP9NAkLOWn)

[^footnote-global]: Let _LC_(_x_) be the Lamport time when event _x_ occured on a particular node. Formally speaking, if _a_ → _b_ then _LC_(_a_) < _LC_(_b_). This is called _clock consistency_. The reverse (called _strong clock consistency_) is not true. But by contrapositive we can obtain that if _LC_(_a_) ≥ _LC_(_b_) then _a_ couldn't have affected _b_.
