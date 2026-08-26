---
name: Starfish Security
description: Dark, forensic landing-page system for an AI-powered, expert-validated pentest service. One green signal on graphite slate, real records as the only exhibit.
colors:
  signal-green: "#39ff88"
  signal-green-hover: "#2be077"
  signal-green-dim: "rgba(57, 255, 136, 0.12)"
  vault-black: "#0a0b0d"
  slate-elev: "#111317"
  slate-elev-2: "#181b21"
  hairline: "#23262d"
  chalk: "#e6e8eb"
  chalk-muted: "#9aa0a6"
  chalk-subtle: "#5c626b"
  critical-red: "#ff4d5e"
  high-orange: "#ff7a45"
  warn-amber: "#ffb020"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  subheadline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
  mono-caption:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.25
  stat:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "clamp(2.25rem, 4.2vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.03em"
rounded:
  card: "12px"
  btn: "8px"
  pill: "9999px"
spacing:
  gutter: "24px"
  gutter-md: "32px"
  gap-tight: "16px"
  gap-card: "24px"
  card-pad: "24px"
  card-pad-featured: "32px"
  section: "80px"
  section-md: "112px"
  section-lg: "128px"
  nav-height: "64px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.vault-black}"
    typography: "{typography.small}"
    rounded: "{rounded.btn}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.signal-green-hover}"
    textColor: "{colors.vault-black}"
  button-primary-lg:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.vault-black}"
    typography: "{typography.body}"
    rounded: "{rounded.btn}"
    padding: "12px 24px"
  button-secondary:
    textColor: "{colors.chalk}"
    typography: "{typography.small}"
    rounded: "{rounded.btn}"
    padding: "10px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.slate-elev-2}"
    textColor: "{colors.chalk}"
  card:
    backgroundColor: "{colors.slate-elev}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  input:
    backgroundColor: "{colors.slate-elev}"
    textColor: "{colors.chalk}"
    typography: "{typography.body}"
    rounded: "{rounded.btn}"
    padding: "10px 14px"
  select-filter:
    backgroundColor: "{colors.slate-elev}"
    textColor: "{colors.chalk}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.btn}"
    padding: "0 12px"
    height: "40px"
  badge-accent:
    backgroundColor: "{colors.signal-green-dim}"
    textColor: "{colors.signal-green}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  badge-neutral:
    backgroundColor: "{colors.slate-elev-2}"
    textColor: "{colors.chalk-muted}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  eyebrow:
    textColor: "{colors.chalk-muted}"
    typography: "{typography.label}"
  nav-link:
    textColor: "{colors.chalk-muted}"
    typography: "{typography.small}"
    padding: "8px 0"
  nav-link-hover:
    textColor: "{colors.chalk}"
---

# Design System: Starfish Security

## Overview

**Creative North Star: "The Evidence Room"**

Starfish sells proof, and the interface behaves like the room where proof is kept: dark, quiet, and exact. Every element is a labelled exhibit. The page is a near-black vault; content sits on graphite slate panels separated by 1px hairlines; a single Signal Green marks what is live, confirmed, or actionable. Nothing glows for decoration — when something lights up, it is because it is the finding, the status, or the next step. The mood is **forensic, composed, exacting**.

The system inherits a hacker lineage (monospace data labels, an availability dot, a footer mantra) but disciplines it into enterprise credibility. Exhibit A is the hero **proof panel**: the three most severe CVEs on record, each linking to its public advisory. Real data stands where a mock terminal used to be; the site never renders fake UI. Layout is generous and grid-true: a 1152px container, long section rhythm, and fluid type that stays tight at every viewport. Sections alternate layout families (split hero, numeral strip, hairline columns, sticky split list, bento, table, closing band) so no two neighbouring sections share a shape, and cards appear only where elevation means something (the bento, the proof panel, the CVE table shell). Density is low-to-moderate; whitespace does the persuading, mono type does the labelling, and the one accent does the pointing.

Confirmed rejections carried from the owner's brief and the shipped code (redesign 2026-08-26): no light theme in v1; no glitch effects, matrix rain, neon glows, or gradient-filled text; no mock terminals, fake dashboards, or fake screenshots; no serif type anywhere (the wordmark is typeset in the site's sans); no stock imagery or fake photography (avatars are monograms until real headshots exist); no em-dashes in copy; no section eyebrows (headlines stand alone).

