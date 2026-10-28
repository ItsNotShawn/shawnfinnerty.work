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

## The VHS look

The dark pages (home, portfolio, projects) are styled like a worn VHS tape playing on a CRT:

- **Color split:** headings, real images and the rainbow stripes have a crisp red/cyan misregistration. On desktop the red channel is pulled toward the mouse and cyan the opposite way. Nothing moves when you scroll. Placeholders stay clean.
- **Tape:** sparse grain, a slight softness on the big type, and the head-switching tear along the bottom edge.
- **Tracking:** a distortion band that rolls through the picture every ~11 seconds.
- **Scanlines:** dark scan lines plus an RGB phosphor mask.
- The browser window itself is framed as the TV (rounded tube corners and curved-glass shading).

## Picture settings

The MENU button (dark pages) has Intensity (Low / Med / High, default High), Color split, Tape, Tracking, Scanlines and Motion. Visitors' choices are remembered. Effect strengths are at the top of `assets/css/site.css`: everything scales with `--k`, which Intensity sets. The overlay layers are in `_includes/vhs.html`.

## Fonts

Fonts (Righteous, Anton, Jost, VT323), set in two places:
- `_layouts/base.html`: the Google Fonts `<link>` that loads them.
- `assets/css/site.css`: `--font-display` (your name, page titles), `--font-headline` (section headlines), `--font-body` (paragraphs), `--font-osd` (VCR on-screen text).

For a font from somewhere other than Google Fonts, put the `.woff2` file in `assets/fonts/`, add an `@font-face` rule at the top of `site.css`, and point the variable at it. Check that the license allows web use.
