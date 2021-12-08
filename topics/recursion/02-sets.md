---
title: "Recursion: Part 2"
subtitle: "Part 2: Set theory"
---

## What's happening in this episode

We will learn about how sets work.
Even though that sounds simple, it is actually a very complicated topic.
And I will prove that to you.
My mathematics teacher in grade 9 posed a problem that – at the time – I didn't understand (as opposed to most of my classmates).

{% include float_picture.html src="topics/recursion/soldier.jpg" text="An actual photo of my notes from grade 9 mathematics, specifying the “soldier problem” in German." %}

> A soldier in a barracks is given the following instruction:
> “Shave all the soldiers in the barracks that do not shave themselves, and only those!”
> Does this instruction describe a _set_?

But before looking at the problem, our teacher recounted the definition of a “set” based on Georg Cantor's work from the 19th century (in German and [in English](https://archive.org/details/contributionstof00cant)):

> <span lang="de">Eine Menge ist eine Zusammenfassung bestimmter, wohlunterschiedener Objekte unserer Anschauung oder unseres Denkens zu einem Ganzen. Diese Objekte heißen Elemente der Menge.</span>
>
> An “aggregate” (or set) is any collection into a whole of definite and separate objects of our intuition or our thought.
> These objects are called the elements of the set.

Whimsical, no?
But back to the problem at hand.
What about the set of to-be-shaved soldiers?
Is that even a set?
At the time I thought the answer would be “yes”.

What do you think?
I'll wait.

## Russell's paradox

The correct answer is “no”.
Here's the kicker:
Let _S_ be the soldier that has been given the instruction.
Does _S_ shave themself?

* If yes, then – according to the instructions – _S_ should not be shaving _S_, because they are shaving themself.
* If no, then _S_ should be shaving _S_, because they are not shaving themself.

Bertrand Russell pointed out this problem in 1901, although it was formulated a bit more abstractly:

{% include float_picture.html src="topics/recursion/is-this-a-set.jpg" text="Is this a set?" %}

> Let _R_ be the set of all sets that are not members of themselves.
> If _R_ is an element of _R_, then _R_ is not an element of _R_ and vice versa.

This has made a lot of people very angry and been widely regarded as a bad move.

Now, I don't want to re-tell the entire story of the _Grundlagenkrise_ (literally: “foundational crisis of mathematics”) here,[^footnote-logicomix]
but suffice it to say, you can't just “define” a set by using any string of words.

## Now what?

{% include float_picture.html src="topics/recursion/antimony.jpg" text="Russell discovered an antinomy, not antimony. Big difference." %}

The core problem of Russell's paradox (or “antinomy”, if you want to sound fancy) lies within _self-reference._
We are attempting to define a set by the properties of its elements.
Normally, this isn't a problem:
you wouldn't want to define the set of even numbers by listing all of them.
Instead, you'd say something like “the subset of natural numbers that are divisible by two”.
In mathematics, we call such a definition _intensional._
The opposite of that is an _extensional_ definition such as {1, 3, 5, 7, …}.[^footnote-infinity]

In “naive” set theory, any property is allowed to form a set.
Let _S_ be a set that is defined by a property _P_ that is true for any object that should be in _S_.
Formally speaking, we say that for all _x_, _x_ ∈ _S_ if and only if _P_(_x_) holds.
The ∈ here stands for “member of set”.
Russell now made it so that _P_ itself refers to _S_.

The second part of the paradox is that once you obtain a contradiction, you can infer anything.
Virtually all flavours of mathematical logics feature this principle, which is referred to as _principle of explosion_ (or _ex falso quodlibet_ in Latin).
This reasoning principle is a bit unusual in day-to-day-life, so I'm going to give you an example:

> If the moon is made out of cheese, you should not get vaccinated against COVID-19.

A logician would accept this sentence as true, even though the consequent is false (you should get vaccinated).
Why?
Because the only way to falsify the sentence is to prove that the antecedent (“the moon is made out of cheese”) is true and well, you can't do that.
Anything follows from a false statement.

In full consequence, Russell's paradox leads to the collapse of the entirety of naive set theory.
Just because it is possible to construct a malformed set, you could prove literally any proposition.

{% include float_picture.html src="topics/recursion/zfc.jpg" text="John Oliver doing a segment on classical ZFC set theory" %}

