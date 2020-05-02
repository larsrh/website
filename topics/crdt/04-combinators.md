---
title: "CRDTs: Part 4"
subtitle: "Part 4: Combinators"
progress: 30
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

## About abstractions

But not all abstractions are created equal.
There's much talk in programming about abstractions that are leaky, or ill-defined, or introduce performance penalties, or ...
This is not what I'm going to talk about here.
You may have guessed it:
We'll focus on _mathematical_ abstractions.
Those have a clear definition and provably satisfy a set of properties.

The contracts we've seen so far (partial ordering, lattice) are such mathematical abstractions.
We can take this to the next level by talking about implementing a lattice for data structures that are themselves abstract.

In the previous part, I explained how to define a distributed counter.
To rehash:
every participant keeps a key-value map, mapping unique participant identifier to a positive integer.
To increment the counter, a participant increases their own integer.
Merging happens by looking at two maps and taking the maximum for each key.

The data structure involved here is, in TypeScript notation, a `Map<string, number>`.
This is a _concrete_ type, because we know all involved types: `Map`, `string` and `number`.

## Maps and sets

Before we proceed, let's first convince ourselves that this implementation actually satisfies the lattice laws.

```
function maxNumber(x, y) {
  if (x < y)
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

const gcounterLattice = {
  join: mergeMaps
};

const smallStringGen = fc.hexaString(3);
const smallMapGen = fc.set(fc.tuple(smallStringGen, fc.nat(5)), 5).map(elems => new Map(elems));

checkAll(contracts.lattice(gcounterLattice, smallMapGen));
```

## References

* Factorio Gameplay on [gfycat](https://gfycat.com/charmingbarrencow)
