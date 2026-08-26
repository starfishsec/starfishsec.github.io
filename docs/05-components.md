# 05 — Component Specs

Build order top→bottom. Each spec: purpose, layout, data source, interactivity, states. Copy comes from `docs/02-content.md`; tokens from `docs/03-design-system.md`.

## UI primitives (build first)

### `Container`
- `max-w-6xl mx-auto px-6 md:px-8`. Wrap every section's inner content.

### `Button`
- Props: `variant: 'primary' | 'secondary'`, `href?`, `onClick?`, `children`.
- Renders `<a>` when `href`, else `<button>`. Styles per design system. Visible focus ring.

### `SectionHeading`
- Props: `title`, `subtitle?`, `align?: 'left' | 'center'`, `as?: 'h1' | 'h2'`, `id?`.
- Title = `h1` scale; subtitle = `--fg-muted`. No eyebrow/kicker prop (removed 2026-08-26: headlines stand alone on every page).

### Cards
- No generic `Card` primitive. Cards exist only where elevation means something (services bento, hero proof panel, CVE table shell, contact form shell) and are composed inline from tokens: `bg-bg-elev border border-border rounded-card p-6`. Hover changes the border only.

### `Badge`
- Props: `tone: 'critical'|'high'|'medium'|'low'|'neutral'`. Mono, rounded-full, small. Text label always present (not color-only).

### `StatCard`
- Big mono value (`text-stat`, solid `--fg`, tabular) + muted label below. Borderless; the strip's hairlines frame it.

## Motion

### `Reveal`
- Client wrapper using IntersectionObserver + a CSS transition (`[data-reveal]` in `globals.css`). Fades/slides children in on scroll, once. If `prefers-reduced-motion`, renders static. Optional `delay` prop for stagger.

---

## Sections

### 1. `AnnouncementBar` (client)
- Thin full-width bar, `bg-[--accent-dim]`, mono text, small link. Dismiss button (×) → hide + `localStorage` flag. If no advisory data, render nothing.

### 2. `Navbar` (client)
- Sticky top, transparent → gains `--bg`/blur + bottom border the moment it sticks (1px sentinel + IntersectionObserver; no scroll listener).
- Left: Starfish mark + typeset wordmark (see `docs/03`). Center/right: nav links (`content/nav.ts`). Right: `Button` "Request a Pentest", secondary while the header rests at the top (the hero's primary is the one green fill), primary once stuck.
- Mobile: hamburger → full-screen or slide-down menu. Trap focus, close on Esc/link click.
- Include a small mono `● Available` status dot (optional).

### 3. `Hero`
- Sized by padding (max `pt-24` desktop), never a viewport lock; headline, subhead and both CTAs above a ~900px fold.
- Split from `lg`: copy `1.15fr` / proof panel `0.85fr`. Background: radially masked line grid + one low-opacity accent wash offset toward the panel.
- Copy stack (max 4 elements): H1 (display scale, last word accent) → subheadline (`--fg-muted`, ≤ 25 words, max-w-xl) → CTA row (primary "Request a Pentest" + secondary "View our research"). No eyebrow, no tagline under the CTAs.
- **Proof panel** (`aside`): header "Public CVE record" + live count; three most severe rows from `content/cves.ts` (mono ID, type, platform, severity `Badge` + CVSS), each an external link to its public advisory. Real data only; replaces the former decorative terminal.
- Single `<h1>` on the page lives here. Entrance is CSS-only (`animate-fade-up`).

### 4. `StatsBar`
- Directly under the hero. Stacked on mobile, 3-col hairline-divided strip from `sm`. Maps `content/stats.ts` → `StatCard`. Stagger reveal.

### 5. `UspStrip` (`#why`)
- Visible `h2` "Why teams choose Starfish" (`h2` scale) + four hairline-topped columns (1 / 2 / 4): accent Lucide glyph, medium title, one Small sentence. No card chrome. Maps `content/hero.ts#usps` via `iconMap`.
- Folds in the former `WhyUs` section (same four points); keeps the `#why` anchor used by the footer.

### 6. `Process`
- Split from `lg`: `SectionHeading` sticky in a 5fr column; 4 steps (`content/process.ts`) as a hairline-divided `<ol>` in a 7fr column. Each step: green mono numeral (aria-hidden) in the gutter, title, description (≤ 52ch). Single column on mobile.

### 7. `Services`
- `SectionHeading` "What we do" + bento (1 / 2 / 3 cols). Five services in six cells: the core AI-Powered Pentest spans two columns with the masked grid + wash as its background; the research cell is tinted `--bg-elev-2`; the rest are flat `--bg-elev`. Lucide icon well, title, description. Hover: border → accent 40%, nothing else.

### 8. `Research`
- `SectionHeading` "Proof, published." + CVE table from `content/cves.ts` (6 most severe). The severity-count `Badge` row ("3 Critical · n High · …") was removed from the landing on 2026-08-26 (owner); it remains on `/research`.
- Each row: mono `CVE-ID` (a link to the public record), platform, short title, severity `Badge` + CVSS. Below `sm` the rows render as a stacked list (ID + badge, type, platform) so severity is never scrolled off-screen.
- Footer row: count sentence, "View our research →" (`/research`, same label as the hero secondary CTA). "Read the write-ups →" (`/blog`) is hidden while the blog is unfinished (owner, 2026-08-26).

### 9. `Team`
- `SectionHeading` "The founders behind the platform" + three hairline-topped columns (`content/team.ts`), no card chrome.
- Each: 8px-radius monogram (no fake photos; `TODO(owner)` headshots) with a "LinkedIn ↗" link opposite, name, role + mono handle, Small bio, cert `Badge`s, a hairline, sourced highlights as plain rows (linked where a public source exists). Cert glossary `dl` below. ("Read their research (n)" → `/blog` hidden with the blog, 2026-08-26.)

### 10. `FinalCTA`
- Full-width band (hairline top; masked grid + wash on the left). Headline + body left, primary `Button` + `mailto:` secondary stacked right from `lg`. Not a centered card.

### 11. `Footer`
- Brand column (logo, mono email, status dot, social links once supplied; nothing rendered while `socials` is empty) + three link columns (`content/site.ts`) + legal line.
- Full-width monospace mantra: `STARFISH SECURITY // PROOF OR IT DIDN'T HAPPEN` (low opacity, large, decorative).

---

## Responsive breakpoints

| Name | Width | Notes |
|------|-------|-------|
| mobile | 375–767 | single column, stacked |
| tablet | 768–1023 | 2-col grids |
| desktop | 1024+ | full multi-col, container max 1152 |

## State/edge cases

- All `TODO` data renders a visible placeholder (e.g. dimmed text + `TODO` label) so nothing looks "finished" with fake data.
- Empty announcement → bar hidden.
- Long CVE lists → cap on landing (e.g. 6), link out for the rest.