**Key Characteristics:**
- Dark-only: one near-black vault (`vault-black`) with two graphite lifts and hairline borders.
- One chromatic voice — Signal Green — reserved for status, proof, and the primary action.
- Geist for everything readable; Geist Mono strictly for labels, IDs, numerals, handles, and the mantra.
- Depth by tone and hairline, never by neutral drop shadow; the accent is solid, never a glow or a gradient.
- Fluid `clamp()` type with −0.02em tracking on every headline size.
- Motion is a 16px rise over 0.5s, staggered 80ms, once; all of it collapses under `prefers-reduced-motion`.
- Missing data is shown as a dashed amber `TodoNote`, never hidden or faked.

## Colors

A near-black graphite vault lit by a single electric green; three severity hues exist only inside labelled badges.

### Primary
- **Signal Green** (`signal-green`): the only accent. Primary button fill, the hero's final word (solid), USP icons, process numerals, the availability dot, hover-border on cards and links, `::selection` background, and the 2px `focus-visible` outline site-wide.
- **Signal Green Hover** (`signal-green-hover`): primary button hover fill only.
- **Signal Green Dim** (`signal-green-dim`): 12% tint used as the background of accent badges, the featured service's icon well (`size-11` square with a `signal-green` 40% border), monogram avatars, and the deep-link row highlight in the CVE table. At 4–13% opacity the same hue drives the single radial `bg-accent-glow` wash behind the hero, the featured service, and the closing CTA.

### Neutral
- **Vault Black** (`vault-black`): page background, `themeColor`, and the text color on any Signal Green fill.
- **Slate Elev** (`slate-elev`): bento cards, the proof panel, inputs, selects, the CVE table shell; also used at 30–40% alpha for the footer and stats strip so the page tone reads through.
- **Slate Elev 2** (`slate-elev-2`): hover surface for secondary buttons, mobile nav links, proof-panel rows and table rows; resting fill for neutral badges and the tinted bento cell.
- **Hairline** (`hairline`): every 1px border, section seam, divider, column top-rule, and the scrollbar thumb. Hover moves it toward Signal Green at 40% (bento cards) or 100% (buttons, links).
- **Chalk** (`chalk`): primary text, headings, and stat numerals. Also the 5% alpha source for the grid-line motif and the 8% footer mantra.
- **Chalk Muted** (`chalk-muted`): body copy under headings, nav links at rest, table secondary cells, form helper text, placeholders, the proof-panel title.
- **Chalk Subtle** (`chalk-subtle`): hover border on inputs, scrollbar hover. Captions/disabled only, never running text.

### Tertiary (severity, badges only)
- **Critical Red** (`critical-red`): Critical severity badge (text + 40% border + 10% fill), form error text and error banner.
- **High Orange** (`high-orange`): High severity badge.
- **Warn Amber** (`warn-amber`): Medium severity badge; the dashed `TodoNote` border/text.
- Low / informational severity uses **Chalk Muted** on **Slate Elev 2** — no hue.

### Named Rules
**The One Signal Rule.** Signal Green is the only accent on any screen and appears on a small fraction of it: one primary button per viewport, labels, the status dot, and hover states. If a screen has two green fills competing, one of them is wrong.

**The Labelled Severity Rule.** Red, orange, and amber never appear outside a badge or an error message, and never without a text label beside them. Color alone is not evidence.

**The Text-on-Green Rule.** Anything set on a Signal Green fill uses Vault Black text (`text-bg`). White on green fails contrast and is not used.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui, sans-serif), loaded via `next/font/google` as `--font-geist`.
**Body Font:** Geist.
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular, Menlo, monospace), `--font-geist-mono`.

**Character:** A sharp grotesque carrying the argument, with its own monospace stamping data labels on it. Headlines are tightened (−0.025em to −0.035em) so large type reads as a single carved object rather than a line of words; mono is letter-spaced wide (0.1em) and uppercased only where it labels data (table headers, footer columns, the proof-panel title).

