+++
title = 'Tag The Map: One Year Later'
description = 'From a team-building experiment to a public application'
date = 2026-08-29T19:00:00+01:00
draft = false
tags = []
categories = ["TagTheMap", "Production"]
+++
# One year on

**[Tag The Map](https://tagthemap.com/) is now open for public use.**

Almost exactly a year ago, I wrote about [building Tag The Map](/posts/development/building-tag-my-map/) for a team-building session. It was a deliberately small, fast project: a shared map where people could add the places they had visited and prompt a few travel stories along the way.

That first version did its job. It gave the team something fun to talk about, proved that an idea could become a working application quickly, and surfaced some of the things that need careful thought when you take an application beyond a demo. The project also had a hidden agenda in that it would provide me another session I could run with the team to show them how to use agentic coding tools and AI to develop quickly. 

In the last few weeks, I have finally put the work into "productionising" it properly. 


## A useful reminder: demos and production are different things

The original version was built for one fairly controlled event. I knew who would be using it, I was present while it ran, and there was always someone available to explain what to do if a problem appeared. The admin functions existed but no isolated user for hosts beyond the admin existed. That is a very different environment from putting a link on the internet and inviting anyone to use it.

The application itself still has a deliberately simple purpose. Someone can create a session, invite people to take part, and watch a shared map fill up with their tags. The difference is the amount of work around that experience: making it reliable, keeping it secure, and making sure one person cannot accidentally or deliberately spoil it for everyone else.

That work is not always the most visible part of a project, but it is usually the part that determines whether people can actually trust it.

## Getting it ready to share

The biggest change has been moving from an application that worked in a single session to one that can cope with real users arriving at different times, from different places, with different expectations.

### Hosting and scaling

Getting the hosting right was more involved than simply putting the site online. A shared, real-time application needs to remain responsive while events are active, and it needs to handle a quieter period just as happily as a busy one.

Cloudflare has become an important part of that setup. It gives the public edge a solid foundation and helps keep delivery, protection and traffic handling close to the people using the site. It is one of those pieces of infrastructure that is easy to overlook when it is doing its job well (despite some of the more public outages of late).

The work has also meant thinking more carefully about how the application behaves as usage grows. A small group placing a few tags is one thing; several events running at once, each with people joining and updating the map, is another. Productionising the application meant concentrating on predictable behaviour under load rather than only the happy-path demo.

### Authentication and roles

The original project used a very simple approach to host authentication. That was fine for proving the idea, but it was not enough for a public application.

The public version has proper authentication and role-based access. Hosts can manage the events they create, while participants can join the experience without being given access to the controls that run it. Keeping those responsibilities separate makes the experience clearer for users and avoids giving every visitor more access than they need.

Role-based access is not the sort of feature that produces a flashy screenshot, but it makes the application feel much more complete. It provides a foundation for future features too, without needing to redesign the security model every time a new type of user is introduced.

### Abuse prevention and browser security

Opening an application to the public also means assuming that not every request will be friendly or well intentioned. The aim is not to make a small project unnecessarily complicated; it is to add sensible protections before problems arrive.

Abuse prevention has therefore become part of the product rather than an afterthought. The application now has the guard rails it needs around public access, event creation and the actions people can take within a session.

I have also spent time tightening the browser security policies. A Content Security Policy and Permissions Policy help reduce the available attack surface by being explicit about what the browser is allowed to load and do. These policies take a bit of care to put in place-especially when an application depends on third-party services-but they are a worthwhile part of making a public-facing application more resilient.

## The first week

It is early days, but the first week has been encouraging:

- 7 people signed up
- 34 participants took part in events

**_Those are not enormous numbers, and that is completely fine. They are real people using something that started as a quick idea for a team meeting. For me, that is a much more meaningful milestone than a polished demo that never gets used outside its original context._**

## Keeping it free

Tag The Map is free to use for now. I do not really expect it to become a monetised service; it is probably something that most people will visit once for an event, use, enjoy and then forget about. That is a little bit of a shame, because there is plenty more I could do with it, but it is also the nature of a small tool built for a specific moment of connection.

The only thing I ask is that, if it has been useful for your team or group, you consider a donation through [☕ Buy Me a Coffee](https://buymeacoffee.com/dave.hogan). It is completely optional. As a thank you, supporters receive upgraded limits, while the service remains free for everyone else.

## What I have learned

The experience has reinforced a few things for me:

* Rapid prototyping and demos are a million miles away from an actual production working application. 
* AI is incredible at rapid application development, but still there is a lot of work that still requires careful human review, at least for now. 
* The first version is only the beginning. A feature working once is not the same as it being ready for unfamiliar users.
* How geopolitical issues in the world are highly sensitive to people. Even the total number of countries is disputed. 
* Infrastructure, security and abuse prevention are product work. They shape whether people can use an application confidently.
* Scaling is not only about large numbers. It is about making sure the application behaves predictably when people use it in ways you did not personally orchestrate.
* Small projects are a great way to learn the habits that matter for larger ones.

## What next?

Tag The Map is now at the point where people can use it for the purpose it was originally built for: bringing a group together, seeing where everyone has been, and sparking a conversation.

There is still plenty I can improve, but making it publicly available is an important step. I am looking forward to seeing how people use it and what the next set of real-world lessons turns out to be. At the moment the busiest session was only 8 concurrent participants.

If you would like to try it, head over to [Tag The Map](https://tagthemap.com/). And if you missed the original experiment, you can read about [how it started](/posts/development/building-tag-my-map/).
Feedback welcome and can be submitted directly on the site.

### Final comment

Nothing in this post is sponsored, and I haven't been paid by any of the companies mentioned. I'm just using the tools and services I've come across and enjoyed working with.

I try to avoid using AI to write posts, so please forgive the style and grammar. In this case, though, I did use an LLM to review and restructure the post. 


I also tried out [Wispr Flow](https://wisprflow.ai/r?DAVE3980). A speech-to-text application allows me to quickly mumble my way through my thoughts. It's completely free to try as well. 


**Disclosure:** The Wispr Flow link above is my referral link. If you sign up through it, you get a month of Pro and I can also receive a free month of Pro. If you'd rather not use my referral link, just Google Wispr Flow instead.