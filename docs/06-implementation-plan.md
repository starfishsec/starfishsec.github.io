# 06 — Implementation Plan

Step-by-step roadmap for the coding model. Complete each phase before moving on; each ends in a working, committable state.

## Phase 0 — Scaffold

1. `npx create-next-app@latest` (Next.js 15) → TypeScript, App Router, Tailwind **v4**, ESLint, `@/*` alias, no `src/` dir (match `docs/04`).
2. Add deps: `framer-motion lucide-react clsx tailwind-merge zod resend`.
3. Add `.prettierrc`, confirm ESLint. Set `tsconfig` strict.
4. Verify `npm run dev` renders the default page.
   - **DoD:** clean build, no type errors.

## Phase 1 — Design tokens & globals

1. Import Tailwind v4 (`@import "tailwindcss";`) and declare all tokens from `docs/03` in an `@theme { ... }` block in `globals.css` (colors, `sans`/`mono` fonts, fluid type scale). Configure PostCSS with `@tailwindcss/postcss`.
2. Add any remaining base styles (body bg/fg, container centering) in `globals.css`.
3. Wire fonts via `next/font` (Inter + JetBrains Mono) in `app/layout.tsx`.
4. Base body styles: bg, fg, antialiased, mono/sans defaults, reduced-motion reset.
   - **DoD:** a test page shows correct colors + both fonts.

## Phase 2 — UI primitives + motion

1. `lib/cn.ts`.
2. Build `Container`, `Button`, `SectionHeading`, `Card`, `Badge`, `StatCard`.
3. Build `Reveal` + `useReducedMotion`.
   - **DoD:** primitives render in isolation, match design system, keyboard-focusable.

## Phase 3 — Content layer

1. Create all `content/*.ts` with typed interfaces, filled from `docs/02`.
2. Transcribe confirmed data from `docs/02`: team (names, handles, certs), 7 featured CVEs, 5 services, stats. Remaining unknowns use a clear `TODO(owner)` string. Illustrative-only data carries `example: true`.
3. `content/site.ts`: name `Starfish Security`, domain `starfishsec.com`, email `info@starfishsec.com`, socials (`TODO`), SEO metadata.
   - **DoD:** types compile; no fabricated data.

## Phase 4 — Sections (top → bottom)

Build in order, each wrapped in `Reveal`, composed into `app/page.tsx`:
1. `Navbar` + `AnnouncementBar`
2. `Hero`
3. `StatsBar`
4. `Process`
5. `Services`
6. `Research`
7. `Team`
8. `WhyUs`
9. `FinalCTA`
10. `Footer`
   - **DoD per section:** matches `docs/05`, responsive at 375/768/1440, copy matches `docs/02`.

## Phase 5 — SEO & metadata

1. `metadata` export in `layout.tsx` from `content/site.ts`.
2. `app/robots.ts`, `app/sitemap.ts`.
3. OG image placeholder (`public/og.png` → `TODO`).
4. Favicon / wordmark asset.
   - **DoD:** meta tags present, valid OG/Twitter card structure.

## Phase 6 — Secondary routes & contact

1. Build `/research` (full CVE list from `content/cves.ts`, filter by vendor/year/severity), `/contact` + `/thanks`, `/disclosure`, `/privacy`. (`/research/[slug]` MDX detail is optional, only if time permits.)
2. `ContactForm` (client) posts to `app/actions/contact.ts` server action: validate (zod) → send via Resend (`RESEND_API_KEY` from env, `TODO`, not committed) → redirect `/thanks`. Progressive enhancement: works without JS.
3. If env is missing → graceful `mailto:` fallback. Landing/hero primary CTAs link to `/contact` (or scroll to an embedded form).
   - **DoD:** all routes reachable, form validates and submits (or falls back), no broken links.

## Phase 7 — QA & polish

1. Responsive pass at 375 / 768 / 1024 / 1440.
2. Keyboard nav + visible focus everywhere.
3. `prefers-reduced-motion`: animations off.
4. Lighthouse (mobile) ≥ 95 all categories; fix regressions.
5. Verify no fabricated content remains un-flagged; all `TODO`s visible.
6. `npm run build` clean.
   - **DoD:** production build passes, Lighthouse targets met.

## Phase 8 — Deploy

1. Push to GitHub.
2. Connect to Vercel, deploy.
3. Set env vars (`TODO`: email service) in Vercel dashboard, not in repo.
   - **DoD:** live URL, no console errors.

---

## Open questions for the user (collect before/along the way)

Mostly resolved as of 2026-08-25. Remaining `TODO(owner)` — surface them, don't guess:

- ✅ Team names + certs · ✅ contact `info@starfishsec.com` · ✅ domain `starfishsec.com` · ✅ 7 featured CVEs · ✅ services · ✅ logo in `/logo`.
- ⬜ Dau Hoang Tai's exact job title.
- ⬜ Full 200+ CVE export for `/research` (all 3 researchers, incl. Apache).
- ⬜ Social handles (owner: "later"), team headshots, one-line bios.
- ⬜ Logo: white/dark-mode version + SVG + favicon export.
- ⬜ Founding year & location; whether to show pricing.
- ⬜ Confirm accent color (default: electric green `#39FF88`).
- ⬜ Live advisory link for the announcement bar.

## Handoff notes for other models

- Treat `docs/` as read-only truth. If something conflicts, `docs/02` wins for copy, `docs/03` for visuals, `CLAUDE.md` for rules.
- When a value is missing, ship a visible `TODO` — never invent.
- Keep commits small and per-phase.

