# Starfish Security — Landing Page

Marketing site for **Starfish Security** — an **AI-powered penetration-testing service** built and operated by 3 industry-certified offensive-security researchers (OSWE, CPTS, Synack Red Team) who have published **200+ CVEs** across many platforms (WordPress, Apache, and more). The platform runs the testing; the experts validate every finding.

Aesthetic / structural reference: [pwn.ai](https://pwn.ai) — dark, technical, "proof over promises".

## Tech stack

- **Next.js 15** (App Router, RSC)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- Scroll reveals via IntersectionObserver + CSS transitions (`components/motion/Reveal.tsx`; no animation library)
- Contact: server action → email (Resend), with `mailto:` fallback
- Deploy target: **Vercel**

## How to use this documentation

The files in `docs/` are the single source of truth. Any model/agent writing code **MUST** read them in this order before starting:

| # | File | Purpose |
|---|------|---------|
| 0 | [`CLAUDE.md`](./CLAUDE.md) | Rules & guardrails for AI writing code |
| 1 | [`docs/01-PRD.md`](./docs/01-PRD.md) | Product requirements: business, goals, scope, audience |
| 2 | [`docs/02-CONTENT.md`](./docs/02-CONTENT.md) | All copy per section (content source of truth) |
| 3 | [`docs/03-design-system.md`](./docs/03-design-system.md) | Color, typography, spacing, motion, tokens |
| 4 | [`docs/04-architecture.md`](./docs/04-architecture.md) | Folder structure, routing, dependencies |
| 5 | [`docs/05-components.md`](./docs/05-components.md) | Spec for each component/section |
| 6 | [`docs/06-implementation-plan.md`](./docs/06-implementation-plan.md) | Step-by-step build roadmap |

**Conflict resolution:** `02-CONTENT.md` wins for copy, `03-design-system.md` for visuals, `01-PRD.md` for scope, `CLAUDE.md` for rules. When a value is missing, ship a visible `TODO` — never invent.

## Routes (v1)

- `/` — landing page (all sections)
- `/research` — full CVE list (data-driven, filterable)
- `/blog` — team research & writing (on-site articles, data in `content/blog.ts`). **Hidden** since 2026-08-26 (owner: not finished) — no nav/footer/sitemap links, `noindex`; the route still builds. Re-enable in `content/nav.ts`, `content/site.ts`, `app/sitemap.ts`, `components/sections/{Research,Team}.tsx`, and drop `robots` in `app/blog/**`.
- `/contact` + `/thanks`
- `/disclosure` — responsible disclosure policy
- `/privacy` — minimal privacy notice

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
npm run dev                  # http://localhost:3000
npm run typecheck && npm run lint
npm run build && npm run start
```

Without `RESEND_API_KEY` the contact form still works: it hands the visitor a prefilled `mailto:` link.

## Project layout (short)

- `app/` routes, `globals.css` (all design tokens in `@theme`), `actions/contact.ts` (server action)
- `components/sections|ui|forms|research|motion`
- `content/*.ts` — every piece of copy/data; edit here, never in components
- `content/cves.data.ts` — GENERATED from `data/wordfence/*.json` by `node scripts/import-wordfence.mjs` (refresh raw data with `scripts/fetch-wordfence.mjs`)
- `docs/` — specs (see table above); `docs/06` has the build status and implementation decisions
- `public/` — generated white logo assets, icons, `og.png`; `logo/` — original owner assets

## QA snapshot (2026-08-26, production build after the redesign + polish pass, Lighthouse mobile)

| Route | Perf | A11y | Best Practices | SEO |
|-------|------|------|----------------|-----|
| `/` | 96 | 100 | 100 | 100 |
| `/research` | 97 | 100 | 100 | 100 |
| `/contact` | 98 | 100 | 100 | 100 |

Responsive checked at 375 / 768 / 1024 / 1280 / 1440, `prefers-reduced-motion` verified, no console errors, no horizontal overflow. `/impeccable critique` (dual-agent) on `/`: 23/32 with 0 P0; the code-owned P1/P2 findings were fixed in the same pass (snapshot in `.impeccable/critique/`). Open owner items: the "Many" stat wording, social handles, headshots.

## Status

- [x] Documentation (core set)
- [x] Next.js scaffold
- [x] Components
- [x] Content wiring
- [x] Polish (Lighthouse ≥ 95 all categories, a11y contrast fixed)
- [x] UI/UX rebuild pass (2026-08-26): layered hero + proof terminal, bento services, timeline process, richer stat/team/why cards, extended motif layer in `globals.css` — tokens & copy unchanged; `typecheck`/`lint`/`build` all clean
- [x] Team blog `/blog` (curated research index; links to the founders' real published posts)
- [x] Polish pass (2026-08-26, `/impeccable polish`): hero fold, announcement link on small screens, focus-ring color, target sizes, label-in-name, stat overflow at 768, framer-motion replaced by IntersectionObserver `Reveal` (route JS 39.8 kB → 0.9 kB); Lighthouse re-run — table above
- [x] Redesign pass (2026-08-26, `design-taste-frontend` + `redesign-existing-projects`): Geist / Geist Mono replace Inter / JetBrains Mono; mock hero terminal replaced by a real-data proof panel (top-3 CVEs, linked); gradient text, hover glow blobs and section eyebrows removed; USP + Process + Team rebuilt as hairline columns / sticky split list (no cards); FinalCTA as a full-width band; `WhyUs` folded into `UspStrip` (`#why` kept); Navbar sticky state via IntersectionObserver; em-dashes removed from copy; `DESIGN.md` + `docs/03` + `docs/05` updated
- [ ] Deploy to Vercel + set env vars (pending)
