---
title: "Why is it so hard to reuse formally verified code?"
subtitle: "Transcript of a tweetcast"
pub_date: 2021-03-16
lang: en
---

Log starts at March 15, 2021, 7:51 PM CET.
Slightly edited for improved legibility.

<hr>

**Hillel, [7:51](https://twitter.com/hillelogram/status/1371534590008029187):** So Lars and I want to try something new: a COLLABORATIVE tweetstorm. The topic? Why it's so hard to reuse formally verified code. They're an expert in verifying code with Isabelle, I use TLA+. Together, we can attack the question from different angles. Take it away, Lars!

**Lars, [7:53](https://twitter.com/larsr_h/status/1371535077952327683):** In software engineering, we have largely figured out modularization. All modern programming languages have some form of module system. You can pull in a module and import its functions anywhere.

**[7:54](https://twitter.com/larsr_h/status/1371535318986452997):** Sometimes the interface isn't quite what you'd like, but that's alright. You can just convert from arrays to lists or the other way round. In untyped languages it's often even easier than that.

**[7:55](https://twitter.com/larsr_h/status/1371535553125089283):** But for proofs that's very hard! There can always be spooky actions at a distance 👻

**[7:58](https://twitter.com/larsr_h/status/1371536354140692481):** For example: you have proved correctness of a sorting algorithm. You want to throw some input data that should be sorted by some key. Suddenly you might need [stability](https://en.wikipedia.org/wiki/Category:Stable_sorts)!

**[7:59](https://twitter.com/larsr_h/status/1371536640515190790):** But the verified sorting function you're using doesn't have a proof of stability. What do you do now? The problem here is that for specs your "module boundaries" are a lot richer than just a few collection and object types.

**Hillel, [8:04](https://twitter.com/hillelogram/status/1371537891772542982):** I find that interesting: it sounds like the major issue here is that you've proved a fixed specification, but people often need slight variations, any of which can break the proof. I wonder if “perturbations” can make the entire proof *approach* invalid, too.

**[8:07](https://twitter.com/hillelogram/status/1371538647535747084):** Basically, small changes in the specification don't necessarily mean small changes in the proof, even if it means small changes in the implementation. You're trying to optimize two values instead of one, and both conflict.

**[8:08](https://twitter.com/hillelogram/status/1371538848342282246):** I also think it's interesting that the core problem with composing specifications is slightly different, what some people call the “frame problem.” I thought I first heard it from one of Michael Jackson (not the singer)'s books, but I checked and he doesn't mention it.

**[8:10](https://twitter.com/hillelogram/status/1371539249103798276):** Roughly speaking: imagine we describe systems X and Y independently, and now want to combine their specs. The spec for X says nothing about how Y changes, so *any* behavior of Y is valid by spec X, including nonsensical ones. You can't write `X & Y`, you write `X & Y & XandY`

**[8:11](https://twitter.com/hillelogram/status/1371539551727013893):** It gets worse if the two specifications have overlapping variables, like a reader and a writer. If the reader describes popping from the queue, then the writer violates that spec by adding to the queue, so you need to stitch them together manually.

**Lars, [8:12](https://twitter.com/larsr_h/status/1371539926748119049):** Let me give an example for “perturbing the spec invalidates the proof”. It's something I encountered in a real-world spec a few months ago. There's two things you need to know about Isabelle to understand the problem:

**[8:13](https://twitter.com/larsr_h/status/1371540132055093251):** 1. You can have “underspecified values”. You don't know anything about them. You can't prove anything about them. But you can use them. If you try to run some code containing such values, it'll get stuck.

<details markdown="1">
  <summary>Side note on underspecification</summary>
**Hillel, [8:15](https://twitter.com/hillelogram/status/1371540589104218116):** Wait I wanna hear more about this (in a tweet branch, maybe). So like is it there to make incremental proving easier? You underspecify the values, prove some stuff, then specify then and prove more stuff?

**Lars, [8:26](https://twitter.com/larsr_h/status/1371543409882755079):** Continuing this branch: Why are there underspecified values in Isabelle (well, Isabelle/HOL, to be precise). There's two answers to this.

**[8:26](https://twitter.com/larsr_h/status/1371543412684554245):** a) HOL (Higher-Order Logic) uses ML-ish types. It does not allow for types to be empty. So clearly, it's fine to assume that for every possible type you have at least one value you can pull out of thin air.

**[8:26](https://twitter.com/larsr_h/status/1371543414819463169):** b) It's convenient. Sometimes you just don't care about the precise value you pick. Since there are no “exceptions” in HOL, this is how you define e.g. incomplete pattern matches.

    head (x :: xs) = x
    head [] = whatever don't care

**[8:28](https://twitter.com/larsr_h/status/1371543893561446402):** On many occasions we can get away with unspecified functions, instead of using an option type: using options means using bind or pattern matches everywhere, which means endless case distinctions in proofs … blegh.

**[8:29](https://twitter.com/larsr_h/status/1371544091570372617):** The difference between Isabelle and a programming language like Scala is that in Isabelle I prove that my handling of undefined values is accurate. I can't do that in Scala without going the extra mile of Option.

**Hillel, [8:32](https://twitter.com/hillelogram/status/1371544804182609923):** Ah, that makes sense, thank you for explaining!
</details>

**Lars, [8:14](https://twitter.com/larsr_h/status/1371540353115885576):** 2. Sets in Isabelle are mathematical, which means that they can be infinite, they have no duplicates, they are not concerned with low-level things like hashes and so on …

**[8:15](https://twitter.com/larsr_h/status/1371540532393078790):** What I was trying to do: computing the sum of some numbers in a set. It worked fine for unbounded natural numbers. I wanted to change it to be bounded numbers (let's say below 2<sup>32</sup>). Suddenly everything broke. Why?

<details markdown="1">
  <summary>Side note on broken sorting algorithms</summary>
**Hillel, [8:19](https://twitter.com/hillelogram/status/1371541555283161093):** [This has been a problem before!](https://ai.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html)
</details>

**Lars, [8:16](https://twitter.com/larsr_h/status/1371540837725843457):** For the sum of a set to be well-defined, this is what you need:
* the set must be finite
* you must have a 0
* the addition operation must be commutative and associative (an abelian group)

**[8:17](https://twitter.com/larsr_h/status/1371540990494933000):** BUT ADDITION OF BOUNDED NATURALS IS NOT ASSOCIATIVE BECAUSE OF UNDERSPECIFICATION! BOOYAH, SUCKER! NO UPPER BOUNDS FOR YOU![^q-ub]

**Hillel, [8:22](https://twitter.com/hillelogram/status/1371542403467862018):** This affects real languages. In C++, `(-1 + INT_MAX)) + 1 == INT_MAX`, but `-1 + (INT_MAX + 1)` is undefined. Proofs about “machine types” are much harder than proofs about “mathematical types”.

<details markdown="1">
  <summary>Side note on C++ verification</summary>
**Lars, [8:33](https://twitter.com/larsr_h/status/1371544997347127297):** In C++ all that stuff is undefined but many programmers still rely on it overflowing! And then they get upset when other languages like ML throw an exception on overflow 😉

**Hillel, [8:36](https://twitter.com/hillelogram/status/1371545939920441350):** I've never tried to verify C++ code, but I imagine it's *hell*. Your proof has to either *never* invoke undefined or unspecified defined behavior, or show that any invoked unspecified behavior satisfies the spec for a set of given compilers.

**[8:36](https://twitter.com/hillelogram/status/1371545942005014529):** (Undefined and unspecified are different. The former is "the implementation can do anything", the latter is "the implementation is decided by the compiler, but must be consistent in all cases.)
</details>

**Hillel, [8:24](https://twitter.com/hillelogram/status/1371542907606478849):** So different assumptions of basic things, like “are numbers associative”, break proofs. But they also break *composing proofs*. All specifications have preconditions: “this proof only holds if X is true”. For example, a precondition of `list.delete_at(x)` might be `x < len(list)`

**[8:26](https://twitter.com/hillelogram/status/1371543364231966720):** But because specifications need to be adapted to the slight variations in requirements, spec A's output might not satisfy spec B's preconditions … or satisfy them, but not in a “known” way.

One purely contrived example:

**[8:29](https://twitter.com/hillelogram/status/1371544161099341824):** `list.delete_at(f(x) % len(list))`. Does that satisfy the preconditions?

Not necessarily! Did we remember to prove that `len(list) ≥ 0`? Because `-1 % -3 == -1`.

“But obviously len(list) returns a positive number!” Sure, but did you *prove* it?

**Lars, [8:34](https://twitter.com/larsr_h/status/1371545338784456709):** Let me give another example. When we prove things about real imperative programs from The Trenches™, we often employ a tool called “separation logic”.

<details markdown="1">
  <summary>Side note on imperative programs</summary>
**Hillel, [8:38](https://twitter.com/hillelogram/status/1371546453559144451):** (Why do “The Trenches™” use imperative programs? Because most of the industry money in formal verification, small as it is, in realtime, embedded, or mission critical systems. All places where imperative dominates. I call it “fiddly bits”.)

**Lars, [8:44](https://twitter.com/larsr_h/status/1371547922307944460):** Also a lot of (industrial) research effort goes into this. Microsoft Research (and others) developed a [tool for automated analysis of device drivers](https://link.springer.com/chapter/10.1007/11817963_37).

**[8:46](https://twitter.com/larsr_h/status/1371548255713161221):** Isabelle also has a lot of tooling support for dealing with imperative programs, including C. This works both ways: starting with a spec and producing an imperative program, or importing an existing program and proving things about it.

**[8:46](https://twitter.com/larsr_h/status/1371548407052009476):** I know a lot more about the first direction (it's called “refinement”), but that's probably best discussed in a dedicated post.
</details>

**Lars, [8:35](https://twitter.com/larsr_h/status/1371545656767123457):** Separation logic allows us to prove things about segments of the heap. We do this because heaps are horrible to reason about. Let's say you pass a pointer to someone else. What are they going to do with it? Is it going to affect you? WHO KNOWS

**[8:36](https://twitter.com/larsr_h/status/1371545878226423818):** In separation logic you structure your proofs to have segments of the heap that do not intermingle. Sometimes you explicitly pass ownership around. (think: Rust's borrow checker)

<details markdown="1">
  <summary>Side note on the borrow checker</summary>
**Hillel, [8:40](https://twitter.com/hillelogram/status/1371546898511855616):** [https://twitter.com/hillelogram/status/1371546898511855616](https://semantic-domain.blogspot.com/2018/04/are-functional-programs-easier-to.html)
</details>

**Lars, [8:38](https://twitter.com/larsr_h/status/1371546270075121666):** For your program to do anything cool it can't just manipulate it's own heap, it suddenly needs to use an FFI or call the OS or whatever. The only thing you can do here is to … assume as an axiom that the function call doesn't modify your state.

**[8:39](https://twitter.com/larsr_h/status/1371546579249807364):** But these functions do! Like `fopen` or `strtok`! If you call your own functions in between your existing proofs will know jack shit about these external functions. For all your proof checker knows both domains could interact funnily.

**Hillel, [8:48](https://twitter.com/hillelogram/status/1371548874200989702):** Wait, `strtok` affects the state?

**Lars, [8:50](https://twitter.com/larsr_h/status/1371549302464651265):** When you want to tokenize a string, you call it with the string and the delimiter. It gives you the first token.

For all remaining tokens, you keep calling it, but provide NULL as the string. It stores the last non-NULL string passed to it internally.

**[8:50](https://twitter.com/larsr_h/status/1371549463655952387):** Good luck adding to your proofs that none of your other functions call strtok!

**Hillel, [8:53](https://twitter.com/hillelogram/status/1371550043304562693):** wut.

**[8:55](https://twitter.com/hillelogram/status/1371550616036777985):** Okay that's actually a good launching point to talk about side effects. We can represent side effects as inclusions into the programs state. IE if a program writes a file, then the filesystem is part of the program's “state”. Entangled state = more difficulties composing

**[8:58](https://twitter.com/hillelogram/status/1371551388757585927):** Let's go back to the frame problem. Cribbing from temporal logic, here's two specs of “Blinkers”. All they do is flip a flag between true and false. `x'` means “x in the next state”.

X ≡ x' = ¬x
Y ≡ y' = ¬y

How do we compose these

**[8:59](https://twitter.com/hillelogram/status/1371551577463472130):** If I write `X & Y`, then I'm saying the two must always blink in sync: one can't go faster than the other. That's probably not what I want.

If I write `X | Y`, then I'm saying only one of those needs to be true each step. X is true, or Y is true, or both are true.

**[9:01](https://twitter.com/hillelogram/status/1371552140452372484):** But that means the following behavior satisfies `X | Y`:

    (x = T, y = T), (x = F, y = “cinnamon”)

    x' = ¬x & y' = “cinnamon” ⇒ X & ¬Y ⇒ X | Y!

The actual correct “composition” is something like `(X & Y) | (X & y' = y) | (Y & x' = x)`

**[9:06](https://twitter.com/hillelogram/status/1371553360923463689):** … now imagine that we change it to

    X ≡ x' = ¬x & z' = z + 1
    Y ≡ y' = ¬y & z' = z - 1

So they share some state. We can't write `(X & Y)` anymore, since we can't have both `z' = z + 1` and `z' = z - 1`.

But worse, there are now properties of X that are NOT properties of XY

<details markdown="1">
  <summary>Side note on the modular arithmetic</summary>
**Lars, [9:10](https://twitter.com/larsr_h/status/1371554463681495045):** unless z is in the range {0,1} with modular arithmetic 
😉

**Hillel, [10:16 the next day](https://twitter.com/hillelogram/status/1371933451885150210):** UNLESS
</details>

**Hillel, [9:07](https://twitter.com/hillelogram/status/1371553599977885697):** In X, the parity of z matches the parity of x. If x is true, then z is even (modulo starting conditions). That's NOT true for `(X & y'=y) /\ (Y & x'=x)`. The more world-state you add, the fewer properties of world-state are preserved under spec composition.

**Lars, [9:13](https://twitter.com/larsr_h/status/1371555296548696079):** I guess another way to phrase this is that when proving things, not only do you have to prove that good things happen, but also that bad things do not happen.

**[9:15](https://twitter.com/larsr_h/status/1371555631442825217):** When unit testing your software, a common issue is to only write test cases for the happy path. Arguably it is just as important to write tests for all sorts of failure modes too. But for humans those are harder to envision.

**[9:16](https://twitter.com/larsr_h/status/1371555864004399113):** But there's also a tooling problem. Robust module barriers in programming language abstract away the heap from you, which means that you often cannot write tests that check that some other thing is unaffected by your actions.

**[9:16](https://twitter.com/larsr_h/status/1371556032770678785):** To draw a comparison with real-world code: while HTTP demands that GET is idempotent, you have no way of definitely testing that

**[9:21](https://twitter.com/larsr_h/status/1371557300201226246):** It gets worse when concurrent processes are involved. Suddenly you need to prove that for every possible execution trace some invariants are preserved. This is the definition of anti-modular.

**Hillel, [9:22](https://twitter.com/hillelogram/status/1371557524927823873):** \*shakes fist\* TIIIIIIIIIIIIIIIME

**[9:22](https://twitter.com/hillelogram/status/1371557558410940419):** Time SUCKS and I HATE IT

**[9:25](https://twitter.com/hillelogram/status/1371558066995482624):** Okay, so time already makes specification hard. In a linear, deterministic spec, there's only one “world-line” you have to worry about. Maybe multiple starting states, but a linear progression from each. With concurrency, the world-line becomes a world-tree

**[9:26](https://twitter.com/hillelogram/status/1371558385510883331):** That's already pretty bad, combinatorally. World-tree means more to check, more ways things can go wrong. But there's a different problem with time and spec composition:

*Which time* are we talking about?

**[9:28](https://twitter.com/hillelogram/status/1371558829708693507):** Even in concurrency specs, we can assume there is one “clock”, or time stream or whatever. While time is an abstract progression of states, it's still a singular model of progression, even if there are many possible things that can happen. Composition throws that out the window.

<details markdown="1">
  <summary>Side note on linearization</summary>
**Lars, [9:33](https://twitter.com/larsr_h/status/1371560089404968962):** Even that simple model is not always accurate, since many things in your stack, including the CPU or a compiler, can reorder things however they see fit, as long as it does not interfere with the memory model.
</details>

**Hillel, [9:29](https://twitter.com/hillelogram/status/1371559252024827907):** Consider composing, I don't know, a specification of a CPU with that of an HTTP client. They both can be independently specified, but for one, each time step represents tens or hundreds of milliseconds, while in the other each step represents nanoseconds.

**[9:31](https://twitter.com/hillelogram/status/1371559815500197893):** So the composition needs to explicitly say that one is much, *much* faster than the other, or you suddenly have 6 HTTP calls between each CPU instruction.

And that's not even getting into sync vs async. There are many decisions you have to make to compose time

**Lars, [9:37](https://twitter.com/larsr_h/status/1371561131622461441):** … and with that, we'll wrap it up. I hope you had as much fun reading this as we had writing. To end this on a positive note: the problems we mentioned aren't insurmountable; they're just hard. Lots of ongoing research strives to make them easier.

Thanks for tuning in!

<hr>

Log ends at March 15, 2021, 9:37 PM CET.
All mistakes are mine.
Tip of the hat to [Michael R](https://twitter.com/alanmynah/status/1371566002417307649) for calling it a “tweetcast”.
Thanks to Hillel for the collaboration!

[^q-ub]: [Follow-up Q&A thread on addition on bounded naturals](https://twitter.com/cr1901/status/1371552526064029697)
