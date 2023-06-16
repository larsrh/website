---
title: When testing just doesn't cut it
date: 2023-04-16
lang: en
abstract: |
  Writing tests is common practice these days.
  How else would you ensure that the code does what you expect?
  However, some software is business-critical and simply testing a few examples is not enough.
---

The usual workflow in modern software development does not only include writing code. Developers are also expected to deal with requirements, functional tests, documentation and, in some cases, the operation of the finished software. In general, this is not a bad idea. If these diverse skills are bundled in a powerful team, they can also fully develop new features end-to-end, which significantly increases the speed of development.

Such models, in which there are rapid cycles of requirements, programming and testing, are sometimes regarded as the "gold standard" of development. The "test-driven development" (or "TDD" for short) approach goes even further. It demands that feature tests come before feature implementation. The goal is to develop software that is functioning better. After all, software bugs are not only annoying, but can also cause catastrophic damage.

## Test-driven towards better software?

In the TDD approach, the argument goes as follows:
writing the tests before writing the code forces one to deal with the requirements and the design of the code. This should give the code a more logical structure and at the same time make it more trustworthy, because – by definition – no code can exist without a test.

However, there is a catch. No matter whether you stick to TDD or write the tests at some point, the vast majority of tests are designed around concrete example inputs. _Let's throw the numbers "0", "1", "42" and "-8" into the routine and see what happens._
But what if the error is hidden exactly at the input "-1"? Or what if the inputs have a much more complex structure?

