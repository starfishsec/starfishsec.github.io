# 03 — Design System

Dark-first, hacker/terminal aesthetic with an enterprise-clean layout. Reference: pwn.ai. Do not copy pwn.ai's assets; build our own tokens.

## Design principles

- **Dark by default.** Deep near-black background, high-contrast text, one electric accent.
- **Confident, not noisy.** Generous whitespace; let the accent and mono type do the talking.
- **Terminal cues, used sparingly.** Monospace for labels, stats, CVE IDs, and the footer mantra — not body copy.
- **Motion is subtle.** Fade/slide on scroll, small hover shifts. Everything off under `prefers-reduced-motion`.

## Color tokens

Define these in the Tailwind v4 `@theme { ... }` block in `globals.css` (e.g. `--color-bg`, `--color-accent`), which both exposes them as CSS variables and generates the matching utilities (`bg-bg`, `text-accent`, …). See `docs/04`.

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#0A0B0D` | Page background |
| `--bg-elev` | `#111317` | Cards, elevated surfaces |
| `--bg-elev-2` | `#181B21` | Hover / nested surfaces |
| `--border` | `#23262D` | Hairlines, card borders |
| `--fg` | `#E6E8EB` | Primary text |
| `--fg-muted` | `#9AA0A6` | Secondary text |
| `--fg-subtle` | `#5C626B` | Captions, disabled |
| `--accent` | `#39FF88` | Primary accent (electric green) |
| `--accent-hover` | `#2BE077` | Accent hover |
| `--accent-dim` | `rgba(57,255,136,0.12)` | Accent tint bg / glows |
| `--danger` | `#FF4D5E` | Critical severity |
| `--warn` | `#FFB020` | Medium severity |

**Accent decision:** electric green `#39FF88` (terminal-native). If the user prefers another vibe, alternatives: cyan `#22D3EE` or amber `#FFB020`. Change in ONE place (the token) only.

**Severity colors (CVE badges):** Critical `--danger`, High `#FF7A45`, Medium `--warn`, Low `--fg-muted`.

## Typography

- **Sans (UI + body):** `Geist` (via `next/font/google`, `--font-geist`). Fallback: system-ui. (Redesign 2026-08-26; was Inter.)
- **Mono (labels, stats, CVE IDs, handles, mantra):** `Geist Mono` (`--font-geist-mono`). Fallback: ui-monospace.

### Type scale (clamp for fluid sizing)

| Token | Size | Use |
|-------|------|-----|
| `display` | `clamp(2.75rem, 5vw, 4.5rem)` | Hero H1 (600, 1.0, -0.04em) |
| `h1` | `clamp(1.875rem, 3.4vw, 2.75rem)` | Section headings (600, -0.025em) |
| `h2` | `clamp(1.5rem, 2.6vw, 1.875rem)` | USP heading, featured service title |
| `h3` | `1.25rem` | Card / step / member titles |
| `body` | `1rem` (16px) | Paragraphs |
| `small` | `0.875rem` | Captions, table cells, descriptions |
| `mono-label` | `0.8125rem`, `tracking 0.1em`, `uppercase` | Data labels only (table headers, footer columns, proof-panel title). Not above section headlines. |
| `stat` | `clamp(2.5rem, 4.4vw, 4rem)` mono 500 | Stat numerals (solid, tabular) |

- Headlines: weight 600, tight tracking, line-height 1.02-1.1. No gradient fills.
- Body: weight 400, line-height ~1.6, `--fg-muted` for secondary, `text-wrap: pretty`.
- Copy has no em-dashes or en-dashes; use a period, comma, colon, or hyphen.

## Spacing & layout

- **Base unit:** 4px (Tailwind default scale).
- **Container:** `max-w-6xl` (1152px), `px-6` mobile, `px-8` desktop, centered.
- **Section padding:** `py-20` mobile, `py-28`/`py-32` desktop.
- **Grid gaps:** `gap-6` cards, `gap-4` tight.
- **Radius:** cards `rounded-xl` (12px), buttons `rounded-lg` (8px), badges `rounded-full`.
- **Borders:** 1px `--border`. Cards on `--bg-elev`.

## Buttons

- **Primary:** accent background, `--bg` text, `font-medium`, `rounded-lg`, `px-5 py-2.5`; hover → `--accent-hover` + 1px lift + accent-tinted shadow (`0 8px 24px -12px rgba(57,255,136,0.4)`).
- **One label per intent:** every link to `/contact` is "Request a Pentest"; every link to `/research` is "View our research".
- **Secondary:** transparent, 1px `--border`, `--fg` text; hover → `--bg-elev-2` + accent border.
- **Focus:** visible 2px accent ring (`focus-visible:ring-2 ring-[--accent]`).

## Visual motifs (use tastefully)

- **Grid background:** faint 64px line grid (`bg-grid-lines`, 5%), always radially masked; behind the hero, inside the featured service cell, behind the final CTA.
- **Accent wash:** one soft radial `bg-accent-glow` (13% → 0) in the same three places. No hover glows, no blurred accent blobs inside cards.
- **Proof panel (hero):** the three most severe real CVEs from `content/cves.ts`, each linking to its public record. This replaced the decorative terminal (redesign 2026-08-26): the site renders no mock UI.
- **Status dot:** small pulsing `● Available for engagements` in nav and footer (mono). Real state only.
- **Monospace mantra** in footer: `PROOF OR IT DIDN'T HAPPEN`.
- Avoid: heavy glitch effects, matrix rain, neon, gradient text, fake terminals/screenshots, eyebrow labels above headlines. Keep it enterprise-credible.

## Motion (CSS transitions + IntersectionObserver)

- **On-scroll reveal:** opacity 0→1, y 16→0, duration 0.5s, ease-out, `viewport once`.
- **Stagger** children by ~0.08s in lists/grids.
- **Hover:** cards lift `translateY(-2px)` + border → accent, 0.2s.
- **Reduced motion:** wrap in a hook/util; if `prefers-reduced-motion`, render final state with no animation.

## Brand & logo

Assets live in `/logo`:
- `logo.png` — the **mark only**: a stylized starfish formed from interwoven "S" strokes (Celtic-knot style), 5-pointed.
- `logo2.png` — mark **+ serif wordmark** "STARFISH SEC".

Both are **black on a light paper mockup**. This is a dark-first site, so:

- **`TODO`: produce a white (and/or accent) monochrome version + a clean SVG** of both the mark and the wordmark, on transparent background. Crop out the paper texture. Use the white mark on dark surfaces (navbar, footer, favicon, OG image).
- **Favicon / nav mark:** use the starfish **mark** (not a generic `*`/`✶`). `✶` may still appear as a tiny decorative sparkle, but the real mark is the brand.
- **No serif anywhere.** The original wordmark PNG is serif; per the owner (2026-08-26) the wordmark is typeset in the site sans ("Starfish" + accent "Sec") and only the mark image is used. UI stays Geist (sans) + Geist Mono per the type scale above.
- Keep clear space around the mark ≥ the height of one star arm. Minimum mark size ~24px (favicon aside).

## Iconography

- **Lucide React** (tree-shakeable). Stroke width 1.5–2. Monochrome, accent on hover only.

## Accessibility

- Contrast AA minimum (accent-on-dark and text-on-dark verified).
- Never use color alone for severity — pair with a text label.
- All interactive elements keyboard-reachable with visible focus.
