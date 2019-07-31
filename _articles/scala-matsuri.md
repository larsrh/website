---
title: "A week in Tokyo"
header: "A week in Tokyo"
long_title: "A week in Tokyo"
pub_date: 2099-01-01
lang: en
---

I'm not regularly in the habit of writing personal blog posts.
I had an old blog once in which I shared my experiences during [my Erasmus semester in Northern Ireland](/articles/erasmus).
After that, I have largely resorted to technical writing.
This text is an attempt to balance that out again; mostly for my own sake, but maybe some readers find it entertaining.
It is about Scala Matsuri, a conference that took place in June 2019 in Tokyo.
I am writing this in the airplane back from Haneda to Frankfurt in an attempt to get me to finish while I still remember details.

### Scala Matsuri

_Scala Matsuri_ is an annual Scala conference in Tokyo.
Translated, _matsuri_ means _festival_.

{% twitter https://twitter.com/eed3si9n/status/1144841545209638914 %}

I had already tried the previous year (2018) to get a talk into the conference, but unfortunately, it was rejected.[^1]
<a href="http://2019.scalamatsuri.org/index_en.html">Fast forward to 2019</a> and my proposal to [talk about property testing]({%link _talks/property-testing.md %}) got accepted.

The conference was scheduled for two and a half days: a Thursday afternoon (June 27) for an OSS hackathon, then two conference days (June 28–29) afterwards.
I was a little unsure about how much time I should spend for sightseeing.
In the end, I decided to come to Japan on Monday and return on Sunday, having about three days to see the city and its surroundings.
But first, let me talk about the conference and the community a little.

### A special conference

The Japanese Scala community is, as far as I can tell from the outside, rather large.
There are a lot of Scala books that have been translated to Japanese and there are many active bloggers and Twitter accounts.
The language barrier is strong: with the majority of conversations happening in Japanese, hardly anything reaches the predominantly English-speaking community outside of Asia.
This is why organizing Scala Matsuri is no small feat, so kudos to <a href="https://twitter.com/OE_uia">Taisuke</a> and his team.

In order to make the event inclusive of Japanese-speakers and -non-speakers alike, the most visible feature of the conference was live interpretation.
In two of the three tracks, there were two pairs of interpreters translating from Japanese to English and vice versa.
This meant that talks could be held in Japanese and English and all participants could listen, no matter their proficiency in either language.
Naturally, this extended to the Q&A session too: speakers could also use the pocket receiver to hear questions in their native language.

{% include float_picture.html src="subtitled_slide.png" text="Slide in English, subtitled in Japanese" %}

All talks that I attended – even the ones delivered in Japanese – had slides written in English.
To allow Japanese attendees to follow them along more easily, speakers had to submit their slides a month in advance so that the organizers could return them with subtitles.
For some slide formats, they even edited them accordingly for speakers.
In my case, I received a text file and added the subtitles to my LaTeX code (thanks LuaLaTeX for supporting Unicode natively!).

On top of that, all speakers met with their assigned pair of interpreters an hour before their talk.
The purpose of this meeting was to go through the slides (they had hardcopies) and discuss the topics and the terminology.
The interpreters were very well-prepared and in my case had only a few questions about the jargon that I would use.
Finally, they asked me to speak slowly so that it would be easier to keep up.

My personal impression was that Scala Matsuri managed to be an enjoyable event for both the locals and the international guests, trying as hard as possible to tear down the language barrier.
The live interpretation was fascinating and allowed speakers and audience to share their experiences and knowledge with each other.

### My first time in Japan

A lot of my friends have already visited Japan in the past.
One of them has even moved there since both of us finished studying.
Consequently, there was no shortage of useful travel tips nor suggestions what to do, see, and eat.
The only difficulty was to fit all these suggestions into three days, taking into account that my first day (Monday) would likely consist of fighting against jetlag.
However, as my friend Asta could attest to, I am very efficient at sightseeing.[^2]

Monday, June 24
: As foreseen, flying into Japan was stressful.
  I had a connecting flight in Osaka, which required me to retrieve and re-check my luggage (a fact that the staff in Munich was apparently unaware of).
  The connection was tight, but ultimately I managed to catch the connecting flight to Haneda.

  Having arrived at a domestic terminal in Tokyo, I had to first go to the international terminal to pick up my preordered Pocket WiFi.
  This wouldn't have been necessary, since there are plenty of walk-in shops that will let you rent such a nifty device.
  Also, a bought a <a href="https://en.wikipedia.org/wiki/Suica">_Suica_ card</a> for transit in Tokyo.
  The staff at the airport was friendly, but it took me a while to figure out that they were trying to point out to me that unfortunately I could only buy one of the three Suica card designs at the vending machines.
  I was fine with that, but proceeded to make an order-of-magnitude error and put 10000 ¥ (approx. 100 €) on my card.
  Luckily, these cards can not only be used for transit, but also in many shops and museums.

  The monorail and then subway ride to my hotel (in the Tokyo Bay area) didn't took long and I arrived there at about 11:00 in the morning.
  I got lunch at a place in the subway station, where I had to order through a machine, but wasn't able to decipher the menu.
  The soup I got was consequently a surprise, but a pleasant one.

  A not-so-pleasant surprise was that the hotel did not have a room for me ready yet.
  Fortunately, they had free luggage lockers, so I left my suitcase there and went for a walk in the area.
  I passed through the entire area when it started drizzling.
  However, at that point it was past check-in time already, so I quickly finished my walk to reach a <a href="https://en.wikipedia.org/wiki/Yurikamome">_Yurikamome_</a> <a href="https://en.wikipedia.org/wiki/Tokyo_International_Cruise_Terminal_Station">station</a> and went back to the hotel.

  When I arrived in my room, it was about 15:00, and even though I wanted to stay awake for at least four more hours, the bed just seemed to be very enticing, so I went to sleep.

Tuesday, June 25
: I woke up the next day at 01:00, with about five hours to kill before breakfast started.
  Perfect time to catch up on some emails and work.

  The breakfast at the hotel was another classic case of cultural confusion and language barriers.
  The waiter wanted to bring me to my table and stop to point out the location of the trays and cutlery, which I mistakenly interpreted as an order to take a tray and cutlery.
  Needless to say, we were both looking at each other quizzically.

  My route for the day was based on suggestions of friends on some important spots in Tokyo.
  But first, I went to the <a href="https://en.wikipedia.org/wiki/Tokyo_Skytree">Skytree tower,</a> which sports an observation platform with an altitude of 450 meters.
  Additionally – I learned that when I arrived – a _Hello Kitty_ exhibition.

  Up there, I couldn't see very far because of mist, but enough to get the feel that Tokyo just vastly extends into (almost[^3]) all directions.
  When taking the elevator down, a Japanese person started asking me about the purpose of my visit, to which I dutifully replied along the lines of Scala Matsuri.
  Impressed, he handed me his business card.
  Unimpressed, he accepted that I didn't have any.

  From there, I proceeded to the <a href="https://en.wikipedia.org/wiki/Sumida_Park">_Sumida Park_</a>, a lovely little park by the _Sumida River_.
  Nearby is the infamous <a href="https://en.wikipedia.org/wiki/Asahi_Beer_Hall">_Asahi Beer_ building</a>, which my friend Jan has accurately described as the “unique architectural equivalent of _Fremdschämen_”.
  I strongly agree.
  From Sumida, _Asakusa_ is only a stone's throw away, where the <a href="https://en.wikipedia.org/wiki/Sens%C5%8D-ji">_Sensoji Temple_</a>, an old five-story pagoda can be found.
  For the first time, I was confronted with the fact that Buddhists seem to be intensly into incense.

  From there, I went onwards to <a href="https://en.wikipedia.org/wiki/Ueno_Park">_Ueno_</a> to enjoy the nice weather in a park (to be fair, I rode the bus for that part of the tour).
  The park has a pond which is completely covered in green plants, which is why I didn't even notice it at first.
  June is the hydrangea season in the area, which means there were plenty of colourful blossoms everywhere.

  The final two stops for the day were _Akihibara_, which I found interesting but since I'm not into games, not a place where I would spend a lot of time, and <a href="https://en.wikipedia.org/wiki/Hamarikyu_Gardens">_Hamarikyu Gardens_</a>, a nice park and an important historic site.

  By the time I was walking through the gardens, my watch had already informed me for the fourth time that I had reached my step goal.
  Tired after many kilometers of walking, I went back to the hotel to relax a little.
  In the evening, I met a friend I knew from the Scala community who had moved to Tokyo and his wife.
  Despite Japan's absolute hostility to a vegetarian diet, they managed to find <a href="https://soranoiro-vege.com/">a place</a> that serves vegetarian and vegan ramen.
  It was that evening that I had my second encounter with an ordering machine.
  Luckily, my company was able to help me decipher the menu there.

  Needless to say, I was absolutely knackered when I returned back at the hotel, at which time my watch cheerfully congratulated me for breaking my five-fold step goal.

Wednesday, June 26
: On Wednesday, I almost woke up at a normal time (well, after 6:00).
  The plan was to visit an old friend in Kamakura, a beach town a little over an hour out south from Tokyo.
  We studied together in Munich, but a few years ago, they moved to Japan and married there.

  After yesterday's confusion, today I managed to navigate the breakfast effortlessly.
  It wasn't long until I was back at a train station, heading for Kamakura.
  Since I started my journey around 8:30, rush hour was still going strong and my connecting JR train actually was more than ten minutes late; an transgression that I didn't expect in Japan.

  A little over an hour later, I arrived at Kamakura.
  The first stop on my tour was the <a href="https://en.wikipedia.org/wiki/Hase-dera_(Kamakura)">_Hase-dera_</a> temple.
  In order to get there, I had to change into the tram-like <a href="https://en.wikipedia.org/wiki/Enoshima_Electric_Railway">_Enoshima_ railway</a> whose only purpose appears to be moving tourists around, which -- as opposed to in Tokyo -- appear to be mostly Japanese.
  My friend had already warned me that because of the <a href="https://en.wikipedia.org/wiki/Hydrangea">hydrangea</a> season, the temple area will be busy, and he was right.
  Fortunately, the blooms were a sight to behold.

<div class="row mt-3 mb-3">
  {% include article_picture.html src="kamakura-station" text="People standing in line waiting for the Enoshima Electric Railway" %}
  {% include article_picture.html src="hydrangea" text="Lots of Hydrangea" %}
  {% include article_picture.html src="hasedera-view" text="View from Hase-dera to the beach of Kamakura" %}
  {% include article_picture.html src="kebab-bento" text="A culinary abomination: Kebab Bento" %}
</div>

### ... and maybe the only time

I have set myself the goal to cease flying by end of 2019.
This, naturally, makes it hard for me to come back to Japan and maybe see other places outside of Tokyo.

{% twitter https://twitter.com/larsr_h/status/1124346158690775050 %}

Of course, I could have seen and done more things or stayed longer.
Fortunately, I have no regrets: within the limited time of one week, I'm very happy with what I have experienced.

<hr>

[^1]: It turned out to be for the better, because it would have collided with an academic trip anyway.
[^2]: Note to Asta: I didn't create a spreadsheet this time.
[^3]: with the exception of the ocean