### Hierarchy
- **Display** (600, `clamp(2.5rem, 4.6vw, 4rem)`, 1.02, −0.035em): the hero `h1` only. Its final word is solid Signal Green. `text-balance` is always on; the headline holds to three lines at 1024px and two-to-three at 1440px beside the proof panel.
- **Headline** (600, `clamp(1.875rem, 3.4vw, 2.75rem)`, 1.1, −0.025em): every section heading via `SectionHeading`, the Final CTA title, and page `h1`s on standalone routes. No eyebrow above it on the landing page.
- **Subheadline** (600, `clamp(1.5rem, 2.6vw, 1.875rem)`, 1.15, −0.02em): the USP section heading and the featured (bento) service title.
- **Title** (600, 1.25rem, 1.3, −0.01em): service titles, process steps, team names; mobile nav links.
- **Body** (400, 1rem, 1.6): paragraphs. Hero subheadline steps up to 1.125rem at `sm`. Copy under headings is `chalk-muted`; keep measure ≤ `max-w-2xl` (42rem) for subtitles and `max-w-xl` for hero/CTA body. Paragraphs use `text-wrap: pretty`.
- **Small** (400, 0.875rem, 1.5): nav links, card descriptions, form labels, helper text, table cells, proof-panel rows, secondary button text.
- **Label** (400 mono, 0.8125rem, 1.4, 0.1em, UPPERCASE): the `eyebrow` utility, used only for data labels: table headers, filter labels, footer column titles, the proof-panel title. It is not placed above section headlines.
- **Mono Caption** (400 mono, 0.75rem, ~1.25): badges, the availability line, LinkedIn links, "optional" markers, cert glossary, result counts, "Read their research" links, `TodoNote`. Nothing on the site is set below 0.75rem (12px).
- **Stat Numeral** (500 mono, `clamp(2.25rem, 4.2vw, 3.5rem)`, 1, −0.03em, tabular): `StatCard` values, solid Chalk.

### Named Rules
**The Mono Is Evidence Rule.** Monospace marks things that are data: labels, IDs, numerals, dates, handles, email addresses, and the mantra. It is never used for sentences a buyer reads: no mono paragraphs, no mono headings.

**The Last Word Rule.** Exactly one word of the hero headline (the last) is set in Signal Green. Nothing else in running text is coloured, and nothing is gradient-filled.

**The No-Serif Rule.** No serif face appears anywhere, including the wordmark, which is typeset "Starfish" in Chalk + "Sec" in Signal Green using Geist 600 at 1.02rem.

**The Headline-Alone Rule.** Landing sections open with the headline (and optional muted subtitle). No small uppercase label sits above it; the section's place on the page is its category.

## Layout

The page is a single centered column, `max-w-6xl` (1152px), with 24px gutters on mobile and 32px from `md` (768px). Tailwind's default breakpoints apply: `sm` 640, `md` 768, `lg` 1024. The sticky header is 64px tall and transparent at the top of the page; after 8px of scroll it gains a hairline bottom border and a `vault-black` 70–85% backdrop-blur.

Sections stack with a long rhythm (80px vertical padding on mobile, 112px at `md`) and most begin with a hairline top border (`border-t border-border`) so seams read as structure. Each section opens with `SectionHeading` (headline → optional muted subtitle, 16px apart, left-aligned) followed by a 40–48px gap before its content.

Every section uses a different layout family, in this order: split hero (copy `1.15fr` / proof panel `0.85fr` from `lg`, panel `max-w-md` right-aligned); a three-column stat strip divided by hairlines with no gaps; four hairline-topped USP columns (1→2→4) with no card chrome; the process as a split with a sticky heading on the left and a hairline-divided `<ol>` on the right; the services bento (1→2→3 columns, the core service spanning two, exactly six cells for five services); the CVE table in a rounded shell; three hairline-topped team columns (1→3) with no card chrome; and a full-width closing band with the headline left and the actions right. Below `lg` everything collapses to a single column and the hero is sized by padding (never a viewport-height lock) so both CTAs stay above a ~900px fold.

Density stays airy: bento padding is 24px (32px for the featured cell at `md`), form fields sit in a two-column grid at `sm` with 24px gaps, tables get 20px horizontal / 16px vertical cell padding and scroll horizontally inside a rounded shell at a `min-w-[640px]`. Everything is fluid (type via `clamp()`, the mantra via `clamp(0.72rem, 2.55vw, 2.5rem)`) so nothing snaps at a breakpoint except column counts.

