# Implementation Plans — mups.co.zw redesign remediation

Generated 2026-07-12 against the `feature/redesign` branch (commit `9bac968`).

These plans take the `feature/redesign` branch from **wireframe skeleton** to the
site described in the redesign spec. The branch is structurally faithful to the
spec (tokens, routes, page structure, copy) but three things are broken, several
spec sections are unimplemented, the previous site was never removed, and the
visual finish stops at placeholder boxes.

**Before executing anything**: check out `feature/redesign` and install deps.

```bash
git checkout feature/redesign
pnpm install
pnpm build   # baseline — currently completes but prints Sharp "unsupported image format" errors
```

The package manager is **pnpm** (`pnpm@11.11`). There is no test suite and no
typecheck script; the verification gate for every plan is a clean `pnpm build`
plus visual confirmation via `pnpm preview`.

## Execution order & status

| Plan | Title | Priority | Effort | Depends on | Status |
|------|-------|----------|--------|------------|--------|
| 001 | Remove the old site (dead code, assets, deps, aliases) | P1 | M | — | TODO |
| 002 | Fix OG image generation (currently 22-byte error files) | P1 | S | — | TODO |
| 003 | Fix correctness bugs & spec-rule violations | P1 | S | — | TODO |
| 004 | Add JSON-LD structured data across pages | P2 | M | — | TODO |
| 005 | Wire real analytics (Umami id + 7 custom events) | P2 | M | 001 | TODO |
| 006 | Add `/work/[slug]` route, migrate ZenHost into the collection | P2 | M | — | TODO |
| 007 | Fill remaining spec features (skip-link, series nav, source-comment trinket) | P2 | S | — | TODO |
| 008 | Design-finish pass — kill placeholders, make the schematic a system | P2 | L | 001 | TODO |
| 009 | Deepen the three blog posts (collaborate with Mel) | P3 | L | — | TODO |

Status values: TODO | IN PROGRESS | DONE | BLOCKED (reason) | REJECTED (rationale)

## Dependency notes

- **001 first.** It removes the leftover images that make `astro-compress` throw
  and shrinks the file surface every later plan reads. Do it before 005 and 008.
- **002, 003, 006, 007** are independent of each other — run in any order / parallel.
- **008 depends on 001** (design work shouldn't fight dead components) and is the
  large, taste-driven plan; use the `taste-skill:design-taste-frontend` and
  `engineering-general:wcag-compliance` skills while executing it.
- **009 is not an executor task.** Blog depth requires Mel's real material
  (numbers, error messages, what actually broke). It is a collaboration brief,
  not a code hand-off. Do not let a model invent post content.

## What was NOT planned (deliberately deferred)

- **Category filtering on the writing index** — spec §8 says don't ship it until
  there are enough posts. Correct as-is.
- **Astro 5 → 7 upgrade** — the spec mentions Astro 7 as current, but the branch
  runs 5.18 and works. A major upgrade is its own project with its own risk; not
  bundled into cosmetic remediation. Revisit deliberately, not as a side effect.
- **View-transitions refinement, prefetch tuning** — the shell already ships
  `<ClientRouter />` and shared transition names; leave until the pages are final.

## Findings considered and rejected

- "Move Umami to Partytown" — the async script is fine for a single tracker;
  Partytown adds a worker + config surface for no measurable win here. See plan 005.
- "Convert inline theme scripts to the `useTheme` composable" — the composable is
  Vue-based dead code being deleted in 001; the inline scripts are correct and
  framework-free. Keep them.
