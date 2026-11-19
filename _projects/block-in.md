---
layout: project
title: "Block In: Plan Your Painting in Layers"
channel: ai
also: [design]   # extra channels this project also shows up under
year: 2026
featured: false   # true = shows in Now Playing on the homepage
summary: "A free tool that turns a painting reference into simple shapes, paint mixes and a back-to-front painting order, with a grid that matches your canvas."
role: "Idea, design, testing"
tools: "Claude"
link: /blockin/
link_label: "Open Block In"
image: /images/block-in/cover.jpg
image_alt: "Block In's three steps on Monet's Jardin à Sainte-Adresse: the reference, the depth layers, and the simplified color map"
---

## The idea

I got back into acrylic painting after about ten years, and the hardest part wasn't the brushwork. It was planning: which shapes to block in, which paints to mix, and what order to put them down in. Block In does that planning with you.

[**Open Block In →**](/blockin/)

## What it does

<div class="steps-row">
  <figure><img src="/images/block-in/step-1-reference.jpg" alt="Monet's Jardin à Sainte-Adresse, the reference image" loading="lazy"><figcaption>1. Reference</figcaption></figure>
  <figure><img src="/images/block-in/step-2-depth.jpg" alt="The same painting split into far, middle and near depth layers" loading="lazy"><figcaption>2. Depth</figcaption></figure>
  <figure><img src="/images/block-in/step-3-colors.png" alt="The painting simplified into numbered flat color blobs on a grid, with a color strip" loading="lazy"><figcaption>3. Colors</figcaption></figure>
</div>

*Example: Claude Monet, Jardin à Sainte-Adresse (1867), one of my favorites.*

1. **Image.** Drop in a reference photo. It stays in your browser; nothing is uploaded.
2. **Depth.** Mark what's far away, in the middle and close, by tapping chunks or brushing over them.
3. **Colors and mixes.** It simplifies the image into flat color blobs, and gives a mixing recipe for each one using only the acrylic paints you own.
4. **Paint order.** It works out a step-by-step order (back to front, darkest to lightest within each layer) and lets you tap any grid square to see what to paint there.

## Why it's free

AI isn't going anywhere, so I'd rather use it to build tools that help creatives than tools that try to replace them. Block In doesn't make the painting for you. It handles the planning so you can spend your time actually painting. And it's free, with no account and nothing to install.

## How AI was used

I built Block In with Claude. I came up with the idea from my own painting, decided what each step should do and how it should explain things, and tested it on my own references. Claude wrote the code, including the color simplification and the paint-mixing model, through rounds of my feedback.
