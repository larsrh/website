---
title: "Verified Code Generation"
date: 2019-10-25
lang: en
---

This page contains the archived research information relating to the paper “A Verified Compiler from Isabelle/HOL to CakeML”.
It reflects the state from approximately October 2019.
For a list of all publications, refer to [this page]({% link research.html %}).

## Goal

Development of a verified code generator from Isabelle/HOL to CakeML, a verified subset of Standard ML.
The vision of this project is to provide an alternative (or extension) to the current code generation facility that reduces the trusted code base.

## FAQ

What is the trusted code base of the pipeline?
: We rely on faithful export from Lem to Isabelle, an unverified printer of CakeML AST to CakeML source text, and the kernel of Isabelle.
There is ongoing work to use [OpenTheory](http://www.gilith.com/software/opentheory/) to get a more faithful representation of the CakeML formalization in Isabelle.<br>
_Update, July 2019:_ The current – more promising approach – is to virtualize HOL4 in Isabelle.
Refer to the [ITP'19 paper by Immler, Raedle and Wenzel](https://doi.org/10.4230/LIPIcs.ITP.2019.21) for details.

Does the pipeline target existing CakeML library constructs, like the built-in lists?
: No, it does not, and it is not intended at the moment.

Does the pipeline target existing CakeML native constructs, like machine integers?
: No, it does not, but it is intended for the future, and actively being worked on.

Does that mean that arithmetic on natural numbers in Isabelle is mapped to unary in CakeML?
: That is accurate: `nat`s are treated as a proper datatype with `Zero` and `Suc` constructors.

How are (8-bit) characters treated?
: The most naive possible translation, 256-way enumerations, would lead to very large code sizes. Instead, we translate characters to bytes, i.e. 8-tuples of `bool`s.
[As of Isabelle2018](http://isabelle.in.tum.de/repos/isabelle/rev/1f9f973eed2a), this will become the default of code generation in Isabelle, including other (unverified) targets.

Is the generated code guaranteed to terminate?
: The current Isabelle code generator only guarantees partial correctness (which has been proved on paper).
While our work is designed for total correctness (all functions that are exported are internally proved to be terminating), we have only proved partial correctness so far.
The CakeML compiler team has proved total correctness.<br>
_Update, August 2018:_ Some (not all) compiler phases have been proved to be totally correct.

## Supplementary Material

* [Formalization for "A Verified Compiler from Isabelle/HOL to CakeML"]({% link pub/isabelle-cakeml-supplements.zip %})<br>
  Submitted: 2017-10-20<br>
  Archived as: DOI [10.5281/zenodo.1167616](http://doi.org/10.5281/zenodo.1167616)<br>
  Obsoleted by: <a href="https://www.isa-afp.org/entries/CakeML_Codegen.html">AFP entry</a>

## Errata

The ESOP'18 paper has an error in Definition 7 (page 20), third rule (`Vrecabs`), second line.
After the bounded quantifiers (before the ≈ operator), instead of σ₁, it should read _rs_.
This is an error in the transcription from the formalization (supplementary material) to the paper.
The error is not present in the supplementary material.
Explanation:
The second precondition of the `Vrecabs` case should compare the constants with the rule set _rs_.
σ₁ is the variable environment from the previous semantics and does not carry constant definitions.
