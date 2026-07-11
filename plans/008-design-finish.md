# Plan 008: Design-finish pass — kill placeholders, make the schematic a system

> **Executor instructions**: This is a design plan, not a mechanical one. Load
> the `taste-skill:design-taste-frontend` skill before starting and the
> `engineering-general:wcag-compliance` skill for the focus/contrast checks.
> Work against the redesign spec (the source of truth for tone and rules).
> Honor STOP conditions. Update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 9bac968..HEAD -- src/pages src/components src/layouts src/styles`

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: MED (visual regression risk — capture before/after screenshots)
- **Depends on**: plans/001 (don't design around dead components)
- **Category**: direction / design
- **Planned at**: commit `9bac968`, 2026-07-12

## Why this matters

This is the gap between "the checklist is done" and "someone with taste made
this." The branch is structurally faithful but stops at wireframe: the main
visual on both the homepage and the work index is a **grey placeholder box
reading "ZenHost Interface Crop"**, and the "working schematic" concept — the
spec's central idea — is implemented as isolated 1px `<div>` route lines that
never connect between sections or resolve into a system. Spec §1: a visitor
should first think the site "feels calm, deliberate and unusually well put
together," and "the harder design work happens underneath: precise alignment,
lines that continue between sections, details that reward attention." That
underneath work is what's missing.

## Current state

- **Placeholder boxes**: `src/pages/index.astro` ("Something I'm proud of"
  section, `.screenshot-placeholder` → text "ZenHost Interface Crop") and
  `src/pages/work/index.astro` (same placeholder per project). These are the
  largest visual elements on their pages and they are empty grey rectangles.
- **Ad-hoc trace lines**: each page reimplements the route as an absolutely
  positioned `.main-route` / `.main-trace` `<div>` with per-section
  `.route-junction` circles at hardcoded `top` offsets (see `index.astro`
  `<style>` and `blog/index.astro` `<style>`). There is no shared trace
  component; lines start and stop within a page rather than continuing between
  the masthead, sections, and footer as the spec describes.
- **Night stars behind text**: `src/layouts/BaseLayout.astro` generates 50 stars
  at random `0–100%` positions across a fixed full-viewport container. Spec §13:
  stars appear "only in open areas… never directly behind body text." Right now
  they land over paragraphs and cards.
- Design constraints from the spec that must hold throughout: no border-radius on
  rectangles, hairline dividers only, no drop shadows, JetBrains Mono for
  display/utility + Public Sans for body, Verdigris (`--c-verdigris`) does the
  accent work / Brass is rare, ~1240px max width, 680–740px reading width.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Build | `pnpm build` | exit 0, "9 page(s) built" |
| Preview | `pnpm preview` | serves `http://localhost:4321` |
| No placeholder text ships | `grep -rn "Interface Crop" src dist` | no matches when done |
| No radius on rectangles | `grep -rn "border-radius" src` | only `50%` (dots/circles) remains |

## Scope

