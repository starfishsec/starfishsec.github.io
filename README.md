# Starfish Security — Landing Page

Marketing site for **Starfish Security**, a boutique offensive-security team of 3 industry-certified researchers (OSWE, CPTS, Synack Red Team) who have published **200+ CVEs** across many platforms (Apache, WordPress, and more).

Aesthetic / structural reference: [pwn.ai](https://pwn.ai) — dark, technical, "proof over promises" — but repositioned for a **human services firm**, not an autonomous AI product.

## Tech stack

- **Next.js 15** (App Router, RSC)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
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
- `docs/` — specs (see table above); `docs/06` has the build status and implementation decisions
- `public/` — generated white logo assets, icons, `og.png`; `logo/` — original owner assets

## QA snapshot (2026-08-25, production build, Lighthouse mobile)

| Route | Perf | A11y | Best Practices | SEO |
|-------|------|------|----------------|-----|
| `/` | 96 | 100 | 100 | 100 |
| `/research` | 96 | 100 | 100 | 100 |
| `/contact` | 97 | 100 | 100 | 100 |

Responsive checked at 375 / 768 / 1440, `prefers-reduced-motion` verified, no console errors, no horizontal overflow.

## Status

- [x] Documentation (core set)
- [x] Next.js scaffold
- [x] Components
- [x] Content wiring
- [x] Polish (Lighthouse ≥ 95 all categories, a11y contrast fixed)
- [ ] Deploy to Vercel + set env vars (pending)
