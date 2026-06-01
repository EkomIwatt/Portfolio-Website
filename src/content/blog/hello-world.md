---
title: "Hello, World! — Building My Portfolio in Public"
description: "How I designed, built, and shipped my portfolio website in 13 days — the palette I picked, the stack I chose, and the two challenges that nearly broke the project."
pubDate: 2026-01-23
series: "Blue, Cream, and Code"
readingTime: "5 min read"
---

Welcome to my corner of the internet 😇

As a third-year Computer Engineering student at Unilag, I spend a lot of time thinking about code, circuits, and systems. But recently, I've been thinking about something else: **identity**. How do I represent who I am and what I can do?

I set a goal for myself to build a CV I'm proud of by the end of 2026. But a CV felt like only a polite handshake. I needed something dynamic; a living, breathing place that could grow alongside my skills.

> So, on the 2nd of January, I set a strict personal deadline: **January 15, 2026**. I had to design, build, and deploy a portfolio website.

Here is the story of how it came together.

## 1. The Conception: "Techy, but Warm"

I didn't want a website that looked like a generic template. I wanted it to feel approachable yet professional—a site that says "hire me" without sounding like a corporate robot.

I settled on a specific design philosophy: **Simple, tech-oriented, yet warm.** Instead of the standard stark black and white, I visited [Color Hunt](https://colorhunt.co/) and found a palette that I really liked for its calmness:

| Hex | Name |
| --- | --- |
| `#213448` | Deep Blue |
| `#547792` | Muted Blue |
| `#94B4C1` | Accent Blue |
| `#EAE0CF` | Warm Light |
| `#F9F7F2` | Paper White |

Then I began building and implementing ideas because I wasn't even certain what exactly I wanted to do.

## 2. The Stack

I wanted the user experience to be clean, so I decided to stick to the fundamentals to ensure I had full control over the performance and layout.

- **HTML5 & CSS3:** For the structure and styling.
- **JavaScript:** To bring the interactivity to life.

Then I actually stumbled upon **Tailwind CSS** for the first time. I know I've seen it in code a couple of times, but I never realised it was literally CSS in HTML. Anyway, I fell in love with it in a day. It really sped up my styling process and helped maintain consistency and responsiveness.

## 3. The Challenges (It wasn't all smooth sailing)

No project is complete without a few headaches. Two specific challenges stood out during the build:

### The Mobile Background

I spent a significant amount of time wrestling with the hero section. On a desktop, the background image looked great. On mobile? Not so much. It clashed with the text and made things unreadable. I eventually had to pivot, stripping the background image on smaller screens and using a placeholder for the image—kinda like a profile picture. It was a lesson in "function over form."

### The Contact Form

I wanted people to be able to reach me directly without opening their email client. Integrating **EmailJS** seemed straightforward at first, but that wasn't the case when I got into it. I had to style, then debug the form receiving logic. Honestly, it took more coffee than I'd like to admit. Getting that first successful test email was a massive relief.

## 4. What's Next?

This website is just the container; now I need to fill it.

Overall, I learnt a lot in the process. From GitHub to Tailwind to EmailJS, I now have a ton of new knowledge and discovered tools. Previously, all I did was learn and learn—my siblings say I study too much. But with this journey, I fully realised that I need to stop 'learning' and start 'doing'.

Over the coming months (and years), I'll be documenting my journey here; from my experiments with **Arduino and embedded systems** to my deep dives into **C++ and Rust**. And beyond code and tech, I'll write about just about anything that comes to mind on my Blog, so stay tuned!

If you're reading this, thanks for stopping by. The site is live, the code is shipped, and I'll keep making adjustments and additions. I'm ready for the next bug!

---

*Update (June 2026): I've since rebuilt this site from the ground up — new stack (Astro), new dark "vibecoder" design, the one you're reading this on. The original version this post is about is preserved exactly as it shipped — [see the original site here](/Portfolio-Website/v1/).*
