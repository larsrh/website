---
title: "CRDTs: Part 4"
subtitle: "Part 4: Combinators"
progress: 70
prev: 03-lattices
---

{% include float_picture.html src="topics/crdt/factorio.webp" text="Avid Factorio players know: It's faster if you use tools to create tools." %}

## What's happening in this episode

I ended the last episode with a bit of a cliffhanger, by claiming that there is a way to compose small CRDTs into larger CRDTs.
I'd like to tackle this today.
Since I like playing [Factorio](https://factorio.com/), I'm going to use this video game as an analogy for describing _combinators_.
If you already know what these are, you can safely skip over most of this post.

To all others, please don't type “combinators” into Wikipedia.
You'll end up reading about _combinatory logic_ which is cool and topical, but unfortunately entirely unhelpful.

## About composition

A popular misunderstanding is that functional programming is all about functions.
In reality, functional programming is _also_ all about composing those functions.
After all, just a bunch of unrelated functions aren't really cool.

Factorio is a game where you start out wringing resources with your bare hands from the environment and end up designing intricate supply chains for high-tech factories.
It is really a lot like programming.
Why?
Because the goal of the game -- building a rocket -- simply can't be achieved by doing everything manually.
You'll need automation to scale up mining and production.

In order to reach this goal, Factorio offers various _meta-tools_.
For example, you can build a factory (the game calls them _assembling machines_) that takes in ingredients and produces whatever the _recipe_ says.
While in principle, a player can also execute that recipe, this quickly becomes unwieldy.
Instead, you'd manufacture a bunch of assembling machines manually that then do the manufacturing for you.

See the similarity to programming?
Instead of doing every little thing by hand (using assembly), we build _abstractions_ that can build on other, lower-level abstractions.
In this article, we already use many layers of these abstractions, with the interactive JavaScript snippets sitting at the top.

As it turns out, I've already snuck in a few combinators in the past episodes, but without explaining them.
fast-check also allows us to take basic generators and compose them into larger generators.
The following example shows that in action:
we have a basic generator (“hexadecimal string up to length 5”) and feed it into a _combinator_ (“an array up to length 3”).

```
sample(
  fc.array(fc.hexaString(5), 3)
);
```

Cool, huh?
In this example, `fc.array` is a combinator, because it transforms a generator for elements into a generator for arrays of those elements.
How it does that is entirely irrelevant; what matters is that it provides us with a nice and clean abstraction boundary.

Of course it is possible to nest this:

```
sample(
  fc.array(fc.array(fc.hexaString(5), 2), 2)
);
```

This is similar in Factorio.
You can set up a factory that takes in some base resources and produces some kind of product.
Naturally, a factory itself can also be produced by another factory, since it itself is just made out of some base resources.
A factory doesn't really care what it's producing, as long as it's got the recipe and sufficiently many resources.
And it's guaranteed that the output will always be of the specified type.
No exceptions (pun intended)!
Unless you have no resources, in which case the factory grinds to a halt.
This would be comparable to an out-of-memory-error in programming.

## About abstractions

But not all abstractions are created equal.
There's much talk in programming about abstractions that are leaky, or ill-defined, or introduce performance penalties, or ...
This is not what I'm going to talk about here.
You may have guessed it:
We'll focus on _mathematical_ abstractions.
Those have a clear definition and provably satisfy a set of properties.

In fast-check, the guarantee is driven by the types.
We can't see them in JavaScript, but they're there.
A generator will always produce a sequence of objects that are of a particular type.
For example, the `fc.array` combinator always produces arrays.

Other mathematical abstractions we've seen so far are partial orderings and lattices.
Their contracts specify precisely what you can expect them to do.

We can take all of this to the next level by talking about instantiating an abstraction for data structures that are themselves abstract.
For example, we can look at how to implement a lattice for a `Map` with arbitrary key and value types.

As a concrete example, recall the distributed counter from the previous episode.
To rehash:
every participant keeps a key-value map, mapping unique participant identifier to a positive integer.
To increment the counter, a participant increases their own integer.
Merging happens by looking at two maps and taking the maximum for each key.

The data structure involved here is, in TypeScript notation, a `Map<string, number>`.
This is a _concrete_ type, because we know all involved types: `Map`, `string` and `number`.

Let's try to implement the lattice for this concrete type first, and then think about generalizing it.
The following snippet will do three things:

1. Define a merging operation for maps
2. Check it on a concrete example
3. Check the lattice contract

```
function maxNumber(x, y) {
  if (x <= y)
    return y;
  return x;
}

function mergeMaps(map1, map2) {
  const result = new Map(map1.entries());
  for (const [key, value] of map2.entries()) {
    if (result.has(key))
      result.set(key, maxNumber(result.get(key), value));
    else
      result.set(key, value);
  }
  return result;
}

assert.deepEqual(
  mergeMaps(
    new Map([["alice", 1], ["bob", 0], ["claire", 2]]),
    new Map([["alice", 0], ["bob", 1], ["dave", 4]])
  ),
  new Map([["alice", 1], ["bob", 1], ["claire", 2], ["dave", 4]])
);

const smallStringGen = fc.hexaString(3);
const smallMapGen = fc.set(fc.tuple(smallStringGen, fc.nat(5)), 5).map(elems => new Map(elems));

checkAll(contracts.lattice({ join: mergeMaps }, smallMapGen));
```

That appears to have worked.

## Into the abstract

{% include float_picture.html src="topics/crdt/worthless.jpg" text="Concrete types are pretty much worthless" %}

Now look _very_ carefully at the existing implementation.
What parts are specific to strings and numbers?

The answer is: none of them.
Here's the exhaustive list of operations we perform on the keys and values:

1. we compute the maximum of two values

That's it.
That's the entire story.

In order to compute the `join` of two maps, we merely need to know how to compute the `join` of the values.
We only look at the keys for checking if they're present in both maps, but otherwise, we have to know nothing.

Taken further, this means that the concrete types in the map serve no purpose.
They are entirely useless.
We only need a tiny bit of structure on the values (namely, their lattice) in order to build the lattice for the whole map.

This has a ton of advantages.
Unfortunately, they're invisible in JavaScript.
In a type system, we could deduce a great deal of what's going on inside functions just by looking at their types.
But I digress.[^footnote-parametricity]

Let's finally take a look at the generic lattice implementation for maps.
As usual, I'm monkey-patching the merge function onto the Map prototype:

```
{% include topics/crdt/lib-map-merge.js %}
const map1 = new Map([["alice", 1], ["bob", 0], ["claire", 2]]);

const map2 = new Map([["alice", 0], ["bob", 1], ["dave", 4]]);

const merged = map1.merge(map2, (x, y) => x >= y ? x : y);

assert.deepEqual(
  merged,
  new Map([["alice", 1], ["bob", 1], ["claire", 2], ["dave", 4]])
);
```

This is pretty much what we had before, but additionally, we have to specify a function for merging the values of the map.
Finally, we're left to define the lattice:

```
{% include topics/crdt/lib-map-lattice.js %}
```

I've also added an `any` lattice that's just based on `<=` for JavaScript built-ins, like `number`s.

Let's check the contract:

```
const smallStringGen = fc.hexaString(3);
const smallMapGen = fc.set(fc.tuple(smallStringGen, fc.nat(5)), 5).map(elems => new Map(elems));

checkAll(
  contracts.lattice(lattices.map(lattices.any), smallMapGen)
);
```

Nothing in our definitions above is specific to any concrete type.
We can reuse this code for other purposes and types.
I have one more mind-blowing concrete example for this, but before we go into that, let's revisit those G-Counters from last episode.

## Grow-only counters revisited

I've already told you that a G-Counter is a CRDT.
But why is that?

In their 2011 paper, [Shapiro et al.](https://hal.inria.fr/inria-00555588/) define a particular kind of CRDTs, so-called _State-based CRDTs_, as datatypes that:

1. have a join-semilattice
2. only support _monotonic_ operations

We've already seen both components in isolation, and G-Counter show their interaction.

Let's first see the lattice.
It can be constructed as follows:

```
lattices.map(lattices.any)
```

This is a structure that needs to be known by the system infrastructure.
When two nodes communicate and update their respective states, they use the `join` operation from the lattice to merge them together.

But this only works nicely if the application developers only manipulate the state in a monotonic fashion.
For G-Counters, it means that nobody ever decreases a counter.

Formally speaking, the guarantee that would be violated in case of a non-monotonic update is _convergence_.
The paper explains this in very clear terms:

> Any two object replicas of a CvRDT [State-based CRDT] eventually converge, assuming the system transmits payload infinitely often between pairs of replicas over eventually-reliable point-to-point channels.

Meaning: you play by the rules, you get convergence.

## References

* Factorio Gameplay on [gfycat](https://gfycat.com/charmingbarrencow)

[^footnote-parametricity]: I've [written elsewhere](/talks/parametrizitaet/) about this subject. Unfortunately, this is in German, but by typing “parametricity” into your favourite search engine, you may find some further material.
