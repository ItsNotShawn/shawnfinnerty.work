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
