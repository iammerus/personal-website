# Plan 005: Wire real analytics — Umami id + the 7 custom events

> **Executor instructions**: Follow step by step, verify each, honor STOP
> conditions, update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 9bac968..HEAD -- src/layouts/BaseLayout.astro src/components`

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/001 (removes partytown; keeps the tracker a simple async script)
- **Category**: dx / product analytics
- **Planned at**: commit `9bac968`, 2026-07-12

## Why this matters

Spec §22 defines exactly what to measure: 7 named events and nothing else (no
hover/scroll/star noise). Today the tracker is a hardcoded placeholder that
sends zero custom events:
```astro
<!-- src/layouts/BaseLayout.astro -->
<script async src="https://analytics.umami.is/script.js"
  data-website-id="YOUR-UMAMI-WEBSITE-ID" data-domains="mups.co.zw"></script>
```
So analytics is inert and the site ships a fake website id. This plan makes the
id configurable and wires the 7 events the spec asks for.

## Current state

- Tracker script is inline in `src/layouts/BaseLayout.astro` `<head>` with a
  literal placeholder id.
- The events to implement (spec §22): `article_read_75`, `rss_opened`,
  `email_opened`, `case_study_opened`, `code_copied`, `theme_changed`,
  `external_profile_opened`.
- The behaviors already exist to hook into:
  - Copy button — `src/components/EnhancedCodeBlock.astro` `<script>` copy handler.
  - Theme toggle — `src/components/Masthead.astro` and `src/components/Footer.astro` click handlers.
  - RSS links — `src/components/Footer.astro` (`/rss.xml`) and `src/pages/blog/index.astro` (`.rss-link`).
  - Email link — `src/components/Footer.astro` (`mailto:hello@mups.co.zw`) and About.
  - External profiles — GitHub/X links in Footer and About.
  - Case study — ZenHost link on `src/pages/index.astro` and `src/pages/work/index.astro`.
  - Article read — article pages `src/pages/blog/[slug].astro` (a scroll handler already exists for the progress bar).

Umami's tracker exposes `window.umami.track(eventName)` (spec-cited docs.umami.is).

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Build | `pnpm build` | exit 0, "9 page(s) built" |
| Confirm no placeholder ships | `grep -rn "YOUR-UMAMI" dist src` | no matches |
| Confirm event names present | `grep -rno "umami' in window ? .*track('[a-z_]*'" dist` | lists the 7 event names |

## Scope

**In scope**: `src/layouts/BaseLayout.astro`, a new
`src/lib/analytics.ts` (tiny helper), `src/components/EnhancedCodeBlock.astro`,
`src/components/Masthead.astro`, `src/components/Footer.astro`,
`src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`,
`src/pages/index.astro`, `src/pages/work/index.astro`, `src/pages/about.astro`,
`.env.example` (create).

**Out of scope**: adding any event NOT in the spec's list of 7; tracking hovers,
stars, trace animations, or generic navigation; mentioning analytics anywhere in
the visible footer (spec §22).

## Steps

### Step 1: Make the website id an env var

- Read it from `import.meta.env.PUBLIC_UMAMI_WEBSITE_ID`.
- Render the tracker `<script>` only when that value is set, so local/dev builds
  and unconfigured previews don't load it or ship a placeholder.
- Add `PUBLIC_UMAMI_WEBSITE_ID=` to a new `.env.example` with a one-line comment.

```astro
---
const umamiId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID;
---
{umamiId && (
  <script async src="https://analytics.umami.is/script.js"
    data-website-id={umamiId} data-domains="mups.co.zw"></script>
)}
```

**Verify**: `pnpm build` (no env set) → exit 0, `grep -rn "YOUR-UMAMI\|analytics.umami.is" dist` → **no matches** (script omitted when unset). This is expected — the real id is set in the Cloudflare Pages env at deploy time.

### Step 2: Add a safe track helper

Create `src/lib/analytics.ts`:
```ts
// ponytail: thin wrapper — no-ops when the tracker isn't loaded (dev, blockers, unset id)
export function track(event: string) {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(event);
  }
}
```
Client `<script>` blocks in `.astro` files can import this, or inline the guard
`window.umami && window.umami.track('…')` directly where a full import is awkward.

### Step 3: Wire the 7 events at their sources

- `code_copied` — in EnhancedCodeBlock's copy handler, after a successful
  `navigator.clipboard.writeText`.
- `theme_changed` — in both theme toggle handlers (Masthead + Footer), on click.
- `rss_opened` — click handler on the RSS links (Footer + `.rss-link` on the writing index).
- `email_opened` — click on `mailto:` links (Footer + About).
- `external_profile_opened` — click on the GitHub/X links (Footer + About).
- `case_study_opened` — click on the ZenHost link (home + work index).
- `article_read_75` — in the article scroll handler
  (`src/pages/blog/[slug].astro`), fire **once** when reading progress first
  crosses 75% (guard with a `let fired = false`).

**Verify**: `pnpm build` → exit 0. In `pnpm preview` with the browser console
open and a temporary `window.umami = { track: (e) => console.log('track', e) }`
shim, exercise each behavior and confirm each event name logs exactly once (the
article event only after scrolling past 75%). No event fires on hover or theme-star animations.

## Test plan

Manual, via the console shim above: each of the 7 events fires from its trigger
and nothing fires from hovers/stars/plain navigation. Confirm the production
build omits the tracker entirely when `PUBLIC_UMAMI_WEBSITE_ID` is unset.

## STOP conditions

- You find yourself needing a stateful/hydrated framework component to attach a
  handler → don't; these are plain DOM listeners in existing `astro:page-load`
  scripts. Report if a target element has no stable selector.
- The spec's 7 names don't map cleanly to a trigger that exists → report which;
  do not invent a substitute event.

## Maintenance notes

- The real id lives in Cloudflare Pages environment variables, not in the repo.
  Document this in the README deploy section.
- Reviewer: confirm the event set is exactly the 7 named — no additions — and
  that the footer contains no visible analytics reference.
