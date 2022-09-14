---
path: javascript-auditing-in-development
title: "Auditing a website in development "
description: JavaScript is the new black in developing new websites. Learn how
  to audit a JavaScript website while still in development!
canonical: https:///www.unikorn.se/blog/javascript-auditing-in-development
language: en
original: /blog/javascript-auditing-in-development/
og_image:
  src: ../assets/javanaut.jpg
  alt: SEO auditing a JavaScript website in development
date: 2022-09-13T13:52:24.923Z
author: Ulrika Viberg
author_page: /unikorns/ulrika-viberg/
category: Technical SEO, JavaScript SEO
featured_image:
  src: ../assets/javascriptseo.jpg
  alt: "SEO auditing a JavaScript website in development "
preamble: As building new websites in JavaScript has become more or less a
  normality for web developers, SEOers also need to learn how to audit and
  troubleshoot JavaScript site to ensure they are indexed properly.
type: blog
popup_btn: true
---
![JavaScript SEO is not Rocket Science](../assets/javascriptseo-big.jpg)

Nowadays, new websites are more often built in one of the JavaScript frameworks. As JavaScript creates a whole set of new interesting challenges for SEO, it also demands for a whole new set of skills from the technical SEOer. Naturally, as we are talking about SEO, the rules for what can be rendered and not by a searchbot, changes over time and we have to stay up to date in a universe of working from home Google devs who are literally spitting out all types of algo updates.

However, let’s back down a bit and look at why we are auditing and why we have ended up having to learn how JavaScript renders.

Product Owners and developers want to create the most amazing experience there can be for their users. Solutions that not only dazzle them, but also make them think the brand is the most modern company they can buy their things from. It is easy to forget the main reason for having a website in the first place is - to be found so that the users can interact with the content on it and go through a transaction of either money or contact information.

**The main goal with a new website is almost always to gain more visibility, traffic and often conversions.**

It is extremely important that important pages are built in a way that searchbots can crawl, index and rank them! That’s where we SEOers come in.

For us and our clients, the way to handle this new JS world inferno, has been to break everything down to smaller pieces, creating detailed requirements so that the devs know in beforehand what I will be looking at, iterative learning sessions about both SEO and tech, and then when it comes down to the testing - both me and the devs already know what I will be auditing. The devs usually already have tested the requirements and have ideas for solutions of how to test before launching the site to prod.

***The process usually looks like this:***

* We set requirements and talk to our developers, making sure they are looked at and understood
* We identify the different page templates (which helps with the testing)
* The requirements are used to set up test protocols
* We ask for frequent demos during development and to be a part of the dev team and participate to all dev planning meetings



## Time for Auditing

**✅ The first and maybe most important requirement and thing to audit is - will the searchbot be able to crawl the pages.** 

**Requirement**: All on-page elements with content should be available in the rendered code.

**Check**: Chrome dev tool manually per page type, and with Screaming Frog.Look for: Links, menu, CTAs, footer links, images, text, videos and in fold-out elements that the content is in the rendered code.



**✅ Make sure all JavaScript assets can be reached by the bots.**

**Requirement**: Make sure all JavaScript assets can be reached - do not block them in robots.txt, behind rules in CDNs, JS files that cannot be loaded or are corrupt

**Check**: the robots.txt manually and with the help of screaming frog. I often ask the CSS to be reachable as well, as it makes my job as an auditor way more easy if I can see the page properly.

**Look for**: disallowed paths that contain JS assets, crawl with SF checking the respect robots.txt and then check the JS section.



**✅ It should go really fast to load a page** (like the page you are reading now 😎)

**Requirement**: Time to first paint shouldn’t be exceeded by loading large JS resources. If we are looking at a CSR page and the assets are large, can the devs bundle and split the JS? If it's a SSR, and the assets are too heavy, can it be solved with caching?

**Check**: Chrome dev tool manually per page type.

**Look for**: number of resource calls, big chunks of loadings, how fast can the first paint be painted?



**✅ Make sure that the metas in the first load differ from metas in the rendered code**

**Requirement**: The meta data in head should be correctly set up and not changing while rendering.

**Check**: Use View rendered source add-on.Look for: Title, meta description, canonical, OG:s, hreflangs.



## Learnings from auditing 14+ new sites during the covid years

Yes, the covid years were all about new websites. Every shop needed a webshop and every established ecom needed updating to take care of the demand.

To do a proper job with auditing JavaScript in development, you absolutely need to understand how both server side and client side Javascript works and the difference between them. Today, a well optimised client side rendered page performs better than a server side without caching.

**JavaScript is here to stay for a while (until the next cool thing).**

Being friends and collaborating with the developers is key to a successful tech audit of JavaScript. Ask them to demo and talk you through everything that happens around the site. What framework is being used and why, how do they handle the caching, have they considered bundling and splitting, can you build a local rendering testing tool together?

Good luck and have fun! 🦄