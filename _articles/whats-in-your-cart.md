---
title: "What's in your cart?"
pub_date: 2022-04-01
abstract: |
  Do you like online shopping?
  Great, I do too.
  I even shop my groceries online.
  What's not so great is that while the shops are analyzing your data to gain insights, they are not sharing those with you.
  But thanks to GDPR, we can just analyze our data ourselves.
lang: en
hero:
  src: "img/groceries.jpg"
  alt: "A wide variety of vegetables in a grocery store"
  credits: "nrd/Unsplash"
---

{% include quote.html url="https://www.youtube.com/watch?v=UFe8M5Xh9-A" author="KNOWER" text="I want to see what's in your heart<br>We may not be so far apart<br>What's in your heart?" %}

You probably have heard about the story where the retail chain [Target has identified someone to be pregnant](https://www.forbes.com/sites/kashmirhill/2012/02/16/how-target-figured-out-a-teen-girl-was-pregnant-before-her-father-did/) before their family knew.
If you haven't, the gist of it is that Target's tracking algorithm, using data from legal sources including shopping history, can fairly accurately determine if a shopper is pregnant.
The case of Target is well-documented across the internet, but other companies are doing the same thing, and we have come to expect it.

Collecting the data itself is not necessarily a bad thing, but as consumers, we are routinely passed over when it comes to leveraging the insights from the data.
For example, if I wanted to find out about the nutritional values of my groceries, I would have to check each product's label individually, even though the stores have that data in a machine-readable format.

I started wondering just what kinds of questions I could answer if I had an appropriate dataset about the groceries I bought online in the past years.
Fortunately, the grocery shop I use – German chain _REWE_ – offers a convenient, JSON-based export of the order history.
The document contains the line items of each order, but also other order data such as delivery address, date, and payment method.

I am by far not an expert in data analysis.
Using the [Python library _Pandas_](https://pandas.pydata.org/) and with some initial help from colleagues, I found some fun facts about my shopping habits for the last two-ish years:

* I spent about 17% of my money on cheese, and another 17% on fruits and vegetables.
* I ate over 20 kg of cream cheese.
* I drank over 100 l of non-alcoholic wheat beer.
* My top fruit is apple (red) and my top vegetable is bell pepper (also red).

Sadly, the line items in the exported JSON document comprise only the product name, quantity, and price.
But to gain any insights at all, we need additional data on the products.
For example, I figured out the amount of cream cheese I'm eating by applying a regex to the product name that searches for a unit (“organic cream cheese 175g”).
Also, short of manual assignment, it is not possible to find out what product categories I'm buying.
Surely, that's not the ideal way to go.

What started out as a fun hobby project quickly escalated into a larger undertaking that involved some sneaky Python code, reverse-engineering an SPA and many other side quests.
Eventually, I'd like to publish all the code, together with some Jupyter notebook.
But for now, I'm still writing up some of it for the German tech magazine _c't_, where it'll appear first (on April 8, to be precise).

So, why am I posting this placeholder, only describing the rough idea without technical details?
I'm participating in the [_April Cools' Club_](https://www.aprilcools.club/) series of posts, where a bunch of people are creating some off-beat, yet completely serious content as a protest against the clichéd April Fools' genre.
The idea of this post started out in that context, so I'm documenting it here, until I get around to translating the cool stuff into English.
