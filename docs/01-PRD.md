# 01 — Product Requirements (PRD)

## 1. Summary

Build a single-page marketing site (plus a few utility routes) for **Starfish Security**,
an **AI-powered penetration-testing service** built and operated by a team of offensive-security
researchers. Positioning (owner, 2026-08-25): the platform runs the testing; the experts behind it
— 200+ published CVEs, OSWE / CPTS / Synack Red Team — validate every finding and deliver working
proof. The page must establish immediate credibility through **hard proof** and convert visitors
into engagement requests. Visual/structural reference: <https://pwn.ai/> — dark, technical,
confident, "proof over promises".

> Positioning history: v1 docs described a purely manual services team. Superseded 2026-08-25.
> Claims about the AI platform itself (coverage, autonomy level, benchmarks) are **not confirmed** —
> keep copy to "AI-powered" + "expert-validated" until the owner supplies specifics (`TODO(owner)`).

## 2. Business context

- **Company**: Starfish Security · `starfishsec.com` · `info@starfishsec.com`
- **Team**: 3 offensive-security researchers (see `docs/02` §8):
  - Phuoc Pham — Founder — **OSWE**
  - An Ngo (`ancorn_`) — Co-Founder — **OSWE**, **Synack Red Team (SRT Hero)**
  - Dau Hoang Tai (`taidh`) — Co-Founder — **CPTS** (Hack The Box), **Synack Red Team (SRT Hero)**
  - LinkedIn: phamphuoc · ngothienan · taidh (confirmed 2026-08-25)
  - Note: certs are mixed (OffSec OSWE + HTB CPTS + Synack) — do NOT claim "all OffSec". Say "industry-certified" / list per person.
- **Track record**: 200+ CVEs researched and published, across WordPress plugins, Apache, and
  other widely deployed software. Public sample credited to `ancorn_` on Wordfence
  (Rank Math SEO, SEOPress, Blocksy, SiteOrigin, Element Pack, …). Full export: `TODO(owner)`.
- **Offer**: AI-powered pentesting as a service, plus research / red team / consulting / exploit support. See §5.
- **Geography / language**: site in **English** (international clients). Vietnamese i18n is
  out of scope for v1 but the architecture must not block it (all copy in content files).

## 3. Goals & success metrics

| Goal | Metric (post-launch) |
|------|----------------------|
| Establish credibility in < 5 seconds | Hero shows CVE count above the fold on mobile; certifications listed per person in Team |
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

1. **AI-Powered Penetration Testing** — AI-driven, exploit-focused; web, API, infrastructure; every finding validated by senior researchers.
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
| 1 | Team names, titles, certs | ✅ Names, certs, titles (Founder / Co-Founder / Co-Founder) and LinkedIn confirmed (§2). Headshots `TODO(owner)` → initials avatar. |
| 2 | Full exportable CVE list (ID, vendor, CVSS, date, link) | ✅ 246 CVEs credited to `ancorn_` imported from Wordfence public records (`docs/02` §7). Other researchers / non-WordPress CVEs `TODO(owner)`. |
| 3 | Domain | ✅ `starfishsec.com` |
| 4 | Contact email / PGP / Signal | ✅ `info@starfishsec.com` (PGP/Signal `TODO(owner)`, optional) |
| 5 | Logo / wordmark file | ✅ `/logo/logo.png` (mark), `/logo/logo2.png` (mark + "STARFISH SEC"). Need white/dark-mode + SVG versions — `TODO`. |
| 6 | Vendor list for trust strip | WordPress plugins + Apache confirmed; the stat card now reads "Millions of websites affected" (owner, 2026-08-25). |
| 7 | Founding year, location | `TODO(owner)` |
| 8 | Publish pricing signals? | `TODO(owner)` — default: not shown |
| 9 | Social handles (X, LinkedIn, GitHub, HackerOne) | ✅ Personal LinkedIn per team member (§2). Company X / GitHub / HackerOne `TODO(owner)` |
