---
layout: project
title: "Detective Game Proof of Concept"
channel: games
year: 2023
featured: false   # true = shows in Now Playing on the homepage
summary: "A Unity proof of concept where you investigate by photographing evidence, and what you show suspects changes what they say."
role: "Environment, cameras, triggers, photo evidence system"
tools: "Unity"
# image: /images/detective-game/cover.jpg   # uncomment once you add a cover image
---

## The idea

A proof of concept that my roommate and I created in May 2023. He created the movement system and the camera, while I was responsible for the creation of the environment and the placement of the cameras and triggers.

{% include embed.html ccv="Cqo96DPSTTc" title="Proof of concept walkthrough" %}

## Photo evidence system

Below is a video of me demonstrating the camera system that I created. The system lets you capture and store images that the player can view later. This video demonstrates using raycasts to also store a description of what object was photographed.

The idea is that the game would revolve around taking photos as evidence, pushing the player to make their own discoveries rather than letting the game hand you evidence that leads to conclusions. For example, taking a photo of the correct evidence and showing it to a suspect would trigger different dialogue than something irrelevant, like a toilet.

{% include embed.html ccv="NgYus6h9-zw" title="Camera and evidence system demo" %}
