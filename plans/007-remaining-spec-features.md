# Plan 007: Fill remaining spec features — skip-link, series nav, source-comment trinket

> **Executor instructions**: Follow step by step, verify each, honor STOP
> conditions, update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 9bac968..HEAD -- src/layouts/BaseLayout.astro "src/pages/blog/[slug].astro"`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs (spec compliance) + dx
- **Planned at**: commit `9bac968`, 2026-07-12

## Why this matters

Three small spec items are simply absent. The skip-to-content link is a stated
accessibility requirement (§24). Series prev/next navigation is specced (§10)
but the article template does prev/next by date instead. The hidden
source-comment is one of the few trinkets the spec explicitly *includes* (§14) —
a small piece of the site's personality.

## Current state

- **No skip link** anywhere in `src/layouts/BaseLayout.astro`. `<main>` has no `id`.
- **Related nav is date-based, not series-based.** `src/pages/blog/[slug].astro`
  `getStaticPaths` computes `prev`/`next` as neighbors in the date-sorted list:
  ```ts
  const prev = index > 0 ? sortedPosts[index - 1] : null;
  const next = index < sortedPosts.length - 1 ? sortedPosts[index + 1] : null;
  ```
  The content schema has `series` and `seriesOrder` fields (unused by any post yet).
- **No hidden source comment** exists (`grep -rn "service hatch" src` → nothing).

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Build | `pnpm build` | exit 0, "9 page(s) built" |
| Skip link shipped | `grep -rl "skip-link" dist` | lists all pages |
| Trinket shipped | `grep -rn "service hatch" dist/index.html` | one match (in an HTML comment) |

## Scope

**In scope**: `src/layouts/BaseLayout.astro` (skip link + `<main id>` + source
comment), `src/pages/blog/[slug].astro` (series-aware related nav),
`src/styles/global.css` (skip-link styles).

**Out of scope**: adding any other trinket from the "deferred" list in spec §14
(cursor effects, sound, terminals); populating `series`/`seriesOrder` on posts —
that's content, done in plan 009. The logic here must work whether or not posts
have series set.

## Steps

### Step 1: Skip-to-content link

In `src/layouts/BaseLayout.astro`, make the skip link the first focusable element
in `<body>`, and give `<main>` an id:
```astro
<body>
  <a href="#main-content" class="skip-link">Skip to content</a>
  <div id="stars-container"></div>
  <Masthead />
  <main id="main-content"> … </main>
```
Add to `src/styles/global.css`:
```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  padding: 0.75rem 1rem;
  background: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--accent-color);
  z-index: 100;
}
.skip-link:focus { left: 1rem; }
```

**Verify**: `pnpm build`; `pnpm preview`; press Tab from the top of any page —
the first focus lands on a visible "Skip to content" link; Enter jumps focus to
the main content region.

### Step 2: Series-aware related navigation

In `src/pages/blog/[slug].astro` `getStaticPaths`, when a post has a `series`,
find its neighbors by `seriesOrder` within that series; otherwise fall back to
the current date-based neighbors. Keep the existing `relatedPosts` prop shape so
the footer render is unchanged:
```ts
const seriesPosts = post.data.series
  ? sortedPosts.filter(p => p.data.series === post.data.series)
      .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0))
  : null;
// if seriesPosts, prev/next = neighbors of `post` within seriesPosts;
// else prev/next = date-based neighbors as today.
```

**Verify**: `pnpm build` → exit 0. With no post setting `series` yet, behavior is
identical to today (date-based) — confirm the related cards on each article are
unchanged from a pre-change build.

### Step 3: Hidden source comment

Add one HTML comment in `src/layouts/BaseLayout.astro` (so it ships on every
page), e.g. just inside `<body>`:
```astro
<!-- You found the service hatch. Nothing is on fire. -->
```

**Verify**: `grep -rn "service hatch" dist/index.html` → one match.

## Test plan

Manual: keyboard-tab skip link works and is visible only on focus; article
related-nav renders (unchanged until series metadata is added in plan 009);
view-source on the homepage shows the hidden comment. `pnpm build` stays at 9 pages.

## STOP conditions

- The skip link is not the first tab stop (something else in `<head>`/`<body>`
  grabs focus first) → report; it must be first for the feature to work.
- Series logic changes any article's related cards while no post has a series set
  → the fallback is wrong; report before shipping.

## Maintenance notes

- When plan 009 sets `series: "zenhost"` + `seriesOrder` on the ZenHost posts,
  the prev/next will automatically become series-scoped — verify then.
- Reviewer: confirm only ONE trinket comment was added and none of the deferred
  §14 trinkets crept in.
