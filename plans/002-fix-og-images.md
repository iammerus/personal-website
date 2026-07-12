# Plan 002: Fix Open Graph image generation

> **Executor instructions**: Follow step by step. Run every verification command
> and confirm the expected result. Honor STOP conditions. Update this plan's row
> in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 9bac968..HEAD -- src/pages/og`
> On any change, compare "Current state" to the live file before proceeding.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `9bac968`, 2026-07-12

## Why this matters

Every article's Open Graph image is currently a **22-byte file containing the
text `Error generating image`** — not a 1200×630 PNG. Confirm it yourself:
```bash
pnpm build && cat dist/og/zenhost-network-namespaces.png   # prints: Error generating image
```
So every link to the site shared on social/chat shows a blank or broken preview.
The redesign spec dedicates a whole section (§16) to these images. The generator
code is otherwise complete — it fails only on font loading.

## Current state

`src/pages/og/[slug].png.ts` builds an SVG with `satori`, rasterizes with
`@resvg/resvg-js`, and needs a woff font buffer. The font load is broken:

```ts
// src/pages/og/[slug].png.ts (around line 36)
const fontPath = path.resolve(
  fileURLToPath(import.meta.url),
  '../../../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff'
);
fontData = await fs.readFile(fontPath);
```

At **build** time this module runs from a bundled location, so `import.meta.url`
does not point at `src/pages/og/`, the relative path misses, `readFile` throws,
the `catch` sets `fontData = Buffer.from('')`, and `satori` then throws on the
empty font — landing in the outer catch that returns the plain text
`"Error generating image"`. The font file **does** exist at
`node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff`;
only the path resolution is wrong.

Two secondary defects in the same file:
1. The article number is `B-${post.id.slice(0,3).toUpperCase()}` — this is the
   slug's first 3 chars, not the sheet reference. The writing index
   (`src/pages/blog/index.astro`) computes it as
   `B-${(sortedPosts.length - index).toString().padStart(3,'0')}` after sorting
   by date descending. The OG number should match that so the same post shows
   the same reference everywhere.
2. `routeShapes[0]` strokes the base line in `#DADBD2` (paper) on a `#DADBD2`
   background — invisible. It should use the `Line` token `rgba(30,33,27,0.16)`
   or `#6B6D62` (slate) so the base route is faintly visible.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Install | `pnpm install` | exit 0 |
| Build | `pnpm build` | exit 0 |
| Verify PNG size | `wc -c dist/og/zenhost-network-namespaces.png` | **> 10000** bytes (was 22) |
| Verify PNG magic | `file dist/og/zenhost-network-namespaces.png` | reports "PNG image data, 1200 x 630" |

## Scope

**In scope**: `src/pages/og/[slug].png.ts` only.

**Out of scope**: the SEO component, the article template, the woff files in
`node_modules` (do not vendor unless Step 1's `process.cwd()` fix fails).

## Steps

### Step 1: Resolve the font path from the project root

Replace the broken `path.resolve(fileURLToPath(import.meta.url), '../../../../...')`
with a root-anchored path. At Astro build time the process runs from the project
root, so `process.cwd()` is reliable:

```ts
import fs from 'node:fs/promises';
import path from 'node:path';

const fontPath = path.join(
  process.cwd(),
  'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff'
);
const fontData = await fs.readFile(fontPath); // let it throw — see Step 2
```

Remove the `fileURLToPath`/`import.meta.url` import if now unused.

**Verify**: `pnpm build` completes; `wc -c dist/og/zenhost-network-namespaces.png` > 10000.

### Step 2: Make font-load failure fail the build, not silently degrade

Delete the `try/catch` that falls back to `Buffer.from('')`. An empty font is
never valid — a missing font should break the build loudly so this never
regresses to 22-byte files again. Keep the outer `try/catch` around
`satori`/`Resvg` but change its fallback: on error, `throw` (or return a 500)
rather than a 200 with body `"Error generating image"`, so a broken image can
never be served as if it were a real PNG.

**Verify**: `pnpm build` exits 0 and all three `dist/og/*.png` are > 10000 bytes:
```bash
for f in dist/og/*.png; do echo "$f $(wc -c < "$f")"; done
```

### Step 3: Fix the article number and the invisible base line

- Compute the sheet reference the same way the index does: load the blog
  collection in `getStaticPaths`, sort by `date` descending, and pass each
  post's `B-NNN` number as a prop (mirror `src/pages/blog/index.astro`). Use it
  in the markup instead of `post.id.slice(0,3)`.
- Change `routeShapes[0]`'s stroke from `#DADBD2` to `#6B6D62`.

**Verify**: `pnpm build` exits 0; open `dist/og/zenhost-network-namespaces.png`
in an image viewer and confirm the visible reference matches the number shown
for that post on the `/blog` page, and the horizontal base line is visible.

## Test plan

No test framework. Manual verification: open each generated PNG, confirm it is a
1200×630 image with the site mark, the correct `B-NNN` number, the title, a
truncated description, date, topic, "Melvin Mupondori", and a visible route
diagram. Confirm the `<meta property="og:image">` in each article's built HTML
points at `/og/<slug>.png` (it already does — `src/pages/blog/[slug].astro`).

## STOP conditions

- After Step 1, PNGs are still ≤ 22 bytes → `process.cwd()` is not the project
  root in this environment. STOP and report; the fallback is to vendor the woff
  into `src/assets/fonts/` and import it as an asset URL.
- `satori` throws on valid font data (API drift) → report the error, do not
  reinstate the empty-buffer fallback.

## Maintenance notes

- If the site later adds a second display weight to OG images, load that woff
  the same way and register it in the `fonts` array.
- A reviewer should confirm no code path can return a 200 with a non-PNG body
  from this endpoint (that is the bug that hid the failure originally).