## Elevation & Depth

The system is **tonal layering**. Depth is built from three background tones (Vault Black → Slate Elev → Slate Elev 2) and 1px Hairline borders; there is no neutral drop shadow on any resting surface and no glow anywhere. Atmosphere comes from exactly one motif pair, used three times: a 64px engineering grid (`bg-grid-lines`, 5% Chalk) masked to a radial falloff, and a single low-opacity radial wash of Signal Green (`bg-accent-glow`, 13% → 4% → 0), behind the hero (offset toward the proof panel), inside the featured bento cell, and behind the closing CTA.

### Shadow Vocabulary
- **Button shadow** (`box-shadow: 0 8px 24px -12px rgba(57,255,136,0.4)`): primary button hover only, an accent-tinted drop paired with a 1px rise.
- **Exhibit shadow** (`box-shadow: 0 16px 40px -24px rgba(0,0,0,0.8)`): the single neutral shadow in the system, under the hero proof panel so it lifts off the wash. Offset and blur stay moderate; a 1px border with an 80px halo is the template look this system avoids.
- **Status pulse** (`0 0 0 0 → 0 0 0 6px` Signal Green at 55% → 0, 2s loop): the availability dot's ring; stopped under reduced motion.
- **Gradient ring** (`gradient-ring` utility): a masked 1px hairline running Signal Green 55% → transparent at 42%; used only on the featured blog post card.

### Named Rules
**The Flat-At-Rest Rule.** Surfaces are flat at rest and stay flat on hover; hover changes a border or a background tone, never adds a glow. No blurred accent blobs inside cards.

**The Masked Motif Rule.** The grid background is always masked to a radial falloff and sits at 5% opacity. A full-bleed, unmasked grid is not this system.

## Shapes

Two radii and a pill. Containers (bento cards, the proof panel, the table shell, error/fallback banners, mobile-menu links) take **12px** (`rounded-card`). Controls (buttons, inputs, selects, icon wells, monogram avatars, the mobile menu toggle, the skip link) take **8px** (`rounded-btn`). Badges, the availability dot, and scrollbar thumbs are **fully round**. The only other radius is the 4px dashed `TodoNote`.

Borders are always 1px. Hairline at rest; on hover they move toward Signal Green (40% on bento cards, 100% on buttons) rather than thickening. The featured bento cell uses a resting 30% green border, not a thicker stroke. The masked grid and wash inside it are clipped by `overflow-hidden`, so silhouettes stay rectangular with softened corners.

## Components

Character: **precise and quietly confident.** Every interactive element responds within 200ms with a color shift and, where motion is allowed, a 1–2px rise. Nothing bounces, scales, or springs.

### Buttons
- **Shape:** softly rounded (8px), `inline-flex`, 8px icon gap, `font-medium`, `select-none`.
- **Primary:** Signal Green fill, Vault Black text; `md` is 10px × 20px at Small size, `lg` is 12px × 24px at Body size. Icons (Lucide `ArrowRight`, `Mail`) are 16px.
- **Hover / Focus:** fill → Signal Green Hover, 1px rise (`motion-safe`), the tinted button shadow; `active` presses back 1px. Focus is the global 2px Signal Green outline, 2px offset. Disabled drops to 60% opacity with `not-allowed`.
- **Secondary:** transparent with a Hairline border and Chalk text; hover → Signal Green border, Slate Elev 2 fill, 1px rise. Used for the second CTA and the `mailto:` fallback (email rendered in mono Small).
- **Utility buttons** (table "Reset", "Show N more"): Hairline-bordered, mono Small or Mono Caption, muted text; hover → Signal Green border + Chalk text; disabled at 40% opacity.
- **One label per intent.** Every link to `/contact` reads "Request a Pentest"; every link to `/research` reads "View our research" (`hero.secondaryCta`).

### Badges
- **Style:** pill, 1px border, mono 0.75rem, 20px line-height, 2px × 10px padding, `whitespace-nowrap`, optional `title` for the long form.
- **Tones:** `accent` (green 40% border / Dim fill / Signal Green text) for certifications; `critical` / `high` / `medium` (hue at 40% border, 10% fill, 100% text); `low` and `neutral` (Hairline / Slate Elev 2 / Chalk Muted). Severity badges carry the label and, in the proof panel and CVE table, the CVSS score.

