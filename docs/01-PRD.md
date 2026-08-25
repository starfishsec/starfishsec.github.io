# 01 — Product Requirements (PRD)

## 1. Summary

Build a single-page marketing site (plus a few utility routes) for **Starfish Security**,
a boutique offensive-security firm. The page must establish immediate credibility through
**hard proof** (200+ CVEs, OffSec certifications) and convert visitors into engagement
requests. Visual/structural reference: <https://pwn.ai/> — dark, technical, confident,
"proof over promises".

## 2. Business context

- **Company**: Starfish Security · `starfishsec.com` · `info@starfishsec.com`
- **Team**: 3 offensive-security researchers (see `docs/02` §8):
  - Phuoc Pham — Founder — **OSWE**
  - An Ngo (`ancorn_`) — Co-Founder — **OSWE**, **Synack Red Team (SRT Hero)**
  - Dau Hoang Tai (`taidh`) — Security Researcher — **CPTS** (Hack The Box), **Synack Red Team (SRT Hero)**
  - Note: certs are mixed (OffSec OSWE + HTB CPTS + Synack) — do NOT claim "all OffSec". Say "industry-certified" / list per person.
- **Track record**: 200+ CVEs researched and published, across WordPress plugins, Apache, and
  other widely deployed software. Public sample credited to `ancorn_` on Wordfence
  (Rank Math SEO, SEOPress, Blocksy, SiteOrigin, Element Pack, …). Full export: `TODO(owner)`.
- **Offer**: services, not software. See §5.
- **Geography / language**: site in **English** (international clients). Vietnamese i18n is
  out of scope for v1 but the architecture must not block it (all copy in content files).

## 3. Goals & success metrics

| Goal | Metric (post-launch) |
|------|----------------------|
| Establish credibility in < 5 seconds | Hero shows CVE count + OffSec badge above the fold on mobile |
| Generate qualified leads | Contact form / "Request a Pentest" CTA submission rate ≥ 2% of visitors |
| Look like a top-tier security firm | Lighthouse ≥ 95 (all), zero layout shift, polished motion |
| Be maintainable by a 3-person team | Add a CVE or team member by editing one TS file, no component changes |

## 4. Audience

1. **Primary — CTO / Head of Security / Engineering lead** at product companies (SaaS,
   fintech, e-commerce) evaluating pentest vendors. Wants proof, methodology, pricing signal, speed.
2. **Secondary — Open-source maintainers & vendors** who received a disclosure from us and
   are checking who we are. Wants: research legitimacy, disclosure policy, contact.
3. **Tertiary — Recruiters / peers / conference organizers.** Wants: team bios, publications.

## 5. Services (site content)

Confirmed by owner (2026-08-25): Red Team, Consulting, Exploit Support — plus Pentest & Research as core. Full copy in `docs/02` §6.

1. **Penetration Testing** — manual, exploit-driven; web, API, infrastructure.
2. **Vulnerability Research** — 0-day research + responsible disclosure (the thing we're known for — 200+ CVEs).
3. **Red Team / Adversary Simulation** — objective-based, stealth, full kill chain.
4. **Security Consulting** — secure-design review, threat modeling, on-call expertise.
5. **Exploit Development Support** — reliable PoCs / working exploits to validate risk and support remediation.

## 6. Scope

### In scope (v1)
- `/` landing page with all sections in `docs/02-CONTENT.md`
- `/research` — full CVE list page (filter by vendor/year/severity), data-driven
- `/research/[slug]` — **optional** advisory detail pages (MDX) — Phase 6, only if time permits
- `/contact` — standalone contact page (same form as landing CTA), and `/thanks`
- `/disclosure` — responsible disclosure policy (static text)
- `/privacy` — minimal privacy notice (required because of the contact form)
- `robots.txt`, `sitemap.xml`, OG image, favicon set
- Contact form: server action → email via Resend; graceful fallback (mailto) when env missing

### Out of scope (v1)
- Blog / CMS, auth, dashboards, pricing calculator, i18n, light theme, cookie banner
  (no tracking cookies in v1 → no banner needed)

## 7. Non-functional requirements

- Next.js 15 App Router, TypeScript strict, Tailwind v4 — see `docs/04`
- Static generation for every route (contact form is the only dynamic piece, via server action)
- Lighthouse mobile ≥ 95 Performance / Accessibility / Best Practices / SEO
- WCAG 2.2 AA
- Works with JS disabled for reading (progressive enhancement); form still submits (native POST via server action)
- No third-party scripts in v1

## 8. Brand voice (summary — details in `docs/02`)

- Confident, precise, slightly dry. Zero buzzwords ("cutting-edge", "next-gen", "holistic").
- Proof over adjectives: numbers, CVE IDs, vendor names, methodology.
- Short sentences. Active voice. Second person for the client ("your app"), first-person plural for us ("we").
- Hacker-culture wink allowed in small doses (footer mantra, section labels in monospace), never cringe.

## 9. Open questions for the owner (`TODO(owner)`)

| # | Question | Status / value |
|---|----------|----------------|
| 1 | Team names, titles, certs | ✅ Names + certs confirmed (§2). Titles: Founder / Co-Founder confirmed; Tai's title `TODO(owner)`. Headshots `TODO(owner)` → initials avatar. |
| 2 | Full exportable CVE list (ID, vendor, CVSS, date, link) | 7 real featured CVEs confirmed (`docs/02` §7). Full 200+ export `TODO(owner)` for `/research`. |
| 3 | Domain | ✅ `starfishsec.com` |
| 4 | Contact email / PGP / Signal | ✅ `info@starfishsec.com` (PGP/Signal `TODO(owner)`, optional) |
| 5 | Logo / wordmark file | ✅ `/logo/logo.png` (mark), `/logo/logo2.png` (mark + "STARFISH SEC"). Need white/dark-mode + SVG versions — `TODO`. |
| 6 | Vendor list for trust strip | WordPress plugins + Apache confirmed; broader list `TODO(owner)`. |
| 7 | Founding year, location | `TODO(owner)` |
| 8 | Publish pricing signals? | `TODO(owner)` — default: not shown |
| 9 | Social handles (X, LinkedIn, GitHub, HackerOne) | `TODO(owner)` — owner said "social để sau" (later) |
