---
title: "BibLaTeX incompatibility on arXiv"
date: 2025-05-25
lang: en
---

When submitting a manuscript to arXiv, the preferred way is to upload the LaTeX source files.
arXiv's infrastructure will then build everything from source.
For me, this process has been going smoothly, since typically, LaTeX packages are compatible across versions.

However, while updating [a draft](https://arxiv.org/abs/2412.04051), I stumbled--for the second time--over a problem with incompatible versions of BibLaTeX.
Since I did not find any good documentation online, I decided to write it up here (solution below).

I used the latest version of TeXLive (2025.2 at time of writing) to produce a PDF file, whereas arXiv is a few versions behind (2023).

For bibliographies, I prefer to use BibLaTeX/Biber for bibliographies.
arXiv does not run any bibliography tool, so you have to upload the generated `.bbl` file along the `.tex` file.

This is where I found an incompatibility.
On my system, the `.bbl` file starts as follows:

```
% $ biblatex auxiliary file $
% $ biblatex bbl format version 3.3 $
% Do not modify the above lines!
```

arXiv, when trying to compile the PDF using an older TeXLive, shows these warnings:

```
Package biblatex Warning: File 'paper.bbl' is wrong format version - expected 3.2.

...

LaTeX Warning: Citation 'DiIorio2024' on page 1 undefined on input line 43.
```

... and so on.
Essentially, it can't find any of the citations, which means no bibliography is printed.

In my first attempt a few months ago, I just changed the header of the `.bbl` file manually to say `version 3.2`.
However, this didn't work today.

It turns out that the `.bbl` format has actually changed in incompatible ways.
Here's an example diff between old and new format:

```
-  \datalist[entry]{nty/global//global/global}
-    \entry{Abrams2023}{article}{}
+  \datalist[entry]{nty/global//global/global/global}
+    \entry{Abrams2023}{article}{}{}
```

This means that in order to produce a `.bbl` file that arXiv accepts, I must run the older version of TeXLive locally.

Fortunately, this is easy thanks to official Docker images.
The README didn't specify the precise incantation to run the image, so I paste it below for posterity:

```
$ docker pull texlive/texlive:TL2023-historic
$ docker run --rm -it -v $(pwd):/workdir -w /workdir texlive/texlive:TL2023-historic latexmk -pdf paper.tex
```

The `.bbl` file now has the correct format.

Apparently, this has [happened before](https://tex.stackexchange.com/q/417944).
The [proposed workarounds](https://github.com/plk/biblatex/wiki/biblatex-and-the-arXiv) by BibLaTeX seem to be much more complicated than just running the right TeXLive version in Docker.
Hope this helps!
