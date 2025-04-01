---
title: "What's the yield on my stonks"
highlight: true
date: 2025-04-01
lang: en
abstract: |
  I invest a chunk of my earnings into a portfolio, largely comprising ETFs.
  I don't reshuffle the portfolio often and I mostly hold on to them.
  At some point I wondered what the actual yearly interest of the portfolio is?
  Let's figure it out.
---

Computing the interest is fairly easy if all you have is 1 thing.
Let's look at a simple thing first: a savings account.
Assuming yearly compounding, you can compute the balance after _t_ years as follows:
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mrow>
    <msub>
      <mi>v</mi>
      <mi>t</mi>
    </msub>
    <mo>=</mo>
    <msub>
      <mi>v</mi>
      <mn>0</mn>
    </msub>
    <mo>⋅</mo>
    <msup>
      <mrow>
        <mo fence="true" form="prefix">(</mo>
        <mn>1</mn>
        <mo>+</mo>
        <mi>r</mi>
        <mo fence="true" form="postfix">)</mo>
      </mrow>
      <mi>t</mi>
    </msup>
  </mrow>
</math>

Simple enough, right?
If you want to solve for the rate _r_, you just take the _t_-th root:
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mrow>
    <mi>r</mi>
    <mo>=</mo>
    <mn>1</mn>
    <mo>−</mo>
    <mroot>
      <mstyle displaystyle="true" scriptlevel="0">
        <mfrac>
          <msub>
            <mi>v</mi>
            <mi>t</mi>
          </msub>
          <msub>
            <mi>v</mi>
            <mn>0</mn>
          </msub>
        </mfrac>
      </mstyle>
      <mi>t</mi>
    </mroot>
  </mrow>
</math>

So far, so good.

However, a portfolio does not have a fixed interest rate.
We have to get a bit more creative.
Also, I don't just have start and end balances, but I buy at (mostly) regular intervals.
(In my case, a monthly savings plan.)
To make matters even more complicated, some of the ETFs pay coupons or dividends, and sometimes I sell stuff.

The idea how to compute the annual interest is simple.
I assume that my portfolio is a savings account.

* When I buy a stock, I deposit money into the account: the equivalent of the buy price plus the fees.
* When I sell a stock, I withdraw money from the account: the equivalent of the sell price minus the fees.

Let's look at a concrete example.
On January 1, I buy 10 shares of an ETF worth 5 € each, and I pay 1 € as the fee.
That means I have deposited 51 €.
Come December 31, I sell the 10 shares for 6 € each, with another 1 € as fee.
Therefore, I have withdrawn 59 €.

If we plug this into the formula, we arrive at a yield of about 15.7 %.

To make it a little more spicy, imagine that instead of selling after one year, we sell after two years (assume the sell price is the same).
But after one year we also get a dividend payment of 0.50 € per share, totaling 5 €.

How do we take this into account?
This is where the simple idea gets a bit more difficult in practice.

We can model the dividend as a withdrawal, because I receive money from the portfolio.
But it should only count as the interest of first year, not the second year.

Let's try to come up with an equation:

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" class="tml-display" style="display:block math;">
  <mrow>
    <mn>59</mn>
    <mo>=</mo>
    <mo form="prefix" stretchy="false">(</mo>
    <mn>51</mn>
    <mo>⋅</mo>
    <mo form="prefix" stretchy="false">(</mo>
    <mn>1</mn>
    <mo>+</mo>
    <mi>r</mi>
    <mo form="postfix" stretchy="false">)</mo>
    <mo>−</mo>
    <mn>5</mn>
    <mo form="postfix" stretchy="false">)</mo>
    <mo>⋅</mo>
    <mo form="prefix" stretchy="false">(</mo>
    <mn>1</mn>
    <mo>+</mo>
    <mi>r</mi>
    <mo form="postfix" stretchy="false">)</mo>
  </mrow>
</math>

This equates:

* the final withdrawal amount of 59 € to
* the initial deposit of 51 €, plus interest after the first year, minus a 5 € dividend withdrawal, plus another year of interest.

Basic arithmetic leads to this somewhat simpler equation:

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" class="tml-display" style="display:block math;">
  <mrow>
    <mn>0</mn>
    <mo>=</mo>
    <mn>51</mn>
    <mo>⋅</mo>
    <mo form="prefix" stretchy="false">(</mo>
    <mn>1</mn>
    <mo>+</mo>
    <mi>r</mi>
    <msup>
      <mo form="postfix" stretchy="false">)</mo>
      <mn>2</mn>
    </msup>
    <mo>−</mo>
    <mn>5</mn>
    <mo>⋅</mo>
    <mo form="prefix" stretchy="false">(</mo>
    <mn>1</mn>
    <mo>+</mo>
    <mi>r</mi>
    <msup>
      <mo form="postfix" stretchy="false">)</mo>
      <mn>1</mn>
    </msup>
    <mo>−</mo>
    <mn>59</mn>
    <mo>⋅</mo>
    <mo form="prefix" stretchy="false">(</mo>
    <mn>1</mn>
    <mo>+</mo>
    <mi>r</mi>
    <msup>
      <mo form="postfix" stretchy="false">)</mo>
      <mn>0</mn>
    </msup>
  </mrow>
</math>

This form allows us to add up individual events based on the time at which they occurred.

If we run this through a solver, the annual interest is approximately 12.6 %.
This still assumes annual compounding.

What does that number tell me?
If instead of a portfolio I had a savings account with 12.6 % interest, I would have the exact same amount of money.

To do this for my full portfolio, I need to add up all buy, sell, and dividend events (multiplied by an appropriate power of 1 + _r_) and solve it numerically.
This is because the more years you have, the higher the order of the polynomial gets.

Also, I need to account for events that happen during a year.
For that, I use a “partial” interest formula.
If I buy something after half a year, I use <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mo fence="true" form="prefix">(</mo><mn>1</mn><mo>+</mo><mfrac><mi>r</mi><mn>2</mn></mfrac><mo fence="true" form="postfix">)</mo></mrow></math> as a factor.

Fortunately, the resulting polynomial is easy to solve using binary search.
I know that the interest is more than 0 %, and I'd wager it is below 20 %.
So I just wrote a Python script that approximates it.
Below is the function that computes the current value of a position bought on date `d` at price `v`, given an interest:

```python
def days_remaining(d):
    last_day = date(d.year, 12, 31)
    return (last_day - d).days

def now(d, v, interest):
    if d.year == today.year:
        return v

    after_first_year = v * (1 + (interest * days_remaining(d) / 365))
    return after_first_year * (1 + interest) ** (today.year - d.year - 1)
```

The idea is that the first year accrues partial interest (more interest the earlier I bought), and the current year has not yet accrued any interest.
I reckon this could be made more accurate by assuming quarterly compounding, but it does not make much difference to me.

The script pulls the actual events from a gargantuan LibreOffice Calc file with all of my portfolio events (which I manage manually).
I've also tried to fetch the current price of the ETFs via various APIs, but this is hard to do from public sources.

Next step for this is to write a smol frontend.
I've already got started using [Flask](https://flask.palletsprojects.com/en/stable/).
Since the Calc parser is slow, I've also migrated the “database” to SQLite.

This now is good enough for my purposes.
Let's just say that my portfolio has beat inflation.
Perhaps I'll clean up the code and publish it at some point.

_If you enjoyed this, why not head over to the [April Cools' Club](https://www.aprilcools.club/) website to see all other projects?_
