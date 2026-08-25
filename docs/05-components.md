# 05 — Component Specs

Build order top→bottom. Each spec: purpose, layout, data source, interactivity, states. Copy comes from `docs/02-content.md`; tokens from `docs/03-design-system.md`.

## UI primitives (build first)

### `Container`
- `max-w-6xl mx-auto px-6 md:px-8`. Wrap every section's inner content.

### `Button`
- Props: `variant: 'primary' | 'secondary'`, `href?`, `onClick?`, `children`.
- Renders `<a>` when `href`, else `<button>`. Styles per design system. Visible focus ring.

### `SectionHeading`
- Props: `eyebrow?`, `title`, `subtitle?`, `align?: 'left' | 'center'`.
- Eyebrow = mono uppercase accent label; title = `h1` scale; subtitle = `--fg-muted`.

### `Card`
- `bg-[--bg-elev] border border-[--border] rounded-xl p-6`. Hover: lift + accent border.

### `Badge`
- Props: `tone: 'critical'|'high'|'medium'|'low'|'neutral'`. Mono, rounded-full, small. Text label always present (not color-only).

### `StatCard`
- Big mono value (accent) + muted label below.

## Motion

### `Reveal`
- Client wrapper using Framer Motion. Fades/slides children in on scroll (`whileInView`, `once`). If `prefers-reduced-motion`, renders static. Optional `delay` prop for stagger.

---

## Sections

### 1. `AnnouncementBar` (client)
- Thin full-width bar, `bg-[--accent-dim]`, mono text, small link. Dismiss button (×) → hide + `localStorage` flag. If no advisory data, render nothing.

### 2. `Navbar` (client)
- Sticky top, transparent → gains `--bg`/blur + bottom border on scroll.
- Left: Starfish mark + "STARFISH SEC" wordmark from `/logo` (white version on dark, see `docs/03`). Center/right: nav links (`content/nav.ts`). Right: primary `Button` "Request a Pentest".
- Mobile: hamburger → full-screen or slide-down menu. Trap focus, close on Esc/link click.
- Include a small mono `● Available` status dot (optional).

### 3. `Hero`
- Full-viewport-ish (`min-h-[85vh]`), centered or left-aligned content.
- Background: faint dot/grid + accent radial glow behind headline.
- Eyebrow (mono) → H1 (display scale) → subheadline (`--fg-muted`, max-w-2xl) → CTA row (primary + secondary) → supporting line.
- Optional decorative mono terminal line: `$ starfish scope --target you`.
- Single `<h1>` on the page lives here.

### 4. `StatsBar`
- 2×2 on mobile, 4-col on desktop. Maps `content/stats.ts` → `StatCard`. On a subtle elevated band or hairline-separated row. Stagger reveal.

### 5. `Process`
- `SectionHeading` + 4 numbered steps (`content/process.ts`).
- Layout: horizontal 4-col on desktop (connected by a thin line/arrows), vertical stack on mobile. Each step: mono number, title, description.

### 6. `Services`
- `SectionHeading` "What we do" + responsive card grid (1 / 2 / 3 cols). Maps `content/services.ts` → `Card` with Lucide icon, title, description. `TODO` cards visibly flagged in data, not hardcoded.

### 7. `Research`
- `SectionHeading` "Proof, published." + CVE grid/table from `content/cves.ts`.
- Each row: mono `CVE-ID`, platform, short title, severity `Badge`.
- 3–6 placeholder rows marked `TODO`. Bottom link `See all advisories →`.
- Consider a large mono `200+` accent number as a visual anchor.

### 8. `Team`
- `SectionHeading` "The team" + 3-card grid (`content/team.ts`).
- Each card: avatar placeholder (initials/monogram, no fake photos), name `TODO`, role, certification `Badge`s, one-line bio, social icon links.

### 9. `WhyUs`
- `SectionHeading` "Why Starfish" + 4 points (icon + title + text), 2×2 grid desktop.

### 10. `FinalCTA`
- Centered band with accent glow. Heading, body, primary `Button`, secondary email link. Strong visual close before footer.

### 11. `Footer`
- Multi-column link grid (`content/site.ts`) + social icons + legal line.
- Full-width monospace mantra: `STARFISH SECURITY // PROOF OR IT DIDN'T HAPPEN` (low opacity, large, decorative).
- `● Available for engagements` status.

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