### Cards / Containers
- **Where cards appear:** only the services bento, the hero proof panel, the CVE table shell, and the contact form shell. USPs, process steps, and team members are hairline-topped columns or rows with no box.
- **Corner Style:** 12px.
- **Background:** Slate Elev (Slate Elev 2 for the one tinted bento cell); 30–40% alpha for the footer and stats strip.
- **Shadow Strategy:** none at rest, none on hover (Flat-At-Rest). The proof panel alone carries the neutral exhibit shadow.
- **Border:** 1px Hairline → 40% Signal Green on hover. The featured bento cell rests at 30% green and carries the masked grid + wash as its background.
- **Internal Padding:** 24px (32px featured at `md`). Content is a `flex-col` with 20px gaps; icon well first (44px square, 8px radius, Vault Black fill and muted glyph; Dim fill and green glyph on the featured cell), then title, then muted copy.

### Hairline Columns (signature)
USPs and team members share one shape: a `border-t` hairline, 24px of top padding, then content. USPs: a 20px accent glyph, a medium-weight title, one Small muted sentence. Team: an 8px-radius monogram (Dim fill, green mono initials) with the LinkedIn link opposite, name, role + mono handle, Small bio, cert badges, a hairline, then the sourced highlights as plain Small rows.

### Process List (signature)
A split from `lg`: the heading sticks at `top-24` in a 5fr column; the steps are an `<ol>` in a 7fr column with a top hairline and `divide-y`, 32px of vertical padding per step, a green mono two-digit numeral (aria-hidden; the list carries the order) in a 3–4.5rem gutter, then Title + muted copy capped at 52ch.

### Inputs / Fields
- **Style:** Slate Elev fill, 1px Hairline, 8px radius, 14px × 10px padding, Body size Chalk text, Chalk Muted placeholder; selects drop native chrome (`appearance-none`); textareas resize vertically. Labels are Small Chalk with an optional mono "optional" marker right-aligned.
- **Focus:** border → Signal Green plus the global 2px outline; hover → Chalk Subtle border.
- **Error / Disabled:** `aria-invalid` turns the border Critical Red; the error line is Small Critical Red with `role="alert"`; a form-level error banner is Critical Red 40% border / 10% fill at 8px radius. The Resend-missing fallback is a 12px Dim-filled green panel with a secondary "Open email draft" button.
- **Filter selects** (CVE table): 40px tall, mono Small, Hairline, max 16rem; labelled by an `eyebrow` in Chalk Muted.

### Navigation
- **Style:** 64px sticky bar; logo lockup (32px white starfish mark PNG + typeset wordmark) left, links center-right, availability dot (`lg`+) and the "Request a Pentest" action right. Transparent while resting at the top of the page, with the action as a secondary (ghost) button so the hero's primary is the only green fill in view; the moment it sticks (a 1px sentinel observed with IntersectionObserver, no scroll listener) it gains a Hairline bottom border, blurred Vault Black, and the action turns primary.
- **Typography:** Small, Chalk Muted → Chalk on hover/focus; links get 8px vertical padding for a ≥24px target.
- **Mobile:** a 40px Hairline-bordered square toggle (Lucide `Menu`/`X`); the panel is a full-width Vault Black sheet under a hairline with Title-size links (12px padding, 8px radius, Slate Elev 2 hover), a full-width `lg` primary button, and a centered availability dot. Focus is trapped, Esc closes, body scroll locks.
- **Footer:** Slate Elev 30% with a hairline top; brand column (logo, mono email, availability dot, social links when supplied) plus three data-label-titled link columns; below it the mantra strip (Chalk at 12%) and a legal row at 0.75rem.

### Data Label
The `eyebrow` utility (mono 0.8125rem, 0.1em tracking, uppercase, Chalk Muted) titles things that are data: table columns, footer columns, the proof panel. It never sits above a section headline.

### StatCard (signature)
A borderless cell in a hairline-divided strip: a solid Chalk mono numeral (`text-stat`, tabular) over a Small muted label capped at 16rem. Pending values show a `TodoNote` beneath.

