---
title: Hello, world
date: 2026-08-28
summary: A blog that runs on nothing but a Markdown file and a git commit.
tags: [meta, site]
draft: false
---

I wanted a blog on this site, and I wanted exactly zero of the things that
usually come with one: no login page, no database, no server to keep patched,
no third-party service that gets acquired and shuts down in two years.

So this blog doesn't have any of that. Here is the entire publishing pipeline:

1. Add a Markdown file to `blog/posts/`.
2. Commit and push.
3. That's it.

## Why there's no login screen

The honest answer is that I already have an authentication system for this
site — it's called GitHub, and I log into it every day. Push access to this
repository *is* the permission to publish. Anything I built on top of that
would be a strictly worse copy of it, with more attack surface and more of my
weekends spent maintaining it.

A GitHub Action watches `blog/posts/**`. When a post lands, it reads the front
matter out of every Markdown file and rewrites `blog/posts.json`, which is the
index this page you're reading was built from. I never touch that file by hand.

## Writing from anywhere

Because a post is just a file in a repo, github.com's own editor works as a
writing surface — including on a phone. Create the file, hit commit, and about
thirty seconds later it's live on the site. No app to install, nothing to sync.

## What I gave up

The post list and the post body are both fetched and rendered in your browser,
which means a crawler that doesn't execute JavaScript sees an empty page. For a
personal blog I'll take that trade for now. If it ever starts to matter, the
same Action can pre-render each post into real static HTML — the Markdown files
wouldn't have to change at all.
