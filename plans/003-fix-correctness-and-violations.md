# Plan 003: Fix correctness bugs and spec-rule violations

> **Executor instructions**: Follow step by step, verify each, honor STOP
> conditions, update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 9bac968..HEAD -- src/pages/about.astro "src/pages/blog/[slug].astro" src/pages/work/zenhost.astro`
> On any change, compare "Current state" excerpts to live code first.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug + tech-debt
- **Planned at**: commit `9bac968`, 2026-07-12

## Why this matters

Three small, unambiguous defects: one broken link the visitor will hit (the CV
download 404s), and two typographic choices the redesign spec explicitly forbids.
Spec §3: "Monospace text should not automatically be uppercase or widely
tracked… Most utility text should use normal casing and tight spacing." Spec §3
shape rule: "No border radius." These are one-line fixes but they are the kind of
detail the spec says the whole site is judged on.

## Current state

**1. Broken CV link.** `src/pages/about.astro` links the CV as:
```astro
<li><span class="link-label">CV:</span> <a href="/cv.pdf" target="_blank">PDF Download</a></li>
```
There is no `public/cv.pdf`. The file is `public/resume.pdf`.

**2. Uppercased/tracked mono labels** (spec violation), two locations:
```css
/* src/pages/blog/[slug].astro:178-181  (.detail-label) */
text-transform: uppercase;
letter-spacing: 0.05em;
```
```css
/* src/pages/work/zenhost.astro:159-161  (.stamp-label) */
text-transform: uppercase;
letter-spacing: 0.05em;
```

**3. Border radius** (spec violation):
```css
/* src/pages/blog/[slug].astro:145  (.article-num) */
border-radius: 2px;
```

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Build | `pnpm build` | exit 0, "9 page(s) built" |
| Link check | `grep -rn "cv.pdf" src` | no matches after fix |
| Casing check | `grep -rn "text-transform: uppercase" src/pages` | no matches after fix |

## Scope

**In scope**: `src/pages/about.astro`, `src/pages/blog/[slug].astro`,
`src/pages/work/zenhost.astro`.

**Out of scope**:
- Night-mode stars rendering behind body text — that is another spec violation,
  but its fix is positional/design work handled in **plan 008**. Do not touch
  `src/layouts/BaseLayout.astro` here.
- Renaming `public/resume.pdf` — keep the file name; fix the link to match it.

## Steps

### Step 1: Fix the CV link

In `src/pages/about.astro`, change `href="/cv.pdf"` to `href="/resume.pdf"`.

**Verify**: `grep -rn "cv.pdf" src` → no matches. `pnpm build` → exit 0. In
`pnpm preview`, the About page CV link resolves to the PDF (HTTP 200).

### Step 2: Remove uppercase + letter-spacing from mono labels

In both `src/pages/blog/[slug].astro` (`.detail-label`) and
`src/pages/work/zenhost.astro` (`.stamp-label`), delete the
`text-transform: uppercase;` and `letter-spacing: 0.05em;` declarations. Leave
the rest of each rule (font-size, opacity) intact.

**Verify**: `grep -rn "text-transform: uppercase" src/pages` → no matches.
`pnpm build` → exit 0. In preview, the article metadata labels ("Published",
"Reading time", "Tags") and the ZenHost stamp labels ("Role", "Status", …) render
in normal case.

### Step 3: Remove the border radius

In `src/pages/blog/[slug].astro`, delete `border-radius: 2px;` from `.article-num`.

**Verify**: `grep -rn "border-radius" src/pages "src/pages/blog/[slug].astro"` →
only radii on genuinely round elements (dots/circles: `border-radius: 50%`) remain,
none on rectangular surfaces. `pnpm build` → exit 0.

## Test plan

Manual: `pnpm preview`, then confirm on `/about` the CV link downloads/opens the
PDF; on any `/blog/<slug>` the metadata strip labels are normal-case and the
article-number chip has square corners; on `/work/zenhost` the stamp labels are
normal-case.

## STOP conditions

- `public/resume.pdf` does not exist (plan 001 or something else removed it) —
  STOP; the CV file must be restored before the link is meaningful.
- Removing the CSS declarations changes layout noticeably (it should not) —
  report before adjusting spacing.

## Maintenance notes

- Reviewer: confirm no new `text-transform: uppercase` or non-`50%` `border-radius`
  is introduced elsewhere; these are recurring spec violations worth a grep in review.
