# Blog

No CMS, no login, no server. A post is a Markdown file in `blog/posts/`, and
push access to this repo is the only credential involved.

## Writing a post

Create `blog/posts/YYYY-MM-DD-some-slug.md`:

```markdown
---
title: The title of the post
date: 2026-08-28
summary: One or two sentences shown on the index page.
tags: [meta, site]
draft: false
---

The body of the post, in Markdown.
```

Commit and push to `main`. The **Build blog index** Action regenerates
`blog/posts.json`, GitHub Pages redeploys, and the post is live in under a
minute at `/blog/post.html?slug=some-slug`.

You can do all of that from github.com's web editor — including on a phone —
by choosing *Add file → Create new file* in `blog/posts/`.

## Front matter

| Field     | Required | Notes                                                                 |
| --------- | -------- | --------------------------------------------------------------------- |
| `title`   | yes      | Shown on the index and as the page title.                              |
| `date`    | yes\*    | `YYYY-MM-DD`. \*Optional if the filename starts with a date.           |
| `summary` | no       | Blurb on the index page.                                               |
| `tags`    | no       | `[a, b]` or an indented `- a` list.                                    |
| `draft`   | no       | `true` keeps the post out of the index entirely.                       |
| `slug`    | no       | Defaults to the filename minus its date prefix and `.md`.              |

The builder **fails the Action** on a missing title or date, a malformed date,
a missing front matter block, or two posts claiming the same slug — so a typo
shows up as a red check rather than a broken page.

## Images

Put them in `blog/img/` and reference them relatively from the post:
`![alt text](img/thing.png)`. Post bodies are fetched and rendered from
`/blog/`, so image paths resolve against `/blog/`, not against `posts/`.

## Running it locally

Rebuild the index by hand:

```
node scripts/build-blog-index.mjs
```

The pages use `fetch`, so `file://` won't work — serve the repo root over HTTP
and open `http://localhost:8000/blog/`:

```
npx --yes serve . -l 8000
```

## How it fits together

- `blog/index.html` — post list; reads `posts.json`.
- `blog/post.html` — single post; reads `posts.json` for metadata, then the
  `.md` file, rendered with `marked` and sanitized with `DOMPurify`.
- `blog/posts.json` — **generated**. Don't edit it; the Action overwrites it.
- `scripts/build-blog-index.mjs` — the generator (no dependencies).
- `.github/workflows/blog-index.yml` — runs the generator on push and commits
  the result.

Rendering happens in the browser, so crawlers that don't run JavaScript see an
empty shell. If that ever matters, the same script can pre-render each post to
static HTML without any change to the Markdown files.
