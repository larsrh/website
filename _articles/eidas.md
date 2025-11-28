---
title: "Using eIDAS to access government services: an experience report"
date: 2025-11-28
lang: en
abstract: |
  I was helping out a non-German friend to access German government services.
  This is what I learned about eIDAS.
---

My Romanian friend has been living in Germany for a while now.
I would say that they only have a modest command both of computering and of Germaning.

As it happened, they wanted to access a government service here in Germany.
Nicely enough, this service was offered online.
The only catch: you need a digital ID.

Now, as a German, you probably already have a national ID card, which would satisfy the requirement.
I use it personally and it works quite well, e.g., opening a bank account within a few minutes.

As a non-German, you obviously don't have this card.
Before the eIDAS regulation, you could use some [other means,](https://www.personalausweisportal.de/Webs/PA/EN/citizens/id-card-for-eu-and-eea/eID-card-for-eu-and-eea-node.html) but that's not the point of this experience report.
I want to describe how my friend tried to use their _Romanian_ digital identity.

## Step 1: Romanian eID onboarding

To get started, my friend needed to onboard to the Romanian eID system.
This requires installing the _ROeID_ app and going through a series of visual and verbal identity checks: taking a photo of your physical ID card and a selfie, recording a video, and saying your name.
These details would then be sent to some government entity for validation, which takes about two days.

The first attempt failed because my friend didn't follow all the steps correctly.
The second succeeded.
In total, this took almost a week.
But as it turns out, the _ROeID_ app has quite some features: it appears that many Romanian government services can be accessed directly from within the app.

## Step 2: Create a _BundID_ account

The [_BundID_](https://id.bund.de/de) portal is the German goverment's federal eID portal.
It unifies a few different authentication mechanisms, e.g. the still-separate tax authority ID and the former state IDs.

I find this website to be moderately usable: despite the complexity, it presents you with a clear list of alternatives and guides you through the process.
For my friend, we had to choose "EU identity (non-German)", which forwards you to a list of countries.
Some countries are disabled (e.g. Finland and France)--I don't know why--but we were able to select Romania.

_BundID_ then forwards you to the Romanian government website, where you can enter your _ROeID_ credentials.
At least in theory: when we tried it, we got some low-level SAML exceptions.
The next day it worked, but only on a desktop browser, not on mobile.

Once it worked, the flow was fairly straightforward.
The website tells you what data elements are requested (name, date of birth), then asks you to type in your credentials, which you confirm on your phone in the _ROeID_ app with biometrics.
As far as I can tell, this is a reasonable 2FA flow.

The only surprise was that this flow does not require the physical Romanian ID card to be present.
This is different with the German ID card: instead of an account, you use the physical card with PIN each time you want to authenticate.

## Step 3: Access the government service

Long story short, this is where we got stuck.
My friend already had an account with this government agency.
It asked to authenticate using _BundID_ credentials--which we had just created--but then rejected those.
We got an opaque error about data mismatch.

The website recommended to re-log in and "update" the personal data, which is difficult if we don't know what data element doesn't match.

Naturally, now I am wondering if we should've just recreated this particular account from scratch, instead of reusing the existing one.
Well, I've opened a support ticket; let's see.

To be continued ...

## Conclusion

eIDAS is a great idea in principle, because it allows EU residents to access services wherever they are.
But there seem to be still many practical problems, starting from misconfigured identity providers (see the SAML error above), to bad UX (data mismatch, but what exactly?).
