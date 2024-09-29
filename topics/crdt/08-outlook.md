---
subtitle: "Part 8: Outlook"
toc: false
---

Congrats!
You've made it through an "introduction" of epic proportions.[^footnote-words]
As promised in the [previous episode]({% link topics/crdt/07-deletion.md %}), I'd like to briefly touch on some topics that I've ignored so far.
This episode has no narrative, so feel free to read any section that piques your interest.

## Two kinds of CRDTs

The entire series dealt with state-based CRDTs, or CvRDTs.
Their definition is given in [episode #4]({% link topics/crdt/04-combinators.md %}).
They are simple and elegant because you can merge any two values (of the same data type, of course) and obtain a well-defined result.
Their requirements to the communication channel are simple:
to achieve convergence, you need messages to be delivered every once in a while.
Because of their properties, it also doesn't matter if messages get duplicated.

However, they also have a big disadvantage:
You need to send the entire value over the wire.
This could become prohibitively expensive once the data structures grow larger.
It might not matter too much for a collaborative editor of plain text, where document sizes are in the order of a few hundred kilobytes.
But what if your users have crappy bandwidth or latency?
You should take this into account when designing your application.

A possible solution for this problem is to switch to _operation-based CRDTs_, or _CmRDTs_.
While their design goals are the same as state-based CRDTs (convergence), they achieve this in a completely different way.
They work by transmitting only the _operations_ that have been applied since the last sync.

Naturally, this also changes the underlying mathematical model.
State-based CRDTs achieve convergence by the lattice properties.
But in operation-based CRDTs, replicas never actually see each other's entire state.
Instead, we must make sure that operations _commute_.
This means that no matter in what order the operations from one replica are applied to another replica, they end up reconstructing the same state.

To illustrate this, let's look at a familiar example: a distributed counter.
But now we exchange operations instead of state.

1. Alice and Bob both start with the value 0.
2. Internet connection fails.
3. Alice increments.
4. Bob increments.
5. Alice increments again.
6. Internet connection is restored.

When the connection is restored, Alice sends two messages to Bob.
Bob sends one message to Alice.
(The contents of the message doesn't matter, because there's only one operation that can happen here, which is to increment the counter by one.)

Now assuming Alice and Bob receive each other's messages – no matter the order – they will both arrive at the correct value of the counter (3).
This works because addition on numbers is commutative, that is, _x_ + _y_ = _y_ + _x_ for all _x_ and _y_:

```
checkAll({
  "add-commutative":
    fc.property(fc.integer(), fc.integer(), (x, y) =>
      x + y == y + x
    )
});
```

This also works for decrements, because _x_ + 1 - 1 is the same as _x_ - 1 + 1.
So we can easily extend our counter with another operation (this is called a _PN-Counter_, for positive/negative).
This is a lot harder to achieve with state-based CRDTs, because subtraction would violate monotonicity.
Accordingly, one would need to keep two G-Counters; the first one tracking increments and the second one decrements.

At this point, you might think that operation-based CRDTs are superior to their value-based friends.
The messages are smaller and they allow you to do more things since they are not constrained by monotonicity.
But there's a catch (of course there is):
The convergence theorem for them requires reliable broadcast channels.
That is: if a message with an operation gets lost, suddenly your replicas won't agree on the correct value anymore.
It's not impossible to set up a reliable channel, but to quote Shapiro et al.:

> Specifying operation-based objects can be more complex since it requires reasoning about history, but conversely, they have greater expressive power.
> The payload can be simpler since some state is effectively offloaded to the channel.
> Op-based replication is more demanding of the channel, since it requires reliable broadcast, which in general requires tracking group membership.

There's no clear winner here.
You need to decide which one to use based on your concrete use case and channel assumptions.
But one more thing:
A Git-like approach where before syncing, both replicas negotiate the precise subset of objects that they need to exchange, may give you the benefits of small message sizes while keeping the conceptual simplicity of state-based CRDTs, at the cost of introducing a more complex protocol.

## Practical matters

When building an application on top of CRDTs, it is prudent to compare the user's expectation of how concurrent edits work with how the data model works.
This is even more true when your application state requires composition of multiple CRDTs.
After all, there may be some situations (also called _anomalies_) where reappearance of previously-deleted items can be confusing, or even worse, seen as hostile by users.
A good example of this is when using MV-Registers for a shopping basket:
it may happen that an item that has been removed from the basket reappears in some (rare) situations.
While this may be good for the shop (more revenue!), it may be bad for the user (unexpected item!).

Another example is when using a PN-Counter for tracking set membership.
If the “membership count” drops below 0, you'll have to add something for the set to become empty.
But at the same time, we can't just avoid this situation by restricting the counter to be non-negative.
Decrements may pile up on multiple replicas and we'd only notice the counter dropping below 0 when we synchronize them.

Another problem is that in theory, we can't just remove tombstones for deleted elements, but in practice, we have to.
Otherwise, our replicas will accumulate too much cruft from long-forgotten, deleted set elements.
It is possible to prune such values, but we need to be careful to not do it too early.
This process is called _garbage collection_ and is conceptually similar to GC in programming languages.
Before deleting anything, we need to make sure that those old values are not reachable any more, that is, all delete operations have propagated to all replicas.
An easy way to achieve this is if replicas continually broadcast their vector clocks (although it requires that the set of replicas is known and fixed).
Naturally, this introduces complications in the application protocol.

Long story short: you can't just slap CRDTs onto your application and expect user happiness.

## Further reading

I've linked to the paper by Shapiro, Preguiça, Baquero, and Zawirski a few times.
If you want to dive deep into all (formal) aspects of CRDTs, this paper is for you.
Reading it does require some basic maths fluency, but most of the formulas are also described in prose.
Additionally, the CRDTs that are defined in the paper are also implemented in pseudocode.

Martin Kleppmann, Annette Bieniusa, and Marc Shapiro have built [a website](https://crdt.tech/) with tons of resources on CRDTs, including:

* academic papers,
* blog posts (like this one),
* talks, and
* practical implementations.

As for the last point, I invite you to check out [Automerge](https://github.com/automerge/automerge) which is very close to a “one-size-fits-all” data type.
It implements a JSON-like structure with all bells and whistles.
It also brings a few other CRDTs, like strings (for collaborative text editing) and counters.
If you've gone through this series, you should have enough understanding of the underlying implementation.

## What's next?

This is the final part.
What's next is up to your imagination.
Have fun and good luck!

[^footnote-words]: approximately 2.5% the length of _War and Peace_
