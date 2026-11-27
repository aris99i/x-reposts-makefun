// Entry program for the make.fun bounty "Get the most reposts and likes
// on make.fun's newest X posts" (makefun-x-reposts-02).
//
// The entry itself is a set of posts on X: up to 15 posts from one public
// account, each quoting or directly replying to a different post from
// @makefunai's pool, each carrying make.fun (or @makefunai) and the
// entrant's play code. This program does the one mechanical job the
// bounty asks of code: it carries the list of those posts, POSTS.json,
// from the repository root to /output/POSTS.json, where the gate reads it.
//
// Node 22, standard library only. No network, no secrets, nothing else
// is scored — the posts on X are the entry.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(BOT_DIR, "POSTS.json");
const target = join(OUTPUT_DIR, "POSTS.json");

mkdirSync(OUTPUT_DIR, { recursive: true });

let raw: string;
try {
  raw = readFileSync(source, "utf8");
} catch (err) {
  console.error(`POSTS.json could not be read from ${source}: ${(err as Error).message}`);
  process.exit(1);
}

// The list must be well-formed JSON with a "posts" array before it is
// handed to the gate; the file is copied byte for byte, never rewritten,
// so what the gate reads is exactly what the repository holds.
let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`POSTS.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (
  typeof parsed !== "object" ||
  parsed === null ||
  !Array.isArray((parsed as { posts?: unknown }).posts)
) {
  console.error('POSTS.json must be an object with a "posts" array.');
  process.exit(1);
}

// A placeholder address is not a post: the gate refuses it on purpose,
// so flag it loudly here instead of letting a half-finished list pass
// silently. Replace the placeholder with the real post addresses first.
if ((parsed as { posts: unknown[] }).posts.some((p) => typeof p === "string" && p.includes("PLACEHOLDER"))) {
  console.warn("Warning: POSTS.json still holds a PLACEHOLDER address — the gate will refuse this list.");
}

writeFileSync(target, raw);
console.log(`Wrote ${target} (${(parsed as { posts: unknown[] }).posts.length} post(s) listed).`);
