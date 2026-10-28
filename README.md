# shawnfinnerty.work

Personal site for Shawn Finnerty. GitHub Pages builds it with Jekyll automatically on every push to `main`.

## Where things live

| What | Where | Shows up at |
|---|---|---|
| Homepage (channel select + Now Playing) | `index.html` | `/` |
| Freelance hub | `freelance/index.html` | `/freelance/` |
| Concept (example) projects | `_concepts/*.md` | `/freelance/examples/<file-name>/` |
| Client work + testimonials | `_clients/*.md` | `/freelance/clients/<file-name>/` |
| Personal projects | `_projects/*.md` | `/portfolio/<file-name>/` |
| Portfolio channels (names, numbers, colors) | `_data/channels.yml` | filter buttons + chips |
| Styles / scripts | `assets/css/site.css`, `assets/js/site.js` | |

## Add a portfolio project

Copy any file in `_projects/`, rename it (the file name becomes the URL), and edit the top section:

```yaml
title: "Project name"
channel: games          # games, hardware, motion, design, or photo-sound
also: [design]          # optional: extra channels it should also appear under
year: 2026              # newest first on the portfolio page
featured: true          # true = appears in Now Playing on the homepage
summary: "One line about it."
image: /images/my-project/cover.jpg   # leave out to show the "no signal" placeholder
```

Write the page body in Markdown underneath. Put images in an `images/` folder.

## Channel animations (idents)

Each portfolio channel has a slot for your own animation. It shows on the channel tiles at the top of `/portfolio/` and as the header band on that channel's project pages.

1. Export your animation as a short, wide (16:9) **.mp4** (or .webm / animated .gif). Aim for 3 to 8 seconds and under ~2 MB, with no audio.
2. Put it in an `idents/` folder, e.g. `idents/games.mp4`.
3. In `_data/channels.yml`, uncomment that channel's `ident:` line.

Two playback modes (`ident_mode:`):
- `loop` (default): plays on repeat while it's on screen.
- `scroll`: the video scrubs forward and back as the visitor scrolls. For smooth scrubbing, export with a keyframe on every frame:
  `ffmpeg -i in.mov -c:v libx264 -g 1 -pix_fmt yuv420p -an -vf scale=1280:-2 idents/motion.mp4`

All animations pause when a visitor turns Motion off in the on-screen MENU (or if their system asks for reduced motion).

## The mini TV

The little TV in the bottom-left corner tunes to each page's channel: home is CH 00, freelance pages CH 01, the portfolio CH 02, and project pages show their channel (CH 03 to 07) and that channel's ident animation.

To show something specific on any page, add this to that page's front matter (the section between the `---` lines):

```yaml
screen: /screens/guitar-pedal.mp4   # short muted loop, .gif, or a still image/icon (4:3 looks best)
screen_label: "Pedal build"          # optional; replaces the label under the TV
```

Visitors can hide it from the MENU on the dark pages.

## Fonts

Fonts (Righteous, Anton, Jost, VT323), set in two places:
- `_layouts/base.html`: the Google Fonts `<link>` that loads them.
- `assets/css/site.css`: `--font-display` (your name, page titles), `--font-headline` (section headlines), `--font-body` (paragraphs), `--font-osd` (VCR on-screen text).

For a font from somewhere other than Google Fonts, put the `.woff2` file in `assets/fonts/`, add an `@font-face` rule at the top of `site.css`, and point the variable at it. Check that the license allows web use.
