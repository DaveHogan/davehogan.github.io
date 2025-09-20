---
title: "Building Tag The Map"
description: "Using xAI: Grok Code Fast 1 with Kilo Extension"
date: 2025-09-19
draft: false
categories: ["development"]
tags: ["team building", "TagTheMap", "xAI", "Kilo"]
---

# Overview
In my day job, the wider team that I am a part of run a twice monthly *informal-ish* team meeting. The format is that we each take turns to host and cover various. These are mostly non-work related *fun* activities or discussions. It's a good way for team bonding and getting to know each other better at a personal level, especially when we're spread across various geographical regions. 

As my turn has come up again, I wanted to achieve something slightly different. In the past, we've covered our favourite books, films, music, our character traits and hosted quizzes. I wanted to come up with something that:
 * Meets the goal of an inclusive, fun and friendly team building activity
 * Show case the power of modern AI development tools. 
 
 An idea came to me late Saturday and the meeting was Monday. My thought process was "what could be achievable in 24 hours? This could really showcase some rapid development".

## What I decided on
I decided to create a very simple tool to allow users to add locations on a map to show were they've been! Hopefully prompting discussion about our travel experiences and visualise the diverse places the team have lived or travelled to. With the help of ChatGPT, I came up with a name and domain [Tag the Map](https://tagthemap.com). I find this a really useful way to conceptualise ideas like this.
Because I don't get to use these tools in my day job and I wanted to give xAI: Grok Code Fast 1 a whirl in my own time and this was a perfect opportunity to do that but also share the outcome. The xAI: Grok Code Fast 1 model is new and Kilo is currently offering free usage for a limited time!

## Key Features of the idea/application
- Host can start an event (generates 8-character code, authenticated)
- Host can view/stop past sessions
- Host shares screen, sees real-time mouse movements and clicks
- Users join via code, enter initials, pick a color (default random)
- Users can click up to 20 places on a map, leaving a pin/circle with initials

