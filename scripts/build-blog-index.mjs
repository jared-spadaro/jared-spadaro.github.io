#!/usr/bin/env node
// Regenerates blog/posts.json from the Markdown files in blog/posts/.
// Deliberately dependency-free so it runs on a bare `node` in CI.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = join(ROOT, "blog", "posts");
const OUT_FILE = join(ROOT, "blog", "posts.json");

const FRONT_MATTER = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const DATE_PREFIX = /^(\d{4}-\d{2}-\d{2})-/;

function unquote(value) {
  const trimmed = value.trim();
  const quoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"));
  return quoted && trimmed.length > 1 ? trimmed.slice(1, -1) : trimmed;
}

// A deliberately small YAML subset: `key: value`, `key: [a, b]`, and
// `key:` followed by an indented `- item` list. Enough for post metadata.
function parseFrontMatter(block) {
  const data = {};
  const lines = block.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    const match = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!match) continue;

    const key = match[1];
    let raw = match[2].trim();

    if (raw === "") {
      const items = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        items.push(unquote(lines[++i].replace(/^\s*-\s+/, "")));
      }
      data[key] = items;
      continue;
    }

    if (raw.startsWith("[") && raw.endsWith("]")) {
      data[key] = raw
        .slice(1, -1)
        .split(",")
        .map(unquote)
        .filter(Boolean);
      continue;
    }

    data[key] = unquote(raw);
  }

  return data;
}

function isTruthy(value) {
  return value === true || String(value).toLowerCase() === "true";
}

function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

async function main() {
  let filenames;
  try {
    filenames = (await readdir(POSTS_DIR)).filter((name) => name.endsWith(".md"));
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
    filenames = [];
  }

  const posts = [];
  const errors = [];
  const seenSlugs = new Map();

  for (const filename of filenames.sort()) {
    const source = await readFile(join(POSTS_DIR, filename), "utf8");
    const match = FRONT_MATTER.exec(source);

    if (!match) {
      errors.push(`${filename}: missing the leading --- front matter block.`);
      continue;
    }

    const meta = parseFrontMatter(match[1]);
    if (isTruthy(meta.draft)) continue;

    const stem = basename(filename, ".md");
    const datePrefix = DATE_PREFIX.exec(stem);
    const slug = meta.slug || stem.replace(DATE_PREFIX, "");
    const date = meta.date ? String(meta.date).slice(0, 10) : datePrefix?.[1];

    if (!meta.title) errors.push(`${filename}: missing "title".`);
    if (!date) {
      errors.push(`${filename}: needs a "date: YYYY-MM-DD" or a dated filename.`);
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errors.push(`${filename}: date "${date}" is not YYYY-MM-DD.`);
    }

    if (seenSlugs.has(slug)) {
      errors.push(`${filename}: slug "${slug}" is already used by ${seenSlugs.get(slug)}.`);
    } else {
      seenSlugs.set(slug, filename);
    }

    posts.push({
      slug,
      title: meta.title ?? slug,
      date: date ?? "",
      summary: meta.summary ?? "",
      tags: toList(meta.tags),
      file: `posts/${filename}`,
    });
  }

  if (errors.length) {
    console.error("Blog index build failed:");
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }

  // Newest first; ties broken by title so the output is stable.
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

  await writeFile(OUT_FILE, JSON.stringify(posts, null, 2) + "\n");
  console.log(`Wrote blog/posts.json with ${posts.length} post(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
