# 02 — Content (Copy source of truth)

All visitor-facing text lives here. If it's not here, don't write it. Remaining unknowns are marked `TODO(owner)` — keep them as visible placeholders in code until confirmed.

**Confirmed facts (2026-08-25):** company `Starfish Security`; domain `starfishsec.com`; contact `info@starfishsec.com`; 3 researchers; 200+ CVEs across platforms (WordPress plugins, Apache, and more). Logo assets in `/logo` (`logo.png` = mark, `logo2.png` = mark + "STARFISH SEC" wordmark).

Section order (top → bottom), adapted for a services team:

1. Announcement bar
2. Navbar
3. Hero
4. Trust bar / stats
5. How we work (process)
6. Services
7. Research / CVE proof
8. Team
9. Why us (differentiator)
10. Final CTA
11. Footer

---

## 1. Announcement bar (dismissible)

> **Latest research:** We disclosed a stored-XSS vulnerability in Rank Math SEO (2M+ installs). → Read the advisory
- If no live advisory, hide the bar. Link target `TODO(owner)`.

## 2. Navbar

- **Logo:** use `/logo` mark + "STARFISH SEC" wordmark (see `docs/03` for the white/dark-mode version). Do NOT re-typeset the wordmark by hand.
- **Links:** `Services` · `Research` · `Team` · `Contact`
- **Primary button:** `Request a Pentest`
- Optional mono status: `● Available for engagements`

## 3. Hero

- **Eyebrow (mono):** `AI-POWERED · EXPERT-VALIDATED · 200+ PUBLISHED CVEs`
- **Headline (H1):** **"We break what others assume is safe."**
- **Subheadline:**
  > Starfish Security is an AI-powered penetration-testing service built by researchers behind 200+ published CVEs. Our platform attacks your systems the way a real adversary would; our experts validate every finding and hand you working proof — in a fraction of the time, at a fraction of the cost of a traditional pentest.
- **Primary CTA:** `Request a Pentest`
- **Secondary CTA:** `View our Research`
- **Supporting line:** `AI speed. Expert judgment. Working proof. Pricing that makes sense.`
- Optional decorative mono line: `$ starfish scope --target you`

### 3b. USP strip (directly under the hero — owner, 2026-08-25)

| USP | Copy |
|-----|------|
| **AI-powered** | Our platform runs the attack continuously, covering more ground than any manual team could. |
| **Expert-validated** | Researchers behind 200+ CVEs confirm every finding. No false positives, no scanner noise. |
| **Fast delivery** | AI does the heavy lifting, so validated findings reach you fast — not after weeks of waiting. |
| **Convenient pricing** | Senior-researcher quality without the boutique-consultancy invoice. Clear, scoped, no surprises. |

> Owner asked to stress speed and price **without** concrete numbers (no SLA days, no prices). Keep it that way until confirmed. Data in `content/hero.ts` (`usps`), component `UspStrip`.

## 4. Trust bar / stats (3 cards)

| Value | Label |
|-------|-------|
| `200+` | CVEs published |
| `3` | Expert researchers behind the platform |
| `Millions` | of websites affected by our disclosures |

> Owner decisions (2026-08-25): the former `2×` OSWE card was **removed**; card 3 was reworded from "plugin installs" to **websites affected** (impact framing). All three values confirmed.

## 5. How we work (4 steps)

**Heading:** `How we work` — **Sub:** `From scope to working exploit — AI-driven testing, expert-verified.`

1. **Scope** — We map your attack surface and agree on rules of engagement.
2. **Attack** — Our AI-powered platform tests your systems continuously, chaining real vulnerabilities the way an attacker would.
3. **Prove** — Our researchers validate every finding and ship a working proof-of-concept. No noise, no theoretical risk.
4. **Report & retest** — Clear, prioritized remediation guidance delivered fast, then we verify the fixes.

## 6. Services

**Heading:** `What we do`

Confirmed core + the three services the owner named:

- **AI-Powered Penetration Testing** — AI-driven, exploit-focused testing of web apps, APIs, and infrastructure — every finding validated by senior researchers, delivered fast, with a working exploit and clear, cost-effective scoping.
- **Vulnerability Research** — Zero-day research and responsible disclosure on the platforms you depend on. 200+ CVEs and counting.
- **Red Team / Adversary Simulation** — Objective-based, stealth engagements that emulate a real attacker's full kill chain.
- **Security Consulting** — Secure-design review, threat modeling, and on-call expertise for your team.
- **Exploit Development Support** — We build reliable proof-of-concept and working exploits to validate risk and support your remediation.

