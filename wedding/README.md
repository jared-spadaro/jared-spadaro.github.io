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

Nav · hero · venue band · **Our Story** (photo + intro) · timeline · menu
block · verse · **Schedule** (Friday bonfire, Saturday wedding) · **Travel**
(getting here, getting around, room-block note, hotels) · **Registry** (coming
soon) · footer (`#rsvp`).

## The look

A "garden editorial" layout, reproduced from `img/garden-theme.jpg`: a narrow
column of cream and ink panels floating over a full-bleed paper texture, with
the background showing through the seams between the lower blocks.

Two typefaces do all of it:

| Role | Face | Where |
| --- | --- | --- |
| Everything | Cormorant Garamond 300/400 | headings, nav, labels, body |
| The names, and swash initials | Pinyon Script | the `<h1>`, and the `.sw` span — one letter at a time |

The names in the hero are set wholesale in the script face — no caps, no
tracking, since a copperplate takes neither. Everywhere else the script appears
one letter at a time, and `.sw` is the trick. It sets a single capital in the script face at
`1.45em`, which lands it about half again the height of the roman capitals
beside it — the proportion the reference uses. Pinyon's entry flourish
overhangs its origin, so the class pads the left and claws the gap back on the
right; if you move a swash onto a letter with a different flourish (`C`, `A`,
`M`) you may want to nudge `margin-inline`.

The palette is four custom properties at the top of `css/wedding.css`
(`--cream`, `--cream-dim`, `--ink`, `--light`). The background is
`cloud-background.avif`, fixed and covering, under a thin slate veil. The veil
is load-bearing: the clouds are almost exactly the value of `--cream`, so
without it the column's edges dissolve wherever a cloud passes behind them.
Both live in the `body` rule.

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
| `story-photo` | beside the Our Story intro | `sitting-bw-1.jpg` |
| `verse-inset` | small photo floated over the verse | `kissing-beach.jpg` |
| `verse-photo` | beside the verse | `pensive-bw.jpeg` |
| `schedule-friday` | Friday card | `tahoe-boat.JPG` |
| `schedule-saturday` | Saturday card | `running-bw.jpg` |

The same table is repeated as a comment just above `<body>` in `index.html`.
`snowboarding.JPG` (portrait) and `sutro-sitting.jpg` are no longer on the
page; the `photo-placeholder-*.svg` files are unused stand-ins.

**Symmetry.** In each two-up (`.split`) the photo keeps its ratio and the panel
beside it matches its height: the verse panel is itself 3:2, and the story
intro is sized in container units (`cqw`) of the row, so its text always fits
beside the photo. Below 1100px the story stacks; below 720px every two-up
stacks. If you lengthen the story intro, check it still fits beside the photo
at 1101px wide — that's the tightest point.

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

## Still to fill in

The story and timeline are written with `[TBD: …]` markers wherever a fact is
needed — search `index.html` for `[TBD`:

- how they met: month/year, where, city, one detail
- first date: month/year, where
- the in-between years: one or two milestones
- home: month/year, neighbourhood and city
- favourite things: anything beyond the outdoors
- the proposal: month/year, where, how it happened

Also still to come: the room-block booking link (opens around early 2027), the
registry, and an actual RSVP — `#rsvp` is still just the footer.