**In scope**: `src/pages/index.astro`, `src/pages/work/index.astro`,
`src/pages/work/[slug].astro` (or `zenhost.astro` if plan 006 hasn't run),
`src/pages/blog/index.astro`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`,
and a new shared trace component under `src/components/` if you extract one.

**Out of scope**: content/copy of the pages (owned by the spec and plan 009),
the SEO/analytics/route plumbing (other plans), adding animation libraries —
CSS transitions only per spec §19; GSAP stays limited to `ArchitectureGraph`.

## Steps

### Step 1: Capture the baseline

`pnpm preview`, screenshot `/`, `/work`, `/blog`, `/work/zenhost` in **both**
themes (toggle "bench light"). These are the before-shots; every change is judged
against them for "more finished, not just different."

### Step 2: Replace the placeholder boxes with real content

Decide per the material available:
- **If Mel provides a ZenHost screenshot**: build a small, restrained interface
  crop — a single bounded surface, hairline border, no shadow, no rounded
  corners, respecting the light/night surfaces (`--c-bone`). Use Astro's `<Image>`
  for a responsive, optimized asset.
- **If no screenshot exists yet**: do NOT ship a grey box. Replace it with a
  designed schematic representation of ZenHost — a small, deliberate SVG line
  drawing in the site's trace language (nodes = git push → build → proxy →
  tenant → DB), consistent with `ArchitectureGraph`'s vocabulary but quieter.
  This is on-concept and better than a placeholder.

Apply the same decision to the work index entry visual.

**Verify**: `grep -rn "Interface Crop" src` → no matches; the proud-of and work
sections show real or intentionally-designed visuals in both themes.

### Step 3: Make the trace one system, not per-page divs

Extract the route/trace into a reusable approach so lines read as one continuous
schematic:
- A shared component (e.g. `src/components/Trace.astro`) or a documented set of
  global CSS classes in `global.css`, used by home, writing index, and the
  masthead/footer shared transition names (§19).
- Align junctions to the grid, not hardcoded pixel `top` values per section.
- The homepage route should visibly begin near the masthead and terminate at the
  footer's theme control / email (spec §6 §5), and the writing-index trace should
  run the gutter and end in the RSS open node (already partly done — unify it
  with the shared system).
- Keep it CSS-only; the scroll-colouring already uses a `.scrolled` class — keep
  that pattern.

**Verify**: `pnpm build`; visually, the trace is continuous and grid-aligned on
`/` and `/blog`; no section defines its own orphan 1px line with magic offsets.

### Step 4: Constrain night-mode stars to open areas

Rework the star placement in `BaseLayout.astro` so stars only occupy the outer
margins (outside the centered content column) and large vertical gaps — never
behind the reading column. Simplest robust approach: position stars within the
left/right gutter bands (viewport width minus the max content width, split), plus
the header/footer whitespace; skip the central reading band entirely. Keep them
tiny and static (spec §13, §24 — CSS/SVG, not canvas), and keep the
reduced-motion immediate behavior.

**Verify**: `pnpm preview` in night mode on a wide viewport — no star sits behind
a paragraph or card in the reading column; stars appear in the margins/gaps.
On a narrow (mobile) viewport where there are no gutters, stars are sparse and
stay out of the text (reduce count or confine to header/footer gaps).

### Step 5: Finish pass against the spec's "avoid" list

Walk spec §1's "what to avoid" and §3's shape/type rules across the changed
pages: no drop shadows, no border-radius on rectangles, hairline dividers,
restrained Brass usage, correct fonts, reading width 680–740px. Fix any drift.

**Verify**: `grep -rn "border-radius" src` shows only `50%`; `grep -rn "box-shadow" src`
→ none; the WCAG skill's contrast check passes for text on both `--c-paper` and
night `--c-paper`.

## Test plan

Before/after screenshots (Step 1) reviewed side by side in both themes for all
four pages. Accessibility: run the `wcag-compliance` skill over the changed pages
— focus states use the trace language and are visible (§5), contrast passes AA
in both themes, no information conveyed by colour alone. `pnpm build` stays green.

## STOP conditions

- No ZenHost screenshot is available AND the designed-schematic alternative would
  take more than a focused effort → ship the schematic alternative anyway; never
  leave the grey placeholder. If genuinely blocked, STOP and ask Mel for a crop.
- Extracting the shared trace would require restructuring page layouts in a way
  that risks the responsive behavior → report the specific conflict before doing it.
- A finish change reduces contrast below AA in either theme → revert that change.

## Maintenance notes

- The trace system is the piece most likely to break when new page types are
  added — document how a new page opts into it.
- Reviewer: judge against the spec's final standard — "feels like someone with
  taste made it, then had the discipline to stop" — not just "different from before."
- This plan pairs with plan 003 (which removes the mono-uppercase/radius
  violations); if 003 didn't run, fold those one-line fixes in here.
