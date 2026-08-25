# 04 — Architecture

## Stack

- **Next.js 15** (App Router, RSC), **TypeScript** strict, **Tailwind CSS v4**, **Framer Motion**, **Lucide React**.
- Package manager: npm (lockfile committed). Node: 20 LTS.
- Every route statically generated; the contact form (server action) is the only dynamic piece.

## Routes (v1)

| Route | Rendering | Notes |
|-------|-----------|-------|
| `/` | static | Landing — all sections from `docs/02` |
| `/research` | static | Full CVE list, filter by vendor/year/severity (data-driven) |
| `/research/[slug]` | static | **Optional** advisory detail (MDX) — only if time permits |
| `/contact` | static + server action | Same form as landing CTA |
| `/thanks` | static | Post-submit confirmation |
| `/disclosure` | static | Responsible disclosure policy |
| `/privacy` | static | Minimal privacy notice (required by contact form) |

## Folder structure

```
starfish/
├── app/
│   ├── layout.tsx            # Root: fonts, metadata, theme
│   ├── page.tsx              # Home — composes all sections in order
│   ├── globals.css           # Tailwind v4 + design tokens (@theme)
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── research/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx   # optional (MDX)
│   ├── contact/page.tsx
│   ├── thanks/page.tsx
│   ├── disclosure/page.tsx
│   ├── privacy/page.tsx
│   └── actions/
│       └── contact.ts        # server action: validate + send (Resend), mailto fallback
├── components/
│   ├── sections/             # One file per landing section
│   │   ├── AnnouncementBar.tsx   (client: dismiss + localStorage)
│   │   ├── Navbar.tsx            (client: scroll state, mobile menu w/ focus trap)
│   │   ├── Hero.tsx              (server; CSS-only entrance → fast LCP)
│   │   ├── StatsBar.tsx
│   │   ├── Process.tsx
│   │   ├── Services.tsx
│   │   ├── Research.tsx
│   │   ├── Team.tsx
│   │   ├── WhyUs.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   ├── ui/                   # Container, Button, Card, Badge, SectionHeading, StatCard,
│   │                         # Logo (mark + wordmark images), StatusDot, TodoNote, icons (key → Lucide map)
│   ├── forms/ContactForm.tsx # client, useActionState, progressive enhancement
│   ├── research/CveTable.tsx # client, vendor/year/severity filters
│   └── motion/               # Reveal.tsx (Framer whileInView), useReducedMotion.ts
├── content/                  # Typed content data (source of truth for repeated items)
│   ├── site.ts               # name, domain, email, socials (TODO), footer columns, SEO metadata
│   ├── nav.ts · hero.ts · announcement.ts · stats.ts · process.ts
│   ├── services.ts · cves.ts · team.ts · whyus.ts · cta.ts
├── lib/
│   └── cn.ts                 # clsx + tailwind-merge (extended with our theme scales)
├── public/                   # logo-mark-white.png, logo-wordmark-white.png, logo-lockup-white.png,
│                             # icon-192/512.png, og.png (generated from /logo; SVG export still TODO)
├── logo/                     # original brand assets from the owner (black on paper mockup)
├── tsconfig.json             # strict, "@/*" alias
├── next.config.ts
├── postcss.config.mjs        # @tailwindcss/postcss
├── eslint.config.mjs         # flat config (next/core-web-vitals + next/typescript)
├── .prettierrc · .env.example
└── package.json
```

## Tailwind v4 notes

- Config is CSS-first: define tokens in `globals.css` via `@import "tailwindcss";` + `@theme { --color-bg: ...; --font-mono: ...; }`.
- Map every color/font/scale token from `docs/03` into the `@theme` block; utilities are generated from them.
- PostCSS plugin: `@tailwindcss/postcss`. No `content` array needed for detection in v4.
- There is **no `tailwind.config.ts`** — everything lives in `app/globals.css` (`@theme`, `@utility`, base layer).
- `lib/cn.ts` extends `tailwind-merge` with our custom color/radius/font-size scales; otherwise it treats `text-small` (size) and `text-bg` (color) as the same group and drops one.

## Data flow

- `content/*.ts` export typed arrays/objects; sections import and map over them.
- No DB, no external fetch. One `interface` per content file (`Service`, `TeamMember`, `Cve`, `Stat`, `ProcessStep`). No `any`.
- Illustrative CVEs carry `example: true`; owner-supplied gaps use a `TODO(owner)` string. Never render fabricated data as if real.

## Rendering strategy

- Server Components by default. `"use client"` only where needed:
  - `Navbar` (mobile menu), `AnnouncementBar` (dismiss), `ContactForm`, `Reveal`/motion wrappers.
- Keep `"use client"` at leaf/wrapper level, not the whole page.

## Contact handling

- `app/actions/contact.ts` server action: validate input (zod or hand-rolled), send via **Resend** (`RESEND_API_KEY` from env — placeholder, not committed).
- Progressive enhancement: form submits via native POST to the server action; works without JS.
- If env missing → graceful fallback to `mailto:` link. On success → redirect `/thanks`.

## Dependencies (keep minimal)

```
next react react-dom
typescript @types/react @types/node
tailwindcss @tailwindcss/postcss
framer-motion
lucide-react
clsx tailwind-merge
zod                # form validation (optional but recommended)
resend             # email (server action)
```

Do not add UI kits (MUI, Chakra) or extra animation libs without asking.

## SEO & accessibility

- `metadata` export in `app/layout.tsx` from `content/site.ts` (title, description, OG, Twitter card, canonical).
- Per-route metadata for `/research`, `/contact`, etc.
- `robots.ts` + `sitemap.ts` (App Router conventions).
- Semantic landmarks: one `<h1>` per page, `<main>`, `<nav>`, `<footer>`. WCAG 2.2 AA.
- No third-party scripts in v1 (no analytics, no cookie banner needed).
