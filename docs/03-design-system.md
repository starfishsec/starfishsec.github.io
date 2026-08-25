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

- **Sans (UI + body):** `Inter` (via `next/font/google`). Fallback: system-ui.
- **Mono (labels, stats, code, CVE IDs):** `JetBrains Mono` or `IBM Plex Mono`. Fallback: ui-monospace.

### Type scale (clamp for fluid sizing)

| Token | Size | Use |
|-------|------|-----|
| `display` | `clamp(2.5rem, 6vw, 5rem)` | Hero H1 |
| `h1` | `clamp(2rem, 4vw, 3rem)` | Section headings |
| `h2` | `clamp(1.5rem, 3vw, 2rem)` | Sub-headings |
| `h3` | `1.25rem` | Card titles |
| `body` | `1rem` (16px) | Paragraphs |
| `small` | `0.875rem` | Captions |
| `mono-label` | `0.8125rem`, `tracking-widest`, `uppercase` | Eyebrows/labels |

- Headlines: weight 600–700, tight tracking (`-0.02em`), line-height ~1.05.
- Body: weight 400, line-height ~1.6, `--fg-muted` for secondary.

## Spacing & layout

- **Base unit:** 4px (Tailwind default scale).
- **Container:** `max-w-6xl` (1152px), `px-6` mobile, `px-8` desktop, centered.
- **Section padding:** `py-20` mobile, `py-28`/`py-32` desktop.
- **Grid gaps:** `gap-6` cards, `gap-4` tight.
- **Radius:** cards `rounded-xl` (12px), buttons `rounded-lg` (8px), badges `rounded-full`.
- **Borders:** 1px `--border`. Cards on `--bg-elev`.

## Buttons

- **Primary:** accent background, `--bg` text, `font-medium`, `rounded-lg`, `px-5 py-2.5`; hover → `--accent-hover` + subtle lift/glow.
- **Secondary:** transparent, 1px `--border`, `--fg` text; hover → `--bg-elev-2` + accent border.
- **Focus:** visible 2px accent ring (`focus-visible:ring-2 ring-[--accent]`).

## Visual motifs (use tastefully)

- **Grid/dot background:** faint radial or dotted grid behind hero, very low opacity.
- **Accent glow:** soft radial `--accent-dim` blur behind the hero headline / final CTA.
- **Terminal chrome:** optional mono "prompt" line (`$ starfish --scope ...`) as a decorative element near the hero.
- **Status dot:** small pulsing `● Available for engagements` in nav or footer (mono).
- **Monospace mantra** in footer: `PROOF OR IT DIDN'T HAPPEN`.
- Avoid: heavy glitch effects, matrix rain, excessive neon. Keep it enterprise-credible.

## Motion (Framer Motion)

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
- **Wordmark is serif — and that's the ONLY place serif appears.** Do NOT introduce a serif typeface for headings or body. Render the wordmark from the logo asset (image/SVG), not by re-typesetting text. UI stays Inter (sans) + JetBrains Mono per the type scale above.
- Keep clear space around the mark ≥ the height of one star arm. Minimum mark size ~24px (favicon aside).

## Iconography

- **Lucide React** (tree-shakeable). Stroke width 1.5–2. Monochrome, accent on hover only.

## Accessibility

- Contrast AA minimum (accent-on-dark and text-on-dark verified).
- Never use color alone for severity — pair with a text label.
- All interactive elements keyboard-reachable with visible focus.
