---
title: "Building Tag The Map"
description: "Using xAI Grok Code Fast 1 with Kilo Extension"
date: 2025-09-19
draft: false
categories: ["development"]
tags: ["team building", "TagTheMap", "xAI", "Kilo"]
---

# Overview
In my day job, the wider team I am a part of, run a twice monthly *informal-ish* team meeting. The format is that we each take turns to host and cover various. These are mostly non-work related *fun* activities or discussions. It's a good way for team bonding and to deliberate in  getting to know our colleagues better, especially when spread across various geographical regions. 

As my turn has come up again, I want to achieve something slightly different. In the past, we've covered about books, films, music, character traits and hosted quizzes. How could I meet two goals.
 * Meet the goal by discussing our travel experiences such as where we've been too / our favourite places and visualise the teams results.
 * Show case the power of modern AI development tools. This idea came to me late Saturday and the meeting was Monday. My thought process was "what could be achievable in 24 hours? This could really showcase some rapid development".

## What I decided on
I decided to create a very simple tool to allow users to add locations on a map to show where they've visited. 
With the help of ChatGPT, I came up with a name and domain [Tag the Map](https://tagthemap.com). I find this a really useful way to conceptualise ideas like this.
Because I don't get to use these tools in my day job and I wanted to give xAI Grok Code Fast 1 a whirl in my own time. The model is new and Kilo is currently offering free usage!

## Key Features of the application
- Host can start an event (generates 8-character code, authenticated)
- Host can view/stop past sessions
- Host shares screen, sees real-time mouse movements and clicks
- Users join via code, enter initials, pick a color (default random)
- Users can click up to 20 places on a map, leaving a pin/circle with initials

## Self imposed rules
* Only use Visual Studio Code with the Kilo Extension (Kilo combines the best features of AI coding tools, supporting many models, free and open-source) - [kilocode.ai](https://kilocode.ai)
* Use only ChatGPT for brain storming / idea generation, no coding.
* Only use Kilo AI extension with xAI Grok Code Fast 1
* Limed usage of my prior coding knowledge and experience. I want this to be more about the capabilities of Agent tools, although this isn't a vibe code or attempt at a one-shot.

## The first prompt
This prompt I went with isn't aimed at trying to one-shot this. I gave it some guidance on the tech stack and structure I wanted because that's what I'm interested in right now and most familiar with. I already have the Azure Infra to hand.

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

The last instructions about asking clarifying questions I've always found to be really important and this is true for this initial prompt.
Kilo came back to me with clarifications on the mapping library to use:
```
What map library or API do you prefer for displaying the interactive map (e.g., Leaflet, Google Maps, OpenStreetMap, or another)?

Leaflet.js for open-source and customizable maps
Google Maps API for rich features and familiarity
OpenStreetMap with a library like OpenLayers
Another specific library or custom implementation
```

Another interesting feature of Kilo is that you can ask it enhance your prompt before you submit it. I actually didn't use this feature for this prompt but I have found it useful in the past.

After responding that I would like to use [Leaflet.js](https://leafletjs.com) (an an open-source JavaScript library for mobile-friendly interactive) it asked for more clarifications on the auth and produced this todo list of tasks:

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

This went off and did a fairly good job with the skelton. It needed some manual tweaking and including of some NuGet packages it decided to use but didn't reference.
I review from this point and began a series of further refining prompts, review and manual development to produce what was demo'ed to the team.

## Effort and build time
I hate the term and the concept of "vibe coding" but I did rely heavily on xAI Grok Code Fast 1. I deliberately avoided using too much of my technical knowledge and programming experience. The purpose was to showcase the tools available. I've used a few models previously and honestly, xAI Grok Code Fast 1 is up there in terms of output but the most noticeable benefit is the speed. It's far quicker but maybe not quiet as "intelligent".

All in all, it was knocked up and demo-able within approximately 5 hours of effort broken down as:

- 30 mins - creating the prompt, validating and designing the idea
- 15 mins - infra with Azure, Cloudflare and purchase of the domain [TagTheMap.com](https://tagthemap.com)
- 15 mins - visual design (used [favicon.io](https://favicon.io/emoji-favicons/) for generating the Favicon)
- 90 mins - prompting and manual coding
- 90 mins - refining, reviewing and testing
---
## End UI/UX Result
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

## Project and Sourcecode
I plan to open-source this on Github [TagTheMap](https://github.com/DaveHogan/TagTheMap) (MIT licensed) but I do need to separate out things first and therefore left it private for now. If there is interest please drop me a message.

## How did the Team meeting go?
If you've got this far, you might be wondering how it was perceived and was it a success?
I managed to show the application without the team cottoning on that it was something I developed. There's nothing quite like honest feedback when the users are unknowingly using something you created.
Overall I would say it was a success. The things that went wrong showed that careful review and actual development experience is still very much required. The models are great and generating boiler-plate, design to some extent but do require clear and specific prompt and guidance bringing it track. 

### The Good
* Most users eventually got in and successfully placed all their "tags". The tool worked!
* We completed the map!
* Mobile layout seemed to be usable as some users had to drop from desktop to mobile (see the below for why!)
* Feedback as mostly positive

### The Bad
There were few things that went wrong, and not necessarily anything the AI tooling did wrong. With more time and review, these could have been caught, but it's worth highlighting some of the pitfalls.
* **Reserve geo lookup**
  
  The end of session analytics incorrectly grouped countries with other nearby countries. This is a big miss and can rightly cause great upset with conflict, disputed territories and such. The reason turned out to be that reverse geo-locating (when you convert lat and long to regions and countries) is hard. It typically costs money if you want up-to-date and accurate results. The LLM created a basic implementation with the comment `Simplified country detection based on coordinates. In a production app, you'd want to use a proper reverse geocoding service`. I missed this / assumed the accuracy would be good enough. It wasn't!

  ![Image showing C# code that poorly determines countries by rough coordinates](/images/GeographyService-half-baked-reverse-geocoding.png)

* **Newly registered domain** 
  
  The application was blocked by some proxies because it was a newly registered domain. I decided on a custom domain to avoid the shared `azurewebsites.net` domain thinking that could be problematic, when in fact a newly registered domain (less than 24 hours in this instance) can rightly be flagged as a risk. Fortunately the app worked well on personal mobile devices. Whilst was in my prompts did mention it should be mindful of mobile and use responsive design and touch gestures, it wasn't thoroughly tested on mobile devices.

* **Locating Countries**
  
   Limitations of the OpenStreetMap tiles, which Leaflet uses by default, meant that country names where not specifically using their English alternative names. It can be hard for English speaking users to locate countries that are known to them by their English name. Analysis after the demo, I've discovered this is a limitation with OpenStreetMap and not easily rectifiable without using a third-party tile or a more enterprise solution like Bing Maps or Google Map. I avoid those specifically for cost and privacy reasons.

### Learnings
Not all learnings and lessons are technical in nature. It was a good experience and learnt a few things along the way
* More empathy for other people experiences and view points.
* Don't register a domain and expect it to work behind corporate proxies / security filters without history.
* Countries can span multiple continents. I guess I hadn't ever thought about it and assumed.
* Accurate reverse geo-locating is hard or expensive.

### Next steps
Now the team know the real purpose of my travel discussion, I've now volunteered to run a session explaining in more details on _how_ I built this. I will be scheduling in a run-through with some slides in coming weeks and write up in more detail. I developed this and what learnings can we take to make use of AI. 

As for TagTheMap.com, I may open this up to the public but to get it to scale would require extending the infrastructure. Without monetising this in some way, it will blow up my Azure bill and honestly, I doubt there is much desire for this in the real world.

If this has been useful or have specific questions on my experience with Kilo or xAI Grok Code Fast 1, drop me a comment.

### Final comment
Nothing in this post is sponsored or affiliated in anyway. I'm just using the tools and services I've come across and enjoyed working with. I also do not use AI to write posts, so please forgive the style, grammar and accuracy :)