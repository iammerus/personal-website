# Plan 009: Deepen the three blog posts (collaboration with Mel)

> **This is not an executor hand-off.** It is a working brief for Mel and a
> capable writing collaborator. The three seed posts are real topics but thin
> stubs; turning them into the posts the spec describes requires Mel's actual
> material (what broke, the real numbers, the actual error messages, the CAN
> frames he saw, the RS485 registers he read). **Do not let a model invent this
> content.** Read `plans/references/writing-voice.md` in full before drafting a
> word — it is Mel's voice profile and its rules are binding.

## Status

- **Priority**: P3
- **Effort**: L (paced by Mel's availability, not code time)
- **Risk**: LOW (content only)
- **Depends on**: none (but pairs with plan 007's series nav)
- **Category**: docs / content
- **Planned at**: commit `9bac968`, 2026-07-12

## Why this matters

The writing index is the strongest page on the site and the spec says it's where
"the design shows the most flair." But the three posts behind it are 177 / 290 /
472 words — the reading times (1–3 min) expose them as placeholders, and the
RS485 post doesn't use a single code block despite being about reading a serial
protocol. Spec §9: "The posts should not need to pretend the experiment was
already successful. A post can end with an unanswered question or failed attempt."
That honesty only lands if the posts contain real detail. Right now they don't.

## Current state

Three seed posts in `src/content/blog/`:
- `zenhost-network-namespaces.mdx` (472 words) — "Network namespaces, port
  conflicts and the first wrong assumption". Uses `<EnhancedCodeBlock>` twice.
  `relatesTo: "zenhost"`. Tags: `infrastructure`, `networking`.
- `esp32-can-bus-bmw.mdx` (290 words) — "Listening to a BMW E87 with an ESP32
  and MCP2551". Uses `<EnhancedCodeBlock>` once. Tags: `hardware`, `reverse-engineering`.
- `esp32-rs485-solar-inverter.mdx` (177 words) — "Reading a solar inverter over
  RS485 with an ESP32". **No code block.** Tags: `hardware`, `home-assistant`.

Frontmatter schema (`src/content.config.mjs`): `title, description, date,
updated?, tags[], series?, seriesOrder?, relatesTo?, draft, canonical?, ogImage?,
featured?`.

## What "done" looks like

Each post follows the voice guide's arc (scene/problem → tension → what Mel tried
→ concrete result or honest dead-end → short reflection), reads in one sitting,
and contains detail only Mel could supply:
- **ZenHost / namespaces**: the actual port-conflict symptom, the real
  before/after of the port-binding approach, a genuine code excerpt (with
  `filename`), and the specific thing that broke with multiple tenants.
- **BMW CAN bus**: real captured frames / arbitration IDs he decoded, what was
  noise vs signal, the wiring reality (MCP2551 quirks), and what the car actually
  said. Code block for the ESP32 sketch with a `filename`.
- **Solar RS485**: the actual Modbus/registers read, the MAX485 wiring gotcha,
  the Home Assistant entities created, and at least one `<EnhancedCodeBlock>` with
  the reader code. This is the thinnest post — it needs the most new material.

Tags stay short/lowercase/technical. Consider `series: "zenhost"` +
`seriesOrder` on the ZenHost post (and future ZenHost posts) so plan 007's
series-nav activates.

## Process (with Mel)

1. **Interview first.** For each post, ask Mel the specifics the draft is missing
   (see "What done looks like"). Capture real numbers, IDs, registers, errors.
   Do not proceed to prose until the facts exist.
2. Draft in short paragraphs, story arc first.
3. Run each draft against the voice guide's two "avoid" lists (boilerplate
   self-description; AI-tell vocabulary; em dashes). Rewrite, don't thesaurus-swap.
4. The "only-Mel-could-have-written-this" test on every paragraph.
5. Offer the draft; keep his blunt, direct lines.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Build | `pnpm build` | exit 0, "9 page(s) built" |
| Reading time sanity | check `/blog` in `pnpm preview` | times reflect real length |

## Scope

**In scope**: the three `.mdx` files in `src/content/blog/`, and their frontmatter.

**Out of scope**: inventing facts; adding images (spec: no images in posts);
changing the article template or index layout; publishing a fourth post unless
Mel has one.

## STOP conditions

- A post needs a number, ID, register, or error message that Mel hasn't provided
  → STOP and ask him. Do not guess or fabricate technical detail.
- A draft can't hit the voice guide's "only Mel could have written this" bar →
  it's missing real material; go back to the interview.

## Maintenance notes

- Reviewer (Mel): does each paragraph sound like you, or like a generic dev blog?
- When `series`/`seriesOrder` are set here, verify plan 007's series-nav shows
  correct prev/next between ZenHost posts.
