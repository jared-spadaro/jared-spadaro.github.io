# /wedding

Hannah &amp; Jared — July 17, 2027, Peabody Essex Museum, Salem MA.

Served straight off GitHub Pages at `https://www.antisocialistic.com/wedding/`.
Plain static HTML: no build step, no framework, no JavaScript, and no Bootstrap
— the layout is a handful of CSS grids.

```
wedding/
  index.html            the whole page
  css/wedding.css       tokens, layout, photo slots
  img/                  photographs and placeholders
```

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

## Swapping in real photos

**Every photograph on the page is one `<figure class="slot">` holding one
`<img>`. To use a real photo, drop the file in `img/` and change that one
`src`.** Nothing else needs touching: the figure owns the aspect ratio and the
image is `object-fit: cover`, so a source of any size or ratio still works — it
just gets cropped to fill.

Each figure carries a `data-slot` name so you can find it:

| `data-slot` | Ratio | Where it appears | Currently |
| --- | --- | --- | --- |
| `hero-left` | 11:12 | first screen, left half | `hannah-jared-beach-1.jpg` |
| `hero-right` | 11:12 | first screen, right half | `hannah-jared-beach.jpg` |
| `duo-photo` | fills its row | tall photo beside the cream plate | `photo-placeholder-arch.svg` |
| `plate-portrait` | 3:4 | matted portrait on the cream plate | `photo-placeholder-square.svg` |
| `verse-inset` | 3:4 | small photo floated over the verse | `photo-placeholder-square.svg` |
| `verse-photo` | fills its row | tall photo beside the verse | `photo-placeholder-landscape.svg` |
| `weekend-01` | 3:4 | Friday card | `photo-placeholder-arch.svg` |
| `weekend-02` | 3:4 | Saturday card | `photo-placeholder-square.svg` |
| `weekend-03` | 3:4 | Sunday card | `photo-placeholder-landscape.svg` |

The same table is repeated as a comment just above `<body>` in `index.html`.

Two notes:

- **`fills its row` means no ratio at all.** `.slot--fill` sets
  `aspect-ratio: auto; height: 100%` so the photograph stretches to whatever
  height the cream panel beside it ends up being. Give those two slots a
  reasonably tall source — a portrait or a square crops best. Below 720px the
  panels stack and the class falls back to 5:6 so the photo still has a shape.
- **If a face sits off-centre in the crop**, add
  `object-position: 50% 30%` (or wherever) to that one `<img>`. That is the
  only per-photo tuning the layout should ever need.

The two remaining placeholders that ship with the page —
`photo-placeholder-*.svg` — are just washes with "PHOTO COMING SOON" on them.
They are meant to be replaced; nothing in the CSS depends on them.

## The hero scrim

The names are set in white across both hero photographs, so `.hero .slot::after`
paints a dark gradient over each one. It exists so the title stays legible
whatever photo gets dropped in later — don't remove it without checking the
title against the new photos.

## Still to build

`#rsvp` is the footer, not a form. Our Story, the weekend schedule, and
travel/lodging for Salem are anchors on this page for now, ready to become
their own pages under `/wedding/` — the nav and the centre menu block are where
you would point them.
