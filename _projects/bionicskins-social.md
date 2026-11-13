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
### Instagram

<div class="posts posts--feed">
{% for p in posts.instagram %}{% include post-embed.html platform="Instagram" post=p %}{% endfor %}
</div>

### Facebook

<div class="posts posts--feed">
{% for p in posts.facebook %}{% include post-embed.html platform="Facebook" post=p %}{% endfor %}
</div>

{% if posts.linkedin.size > 0 %}
### LinkedIn

<div class="posts posts--feed">
{% for p in posts.linkedin %}{% include post-embed.html platform="LinkedIn" post=p %}{% endfor %}
</div>
{% endif %}

More of this work, including the search audit, is on my [BionicSkins client page](/freelance/clients/bionicskins/).
