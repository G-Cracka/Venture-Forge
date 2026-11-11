# Venture Forge — Three Redesign Directions

Static HTML/CSS/JS prototypes of [ventureforgeaustin.org](https://www.ventureforgeaustin.org/). Every version includes all six pages: Home, 2026 Event, Speakers, Vision, Partner, and FAQ.

| Folder | Direction | In one line |
|---|---|---|
| `v1-refresh/` | Refresh | Same palette, copy, and section order. Better type scale, new line and shape work, and transitions between sections. |
| `v2-telescope/` | Telescope-inspired | Editorial off-white layout with scroll-driven scenes, a floating image field, a network grid with LinkedIn connect, and a text-only wordmark. |
| `v3-hybrid/` | Hybrid | Brand dark-and-gold with Telescope-style interactions: hero shrink, pinned speaker track, network grid, word-fill text, and a docked nav. |

`index.html` at the root links to all three.

## Run locally

There is no build step. Serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Structure

```
assets/
  js/data.js        ← shared content: speakers, network, showcase, partners, schedule, FAQ, tiers
  img/speakers/     ← speaker headshots from the live site (resized)
  img/logos/        ← partner and showcase logos from the live site
  img/photos/       ← hero, forge, and summit photography from the live site
  img/network/      ← PLACEHOLDER headshots (pravatar.cc), replace before launch
  video/            ← hero skyline video from the live site
v1-refresh/  v2-telescope/  v3-hybrid/   ← each has css/style.css, js/main.js, 6 pages
```

Edit copy for speakers, the schedule, FAQ, and sponsorship tiers once in `assets/js/data.js`. All three versions read from it.

## Before launch

- **Network placeholders:** the 12 people in `placeholders` in `data.js` are made up and use stock avatars. Replace them with real attendees.
- **LinkedIn links:** these currently open a LinkedIn people search for each name. Swap in real profile URLs (`linkedin` field).
- **Fonts:** V2 uses free stand-ins for Telescope's licensed fonts: Inter Tight for Beausite, Outfit for CM Geom, and DM Mono.
- **Libraries:** GSAP 3.12.5 + ScrollTrigger (cdnjs) and Lenis 1.1.13 (unpkg) handle smooth scroll and scroll-driven motion. Users with `prefers-reduced-motion` get static pages.
