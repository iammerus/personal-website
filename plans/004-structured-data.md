# Plan 004: Add JSON-LD structured data across pages

> **Executor instructions**: Follow step by step, verify each, honor STOP
> conditions, update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 9bac968..HEAD -- src/components/SEO.astro src/layouts/BaseLayout.astro src/pages`

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs (SEO / discoverability)
- **Planned at**: commit `9bac968`, 2026-07-12

## Why this matters

Spec §17 requires structured data: `Person` + `WebSite` on home, `ProfilePage`
on About, `Blog` on the writing index, `BlogPosting` on articles, `CreativeWork`
on ZenHost, `BreadcrumbList` on inner pages. The plumbing already exists — the
SEO component accepts a `structuredData` prop and emits a `<script type="application/ld+json">`
— but **no page passes it and BaseLayout doesn't forward it**, so zero structured
data ships. This is the cheapest SEO win available: the component is done, only
the wiring and the schema objects are missing.

## Current state

`src/components/SEO.astro` (end of file) already handles the prop:
```astro
const { title, description, image, type, publishDate, structuredData } = Astro.props;
...
{structuredData && (
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
)}
```

But `src/layouts/BaseLayout.astro` calls SEO without it:
```astro
const { title, description, image } = Astro.props;   // no structuredData
...
<SEO title={title} description={description} image={image} />
```

Every page uses `BaseLayout`. Known facts for the schema (from the footer/about):
- Name: `Melvin Mupondori`; site: `https://mups.co.zw`
- GitHub `https://github.com/iammerus`, X `https://x.com/wezhirawevhu`
- Job title: `Senior software engineer`; location: `Harare, ZW`

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Build | `pnpm build` | exit 0, "9 page(s) built" |
| Count ld+json blocks | `grep -rl "application/ld+json" dist` | lists home, about, work/zenhost, blog index, each article |
| Validate JSON | paste one block into https://validator.schema.org | 0 errors |

## Scope

**In scope**: `src/layouts/BaseLayout.astro` (add + forward the prop),
`src/pages/index.astro`, `src/pages/about.astro`, `src/pages/blog/index.astro`,
`src/pages/blog/[slug].astro`, `src/pages/work/zenhost.astro`.

**Out of scope**: `src/components/SEO.astro` (already correct — do not change its
rendering), the 404 page (no structured data needed).

## Steps

### Step 1: Forward `structuredData` through BaseLayout

Add `structuredData` to `BaseLayout`'s `Props` interface and destructure, then
pass it to `<SEO>`:
```astro
const { title, description, image, structuredData } = Astro.props;
...
<SEO title={title} description={description} image={image} structuredData={structuredData} />
```

**Verify**: `pnpm build` → exit 0 (no page passes it yet, so no JSON-LD emitted).

### Step 2: Home — `Person` + `WebSite` (a `@graph`)

In `src/pages/index.astro` frontmatter, build and pass:
```ts
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Person', name: 'Melvin Mupondori', url: 'https://mups.co.zw',
      jobTitle: 'Senior software engineer',
      address: { '@type': 'PostalAddress', addressLocality: 'Harare', addressCountry: 'ZW' },
      sameAs: ['https://github.com/iammerus', 'https://x.com/wezhirawevhu'] },
    { '@type': 'WebSite', name: 'Melvin Mupondori', url: 'https://mups.co.zw' },
  ],
};
```
Pass `structuredData={structuredData}` to `<BaseLayout>`.

**Verify**: `pnpm build`; `grep -c "application/ld+json" dist/index.html` → `1`.

### Step 3: The other pages

Following the same pattern, add one schema object per page and pass it to BaseLayout:
- **About** (`about.astro`): `ProfilePage` with a nested `mainEntity` `Person`
  (reuse the Person from Step 2).
- **Writing index** (`blog/index.astro`): `Blog` with `name`, `url`,
  `description`, and `author` (Person).
- **Article** (`blog/[slug].astro`): `BlogPosting` with `headline` = title,
  `description`, `datePublished` = `post.data.date.toISOString()`, `dateModified`
  = `updated` if present, `author` (Person), `image` = the OG image URL already
  computed as `ogImage`, and `mainEntityOfPage` = the canonical URL.
- **ZenHost** (`work/zenhost.astro`): `CreativeWork` with `name` "ZenHost",
  `description` (from `src/content/work/zenhost.md`), `author` (Person),
  `creator` (Person).

Add a `BreadcrumbList` to the inner pages (article, ZenHost) using a `@graph`
alongside the primary type — e.g. Home › Writing › {title}.

**Verify**: `pnpm build`; each of `dist/about/index.html`,
`dist/blog/index.html`, `dist/blog/*/index.html`, `dist/work/zenhost/index.html`
contains exactly one `application/ld+json` block. Paste one article's block into
the schema.org validator → 0 errors.

## Test plan

No test framework. Validation is: build emits one JSON-LD block per required
page, and the article + home blocks pass schema.org's validator with 0 errors,
0 warnings that indicate malformed types.

## STOP conditions

- The schema.org validator reports type errors you can't resolve by matching the
  templates above → report the exact message; do not ship invalid JSON-LD.
- `post.data.date` is not a `Date` at build (schema requires ISO string) →
  report; the content schema (`src/content.config.mjs`) says it is a `z.date()`.

## Maintenance notes

- Define the `Person` object once (e.g. a small exported const in a shared
  `src/lib/schema.ts`) and reuse it across pages so the social profiles and job
  title never drift between pages. Reviewer: check the Person is identical everywhere.
- When a real LinkedIn profile exists (spec §11 defers it), add its URL to `sameAs`.
