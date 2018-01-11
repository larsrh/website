---
topic: Miscellaneous
icon: fa-file-o
pubs:
  - title: "Development of an associative file system"
    id: "bsc_hupel"
    authors: ["lars"]
    bib: false
    in: "Bachelor's Thesis in Informatics, Technische Universität München, 2011"
    slides: "https://speakerdeck.com/larsrh/development-of-an-associative-file-system"
    code: "https://github.com/larsrh/associative"
    abstract: |
      Organizing multimedia data, e. g. pictures, music or videos is a rather common use
      case for modern file systems. There are quite a number of applications which try to
      expose an user-friendly interface for dealing with tagging, sorting and editing these
      files. This becomes necessary because sets of such files do not have an intrinsic
      hierarchic structure. For example, pictures taken with a digital camera carry EXIF
      metadata which can be used to retrieve a picture by date, time or location instead
      of an artificial folder structure.
      However, the major problem shared by all of those multimedia applications is
      that the files are actually stored in folders on a traditional file system. As such,
      any operation done by an user outside of the application leads to inconsistencies
      inside of the application. Also, metadata produced by one application cannot be
      consumed by another one because of proprietary formats.
      In this thesis, a file system which uses the established RDF standard for storing
      metadata is developed which imposes only little structural requirements on the
      data. The system features both an API which enables high-level operations on file
      contents and metadata and a CLI which resembles ideas from versioning systems
      like Git.
      Also, a formalization of the most important operations is given, including a
      concept of transactions, which has been adapted from relational database systems
      to fit in the environment of a file system.
  - title: "A Visualization Toolkit for Simplifier Traces in Isabelle/jEdit"
    id: "msc_hupel"
    authors: ["lars"]
    bib: false
    in: "Master's Thesis in Informatics, Technische Universität München, 2013"
    abstract: |
      The Isabelle proof assistant comes equipped with some very powerful tactics to discharge goals automatically, or to at least simplify them significantly.
      One of these tactics is a rewriting engine, called the simplifier.
      It repeatedly applies rules to a term by replacing the left-hand side of an equation by the right-hand side.

      While tremendously useful, the results of simplifying a term not always match the user's expectation:
      sometimes, the resulting term is not small enough, or the simplifier even failed to apply any rule.
      For these cases, the simplifier offers a trace which logs all steps which have been made.

      However, these traces can be huge, especially because the library of Isabelle/HOL offers many pre-defined rewriting rules.
      It is often very difficult for the user to find the necessary piece of information about why and what exactly failed.
      Furthermore, there is no way to inspect or even influence the system while the simplification is still running.
      Hence, a simple, linear trace is not sufficient in these situations.

      In this thesis, a new tracing facility is developed, which offers structure, interactivity and a high amount of configurability.
      It combines successful approaches from other logic languages and adapts them to the Isabelle setup.
      Furthermore, it fits neatly into the canonical IDE for Isabelle and is thus easy to use.
  - title: "Properties of Random Graphs – Subgraph Containment"
    id: "afp-subgraph-containment"
    authors: ["lars"]
    in: "Archive of Formal Proofs, 2014"
    entry: "https://www.isa-afp.org/entries/Random_Graph_Subgraph_Threshold.html"
    abstract: |
      Random graphs are graphs with a fixed number of vertices, where each edge is present with a fixed probability. We are interested in the probability that a random graph contains a certain pattern, for example a cycle or a clique. A very high edge probability gives rise to perhaps too many edges (which degrades performance for many algorithms), whereas a low edge probability might result in a disconnected graph. We prove a theorem about a threshold probability such that a higher edge probability will asymptotically almost surely produce a random graph with the desired subgraph.
  - title: "Interactive Simplifier Tracing and Debugging in Isabelle"
    id: "simp-trace"
    authors: ["lars"]
    springer: true
    in: "Intelligent Computer Mathematics (CICM), 2014"
    doi: "10.1007/978-3-319-08434-3_24"
    arxiv: "1406.0292"
    slides: "https://speakerdeck.com/larsrh/interactive-simplifier-tracing-and-debugging-in-isabelle"
    abstract: |
      The Isabelle proof assistant comes equipped with a very powerful
      tactic for term simplification. While tremendously useful, the results
      of simplifying a term do not always match the user’s expectation: sometimes,
      the resulting term is not in the form the user expected, or the
      simplifier fails to apply a rule. We describe a new, interactive tracing
      facility which offers insight into the hierarchical structure of the simplification
      with user-defined filtering, memoization and search. The new
      simplifier trace is integrated into the Isabelle/jEdit Prover IDE.
  - title: "The Next 1100 Haskell Programmers"
    id: "haskell-programmers"
    authors: ["jasmin", "lars", "tobias", "lars-n", "dmitriy"]
    in: "Haskell Symposium, 2014"
    select: true
    doi: "10.1145/2633357.2633359"
    slides: "https://speakerdeck.com/larsrh/the-next-1100-haskell-programmers"
    abstract: |
      We report on our experience teaching a Haskell-based functional
      programming course to over 1100 students for two winter terms.
      The syllabus was organized around selected material from various
      sources. Throughout the terms, we emphasized correctness through
      QuickCheck tests and proofs by induction. The submission architecture
      was coupled with automatic testing, giving students the possibility
      to correct mistakes before the deadline. To motivate the students,
      we complemented the weekly assignments with an informal
      competition and gave away trophies in a award ceremony.
  - title: "Clone Detection in Isabelle Theories"
    id: "isabelle-clones"
    authors: ["dominik", "lars"]
    in: "Isabelle Workshop, 2016"
    code: "https://assets.hupel.info/downloads/isabelle-clones/isabelle-clones-preview.zip"
    bib: false
    abstract: |
      Duplicated code fragments within software projects complicate maintenance
      and require refactoring. Clone detection frameworks, such as ConQAT,
      offer well-engineered clone detection functionalities for a number of different
      programming languages. In this work, we developed a tool to search Isabelle theory
      sources for clones. This analysis takes the rich structure of Isabelle theories
      into account by extracting semantic information from document markup. After
      extraction, clone detection is performed using ConQAT’s built-in facilities.
  - title: "Algorithms for Reduced Ordered Binary Decision Diagrams"
    id: "afp-robdd"
    authors: ["julius", "max", "peter", "lars"]
    in: "Archive of Formal Proofs, 2016"
    entry: "https://www.isa-afp.org/entries/ROBDD.html"
    abstract: |
      We present a verified and executable implementation of ROBDDs in Isabelle/HOL. Our implementation relates pointer-based computation in the Heap monad to operations on an abstract definition of boolean functions. Internally, we implemented the if-then-else combinator in a recursive fashion, following the Shannon decomposition of the argument functions. The implementation mixes and adapts known techniques and is built with efficiency in mind.
---