Consider the following practical example. The Java standard library contains a sorting function based on the algorithm "TimSort". Almost all Java software, including Android, uses this routine to sort lists. So you would think that bugs would have been noticed here long ago. Nevertheless, [a research group found a bug](http://www.envisage-project.eu/timsort-specification-and-verification/) that violates a certain assumption in the code and thus provokes a crash.

Granted, "TimSort" is a rather complicated algorithm. But errors can easily creep into simpler algorithms as well, even those that are part of every computer science course. Joshua Bloch, former chief architect for Java at Google, [already wrote in 2006](https://ai.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html) that the simple line

```java
int mid = (low + high) / 2
```

is erroneous, even though it is used for binary search; a procedure that is taught to every computer science student.

Have you spotted the error?

What happens if the sum of the two variables "low" and "high" together exceeds the maximum value for integers? Because of the overflow, the variable "mid" is negative, which again leads to a crash in subsequent array accesses. In C and C++, on the other hand, the behaviour is completely unspecified; that is, the programme could simply continue to run and calculate wrong results without anyone noticing the error.

To find such an error by mere testing, you would have to feed the routine an array that has about a billion elements. But who thinks about such extreme cases? Unfortunately, testing can only ever prove the presence of bugs, but never their absence.

## Beyond testing

Now, one might argue that exciting sorting or searching procedures is rarely necessary in an average software project. Instead, the development team tends to be confronted with less glamorous tasks, such as shovelling data from one corner to another. In other words: In practice, where would such unforeseeable risks arise?

As it turns out, the complexity of even seemingly "boring" software is often drastically underestimated. Especially in distributed or concurrent systems, the state space of all components involved is so high that simple testing is doomed to fail. For example, are you sure that your software will find an answer for every query in finite time? In the popular image processing tool "ImageMagick", an unexpected rounding of floating point numbers [caused certain routines to hang](https://legacy.imagemagick.org/discourse-server/viewtopic.php?t=31506). In modern, event-driven architectures, an "unusual" message sequence may [cause major damage](https://doi.org/10.1145/3503222.3507753).

For this very reason, not only research institutions, but also big tech companies, devote substantial effort to so-called "formal methods". This term denotes a diverse range of tools and approaches with which, in simple terms, the implementation of a software can be examined for errors without relying on concrete or predefined inputs and examples. The state space of programmes can be almost completely covered with these tools.

These tools differ, among other things, in their degree of automation: While so-called "ATPs" (short for "automated theorem provers") show the correctness of an algorithm fully automatically, in "ITPs" (short for "interactive theorem provers") you define the steps yourself. Interpreting formal methods more broadly, a type checker in the compiler can also be classfied as an ATP, because it reliably detects certain error classes without having to execute the programme. The same applies to linting tools.

Another characteristic is whether a tool can work directly on code such as C or Java or uses its own, usually more abstract language.

Programming languages with so-called "refinement types" represent an interesting hybrid approach. Two well-known representatives of this category are "Liquid Haskell", which is based on Haskell syntax, and F\*, a close relative of OCaml and F#. In the latter, for example, one can declare a type that exclusively captures the even natural numbers:

```
let nat = x : int {x \>= 0}
let even = x : nat {x % 2 = 0}
```

We can now very easily write a function adding two even numbers, which provably results in another even number:

```
let add_even (x : even) (y : even) : even = x + y
```

The basic idea here is that instead of just working with coarse-grained basic types, more precise restrictions can be defined via "refinements".
They are written with curly brackets and are interpreted in a similar fashion to "assert" in languages such as C and Java. However, these refinements are not checked at runtime, but at compile time. If one of the two parameters in the above example were annotated with "nat" instead of "even", the type checker would complain and reject the programme.

There is an obvious advantage:
in such a programming environment, it is almost trivial to formulate invariants and other conditions for complex data types, so that invalid states cannot even arise at runtime. If you cannot prove that an invariant is fulfilled, for example because data is only available at runtime, the system forces you to programme a complete validation of the input. Which is a good idea anyway, even if you don't use formal methods.

Hillel Wayne has compiled an instructive comparison of various analysis tools under the motto ["Let's Prove Leftpad"](https://www.hillelwayne.com/post/lpl/).
"Leftpad" is a simple function that takes three parameters: a fill character, a target length and a string. If the string is shorter than the target length, then it is extended from the left with enough copies of the fill character. Example:

```
>> leftpad('!', 5, "foo")
!!foo
```

On Twitter, Wayne asked for contributions proving the correctness of this function with any tool chosen by the participants.
He received a total of 22 solutions.
The Java solution required 17 lines:

```java
//@ requires n >= 0;
//@ requires s != null;
//@ ensures \result.length == Math.max(n, s.length);
//@ ensures \forall int i; i >= 0 && i < Math.max(n - s.length, 0); \result[i] == c;
//@ ensures \forall int i; i >= 0 && i < s.length; \result[Math.max(n - s.length, 0) + i] == s[i];
static char[] leftPad(char c, int n, char[] s) {
    // Implementierung ...
}
```

As you can see, this is ordinary Java code that has been extended with special comments. These comments contain pre- and post-conditions in the ["Java Modeling Language"](https://www.openjml.org/) (in short "JML") format and are ignored by the Java compiler. However, a checker included with the JML suite interprets the comments and tries to prove that the specified conditions are consistent with the implementation.

In the example above, these comments can be interpreted as follows:

* The target length of the string ("n") must not be negative.
* The string must not be "null".
* The return value of the function ("\result") is either a string with the target length, or, if the entered string was already longer, just as long as that.
* The remaining two postconditions specify the content of the return value.

For comparison, the proposed solution in F\* only requires 14 lines. The implementation of the "Leftpad" function is separate from the specification. The latter looks (shortened) as follows:

```
let leftpad_correct (c : char) (n : nat) (s : seq char) =
  assert (length (leftpad c n s) = max n (length s))
```

In contrast to the Java version, the preconditions are unnecessary:
In F\*, references can never be "null".
Also, thanks to the built-in type of natural numbers, negative values are already excluded.

While both tools presented here run fully automatically for "Leftpad", theoretical computer science teaches us Rice's theorem, stating that it is always possible to construct programmes for which this automatism just does not work. Even the mere proof of the termination of a function is not decidable.

But there is a trick: you can also feed a few hints to the automatic tools when they are at a loss. Loops are a notorious problem that many tools struggle with. In the case of the Java implementation of "Leftpad", there is a loop that fills the string from the left:

```java
//@ maintaining i >= 0 && i <= pad;
//@ maintaining \forall int j; j >= 0 && j < i; v[j] == c;
for(; i<pad; i++) v[i] = c;
```

The two comments specify the so-called "loop invariant" for JML; a kind of auxiliary statement that does not yet show final correctness, but is at least valid for the entire life cycle of the loop.
Here, the invariant specifies that the count variable "i" is always between "0" and "pad"; as well as that all positions in the array "v" between "0" and "i" are set to the character "c".

Wayne found that there are a wealth of different tools available for a plethora of programming languages. Often, however, these are little known, and in some cases, cumbersome to use.
This might help explain their low adoption in software projects.

## What is the software supposed to do?

When software projects fail, it may not be caused by too many bugs creeping in. Sometimes, project failure happens because it is simply not clear what the software is supposed to do. The "Leftpad" example impressively demonstrates how difficult it is to clearly define how a function should behave in all regular and edge cases. Unfortunately, [developers often dislike specifications,](https://www.hillelwayne.com/post/augmenting-agile/) especially in agile development processes, because they seem like an old-fashioned monstrosity that cannot react well to changes in external circumstances.

Often, this is true. But sometimes it pays to formulate a detailed specification in order to recognise and correct design errors at an early stage. Here, too, formal methods offer possibilities.

The one formal specification tactic that is simplest and quickest to explain are (Boolean) decision tables. You can use them in highly configurable systems.
First, create a table with one column per configuration option and one column per possible output. For example, in a cash register, list all combinations of coupons with the resulting fixed or percentage discounts. If necessary, also include the VAT rate or special promotions as a column.
This is a practical use case: Most cash register systems today are highly complex. Rumour has it that only 15 years ago, the cash registers of a German discounter could be shut down by cashing in the same amount of bottle deposit as the purchase is worth, leaving exactly 0 € to be paid. (Would you have considered this scenario as a test case?)

State machines are similarly easy to use. The classic example of this is a vending machine, which awaits coins after a product has been selected and then switches to "dispensing" mode. Traditionally, such state machines can be drawn as circles and arrows, with the circles representing states and the arrows representing inputs and/or outputs. The state machine formalism then enforces completeness; for example, we can determine whether the case when someone first puts in coins and then selects a product is included. Or what happens if someone keeps feeding coins even though the drink is already being dispensed.

While decision tables or state machines can be easily written down by hand or in a spreadsheet software of choice, they have one major disadvantage: they can only cover a finite number of states.

This is precisely where other tools come in, which let us define formal specifications with mathematical notation. One example of this category is "Isabelle", which is based on set theory and provides numerous libraries for all conceivable mathematical subfields, but also for algorithms. To return to "Leftpad" from above: With Isabelle, on the one hand, the "Leftpad" function can be completely specified, and on the other hand, it can also be mathematically proven that the specification is unique. This means that there are no two implementations that can be distinguished from each other and both fulfil the specification of "Leftpad". This is not a trivial property either: both under- and over-specified software can lead to real-world problems.

Isabelle is widely used in certain industries, for example for hardware-oriented programming in the "L4" microkernel. In an Australian consortium, the "seL4" kernel was launched for this purpose and proven to be functionally correct: Not only was it shown that the kernel implemented in C, for example, has no memory overflows, but also that trustworthy infrastructure was created for application processes running on this kernel. In another project, it is used for the verification of financial software to prevent negative account balances or transfers from being credited but not debited.

## Conclusion

If a social media app crashes while scrolling through the timeline, it may cost potential advertising revenue, but is bearable for society as a whole. However, if money disappears scale because the calculation of account balances in banks has gone wrong -- [as happened with DKB in November 2022](https://www.handelsblatt.com/finanzen/banken-versicherungen/banken/deutsche-kreditbank-dkb-raeumt-fehlerhafte-buchungen-bei-girokonten-ein/28788388.html) -- then this can have catastrophic consequences. Testing software requires moderate effort and offers significant improvements in quality. But to go the extra mile, we have to think about utilizing formal methods of specification and verification. However, you don't have to hire a small army of expensive specialists. There are also simple techniques, such as decision tables or state machines, which are easy to apply and should therefore not be missing from any software toolbox. Only when even these are no longer sufficient, it is time to bring out the big guns of mathematical modelling. The fact that this is not only a cost factor but also brings tangible benefits is proven by
[Amazon](https://www.amazon.science/blog/how-to-integrate-formal-proofs-into-software-development),
[Google](https://www.phoronix.com/news/Google-KataOS),
[Intel](https://www.cl.cam.ac.uk/~jrh13/slides/oregonsummerschool-26jul12/slides.pdf)
and Apple, among others, who have built up their own teams for formal methods and routinely use them for particularly critical applications.

_This post has also been [published on LinkedIn](https://www.linkedin.com/pulse/when-testing-just-doesnt-cut-dr-lars-hupel)._
