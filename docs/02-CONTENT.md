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
| `Many` | senior experts validating every finding |
| `Millions` | of websites affected by our disclosures |

> Owner decisions: 2026-08-25 — `2×` OSWE card removed; card 3 reworded to **websites affected**. 2026-08-26 — card 2 changed from `3` researchers to **"Many" senior experts** (owner: do not state a headcount of 3; the validating bench is larger than the three founders). Exact number `TODO(owner)` if they ever want a figure.

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

**Heading:** `The experts behind the platform` — **Sub:** `Meet the founding researchers. Behind them, a wider bench of senior experts validates every finding. One standard: prove it.`

Data in `content/team.ts`:

| Name | Handle | Role | Certifications | LinkedIn |
|------|--------|------|----------------|----------|
| Phuoc Pham | `p3tl0v3r` | Founder | OSWE | https://www.linkedin.com/in/phamphuoc/ |
| An Ngo | `ancorn_` | Co-Founder | OSWE · Synack Red Team (SRT Hero) | https://www.linkedin.com/in/ngothienan/ |
| Dau Hoang Tai | `taidh` | Co-Founder | CPTS · Synack Red Team (SRT Hero) | https://www.linkedin.com/in/taidh/ |

- Roles + LinkedIn confirmed by owner 2026-08-25 (Tai is a **Co-Founder**).
- Cert glossary (show as tooltip/footnote): **OSWE** = OffSec Web Expert · **CPTS** = Certified Penetration Testing Specialist (Hack The Box) · **SRT Hero** = Synack Red Team, Hero tier.

### Bios (verified 2026-08-26 via the owner's browser — LinkedIn + public records)

Read directly from each member's LinkedIn (logged in through the owner's Chrome) plus Wordfence / Patchstack / Synack Acropolis / NVD / the VNPT Cyber Immunity blog.

- **Phuoc Pham** (`p3tl0v3r`, full name Phuoc Pham Van Long) — Founder. OSWE-certified web-application researcher; Security Researcher at **Synack Red Team** (Dec 2024–present) and Penetration Tester at **VNPT Cyber Immunity** (Jan 2023–Mar 2026). Author of the "Sitecore CVE-2025-53690 Detailed Analysis & Weaponized POC" write-up (VNPT blog) and a CloudFront-WAF-bypass note for the React2Shell/Next.js vuln; 4 CVEs credited on Wordfence. Acknowledged by Domino's; CTF placements (NightWolf top-5 solo, Security Bootcamp 2023 #6). *Note: Google links this identity to a "Phuoc Pham Van Long" PhD student in cryptography at Brown University; the LinkedIn profile shows FPT University + VNPT, so the academic角 is **not** claimed on the site — `TODO(owner)`: confirm if same person.*
- **An Ngo** (`ancorn_`) — Co-Founder. OSWE-certified; now Security Engineer at GRADION (ex-VNPT Cyber Immunity). 246 CVEs on Wordfence (rank #34), Patchstack top-8-all-time era, **Synack Red Team Hero two years running (2025 & 2026)**, **Apple Hall of Fame (Aug 2024)**, VNPT "white-hat, world top-14" recognition (240+ of VNPT's 300+ CVEs).
- **Dau Hoang Tai** (`taidh`, `DauHoangTai`, Đậu Hoàng Tài) — Co-Founder. Penetration Tester at **VNPT Cyber Immunity** (Apr 2022–present); Duy Tan University; CPTS. Reporter of **CVE-2022-29317 (SQLi, CVSS 9.8 Critical)** — his HackMD advisory is the NVD reference. Author of the AI-assisted Mitel MiCollab CVE analysis (Claude MCP + JADX + IDA Pro) and the MOVEit Transfer CVE-2023-34362/35036 deep-dive on the VNPT blog; SharePoint pre-auth RCE-chain PoC; active CTFer (Root-Me, HackMD, GitHub).

### Highlights (public, sourced — shown on the cards)

| Person | Highlight | Source |
|--------|-----------|--------|
| Phuoc Pham | Author: Sitecore CVE-2025-53690 (CVSS 9.0) weaponized PoC & MemShell analysis | sec.vnpt.vn/2025/11/Sitecore-CVE-2025-53690-… |
| Phuoc Pham | 4 CVEs credited on Wordfence Intelligence (WordPress plugins) | wordfence.com/…/researchers/phuoc-pham-p3tl0v3r |
| Phuoc Pham | OSWE · Synack Red Team member | LinkedIn / owner |
| An Ngo | 246 CVEs on Wordfence — all-time rank #34 | wordfence.com/…/researchers/ngo-thien-an-ancorn |
| An Ngo | Synack Red Team Hero — 2025 & 2026 | acropolis.synack.com/inductees/ancorn_ |
| An Ngo | Patchstack verified — 154 reports, top-40 all-time | patchstack.com/database/researcher/090515a6-… |
| An Ngo | 3 critical CVEs (CVSS 9.1–9.8) | `/research?severity=critical` |
| An Ngo | Apple Hall of Fame honoree (2024) | LinkedIn (Aug 2024 post) |
| Dau Hoang Tai | CVE-2022-29317 — SQL injection, CVSS 9.8 Critical | nvd.nist.gov/vuln/detail/CVE-2022-29317 |
| Dau Hoang Tai | Author: AI-assisted Mitel MiCollab CVE analysis (Claude MCP + JADX + IDA Pro) | sec.vnpt.vn/tin-tuc/blog/AI-Assisted-Mitel-CVE-Analysis-… |
| Dau Hoang Tai | MOVEit Transfer CVE-2023-34362 / CVE-2023-35036 analysis | sec.vnpt.vn/tin-tuc/blog/analysis-cve-2023-34362-… |
| Dau Hoang Tai | Hack The Box CPTS · Synack Red Team member | owner / LinkedIn |

**Dropped as unverifiable (do not re-add without a primary source):**
- "28 Firefox security bugs / 4 CVEs" for Tai — Mozilla MFSA bulletins do not credit Đậu Hoàng Tài (the 2026 Firefox CVEs found were credited to a different researcher). LinkedIn shows no such entry.
- "ManageEngine PAM360 SQLi, CVE-2026-12371" — ID not in NVD.

- Cert glossary: **OSWE** = OffSec Web Expert · **CPTS** = Certified Penetration Testing Specialist (Hack The Box) · **SRT Hero** = Synack Red Team, Hero tier · **SRT** = Synack Red Team member.
- Owner note: earlier draft listed Tai as "SRT Hero"; his own LinkedIn says "SRT Member", so the card says **member**. Upgrade to Hero if he appears on the Acropolis Hero list.
- Avatar: initials/monogram (no fake photos). Headshots `TODO(owner)` → drop files in `public/team/` and set `photo` in `content/team.ts`.
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
