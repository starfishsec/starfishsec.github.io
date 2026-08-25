# CLAUDE.md — Instructions for the AI writing code

You are building the **Starfish Security** landing page. This file is the guardrail set. Read `docs/` in the order given in `README.md` before writing a single line of code.

## Golden rules

1. **Content is sacred.** All copy comes from `docs/02-content.md`. Do NOT invent numbers, names, CVEs, or certifications. If data is missing, leave a `TODO:` comment — never fabricate.
2. **Design tokens are law.** No scattered hardcoded colors/spacing. Use the tokens in `docs/03-design-system.md` (declared once in the `@theme` block of `app/globals.css`, which emits both CSS variables and Tailwind utilities — there is no `tailwind.config.ts`).
3. **No false claims.** This is a human services team, NOT an autonomous AI product. Do not use language like "autonomous engine" or "AI agent scans your app." Avoid any wording that misrepresents capabilities.
4. **Accessibility by default.** Semantic HTML, `alt` text, AA contrast, `focus-visible`, and `prefers-reduced-motion` must disable animation.
5. **Performance budget.** Lighthouse ≥ 95 in every category. No heavy libraries without justification. Use `next/image` for images and `next/font` for fonts.
6. **Type-safe.** TypeScript strict. No `any` unless justified with a comment.

## Coding conventions

- **Components:** functional, PascalCase filename (`Hero.tsx`). One section = one component in `components/sections/`.
- **Data-driven:** repeating content (team, services, stats, CVEs) lives in `content/*.ts` as typed arrays; components map over them. Do NOT hand-write repeated JSX.
- **Styling:** Tailwind utility-first. Long class lists → compose with a `cn`/`clsx` helper. No runtime CSS-in-JS.
- **Client vs Server:** Server Component by default. Add `"use client"` only when interactivity is needed (animations, toggles, forms).
- **Imports:** use the `@/` path alias (configured in `tsconfig.json`).

## Definition of Done per section

- [ ] Matches the spec in `docs/05-components.md`
- [ ] Responsive: mobile (375px), tablet (768px), desktop (1440px)
- [ ] Dark theme is default; contrast checked
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No TypeScript errors, no ESLint errors
- [ ] Copy matches `docs/02-content.md`

## Do not

- Do not add a database. The contact form is the only dynamic piece: a Next.js server action (`app/actions/contact.ts`) that sends email via Resend (env-based key, `TODO`, never committed), with a `mailto:` fallback when env is missing.
- Do not add third-party analytics/tracking unless asked.
- Do not commit secrets/keys.
- Do not change the brand positioning (services team, not an AI product).