A few remedies have been proposed to solve this issue.
The majority of contemporary mathematics now operates under a particular axiomatic scheme called _Zermelo–Fraenkel set theory_, or _ZF_ for short.
Many mathematicians also throw in another axiom for good measure (the Axiom of Choice, but that's not relevant here, together called _ZFC_).

## How are sets formed?

An axiomatic system such as ZF comprises a set of axioms that allow you to construct sets.
Each axiom is kind of like a tool in a toolbox.
You are allowed to combine them in an arbitrary fashion to build sets from smaller components.
For example, the _Axiom of the empty set_ states that there is a set such that nothing is an element of that set.[^footnote-empty]
We usually call that set the _empty set_, or ∅.

Additionally, ZF includes the _Axiom of extensionality_ which we can use to prove equality of two given sets _A_ and _B_.
Perhaps unsurprisingly, they are equal if and only if for any object, that object is either both a member of _A_ and _B_ or neither a member of _A_ and _B_.
But note that “object” in that sentence can refer to a set itself.
If you break down ZF and look at it from a distance, there is only the empty set, sets containing the empty set, and arbitrary combinations thereof.

This means that literally anything in mathematics has to be constructed using those primitive means.
It is perfectly fine to have a set such as {∅, {∅}, {∅, {∅}}} or – equivalently – {% raw %}{{}, {{}}, {{}, {{}}}}{% endraw %}.
_There is nothing else._
It's sets all the way down.[^footnote-ur]

One thing that ZF doesn't allow you to do is to just define a set intensionally using any predicate.
Instead, you can define a subset of a given set.
This is called the _axiom schema of specification._

But hold up!
How can you do anything with that?
Is it even possible to define infinite sets?

## How are numbers formed?

I'm glad you asked.
Strap in, it's gonna get formal!

ZF has an _Axiom of infinity,_ which postulates exactly what it says on the tin.
It states that there is a set, let's call it _BC_ for “Big Chungus”, that satisfies the following two laws:

1. Big Chungus contains the empty set (formally: ∅ ∈ _BC_)
2. for all elements _x_ of Big Chungus, Big Chungus also contains the union of _x_ and {_x_} (formally: _x_ ∈ _BC_ implies that _x_ ∪ {_x_} ∈ _BC_)

Let's unpack this, because it's a lot.
First of all, the _union_ of two sets is a set that contains the elements of both sets.
It is written with the symbol ∪.
For example, computing the union of {_a_, _b_} and {_b_, _c_} results in {_a_, _b_, _c_}.[^footnote-union]
The union of any set with the empty set is the set itself:
we say that the empty set is neutral with respect to the union operation.

Now let's look at the elements of _BC_.
We're going to use a convention to name them.
Please ensure that you're sitting comfortably, because the naming convention might be a shock to you.

Let us call the empty set, also known as ∅ and {}, 0.
Yes, zero.
Like the natural number.
Equipped with this scientific notation, we can assert that 0 ∈ _BC_ by the first law of Big Chungus.

Now, let us name another set.
Completely randomly I'm proposing the set {0}, also known as {∅} and {% raw %}{{}}{% endraw %}.
And the name of that set?
1.

Let's prove that 1 is also an element of _BC_, by virtue of the second law of Big Chungus.
We know for a fact that 0 is an element of _BC_.
Consequently, 0 ∪ {0} is also an element of _BC_.
We can simplify 0 ∪ {0} as follows:

0 ∪ {0} = {} ∪ {% raw %}{{}}{% endraw %} = {% raw %}{{}}{% endraw %} = 1

Cool, we already have two numbers.
That's so many numbers!
But what about _two_?
Can we have a third number?

Sure.
By now, you may have gotten an idea.
Let's define 2 as the union of 1 with {1}.
This will result in _\*checks notes\*_ the set {% raw %}{{}, {{}}}{% endraw %}.

Do you see where this is going?
Big Chungus, our primordial infinite set, is axiomatized in a such a way that it can be thought of to contain the natural numbers.
For any given already-constructed natural number _n_, it's successor _n_ + 1 is constructed as _n_ ∪ {_n_}.

An alternative way of imagining this set is that each natural number _n_ is the set of all its predecessors.
Feel free to check that (or just believe me):

* 1 = {0}
* 2 = {0, 1}
* 3 = {0, 1, 2}
* ... and so on

ZF conveniently declares that Big Chungus exists,[^footnote-fiat] so, based on a clever naming scheme, we can define the natural numbers that we know and love.

When I told my good friend [Manuel from Austria](http://pruvisto.org/) about this, he commented:

> Set theory is just wrong.
> “Is 42 an element of 47,” statements dreamt up by the utterly deranged

## Nonstandard numbers

{% include float_picture.html src="topics/recursion/chainsaw.jpg" text="A logger, presumably getting rid of nonstandard trees" %}

However, Big Chungus is a little too big.
It might contain things that are not actually natural numbers.
See, the axiom of infinity merely states that _BC_ should contain _at least_ the above-mentioned elements.
But it does not rule out that there are additional elements.
For example, the set {1} could be contained in _BC_, but there is no room for that set in our list of natural numbers.
We do not want those weirdos in our cool set of natural numbers.

There are a few ways to get rid of them.
The one that I like the most – because it also applies to other kinds of sets that we might want to define – is to build the “smallest” version of _BC_.
We do that by taking only the elements of _BC_ that also appear in _any other set that follows the two laws._
In other words, we look at all the sets that are sort of like _BC_ and compute their intersection, arriving at just the natural numbers.
In order for that to work, we need to know that _BC_ actually exists, which is guaranteed by the axiom of infinity.

{% include float_picture.html src="topics/recursion/work.jpg" text="A logger, presumably getting rid of nonstandard trees" %}

What a trip, right?
Mathematicians work _really hard_ to provide you with natural numbers.
Ever thought about that?
No, because all you ever think about is yourself.

In a later part of this series, I will give a more detailed explanation of just how this “smallest” inductive construction works.
Quick spoiler: _least fixed points,_ a concept that Bronisław Knaster and Alfred Tarski came up with in 1928 while looking at a particularly sophisticated lattice in the suburbs of Kraków.

## Conclusion

I want to note one more thing about the construction of natural numbers.
If we slightly tweak the definition of _BC_ and also restrict it to be the smallest possible set, it looks as follows:

The set of natural numbers ℕ is defined to be the smallest set such that:

1. 0 ∈ ℕ
2. for all _n_ ∈ ℕ, s(_n_) ∈ ℕ

s stands for the successor construction as we have seen above, i.e., s(_n_) = _n_ ∪ {_n_}.
We use a dedicated symbol to not confuse it with addition (which isn't defined yet).

Does the definition above look vaguely familiar?
Maybe it becomes familiar if I tell you about the following proof principle:

If you want to prove that a property _P_ holds for all natural numbers, then you have to prove that

1. _P_ holds for 0 (formally: _P_(0)), and
2. if _P_ holds for _n_, it must hold for the successor of _n_ (formally: for all _n_ ∈ ℕ, _P_(_n_) must imply _P_(s(_n_))).

You'd think that this is the principle of induction over natural numbers, and you'd be right.
This is why we call the above definition of ℕ the _inductive_ definition.
In order for the definition to work, we need to do all the heavy lifting described earlier, but once we've done it, the induction principle just falls out of it.

Now, I promise you that all of this is connected to recursion.
But it'll take a few more episodes to get to the bottom of that.

## What's next?

The next episode has yet to be written!
Presumably, it will be about getting to work on those natural numbers.

## References

* Chainsaw by Benjamin Jopen on [Unsplash](https://unsplash.com/photos/dQcj0H8BcmU)
* Antimony on [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Antimony-4.jpg&oldid=607212952), CC-BY 3.0

[^footnote-logicomix]: If you're interested in that kind of thing, I can recommend – despite its flaws – [the graphic novel _Logicomix_](http://www.logicomix.com/).
[^footnote-infinity]: Clearly, extensional definitions of infinite sets are hard to write out.
[^footnote-empty]: Actually, this isn't even an axiom, since it can be deduced from other axioms.
[^footnote-ur]: There is a notion of “urelement” which is an object that is not itself a set, but can be a member of a set. But let's not stray into model theory.
[^footnote-union]: As opposed to labour unions, set unions cannot be busted, since they're axiomatic.
[^footnote-fiat]: Natural numbers are fiat numbers! Wake up, nocoiners!