> The owner explicitly named Red Team, Consulting, and Exploit Support. Penetration Testing + Vulnerability Research are kept as core competencies (they're the CVE track record). Trim to the owner's three if preferred.

## 7. Research / CVE proof

**Heading:** `Proof, published.` — **Sub:** `We don't just claim skill — it's in the public record. 200+ CVEs and counting.`

**Data source (2026-08-25):** the full public record of CVEs credited to `ancorn_` (246) and `p3tl0v3r` (4, 3 shared) on Wordfence Intelligence — **247 unique CVEs** (3 Critical · 12 High · 232 Medium) — is imported into `content/cves.data.ts` via `scripts/import-wordfence.mjs` from `data/wordfence/*.json`. Nothing is hand-written; platform / type / CVSS / date are parsed from the record, and each row links to its advisory.

**Ordering rule (owner, 2026-08-25):** highest severity first (9.8 → down), then newest. The landing shows the 6 most severe; `/research` lists all with vendor / year / severity filters and a sort toggle. Current top of the list:

| CVE ID | Platform | Type | CVSS |
|--------|----------|------|------|
| CVE-2024-32511 | Simple Registration for WooCommerce | Unauthenticated Privilege Escalation | 9.8 Critical |
| CVE-2024-24842 | Knowledge Base for Documentation, FAQs with AI Assistance | Unauthenticated PHP Object Injection | 9.8 Critical |
| CVE-2024-31237 | s2Member | Limited Privilege Escalation | 9.1 Critical |
| CVE-2025-32160 | EventON | Authenticated (Contributor+) Local File Inclusion | 8.8 High |
| CVE-2024-53824 | All Bootstrap Blocks | Authenticated (Contributor+) Local File Inclusion | 8.8 High |
| CVE-2024-37455 | Ultimate Addons for Elementor | Authenticated (Contributor+) Privilege Escalation | 8.8 High |

- Severity buckets: CVSS ≥ 9.0 Critical · 7.0–8.9 High · 4.0–6.9 Medium · < 4.0 Low. Always paired with a text label (`Badge`).
- **CTA:** `See all advisories →` → `/research`.
- `TODO(owner)`: CVEs credited to Phuoc Pham / `taidh`, and non-WordPress advisories (Apache, other databases) are not in the export yet — add a JSON under `data/wordfence/` or another importer. Wordfence has no researcher profile under those names.

## 8. Team

**Heading:** `The experts behind the platform` — **Sub:** `Three researchers who find bugs for a living. One standard: prove it.`

Data in `content/team.ts`:

| Name | Handle | Role | Certifications | LinkedIn |
|------|--------|------|----------------|----------|
| Phuoc Pham | `p3tl0v3r` | Founder | OSWE | https://www.linkedin.com/in/phamphuoc/ |
| An Ngo | `ancorn_` | Co-Founder | OSWE · Synack Red Team (SRT Hero) | https://www.linkedin.com/in/ngothienan/ |
| Dau Hoang Tai | `taidh` | Co-Founder | CPTS · Synack Red Team (SRT Hero) | https://www.linkedin.com/in/taidh/ |

- Roles + LinkedIn confirmed by owner 2026-08-25 (Tai is a **Co-Founder**).
- Cert glossary (show as tooltip/footnote): **OSWE** = OffSec Web Expert · **CPTS** = Certified Penetration Testing Specialist (Hack The Box) · **SRT Hero** = Synack Red Team, Hero tier.

### Bios (DRAFT 2026-08-25 — owner to review)

LinkedIn is auth-walled (HTTP 999), so bios were drafted **only** from public records: cert list, Wordfence / Patchstack / Synack Acropolis pages, the researcher's own site, and indexed public posts.

- **Phuoc Pham** (`p3tl0v3r`) — Founder. OSWE-certified web-application security researcher with published WordPress CVEs to his name, who leads Starfish's offensive methodology and the expert review behind every engagement.
- **An Ngo** — Co-Founder. OSWE-certified penetration tester and one of the most prolific WordPress-ecosystem researchers on record — 246 CVEs credited on Wordfence, including critical unauthenticated privilege-escalation and object-injection findings. Synack Acropolis inductee and Apple Hall of Fame honoree.
- **Dau Hoang Tai** (`taidh`) — Co-Founder. Penetration tester, red-team operator and CTF player who hunts on live enterprise targets through the Synack Red Team, with a research focus on browsers and enterprise software. CPTS-certified Synack Red Team Hero.

### Highlights (public, sourced — shown on the cards)

| Person | Highlight | Source |
|--------|-----------|--------|
| An Ngo | 246 CVEs on Wordfence Intelligence — all-time rank #34 | wordfence.com/…/researchers/ngo-thien-an-ancorn |
| An Ngo | Synack Acropolis inductee (Class of 2025) — Hero 2025 & 2026 | acropolis.synack.com/inductees/ancorn_ |
| An Ngo | Patchstack Alliance verified researcher — 154 reports, top-40 all-time | patchstack.com/database/researcher/090515a6-… |
| An Ngo | 3 critical CVEs (CVSS 9.1–9.8) | `/research?severity=critical` |
| An Ngo | Apple Hall of Fame honoree | ngothienan.github.io/about (self-reported) |
| Dau Hoang Tai | Synack Red Team — Hero tier | owner |
| Dau Hoang Tai | Hack The Box CPTS | owner |
| Dau Hoang Tai | Bug bounty hunter — HackerOne / Internet Bug Bounty (1 resolved report, badges 2023) | hackerone.com/taidh |

**Withheld from the card until verified (`TODO(owner)`):**
- "28 Firefox security bugs in two months, 4 CVEs (2 solo, 2 with Khanh Nguyen)" — appears only in indexed LinkedIn/HackMD snippets. MFSA 2026-25/46/68/74 credit **Khanh Nguyen** (CVE-2026-16365/16366/74960/74965) but not Tai. Need Bugzilla IDs or MFSA entries naming Tai.
- "ManageEngine PAM360 SQLi → privilege escalation, CVE-2026-12371" — ID **not found in NVD** (reserved?). Need the vendor advisory / CVE record.
- Tai's own site (`dauhoangtai.github.io` → `blog.taidh.xyz`) no longer resolves; HackMD/X unreachable from this network; LinkedIn auth-walled.
| Phuoc Pham | 4 CVEs credited on Wordfence Intelligence (stored XSS, WordPress plugins) | wordfence.com/…/researchers/phuoc-pham-p3tl0v3r |
| Phuoc Pham | OSWE certified | owner |

- Avatar: initials/monogram placeholder (no fake photos). Real headshots `TODO(owner)` → drop files in `public/team/` and set `photo` in `content/team.ts`.
- Company-level social (X, GitHub) still `TODO(owner)`.

## 9. Why us (differentiator)

**Heading:** `Why Starfish`
- **AI-powered, expert-validated.** Our platform covers more ground, faster. Researchers behind 200+ CVEs decide what's real and what matters — every finding is human-confirmed.
- **Fast turnaround.** AI does the heavy lifting, so validated findings and working exploits reach you fast — no waiting weeks for a final report.
- **Pricing that makes sense.** AI efficiency means senior-researcher quality without the boutique-consultancy invoice. Clear, scoped pricing — no surprises.
- **Proof over paperwork.** Every finding comes with a working exploit and clear remediation — not a scanner export. 200+ CVEs in the public record back it up.

## 10. Final CTA

- **Heading:** `Ready to see what an attacker sees?`
- **Body:** `Book a scoping call. We'll tell you honestly where you stand — and quote you clearly.`
- **Primary CTA:** `Request a Pentest`
- **Secondary:** `info@starfishsec.com`

## 11. Footer

- **Mantra (monospace, large, low-opacity):** `STARFISH SECURITY // PROOF OR IT DIDN'T HAPPEN`
- **Columns:**
  - Company: About, Team, Contact
  - Services: Penetration Testing, Red Team, Research, Consulting
  - Research: Advisories, CVEs, Disclosure policy
  - Social: `TODO(owner)` (X, GitHub, LinkedIn)
- **Contact:** `info@starfishsec.com`
- **Legal:** `© 2026 Starfish Security. All rights reserved.`
- Optional: `● Available for engagements`

---

## SEO / metadata

- **Site name:** `Starfish Security`
- **Domain:** `https://starfishsec.com`
- **Title:** `Starfish Security — AI-Powered Penetration Testing`
- **Meta description:** `AI-powered penetration testing, validated by researchers behind 200+ published CVEs. Working proof delivered fast, at a price that makes sense — not theoretical risk.`
- **OG image:** `TODO` (dark, starfish mark + tagline).
