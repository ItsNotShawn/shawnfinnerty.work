---
layout: project
title: "BionicSkins Social Media"
channel: design
year: 2026
featured: false   # true = shows in Now Playing on the homepage
summary: "Weekly social posts for a Boston prosthetics startup: plain-language explainers on how their custom liners and sockets work, made for patients, families and clinicians."
role: "Content strategy, design, writing"
tools: "Canva"
link: https://www.instagram.com/bionicskins/
link_label: "BionicSkins on Instagram"
# image: /images/bionicskins-social/cover.jpg   # uncomment once you add a cover image
---

## The brief

BionicSkins makes custom prosthetic liners and sockets designed from a CT scan of the limb, instead of a plaster mold. Since August 2026 I've been making their weekly posts for Instagram, Facebook and LinkedIn.

## The approach

- **Explain the tech plainly.** Most people have never thought about what's inside a socket. The posts show it simply, without sounding like an ad.
- **Write for each audience.** Patients and families on Facebook and Instagram get friendly, plain explanations. Prosthetists on LinkedIn get more technical framing, always as a tool that supports their work, never one that replaces it.
- **Keep it sustainable.** About one post a week, reusing photos and assets they already had, so the plan was easy to keep up.

## Recent posts

{% assign posts = site.data.bionicskins_posts %}
{% include post-carousel.html name="Facebook" angle="Plain, friendly explanations for patients and their families." posts=posts.facebook results=posts.results.facebook %}
{% include post-carousel.html name="Instagram" angle="Visual posts for a younger audience." posts=posts.instagram results=posts.results.instagram %}
{% include post-carousel.html name="LinkedIn" angle="More technical framing for prosthetists: a tool that supports their work, not one that replaces it." posts=posts.linkedin results=posts.results.linkedin %}

More of this work, including the search audit, is on my [BionicSkins client page](/freelance/clients/bionicskins/).