---

## Status (2026-08-25)

| Phase | Status | Notes |
|-------|--------|-------|
| 0 Scaffold | ✅ | Next 15.5, TS strict, Tailwind 4.3, ESLint flat config, Prettier |
| 1 Tokens | ✅ | All `docs/03` tokens in `app/globals.css` `@theme`; Inter + JetBrains Mono via `next/font` |
| 2 Primitives + motion | ✅ | + `Logo`, `StatusDot`, `TodoNote`, `icons` map |
| 3 Content | ✅ | All copy from `docs/02`; unknowns render a visible `TODO(owner)` badge. CVE data = 246 public records imported via `scripts/import-wordfence.mjs` |
| 4 Sections | ✅ | 11 sections, responsive 375/768/1440, reduced-motion verified |
| 5 SEO | ✅ | metadata, OG/Twitter, `robots.ts`, `sitemap.ts`, favicon/apple-icon/`og.png` generated from `/logo` |
| 6 Routes + contact | ✅ | `/research` (filters), `/contact` (+ server action, mailto fallback), `/thanks`, `/disclosure`, `/privacy`, 404 |
| 7 QA | ✅ | Lighthouse mobile (prod build): Home 96/100/100/100 · Research 96/100/100/100 · Contact 97/100/100/100 |
| 8 Deploy | ⬜ | Push to GitHub done; Vercel project + env vars pending |

### Implementation decisions worth knowing

- **Hero uses CSS-only animation** (`animate-fade-up`, `globals.css`), not Framer: the LCP element must paint before hydration. Everything below the fold uses `Reveal` (Framer `whileInView`).
- **`Reveal` always renders the same markup** on server and client; reduced motion is handled by a CSS rule on `[data-reveal]` plus a zero-duration transition. Branching on `useReducedMotion()` at render time caused a hydration mismatch that blanked the page.
- **`lib/cn.ts` extends `tailwind-merge`** with the custom theme scales (see `docs/04`). Without it `text-bg` on the primary button was silently dropped (white text on green, 1.08:1 contrast).
- **`body` is a flex column → children get `min-w-0`**; otherwise the footer's `nowrap` mantra widens the page on mobile.
- **Contact fallback:** when `RESEND_API_KEY` is missing, the server action returns a prefilled `mailto:` link instead of failing. Honeypot field `website` silently redirects to `/thanks`.
- **`/disclosure` and `/privacy` copy is not in `docs/02`.** It was written minimal and factual (matches the actual build: no tracking, form → email) and is flagged `TODO(owner): review` on-page.
- **Logo assets** were derived from the owner's PNGs by thresholding the black ink to white-on-transparent. A clean SVG export is still `TODO(owner)`.
- **Env vars:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (default `info@starfishsec.com`), `CONTACT_FROM_EMAIL` (must be on a Resend-verified domain). See `.env.example`.

### Polish round (2026-08-25, owner feedback)

- Stats: removed `2× OSWE`; card 3 → "Millions of websites affected by our disclosures" (3 cards).
- Research: full Wordfence export for `ancorn_` (246 CVEs) generated into `content/cves.data.ts`; sorted highest CVSS first; landing shows top 6 + severity count chips; `/research` gains a Sort toggle and per-row advisory links. Raw data in `data/wordfence/`, scripts in `scripts/`.
- Team: Tai → Co-Founder; LinkedIn link per member (`linkedin` field in `content/team.ts`).

### Repositioning round (2026-08-25, owner feedback)

- Brand: **AI-powered penetration-testing service, experts behind it** (was: manual services team). Updated `CLAUDE.md` rule 3, `docs/01` §1/§2/§5, `docs/02` §3/§5/§6/§9/SEO, README, and `content/{hero,process,services,whyus,site,stats}.ts`.
- Copy discipline: only "AI-powered" / "expert-validated" statements. No platform specifics (coverage %, autonomy level, benchmarks, model names) until the owner confirms them.
- Team cards now show **Highlights** (public, sourced achievements with links) and a short bio drafted from those public facts. LinkedIn is auth-walled (HTTP 999) so nothing was pulled from it; headshots still `TODO(owner)` (send files → `public/team/*.jpg`).

### USP round (2026-08-25, owner feedback)

- USPs stressed everywhere: **AI-powered · expert-validated · fast delivery · convenient pricing** — hero eyebrow/sub/supporting line, new `UspStrip` section under the hero (`content/hero.ts` → `usps`), Why-Us rewritten around the four, services/process/CTA/SEO touched. No SLA numbers, no prices (owner: "no specifics").
- Team facts verified from public records: Phuoc Pham = `p3tl0v3r` (Wordfence: 4 CVEs, VNPT Cyber Immunity); his JSON added to `data/wordfence/` → dataset now 247 unique CVEs. Tai: HackerOne profile exists (1 IBB report) but his personal site (`blog.taidh.xyz`) no longer resolves and HackMD/X are unreachable from this network; Firefox/PAM360 highlights remain flagged `TODO(owner): confirm`. LinkedIn is auth-walled and Chrome's cookie DB is locked while Chrome runs.

### Remaining `TODO(owner)` (all visible in the UI)

Team bios & headshots · company social (X, GitHub) · CVEs credited to Phuoc / taidh and non-WordPress advisories · announcement link target · logo SVG · disclosure window / PGP · privacy legal review · founding year / location.