### Proof Panel (signature, hero only)
A 12px Slate Elev 90% panel with backdrop blur, a Hairline border and the exhibit shadow, capped at `max-w-md`. Header row: the data label "Public CVE record" left, the live record count in mono right. Body: a `divide-y` list of the three most severe CVEs from `content/cves.ts`, each row an external link to its public advisory (Slate Elev 2 on hover) showing the mono CVE ID, the vulnerability type, the platform (muted, truncated) and a severity badge with CVSS. Every value is real; nothing in the panel is mocked. It is Exhibit A and does not recur elsewhere.

### Availability Dot
An 8px Signal Green circle with a 2s pulsing ring, followed by mono 0.75rem muted text ("Available for engagements"). Real state, so it is allowed: nav (`lg`+), the mobile panel, and the footer. Nowhere else.

### Process Numeral
A green mono Small two-digit number ("01") in the step's left gutter, `aria-hidden`; the `<ol>` conveys the order.

### TodoNote
A 4px dashed Warn Amber 40% border with mono 0.75rem amber text, 8px × 4px padding. The visible placeholder for owner-pending *data* the page claims (a stat, a bio, a highlight); it is part of the system on purpose and is never styled to blend in. Absent optional blocks (social links) render nothing rather than a placeholder.

## Do's and Don'ts

### Do:
- **Do** build every color, radius, and type size from the `@theme` tokens in `app/globals.css` (`bg-bg`, `text-accent`, `rounded-card`, `text-h1`…). There is no `tailwind.config.ts`; the token block is the single source of truth.
- **Do** reserve Signal Green for one primary action per viewport plus data glyphs, the availability dot, the hero's last word, and hover states (The One Signal Rule), and always set Vault Black text on a green fill.
- **Do** open sections with `SectionHeading` (headline, optional muted subtitle, no eyebrow) and keep 80/112px section padding with a hairline top border.
- **Do** give neighbouring sections different layout families; reach for hairline-topped columns or a divided list before reaching for a card.
- **Do** convey depth with tone and 1px hairlines only; the single accent wash sits behind the hero, inside the featured bento cell, and behind the closing CTA.
- **Do** use Geist Mono for data only: labels, CVE IDs, numerals, dates, handles, email, mantra.
- **Do** keep motion to the shipped grammar (`Reveal`: 16px rise, 0.5s, `ease-out-soft`, once, 80ms stagger; 200ms color transitions; 1px hover rises under `motion-safe:`) and make sure `prefers-reduced-motion` yields the final state with no animation.
- **Do** mask the grid background to a radial falloff at 5% Chalk and clip it inside its container (`overflow-hidden`).
- **Do** show pending owner data as a `TodoNote`; use monogram avatars (`signal-green-dim` fill, mono initials, 8px radius) until real headshots exist.
- **Do** pair every severity hue with its text label, in a badge or an error message.
- **Do** show proof as real data: the proof panel and the research table render records from `content/cves.ts`, never sample rows.

### Don't:
- **Don't** introduce a light theme, neutral drop shadows on resting cards, or a second accent hue.
- **Don't** render mock UI: no terminals, fake dashboards, fake transcripts, or div-built screenshots anywhere.
- **Don't** use glitch effects, matrix rain, neon outlines, blurred accent blobs, or saturate the accent beyond `signal-green` / its 12% dim.
- **Don't** set body copy, headings, or buttons in monospace, and don't introduce any serif face, including for the wordmark.
- **Don't** gradient-fill any text.
- **Don't** put a small uppercase label above a section headline, and don't use em-dashes or en-dashes in copy (use a period, comma, colon, or hyphen).
- **Don't** hardcode hex values, `rounded-xl`/`rounded-lg`, or arbitrary font sizes in components when a token utility exists, and never set type below 0.75rem.
- **Don't** lock the hero to viewport height or let any wide element (tables, the mantra) widen the page; wide content scrolls inside its own rounded, hairline-bordered shell.
- **Don't** attach `scroll` listeners; sticky-state and reveals use IntersectionObserver.
- **Don't** ship animation that depends on hydration for above-the-fold content; hero entrances are CSS-only (`animate-fade-up`), and `[data-reveal]` content must render visible without JS.
