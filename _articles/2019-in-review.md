---
title: "2019 in Review"
pub_date: 2019-12-21
lang: en
---

2019 was a remarkable year for me: a year of many firsts.
From starting a job in industry to finishing my PhD, I want to review what happened this year.
Let's start with my professional life.

At some point mid-2018, my advisor asked me about how I felt about becoming a postdoc.
I expected that question, but it didn't mean I already had an answer.
I talked to many people from various backgrounds, before I started interviewing with companies.
Eventually – as a lot of you know – I ended up joining [INNOQ](https://www.innoq.com), a German consulting company, in January 2019.

Even though my academic career had ended there, I still wasn't finished.
By the day my contract at university expired, I hadn't submitted my PhD thesis.
The research was done, but a lot of loose ends still had to be tied up.[^1]
So, continuing to write was a thread that kept running in the background.

Starting to work with INNOQ in January felt like a revelation.
In many ways, for the first time I felt like I could exercise a broad range of skills _and_ be appreciated for this.
In particular, the appreciation aspect is what is often missing in academia.
I immediately felt right and to fit in, similarly to when I switched schools in 2004 and went to a [boarding school](https://cz-gymnasium.jena.de/).[^2]

The disadvantage of course was that I had to leave a lot of topics that are near and dear to my heart behind.
No more formal methods!
No more theorem proving!
The transition turned out to be not too painful.
For starters, I still spent evenings and weekends on finishing up my thesis, a process that'll kill the passion about any topic you've ever had, and make you wish for it to be done already.

But additionally, the company blog really is not lying about making it possible for employees to spend time to learn or write about literally anything.
So, I wrote an article about Java's generic type system while spending a few days in Berlin being mentored by my dear colleague Daniel.
Not because it's new material (parametricity has been around for decades), but because there's a lot of misinformation about type erasure going around in the Java community.
A whole bunch of my colleagues proof-read the manuscript and, here's the important bit, showed appreciation for it.
It ended up being published in a German tech magazine.
I also turned it into a talk and gave it at a few conferences and meetup groups.
I didn't have to ask a single person to do any of this.
I just did it.

Another thing I spent my first month at INNOQ on was learning some new (to me) technology.
Our company prides itself on frequent (six per year) meetings.
Those are kind of like internal conferences (or retreats, if you want): we have open space discussions, internal and external talks, try out and evaluate new technologies (hackathon-style, but with reasonable hours), and discuss strategy.
In between those, people organize topical workshops, some remote, but most face-to-face.
As you can imagine, this induces a lot of travelling.
With growing eco-consciousness, many colleagues sought to reduce their flight footprint and prefer train travel where at all possible.
What if we could plan our meetings in such a way that the total travel time of all atteendees is minimized?
This is exactly what I implemented as a microservice with Spring Boot, deployed in our Kubernetes cluster.[^3]
My code ended up being terribly unidiomatic, which some colleagues helpfully pointed out in code review.
But nonetheless, I ran some numbers and managed to make a few recommendations.[^4]

In the first weeks of my new job I didn't have any official project yet.
That changed soon enough, when I joined two colleagues working on an internal study.
We were researching existing literature and, well, frankly anything on blockchain technology.
These three months turned out to be extremly fruitful, having spawned a series of technical articles and even a [theme site](https://blockchain.innoq.com/) (more about this topic later).

In February, the time to submit my thesis was ripe.
Not, because I was _done_.
Theses are never _done_.
But because it was done enough.
I emailed my advisor who approved, set up an appointment with TUM's examination office and handed in the paper copies early March.
Then I waited.

Somehow, around the same time, I also managed to co-organize the programme of our February company event, the Typelevel Summit in Philadelphia, and give a talk about Prolog at Lambda Days in Krakow.
Additionally, thanks to my dear friend Leah, I started going to a meetup group for trans, nonbinary and gender-nonconforming people in Munich.
This was good on many levels: "officially" acknowledging me being nonbinary through a whole bunch of friendly people that gave me a sense of community outside of tech.[^5]

Back to work.
Shortly after I had submitted my thesis, I received a message.
I was being asked if I could deliver about 90 minutes out of a day-long workshop.
The topic was Ethereum.
I agreed, but there was a catch: the workshop was already going to take place in a few days, and I didn't have slides yet.
Challenge accepted.
I started furiously creating slides and designing some exercises so that the participants could get the most out of it.
The workshop was a great success, which initiated the stereotype that I could solve any problem my colleagues are throwing at me.
This has gotten to the point where few people refer to me as "machine" because of my output:
Later in the year I have written tens of thousands of words in articles on a variety of topics, churned out a three-day curriculum for blockchain aimed at software architects (together with a co-author), while giving plenty of talks and working on plenty of side projects.
The irony is that this open appraisal still makes me hugely uncomfortable ([impostor syndrome is a hell of a drug](https://twitter.com/heathercmiller/status/1205641312659234825)) and at the same time is what enables me to be so productive.
Because of this, 2019 has been by far my most productive year to date, simply because I've been enabled to.

Let's move on to April.[^6]
I used the company event to come out to my colleagues as nonbinary, which was met with universal support.
The company has this tradition of new colleagues having ten minutes to talk about themselves and whatever they're interested in.
I talked about how binary sex is bullshit and sex and gender variations are real.
The final slide just said: "Hi, I'm nonbinary 👋"
However, I missed the opportunity to drop the mic.
Two weeks later, I visited a friend in Vienna who later came out as trans.
How fitting!

The second quarter of 2019 was heavy on travelling, including air travel.
I somehow thought it would be a good idea to go to Sweden, Spain, Switzerland and Japan within the space of six weeks.
The two most important events were [the Scala Days](https://www.innoq.com/de/blog/scala-days-2019-lausanne/) and the Typelevel Summit in Lausanne where I had the good fortune of collaborating with my dear friends Darja and Dajana on creating a successful conference experience.
That week was a complete blur, I'm assuming not just to me, but also to them.
Organizing a conference is physically, mentally and emotionally draining, especially on this scale, but also hugely rewarding.
Did I mention there was a three-day company event just the week before and I spend the weekend in between already in Lausanne?
No?
That's how I roll.
A few months later when people started asking questions about 2020's Typelevel Summits, I decided to step down from organizing them in the future.
I feel like running almost ten conferences in my spare time (2016–2019) ought to be enough for a lifetime.
However, I am grateful for what I've learned, even though it was often as easy to drink as water from a firehose.

I had only week to relax after Scala Days before I went to Japan for Scala Matsuri, an event where [I've already documented my experiences]({% link _articles/scala-matsuri.md %}).
That week I was invited to the annual Sommerfest of the computer science department of TUM:
The university awarded me with a teaching award for 2018.
That was about the only official appreciation I've received for pouring endless hours and overtime into student success.
I'm grateful for the award but those don't replace structural improvements in undergrad teaching, something us doctoral students have been demanding year after year.
But as Karl Valentin said, we weren't even being ignored.

At some point between all this traveling, the powers that be agreed on a date for my thesis defense on July 11.
Naturally I was excited, nervous, anxious, and a whole bunch of other things at the same time.
The day came and went successfully.
Me, my former colleagues and advisor, a few of my current colleagues, friends and family came together after the defense to celebrate.
I fought very hard against tears during the reception because the occasion reminded me that while my mark on the department or even the field was negligible, it was significant for the people around me (and vice versa).
That's really all I could've hoped for.

The remainder of the year was relatively uneventful (compared to its first half).
I gave more conference talks, a first solo professional workshop and traveled by train a lot.
I also started therapy in order to deal with my general anxieties about people.
In case you're interacting with me and I haven't told you yet, it's much better if you're exceedingly direct when talking with me.
I tend to interpret ambiguities in the worst way imaginable, which leads to intense questioning at my end.
(As a general default, I assume people think I'm annoying and hate me.)
That's not the sender's fault though, which is why I'm hoping therapy will help me improve in this aspect.
Luckily, I managed to make a few new friends in the recent times with whom I can talk about this issues.
This helps a great deal.

All in all, I'm very happy with the challenges and opportunities 2019 presented me.
I feel I'm living my life to the fullest, I'm happy with my job, and will overcome my personal issues.
Here's to looking forward to what 2020 will bring.
I also promise to write more of these personal posts, because let's be real: technical stuff all the time gets boring.

To close, I want to say thanks to all the people who have accompanied me this year and in the past years.
You know who you are, you are amazing and you've helped me grow tremendously.
I hope I can give back as much as you've given to me.

[^1]: Everyone who has written, or attempted to write, a thesis or book, will know what I'm talking about.
[^2]: A story for another time.
[^3]: Got bingo from all those buzzwords?
[^4]: I didn't write anything about this tool publicly, because, well, my use of the train schedule API is probably not entirely as intended by DB. Although any interested reader can find those API keys in public GitHub repositories. Secret keys that are packaged in Android apps won't stay secret for long.
[^5]: The writing's been on the wall for a while before, but again, a story for another time.
[^6]:  _Just how much more are they going to write about their year? I haven't got all year to read this._ Sorry, but you clicked the link.
