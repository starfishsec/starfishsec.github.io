# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — CTO / Head of Security / Engineering lead** at product companies (SaaS, fintech, e-commerce), international, evaluating pentest vendors. Situation: comparing a handful of firms under time pressure, often after a customer/compliance ask. Job: decide in minutes whether this team is credible and worth a scoping call. Wants proof, methodology, a pricing signal, and speed.

**Secondary — Open-source maintainers & software vendors** who received a disclosure from Starfish and are checking who sent it. Wants: research legitimacy, disclosure policy, a contact channel.

**Tertiary — Recruiters, peers, conference organizers.** Wants: team bios, certifications, publications.

Site language is English. Vietnamese i18n is out of scope for v1 but must not be blocked (all copy lives in `content/*.ts`).

## Product Purpose

Starfish Security (`starfishsec.com`) is an **expert-led penetration-testing, red-team, and consulting service**: a team of 10+ senior experts runs every engagement and delivers working proof. (Positioning: owner 2026-09-08, second revision — site copy mentions no AI at all; supersedes "expert-led, AI-assisted" and 2026-08-25's "AI-powered".) The site exists to (1) establish credibility within ~5 seconds through hard public proof and (2) convert visitors into scoping requests via "Request a Pentest" → `/contact`.

Success (post-launch, from `docs/01-PRD.md` §3): CVE count above the fold on mobile; certifications listed per person; contact-form / CTA submission rate ≥ 2% of visitors; Lighthouse ≥ 95 in every category; a 3-person team can add a CVE or team member by editing one TS file.

## Positioning

Two things a neighboring vendor cannot truthfully copy together:

1. **The proof record.** 200+ CVEs researched and published across widely deployed software (WordPress ecosystem, Apache, others). 246 of them are publicly credited to co-founder An Ngo (`ancorn_`) on Wordfence Intelligence (all-time rank #34), affecting millions of websites. Every claim on the site is backed by a public record.
2. **Working proof from the people behind the record.** The researchers behind the CVE record run the engagement themselves and ship a working exploit for every finding — no scanner noise, no theoretical risk.

Resulting USPs the owner wants remembered (2026-09-08): **Expert-led · Working proof · Fast delivery · Convenient pricing.** Mantra: "Proof or it didn't happen."

Positioning history: v1 docs described a purely manual services team; superseded by the owner on 2026-08-25. Do not change this positioning without owner confirmation.

## Operating Context

- **Engagement model (owner, 2026-08-26): both scoped one-off pentests and continuous / ongoing testing are offered.** Copy may describe either; neither should be presented as the only model.
- **Engagement flow (`content/process.ts`):** Scope (attack surface + rules of engagement) → Attack (experts chain real vulnerabilities into working attack paths) → Prove (researchers validate, ship a working PoC) → Report & retest (prioritized remediation, then fix verification).
- **Client portal / dashboard exists (owner, 2026-08-26).** Clients have a client-facing surface for the platform. Its actual capabilities (findings feed, status, reports, scheduling, …) are **not confirmed — `TODO(owner)`**. Future work may reference that a portal exists but must not depict or describe features until the owner supplies them.
- Entry point for leads is a **scoping call**, booked through the contact form (server action → Resend email; `mailto:` fallback when env is missing) or `info@starfishsec.com`.
- Secondary-audience touchpoints: `/disclosure` (responsible-disclosure policy), `/research` (full filterable CVE list), `/blog` (on-site research articles crediting their original source).

## Capabilities and Constraints

**Services (confirmed by owner 2026-08-25; copy in `content/services.ts`):**
1. Penetration Testing — web, API, infrastructure; exploit-focused; every finding run and verified by senior researchers.
2. Vulnerability Research — 0-day research + responsible disclosure (the thing the team is known for).
3. Red Team / Adversary Simulation — objective-based, stealth, full kill chain.
4. Security Consulting — secure-design review, threat modeling, on-call expertise.
5. Exploit Development Support — reliable PoCs / working exploits to validate risk and support remediation.

**Routes (v1):** `/`, `/research`, `/blog` + `/blog/[slug]`, `/contact`, `/thanks`, `/disclosure`, `/privacy`, plus `robots.txt`, `sitemap.xml`, OG image, favicon set. Optional `/research/[slug]` advisory pages only if time permits.

**Technical constraints:** Next.js 15 App Router (RSC), TypeScript strict, Tailwind v4 (tokens in the `@theme` block of `app/globals.css`, no `tailwind.config.ts`), Framer Motion, `next/image`, `next/font`. Static generation for every route; the contact form is the only dynamic piece. No database, no third-party scripts/analytics/tracking in v1 (so no cookie banner). Deploy target Vercel. Must read with JS disabled; the form must still submit natively. Lighthouse mobile ≥ 95 in all four categories. Content is data-driven from `content/*.ts`; components never hand-write repeated content.

**Terminology:** say "expert-led" and "expert-verified"; site copy never mentions AI (verbatim public records containing "AI" — CVE platform names, published article titles — are data and stay). Say "industry-certified" or list certs per person — never "all OffSec" (certs are mixed: OffSec OSWE, HTB CPTS, Synack Red Team). Team headcount is not published: say "many experts" / "a wider bench of senior experts", never "3". Stat wording for impact: "Millions of websites affected by our disclosures".

**Hard limits on claims (CLAUDE.md rule 3):** no invented platform capabilities, coverage numbers, benchmarks, autonomy level ("fully autonomous / no humans"), SLAs, delivery times, or prices. "Fast" and "convenient pricing" stay qualitative.

**Explicitly undecided / open (`TODO(owner)`):**
- Portal capabilities (see Operating Context).
- **Pricing on the site: decided 2026-08-26 — no numbers.** Keep "clear, scoped pricing"; quotes follow the scoping call. Do not add "starting from" figures or tiers.
- Founding year.
- PGP key / Signal contact (optional).
- Company social handles (X, GitHub, HackerOne) — personal LinkedIn per team member is confirmed; `socials` array is empty and unrendered until supplied.
- CVEs credited to Phuoc Pham / Dau Hoang Tai and non-WordPress (e.g. Apache) CVEs are not yet in the data export.
- Team headshots — monogram avatars until supplied.
- Announcement-bar advisory link target.

## Brand Commitments

- **Name:** Starfish Security. **Wordmark:** "STARFISH SEC". **Domain:** `starfishsec.com`. **Email:** `info@starfishsec.com`.
- **Location (owner, 2026-08-26): Vietnam-based, serving international clients.** May be stated on the site.
- **Logo assets (brand drop, owner 2026-09-08):** vector masters live in `starfishsec-social-variations/` (profile 1024×1024 and lockup 1600×560, SVG + PNG, in green/white/black on black/white/green; palette #0A0B0D / #39FF88 / #FFFFFF, matching the site tokens). The site renders the mark as inline SVG (`components/ui/StarfishMark.tsx`); favicons, apple icon and `public/og.png` are generated from the green-on-black masters. The old `logo/logo*.png` Celtic-knot originals are superseded.
- **Voice (`docs/01-PRD.md` §8, binding):** confident, precise, slightly dry. Zero buzzwords ("cutting-edge", "next-gen", "holistic"). Proof over adjectives — numbers, CVE IDs, vendor names, methodology. Short sentences, active voice. Second person for the client ("your app"), first-person plural for us ("we"). A hacker-culture wink is allowed in small doses (footer mantra, monospace section labels), never cringe.
- **Owner-pinned visual reference (recorded, not expanded here):** pwn.ai — dark, technical, "proof over promises". Dark theme is the default; no light theme in v1. Design tokens live in `docs/03-design-system.md` and `app/globals.css`.

## Evidence on Hand

- **CVE record:** 246 CVEs credited to `ancorn_` imported verbatim from Wordfence Intelligence public records → `content/cves.data.ts` (generated by `scripts/import-wordfence.mjs` from `data/wordfence/*.json`). Each row carries platform, type, severity, CVSS, publish date, and source URL.
- **Team facts (verified 2026-08-25/26 via LinkedIn, Wordfence, Patchstack, Synack Acropolis, NVD, VNPT Cyber Immunity blog; `content/team.ts`):**
  - Phuoc Pham (`p3tl0v3r`) — Founder — OSWE, Synack Red Team. Author of the Sitecore CVE-2025-53690 weaponized PoC analysis; 4 CVEs on Wordfence.
  - An Ngo (`ancorn_`) — Co-Founder — OSWE, Synack Red Team Hero (two-time). 246 CVEs on Wordfence (rank #34); Apple Hall of Fame honoree.
  - Dau Hoang Tai (`taidh`) — Co-Founder — CPTS (Hack The Box), Synack Red Team Hero.
  - LinkedIn: phamphuoc · ngothienan · taidh.
- **Named public advisories usable in copy:** Rank Math SEO stored XSS (CVE-2024-2536, 2M+ installs), SEOPress, Blocksy, SiteOrigin, Element Pack.
- **Published research** by the founders, hosted as on-site articles with source credit → `content/blog.ts`.
- **Certifications:** OSWE (OffSec Web Expert), CPTS (HTB), Synack Red Team / SRT Hero — glossary in `content/team.ts`.
- **QA evidence:** Lighthouse mobile 96–97 / 100 / 100 / 100 on `/`, `/research`, `/contact` (2026-08-25 build; re-run pending after the 2026-08-26 rebuild).

**Absent — must not be fabricated:** client names, logos, or testimonials; case studies; pricing figures; delivery-time figures; platform screenshots or feature lists; benchmarks or coverage percentages; founding year; press mentions; company social accounts.

## Product Principles

1. **Proof or it didn't happen.** Every claim traces to a public record (CVE, advisory, cert, profile). When a value is missing, ship a visible `TODO`, never a plausible number.
2. **The experts are the offer.** The people behind the CVE record run the engagement and stand behind every finding.
3. **Fast to credibility, fast to contact.** A skeptical security lead must see the proof record above the fold and reach "Request a Pentest" without hunting.
4. **Speak to the buyer, honor the researcher.** Primary copy sells outcomes to the CTO; disclosure policy, research index, and bios serve maintainers and peers with the same rigor.
5. **Maintainable by three people.** Content and data live in typed `content/*.ts` files; adding a CVE, article, or teammate never touches a component.

## Accessibility & Inclusion

WCAG 2.2 AA required. Semantic HTML, `alt` text, AA contrast on the dark theme, visible `focus-visible`, `prefers-reduced-motion` disables animation. Page must remain readable and the contact form submittable with JavaScript disabled. Lighthouse Accessibility target 100 (currently met).
