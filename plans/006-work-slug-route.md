# Plan 006: Add `/work/[slug]` route and move ZenHost into the collection

> **Executor instructions**: Follow step by step, verify each, honor STOP
> conditions, update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 9bac968..HEAD -- src/pages/work src/content/work src/content.config.mjs`

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED (behavior-preserving refactor of a live page)
- **Depends on**: none
- **Category**: tech-debt / correctness
- **Planned at**: commit `9bac968`, 2026-07-12

## Why this matters

The ZenHost case study prose is **hardcoded** in `src/pages/work/zenhost.astro`,
while `src/content/work/zenhost.md` exists as a collection entry whose body is
never rendered. The work index (`src/pages/work/index.astro`) links each project
as `/work/${project.id}` from the collection — so it works for ZenHost only
because a static page happens to sit at that path. **Add a second work entry and
its link 404s.** Spec §10 wants "future projects can join the same list without
forcing a redesign." This plan makes the collection the single source of truth
and adds the dynamic route, so the work index's promise actually holds.

## Current state

- `src/pages/work/index.astro` iterates the `work` collection and links `/work/${project.id}`.
- `src/pages/work/zenhost.astro` — a static page with the full 8-section case
  study prose hardcoded in markup, a header "stamp strip", an inline
  `<ArchitectureGraph title="ZenHost Network Architecture" />` inside the "What
  became difficult" section, and a "Related writing" block that queries blog
  posts with `relatesTo === 'zenhost'`.
- `src/content/work/zenhost.md` — frontmatter only, body unused:
  ```
  title, description, date: 2026-07-01, role, stack: ["Go","Vue","Docker"], status: "Building"
  ```
- `src/content.config.mjs` `work` schema: `title, description, date, role,
  stack[], status, metrics?, repository?, liveUrl?`.
- The static page's stamp strip also shows "Started" (hardcoded "2026") and
  "Link" (hardcoded "Not yet public") — not currently in frontmatter.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Build | `pnpm build` | exit 0, "9 page(s) built" (page count unchanged: static page → dynamic route) |
| Route exists | `test -f dist/work/zenhost/index.html && echo ok` | `ok` |
| No orphan static page | `test ! -f src/pages/work/zenhost.astro && echo removed` | `removed` |

## Scope

**In scope**: create `src/pages/work/[slug].astro`; convert
`src/content/work/zenhost.md` → `src/content/work/zenhost.mdx` (body added);
delete `src/pages/work/zenhost.astro`; the `work` schema in `src/content.config.mjs`.

**Out of scope**: the work index page (`src/pages/work/index.astro`) — it already
links by `id` and needs no change; the blog collection; the ArchitectureGraph
component internals.

## Steps

### Step 1: Preserve the current output for comparison

```bash
pnpm build && cp dist/work/zenhost/index.html /tmp/zenhost-before.html
```
This is the reference: the refactor must produce equivalent rendered content.

### Step 2: Move the prose into the collection entry as MDX

Rename `src/content/work/zenhost.md` → `zenhost.mdx`. Add, above the body, an
import for the graph, and paste the **exact** section prose from
`src/pages/work/zenhost.astro` as markdown (`## Why it exists`, `## What it is`,
… `## What comes next`). Place `<ArchitectureGraph title="ZenHost Network
Architecture" />` inside the "What became difficult" section exactly where the
static page has it:
```mdx
---
title: "ZenHost"
description: "…"        # keep existing frontmatter
date: 2026-07-01
role: "Founder and engineer"
stack: ["Go", "Vue", "Docker"]
status: "Building"
started: "2026"           # add (see Step 3)
liveUrl:                  # omit or set when public
---
import ArchitectureGraph from '../../components/ArchitectureGraph.astro';

## Why it exists
…
```
Do not reword the prose — copy it verbatim.

### Step 3: Extend the work schema for the stamp strip

In `src/content.config.mjs`, add to the `work` schema what the stamp strip
needs but the schema lacks:
```ts
started: z.string().optional(),   // e.g. "2026" — shown in the stamp strip
```
`liveUrl` already exists; the template maps a missing `liveUrl` to "Not yet public".

### Step 4: Build the dynamic route

Create `src/pages/work/[slug].astro`. It must reproduce what the static page did:
- `getStaticPaths` over the `work` collection, `params: { slug: entry.id }`.
- Render the header + stamp strip from frontmatter: Role=`role`, Status=`status`,
  Stack=`stack.join(', ')`, Started=`started`, Link=`liveUrl` or "Not yet public".
- `const { Content } = await render(entry)` and render `<Content />` for the body.
- Keep the "Related writing" query (`blog` posts with `relatesTo === entry.id`).
- Copy the `<style>` block from `src/pages/work/zenhost.astro` verbatim so the
  visual output is identical (it already omits `text-transform: uppercase` if
  plan 003 ran; if 003 hasn't run, this plan should not reintroduce it).
- Pass the SEO title/description from frontmatter (`{title} · Work by Melvin Mupondori`).

### Step 5: Delete the static page

Remove `src/pages/work/zenhost.astro`.

**Verify**: `pnpm build` → exit 0, "9 page(s) built"; `test -f dist/work/zenhost/index.html`.
Diff the rendered output against the reference:
```bash
diff <(pnpm dlx html-to-text < /tmp/zenhost-before.html) <(pnpm dlx html-to-text < dist/work/zenhost/index.html)
```
Expected: no meaningful content differences (whitespace/attribute-order diffs OK;
missing or reordered case-study sections are NOT OK).

## Test plan

`pnpm preview`, visit `/work/zenhost`: all 8 sections present in order, the
architecture graph renders in "What became difficult", the stamp strip shows
Role/Status/Stack/Started/Link, and "Related writing" lists the ZenHost post.
Visit `/work` and confirm the ZenHost card still links through correctly.

## STOP conditions

- The prose diff in Step 5 shows any case-study section missing or reordered →
  STOP; the migration dropped content.
- `render()` fails on the MDX (import path or syntax) → report the exact error;
  the ArchitectureGraph import path is relative to `src/content/work/`.
- The stamp strip needs a field not derivable from frontmatter → report; do not
  hardcode it back into the template.

## Maintenance notes

- Adding a future project is now: drop a `.mdx` into `src/content/work/` with the
  required frontmatter — no new page file. Document this in the repo README.
- Reviewer: confirm the case-study prose in the diff is byte-equivalent to the
  old static page, and that the collection body (not hardcoded markup) is the
  source rendered.
