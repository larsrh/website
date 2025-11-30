---
title: "How I offset carbon emissions"
lang: en
date: 2024-04-09
---

I have been on a lot of flights in my life, and I continue to fly.
This page is to make transparent my efforts to offset the carbon emissions caused by those flights.

I am aware that reducing carbon emissions is vastly better than offsetting them, which is why I prefer trains and other types of public transit, if available.

## The data

I use a tool to compile a dataset of all flights that I remember taking.
The dataset includes at least departure and arrival airports.
Other than that, the data quality varies:

* Before 2015, the data is based on approximations.
  I am resonably sure that I have covered every flight but collected no further details (e.g. airlines and flight numbers).
* Before 2019, I did not collect the airplane model.
* Since 2019, I collect airplane model and airline.

Those caveats notwithstanding, the data reaches all the way back to age ten.
I'm sure I was on some flights before that, but those are lost in the mists of time.

## The offsetting

I started buying offsets in 2019 and use a variety of providers.
The following are links to statements regarding their methodology:

* [atmosfair](https://www.atmosfair.de/en/climate-protection-projects/)
* [myclimate](https://www.myclimate.org/en/get-active/climate-protection-projects/)
* [Primaklima](https://www.primaklima.org/projekte/unsere-projekte/)

To cover flights before 2019, I computed the total miles of flight until that time, which came out to 136,237 miles.
I emailed atmosfair and they estimated approximately 64 t of carbon emission, based on an assumed 50/50 split of medium- and long-haul flights.

For flights from 2019, I used atmosfair's calculator to estimate individual emissions, taking into account e.g. airplane model and seat class.

From 2024, I will switch to another set of providers, focusing on buying and cancelling carbon certificates from the European market:

* [Compensators](https://www.compensators.org/en/compensators/)
* [ForTomorrow](https://www.fortomorrow.eu/en)

I am happy about suggestions.
(The listings above should not be construed as endorsements.)

From 2025, offsetting also includes some of my partner's flights.
Conversely, some work flights are excluded: they are partly compensated by my employer.

## The receipts

This table lists all compensations on a rolling basis.
I typically do 2–3 of them a year, batching a few past and/or future flights together.

<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Provider</th>
      <th>Cost (€)</th>
      <th>Mass (kg)</th>
      <th>kg/€</th>
    </tr>
  </thead>

  {% assign total_cost = 0 %}
  {% assign total_kg = 0 %}

  <tbody>
    {% for offset in site.data.carbon %}
      <tr>
        <td>{% include date.html date=offset.date %}</td>
        <td>{{ offset.provider }}</td>
        <td class="text-align-right">{{ offset.cost }}</td>
        <td class="text-align-right">{{ offset.kg }}</td>
        <td class="text-align-right">{{ offset.kg | times: 1.0 | divided_by: offset.cost | precision: 2 }}</td>
      </tr>

      {% assign total_cost = total_cost | plus: offset.cost %}
      {% assign total_kg = total_kg | plus: offset.kg %}
    {% endfor %}
  </tbody>

  <tfoot>
    <tr>
      <td class="text-align-right" colspan="2"><strong>Sum</strong></td>
      <td class="text-align-right"><strong>{{ total_cost }}</strong></td>
      <td class="text-align-right"><strong>{{ total_kg }}</strong></td>
      <td class="text-align-right"><strong>{{ total_kg | times: 1.0 | divided_by: total_cost | precision: 2 }}</strong></td>
    </tr>
  </tfoot>
</table>