## Self imposed rules
I came up with a few self imposed rules to really showcase the tools and models available
* Only use Visual Studio Code with the Kilo Extension (Kilo combines the best features of AI coding tools, supporting many models, free and open-source) - [kilocode.ai](https://kilocode.ai)
* Use only ChatGPT for brain storming / idea generation, no coding.
* Only use Kilo AI extension with xAI: Grok Code Fast 1 as the model
* Limited usage of my prior coding knowledge and experience. I want this to be more about the capabilities of Agent tools, although this isn't a vibe code or attempt at a one-shot.

## The first prompt
To begin, I came up with the initial prompt. I wasn't trying one-shot this but did try to be clear on the basic boiler plate. I gave it some guidance on the tech stack and structure I wanted because that's what I'm interested in right now and most familiar with. I already have the Azure Infra to hand so that was a deciding factor.

The first prompt I came up with was simple:

```
I'm hosting a team building event. I want to develop a web application that captures which countries and places colleagues have been too.
This is only for fun and to spark discussion.

I want a host to be able to start an session. This feature will be authenticated. Starting an session should generate an 8 character code for participants to join.
The host should be able to see past sessions and be able to stop them.

The host will share their screen for the duration of the event and will see real-time mouse movements and places where people have clicked.
The user should see an entry screen to be able to enter the event using the generated code. It should prompt them for initials and a colour picker (but default to a random colour).

The user can then click up to 20 places on the map. This will leave a circle or a pin on the map with the users initials for all to see.

I would expect the web application to structured similar this:
/ - Home page with a basic intro with button to join a session
/join-session - place for users to enter their code to join an active session with their code, initial and colour
/session - real time map full screen with users cursors and plots on the map. The user can click to add where they've been and can right click to clear their own plot. Once the session is over. It should be read only but the cursors can remain. We should also have a participants list visible
/admin - dashboard
/admin/session-management/ - where the admin can manage the session

Folder structure
/src - code
/docs - docs
readme.md
releaseNotes.md

Use EF core for persistence.
Blazor should support real time interactivity
This will be hosted on an Azure App Service.

The host authentication should be very simple for now. Perhaps just basic auth for now.
The Host should also have the ability to join the session and plot their places.

Before implementing if you have clarifications you need, prompt me for them before you continue.
Follow best practices for .NET 9 Blazor (Server). I do not have a separate API project, so include controllers in the local web app.
```

The last two sentences, I ask the model to clarify any assumptions and questions. I've always found to be really useful and this was true for this project.

Kilo (using xAI: Grok Code Fast 1) came back to me with a couple of clarifications. Firstly on the mapping library to use:

```
What map library or API do you prefer for displaying the interactive map (e.g., Leaflet, Google Maps, OpenStreetMap, or another)?

Leaflet.js for open-source and customizable maps
Google Maps API for rich features and familiarity
OpenStreetMap with a library like OpenLayers
Another specific library or custom implementation
```

Another interesting feature of Kilo is that you can ask it enhance your prompt before you submit it. I didn't use this feature for this prompt but I have found it useful in the past.

After responding that I would like to use [Leaflet.js](https://leafletjs.com) (an an open-source JavaScript library for mobile-friendly interactive map), it asked for more clarifications around the auth. 

It produced the following todo list of tasks:

```
[ ] Set up project structure: Create /src directory, initialize .NET 9 Blazor Server project, add /docs, readme.md, releaseNotes.md
[ ] Configure EF Core: Add Entity Framework Core packages, set up DbContext, configure SQLite for development and SQL Server for production
[ ] Define data models: Create Session, Participant, Place entities with relationships (Session has Participants, Participants have Places)
[ ] Implement basic authentication: Add middleware for /auth route with hardcoded credentials (host/team2024), protect admin routes
[ ] Create admin dashboard: Implement /admin page for host to view active sessions and access session management
[ ] Implement session management: Build /admin/session-management page to create new sessions (generate 8-char code), list past sessions, stop active sessions
[ ] Create home page: Design / page with intro and button to join session
[ ] Implement join session page: Build /join-session with form for code, initials, color picker (default random), validate and join session
[ ] Set up real-time infrastructure: Configure SignalR for real-time updates (cursors, clicks, participants)
[ ] Integrate Leaflet.js: Add Leaflet to project, create map component for /session page
[ ] Implement session page: Full-screen map with real-time cursors, click to add places (up to 20 per user), right-click to remove own places, participants list
[ ] Add host participation: Allow host to join their own session and plot places like users
[ ] Handle session end: Make map read-only after session stops, keep cursors visible
[ ] UI/UX polishing: Ensure responsive design, add loading states, error handling
[ ] Testing: Unit tests for models and controllers, integration tests for real-time features
[ ] Deployment preparation: Configure for Azure App Service, add appsettings for production database
```

The Agent mode in Kilo began to proceed through each todo. It did a fairly good job with the skelton. It needed only some basic manual tweaking and the inclusion of some NuGet packages that it decided to use yet didn't reference in the project.

I reviewed the output after it completed all of the above, after which I began a series of further refining prompts, reviewing its implementation and some minor manual development. The end result produced what became the final result that I demo'ed to the team.

## Effort and build time
I hate the term and the concept of "vibe coding" but I did rely heavily on xAI: Grok Code Fast 1 model. As per the initial plan, I deliberately avoided using too much of my technical knowledge and programming experience. 

The purpose of this was to showcase the tools available and how far it's come.

All in all, it was demo-able within approximately 5 hours of effort broken down as:

- 30 mins - creating the prompt, validating and designing the idea
- 15 mins - infra with Azure, Cloudflare and purchase of the domain [TagTheMap.com](https://tagthemap.com)
- 15 mins - visual design (used [favicon.io](https://favicon.io/emoji-favicons/) for generating the Favicon)
- 90 mins - prompting and manual coding
- 90 mins - refining, reviewing and testing
---

## The experience of the model and tooling
Overall very pleasant and trouble free, specifically: 

### The Kilo experience
At home, I mostly use a Mac for developing (approx 90% of my time). At work, I'm 100% Windows. The reason I mention this is the experience has been different between Window and Mac, even when using Visual Studio Code and Copilot.

I've used Kilo previously and after this project, I'm starting to favour it over both Cursor and Copilot.
As Cursor is a fork of Visual Studio code, thanks to Microsoft Licensing agreements, you cannot use C# Dev Kit which prevents debugging. C# Dev Kit has to run in native Visual Studio code and not any of the forks. 
This makes Cursor a pain to debug and run your application. Another concern I have with Cursor is the extension marketplace not being vetted to the same standards as Microsoft's. This incident of a [Cursor IDE Malware Extension Compromise in $500k Crypto Heist](https://snyk.io/blog/cursor-ide-malware-extension-compromise-in-usd500k-crypto-heist/) has me being extra vigilant.

Copilot (mostly on Windows) randomly stops mid applying mid way through, files are often not saved or get truncated. The most annoying thing is on Windows I get files that are "stuck" on Accept/Reject of the change. I see on Microsoft's Developer Community feedback forums that I'm not alone with these frustrations.

Kilo has not yet borked a single apply and always completes its task. Being an extension in native Visual Studio Code makes it seamless to use. Kilo might not always complete all tasks but it will explain why and the next steps to continue.

### The xAI: Grok Code Fast 1 model
I've used various other models over the last year (OpenAI ChatGPT models, Claude Sonnet 3.5, 3.7 and 4). Honestly, xAI: Grok Code Fast 1 is up there in terms of output quality but the most noticeable benefit is the speed. It's far quicker than all the modern, larger context models, but maybe not quite as "intelligent"? It's hard to quantify the intelligence but it didn't always produce the cleanest or up to date code. 
It can end up doubling up on dependencies and implementations. I noticed this mainly on DTOs and Classes etc.. This is why reviewing the output is so important to avoid code duplications and smells. A slight manual tweak or another prompt soon corrected this though. I can be opinionated about my project style at times so this does cause some annoyance. 

Another thing I've experienced with all models but more so with xAI: Grok Code Fast 1 model is broken EF Core queries. Often doing projections where it's not possible translate.

Overall though, it's effective, cost efficient and well worth experimenting with.

## End UI/UX Result
The end result of the application is fully functional and in my view and nice modern visual feel for the UI and UX. 
Here's some screenshots of the features and back-end analytics.

### Main user experience
  ![Map showing locations marked by users](/images/Example-Session.png)
  ### Completed Analytics
  ![Image should analytics of a completed session. Top users, countries etc...](/images/TagTheMap-SessionAnalytics.png)
  ### Admin Dashboard
  ![Admin dashboard showing the completed sessions](/images/TagTheMap-Dashboard.png)

## Costs
Being a pet project and only for a team building session, costs were a limiting factor. I could have easily not spent anything by not using a custom domain and used a different storage persistence such as Azure Table Storage. The costs are broken down as:
- £10 - Purchase of the domain - optional but I want to share this.
- £5 - DB Hosting in Azure, re-using an existing App Service Plan
- £0 - Kilo (free) and xAI Grok Code Fast 1 (currently free during preview)

*If this needed to scale to more than a handful of users, I would need to implement an Azure SignalR Service and a higher tier App Plan and database.*

## Project and Source code
I plan to open-source this on Github [TagTheMap](https://github.com/DaveHogan/TagTheMap) (MIT licensed) but I do need to separate out things first and therefore left it private for now. If there is interest please drop me a message.

## How did the Team meeting go?
If you've got this far, you might be wondering how it was perceived and was it a success?
I managed to show the application without the team cottoning on that it was something I developed. There's nothing quite like honest feedback when the users are unknowingly using something you created.
Overall I would say it was a success. The things that went wrong showed that careful review and actual development experience is still very much required. The models are great and generating boiler-plate, design to some extent but do require clear and specific prompt and guidance bringing it track. 

### The Good
* Most users eventually got in and successfully placed all their "tags". The tool worked!
* The team completed the map!
* Mobile experience was usable as some users had to drop from desktop to mobile (see the below for why!)
* Feedback was mostly positive

### The Bad
There were few things that went wrong, and not necessarily anything the AI tooling did wrong. With more time and review, these could have been caught, but it's worth highlighting some of the pitfalls.
* **Reserve geo lookup**
  
  The end of session analytics incorrectly grouped countries with nearby ones. This is a big miss and can understandably cause problems with conflicts, disputed territories, and the like. The reason turned out to be that reverse geo-locating (when you convert lat and long to regions and countries) is hard. It typically costs money if you want up-to-date and accurate results. The LLM created a basic implementation with the comment `Simplified country detection based on coordinates. In a production app, you'd want to use a proper reverse geocoding service`. I missed this / assumed the accuracy would be good enough. It wasn't!

  ![Image showing C# code that poorly determines countries by rough coordinates](/images/GeographyService-half-baked-reverse-geocoding.png)

* **Newly registered domain** 
  
  The application was blocked by some corporate proxies. This is because of a filter that correctly identified that this was a newly registered domain. Bad actors often knock up sites on newly registered domains in a disposal fashion for phishing sites. Ironically, I decided to invest on a custom domain to avoid proxies potentially blocking sites hosted on the domain `azurewebsites.net`. Newly registered domain (less than 24 hours in this instance) can rightly be flagged as a risk. Fortunately the app worked well on personal mobile devices as a workaround. Whilst in my prompts, I did mention it should be mindful of mobile users and use responsive design, touch gestures etc... it wasn't thoroughly tested on mobile devices.

* **Locating Countries**
  
   Limitations of the OpenStreetMap tiles, which Leaflet uses by default, meant that country names were not specifically using their English equivalents. It can be hard for English speaking users to locate countries that are known to them by their English name. Analysis after the demo, I've discovered this is a limitation with OpenStreetMap and not easily rectifiable without using a third-party tile or a more enterprise solution like Bing Maps or Google Map. I avoided those specifically for cost and privacy reasons.

### Learnings
Not all learnings and lessons are technical in nature. It was a good experience and learnt a few things along the way
* More empathy for other people experiences and viewpoints.
* Don't register a domain and expect it to work behind corporate proxies / security filters without history.
* Countries can span multiple continents. I guess I hadn't ever thought about it and assumed.
* Accurate reverse geo-locating is hard or expensive.

### Next steps
Now the team know the real purpose of my travel discussion, I've now volunteered to run a session explaining in more details on _how_ I built this. I will be scheduling in a run-through with some slides in coming weeks and write up in more detail. I developed this and what learnings can we take to make use of AI. 

As for TagTheMap.com, I may open this up to the public but to get it to scale would require extending the infrastructure. Without monetising this in some way, it will blow up my Azure bill and honestly, I doubt there is much desire for this in the real world.

If this has been useful or have specific questions on my experience with Kilo or xAI: Grok Code Fast 1, drop me a comment.

### Final comment
Nothing in this post is sponsored or affiliated in any way. I'm just using the tools and services I've come across and enjoyed working with. I also do not use AI to write posts, so please forgive the style, grammar and accuracy :)