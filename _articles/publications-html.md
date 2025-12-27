---
title: "Making research papers more accessible"
lang: en
date: 2024-09-22
highlight: true
---

Research papers, at least of the computer science variety, are famously written in LaTeX and published as PDF.
This used to make a lot of sense in the times of print volumes, but not so much any more.
Reading PDFs on mobile screens is cumbersome, especially when using a two-column layout (like some [ACM conferences](https://www.overleaf.com/latex/templates/association-for-computing-machinery-acm-large-2-column-format-template/qwcgpbmkkvpq)).

Obviously, I am not the first person to notice this.
A lot of research has gone into producing accessible PDF documents.
Some publisher's websites have also started providing papers in HTML, typically by using some form of automatic translation of LaTeX into HTML (for example, [Springer](https://support.springernature.com/en/support/solutions/articles/6000081762-springerlink-s-compatibility-with-mobile-devices) and [arXiv](https://blog.arxiv.org/2023/12/21/accessibility-update-arxiv-now-offers-papers-in-html-format/)).
This is great work, in particular, since it can be applied to the huge back catalogue of research papers.

However, I'm wondering whether this is good enough for _new_ papers.
Translating LaTeX into HTML is notoriously fickle and doesn't always produce good results.
Using tools like [Pandoc](https://pandoc.org/), shouldn't it be possible for authors to prepare high-quality renderings in both PDF and HTML?
One challenge is finding a suitable input format.
Markdown isn't powerful enough, but what else can we use?

As a stopgap solution, I have started to convert my own papers into HTML using Pandoc.
I still write them in LaTeX, but I try to simplify it to make it palatable to the tool.
Afterwards, depending on the content, I have to edit judiciously.
Note that this happens only once:
I only convert the paper to HTML once it's final.
This makes my life a lot easier, because I don't have to worry about keeping the HTML in sync.

Here's a typical Pandoc invocation I use:

```
pandoc paper.tex -t html -o document.html \
  --citeproc --bibliography refs.bib \
  --csl https://raw.githubusercontent.com/citation-style-language/styles/master/springer-lecture-notes-in-computer-science.csl \
  -M link-citations=true \
  --mathml \
  --shift-heading-level-by=1
```

There's a lot going on there, mostly relating to BibTeX.
I initially tried to find a solution where the BibTeX rendering is done by Jekyll (which I use as a static-site generator).
But it was too much fiddling.
Instead, the flags instruct Pandoc to render the citations directly, using a random CSL style I picked.[^csl]

MathML is also important to get good mathematical rendering.[^js]
I used to include separate fonts, due to some weirdness in Chrome, but fortunately that is [not necessary any more](https://github.com/larsrh/website/commit/a60c1b92be0c9bdbaa4fe747bbe1d7ad94238e4c).

Perhaps the most interesting aspect is numbering of headings and figures.
The last flag to Pandoc instructs it to start rendering with `<h2>`, since I use `<h1>` for the title of the page.
At the time of writing, this SCSS snippet produces the numbering, catering to three levels:

```scss
main {
  counter-reset: h2num fig;

  h2::before {
    content: counter(h2num) ' ';
    counter-increment: h2num;
    color: var(--text-muted);
  }

  h2 {
    counter-reset: h3num;
  }

  h3::before {
    content: counter(h2num) '.' counter(h3num) ' ';
    counter-increment: h3num;
    color: var(--text-muted);
  }

  h3 {
    counter-reset: h4num;
  }

  h4::before {
    content: counter(h2num) '.' counter(h3num) '.' counter(h4num) ' ';
    counter-increment: h4num;
    color: var(--text-muted);
  }

  figcaption::before {
    content: 'Figure ' counter(fig) ': ';
    counter-increment: fig;
  }
}
```

When Pandoc encounters a LaTeX cross-reference (`\ref{}`), it emits HTML that contains the section number referenced (`<a href="#ref">5.6.7</a>`).
Thanks to the above snippet, the rendered section numbers in front of headings match this exactly.[^app]

Figures require some fiddling.
Pandoc already produces “modern” HTML with `<figure><figcaption>`.
But I did not introduce a distinction between “table” figures and “figure” figures.
Therefore, I manually update references in the text to use the correct number.

There are a few things Pandoc doesn't get right, and I honestly can't blame it for that.
It expands macros, which means I can still use them in LaTeX for tedious syntactic stuff.
But I believe it translates `\operatorname` into wrong MathML[^wrong] and it does not understand `\textsc` when it appears in math mode.
Funnily, `::=`, which is heavily used in BNF syntax, is treated as `:` and `:=`.
It also struggles with formulas embedded into listings, as is typical in PL papers.[^pl]
These are all things that are relatively easy to fix (e.g. by re-pasting simplified LaTeX into `pandoc`).

Ultimately, I think it is worth it.
The results look a lot better than the HTML rendering provided by arXiv, for example: [manual]({% link _research/go-codegen.html %}) vs. [automatic](https://arxiv.org/html/2310.02704v3).
Obviously, I had to spend a lot of time to make it look like this.
But I'll be taking notes and adapt the way I write papers in the future, to make my own life easier when producing HTML.

By the way, I have added a tag (<span class="pub-html"></span>) to [publications]({% link research.html %}) where an HTML version is available.
Enjoy and let me know what you think!

Also, massive thanks to John MacFarlane.
Pandoc is an awesome tool.

[^js]: Pandoc also supports [MathJax and others](https://pandoc.org/MANUAL.html#math-rendering-in-html), but I prefer less JS and more static markup.
[^csl]: I couldn't be bothered to write my own style. It's probably suboptimal; if you have better suggestions, I'm all ears.
[^app]: Unless there is an appendix involved. I guess one could also implement this in CSS.
[^wrong]: Well, maybe only sometimes wrong. It produces `<mo>`, but `<mi>` may be more appropriate in some situations. But take this with a grain of salt since I don't know much about MathML.
[^pl]: Read my ramblings on this [on Mastodon](https://mastodon.hupel.info/@lars/113175588100704709).
