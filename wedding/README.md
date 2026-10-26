# /wedding

Hannah &amp; Jared — July 17, 2027, Peabody Essex Museum, Salem MA.

Served straight off GitHub Pages at `https://www.antisocialistic.com/wedding/`.
Plain static HTML: no build step, no framework, and no Bootstrap — the layout
is a handful of CSS grids. The only JavaScript is the music toggle, a few dozen
lines inline at the bottom of `index.html`.

```
wedding/
  index.html            the whole page
  css/wedding.css       tokens, layout, photo slots
  img/                  photographs and placeholders
  audio/song.mp3        the background song
```

## Working on it locally

From the repo root:

```
npm run wedding
```

That runs `live-server` through `npx` (nothing to install beyond Node), serves
the repo root so the `../favicon` paths resolve, opens `/wedding/` in your
browser, and reloads the page every time you save a file under `wedding/`.

## The page, top to bottom

Nav · hero · venue band · **Schedule** (Friday bonfire, Saturday wedding) ·
**Our Story** (photo + intro, then the timeline, as one panel) · **Travel**
(getting here, getting around, room-block note, hotels) · verse (two photos) ·
**Registry** (coming soon) · footer.

## Navigation

On desktop the nav is the bar at the top of the column. Below 720px that bar
turns into a drawer: the round ink button in the top-right corner (the twin of
the music button in the bottom-right) slides it in from the right edge. Tapping
a link, the dimmed page behind it, or pressing Escape closes it, and the page
underneath doesn't scroll while it's open. The script is the first block at the
bottom of `index.html`; the styles are in the `.nav-toggle` / `.nav-scrim`
rules and the 720px block of `css/wedding.css`.

The nav links follow the page order. If you add or move a section, update the
`<ul>` in the `<nav>` to match.

## The look

A "garden editorial" layout, reproduced from `img/garden-theme.jpg`: a narrow
column of cream and ink panels floating over a full-bleed paper texture, with
the background showing through the seams between the lower blocks.

Two typefaces do all of it:

| Role | Face | Where |
| --- | --- | --- |
| Everything | Cormorant Garamond 300/400 | headings, nav, labels, body |
| The names in the hero | Pinyon Script | the `<h1>` only |

The names in the hero are set wholesale in the script face — no caps, no
tracking, since a copperplate takes neither. Nowhere else uses it: every other
heading is one face throughout, with no decorative first letters.

The palette is four custom properties at the top of `css/wedding.css`
(`--cream`, `--cream-dim`, `--ink`, `--light`). The background is
`cloud-background.avif` under a thin slate veil. The veil is load-bearing: the
clouds are almost exactly the value of `--cream`, so without it the column's
edges dissolve wherever a cloud passes behind them. Both live on `body::before`,
a fixed, screen-sized layer behind the page — not `background-attachment:
fixed`, which iOS Safari ignores, stretching the clouds over the whole page
height instead.

## Photos: nothing is cropped

**Every photograph on the page is one `<figure class="slot">` holding one
`<img>`, and every slot takes its photograph's own shape** — so each photo is
shown whole. All the current photos are 3:2 landscape (2316×1536 and near
neighbours), so they all use `.slot--landscape`. `object-fit: cover` is still
on, but only to absorb the under-0.6% gap between exactly 3:2 and each source's
real ratio — a pixel or two, never a face.

To swap a photo, drop it in `img/` and change that one `src`. Keep to 3:2
landscape sources. A photo of another shape needs a slot class of its own ratio
(e.g. `.slot--portrait { aspect-ratio: 2 / 3 }`) — not a crop.

| `data-slot` | Where it appears | Currently |
| --- | --- | --- |
| `hero-left` | first screen, left half | `hannah-jared-beach-1.jpg` |
| `hero-right` | first screen, right half | `hannah-jared-lake-1.jpg` |
| `schedule-friday` | Friday card | `tahoe-boat.JPG` |
| `schedule-saturday` | Saturday card | `running-bw.jpg` |
| `story-photo` | beside the Our Story intro | `sitting-bw-1.jpg` |
| `verse-photo` | verse row, right half | `pensive-bw.jpeg` |

The same table is repeated as a comment just above `<body>` in `index.html`.
The verse row's left half is `sutro-sitting.jpg` as a plain `<img>` inside a
3:2 panel rather than a slot. `snowboarding.JPG` and `kissing-beach.jpg` are no
longer on the page; the `photo-placeholder-*.svg` files are unused stand-ins.

**Symmetry.** In each two-up (`.split`) the photo keeps its ratio and the panel
beside it matches its height (the verse panel is itself 3:2). The story's photo
is matted inside its panel and centred against the intro text, so the intro can
be any length. Below 900px the story stacks; below 720px every two-up stacks.

Note the file extensions are not uniform (`.jpg`, `.jpeg`, `.JPG`). GitHub
Pages serves case-sensitively, so each `src` has to match its file exactly.

## Music

`audio/song.mp3` is "Easy Lemon" by Kevin MacLeod (incompetech.com), licensed
CC BY 4.0 — the licence requires the credit line in the footer, so keep it
while this track is used. To change songs, replace the file (and the credit).
It's 5 MB at 320 kbps; re-encoding to 128 kbps would roughly halve that.

Browsers won't let audio start until the visitor interacts with the page, so
the song starts on the first tap, click or key press (scrolling doesn't count)
and fades in to 40% volume. The round button at the bottom right pauses and
resumes it; a pause is remembered in `localStorage`, so a returning visitor who
muted it stays muted.

## The hero scrim

The names are set in white across both hero photographs, so `.hero .slot::after`
paints a dark gradient over each one. It exists so the title stays legible
whatever photo gets dropped in later — don't remove it without checking the
title against the new photos.

## Still to come

The room-block booking link (opens around early 2027) and the registry.
