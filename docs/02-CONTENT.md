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

- **Eyebrow (mono):** `OFFENSIVE SECURITY · 200+ CVEs PUBLISHED`
- **Headline (H1, pick one):**
  - Primary: **"We break what others assume is safe."**
  - Alt A: "Real exploits. Not theoretical risk."
  - Alt B: "The team that finds what scanners miss."
- **Subheadline:**
  > Starfish Security is a three-person offensive team behind 200+ published CVEs across WordPress, Apache, and other widely deployed software. We test your systems the way a real attacker would — and hand you working proof.
- **Primary CTA:** `Request a Pentest`
- **Secondary CTA:** `View our Research`
- **Supporting line:** `Trusted by teams who need proof, not checklists.`
- Optional decorative mono line: `$ starfish scope --target you`

## 4. Trust bar / stats (4 cards)

| Value | Label |
|-------|-------|
| `200+` | CVEs published |
| `3` | Offensive researchers |
| `2×` | OSWE — OffSec Web Expert |
| `Millions` | plugin installs affected by our disclosures |

> `200+`, `3`, `2×` confirmed. "Millions" is defensible (Rank Math 2M+, SiteOrigin/Blocksy 1M+ installs) — `TODO(owner)`: confirm exact wording. Could swap card 4 for `Synack Red Team` badge.

## 5. How we work (4 steps)

**Heading:** `How we work` — **Sub:** `From scope to working exploit — a process built on real research.`

1. **Scope** — We map your attack surface and agree on rules of engagement.
2. **Attack** — We test manually, chaining real vulnerabilities the way an attacker would.
3. **Prove** — Every finding ships with a working proof-of-concept. No theoretical risk.
4. **Report & retest** — Clear, prioritized remediation guidance, then we verify the fixes.

## 6. Services

**Heading:** `What we do`

Confirmed core + the three services the owner named:

- **Penetration Testing** — Manual, exploit-driven testing of web apps, APIs, and infrastructure — beyond automated scanning.
- **Vulnerability Research** — Zero-day research and responsible disclosure on the platforms you depend on. 200+ CVEs and counting.
- **Red Team / Adversary Simulation** — Objective-based, stealth engagements that emulate a real attacker's full kill chain.
- **Security Consulting** — Secure-design review, threat modeling, and on-call expertise for your team.
- **Exploit Development Support** — We build reliable proof-of-concept and working exploits to validate risk and support your remediation.

> The owner explicitly named Red Team, Consulting, and Exploit Support. Penetration Testing + Vulnerability Research are kept as core competencies (they're the CVE track record). Trim to the owner's three if preferred.

## 7. Research / CVE proof

**Heading:** `Proof, published.` — **Sub:** `We don't just claim skill — it's in the public record. 200+ CVEs and counting.`

Featured CVEs (real, credited to An Ngo / `ancorn_` on public Wordfence records — a sample of the team's 200+):

| CVE ID | Platform | Type | Severity |
|--------|----------|------|----------|
| CVE-2024-2536 | Rank Math SEO | Stored XSS (Contributor+) | Medium (6.4) |
| CVE-2024-2165 | SEOPress | Stored XSS | Medium (6.4) |
| CVE-2024-4943 | Blocksy | Stored XSS | Medium (6.4) |
| CVE-2024-5901 | SiteOrigin Widgets Bundle | Stored XSS | Medium (6.4) |
| CVE-2024-4360 | Element Pack (Elementor Addons) | Stored XSS | Medium (6.4) |
| CVE-2024-47363 | Blockspare | Stored XSS | Medium |
| CVE-2023-47851 | Bootstrap Shortcodes Ultimate | Stored XSS | Medium (6.4) |

- Data lives in `content/cves.ts`. Each row: mono `CVE-ID` · platform · title · severity `Badge`.
- **CTA:** `See all advisories →` → `/research` (full, filterable list).
- `TODO(owner)`: export the authoritative full CVE list (all 3 researchers, incl. Apache + other databases) for the `/research` page. Source: https://www.wordfence.com/threat-intel/vulnerabilities/researchers/ngo-thien-an-ancorn

## 8. Team

**Heading:** `The team` — **Sub:** `Three researchers. One standard: prove it.`

Data in `content/team.ts`:

| Name | Handle | Role | Certifications |
|------|--------|------|----------------|
| Phuoc Pham | — | Founder | OSWE |
| An Ngo | `ancorn_` | Co-Founder | OSWE · Synack Red Team (SRT Hero) |
| Dau Hoang Tai | `taidh` | Security Researcher `TODO(owner): confirm title` | CPTS · Synack Red Team (SRT Hero) |

- Cert glossary (show as tooltip/footnote): **OSWE** = OffSec Web Expert · **CPTS** = Certified Penetration Testing Specialist (Hack The Box) · **SRT Hero** = Synack Red Team, Hero tier.
- Avatar: initials/monogram placeholder (no fake photos). Real headshots `TODO(owner)`.
- One-line bios `TODO(owner)`. Social links `TODO(owner)` (owner said "social để sau").

## 9. Why us (differentiator)

**Heading:** `Why Starfish`
- **Manual, not just automated.** Scanners flag maybes. We deliver confirmed, exploitable findings with a PoC.
- **Track record in the open.** 200+ CVEs is public, verifiable proof of depth.
- **Certified and battle-tested.** OSWE-certified, Synack Red Team researchers who find bugs for a living.
- **Proof over paperwork.** Every finding comes with a working exploit and clear remediation.

## 10. Final CTA

- **Heading:** `Ready to see what an attacker sees?`
- **Body:** `Book a scoping call. We'll tell you honestly where you stand.`
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
- **Title:** `Starfish Security — Offensive Security & Pentesting`
- **Meta description:** `A boutique offensive-security team behind 200+ published CVEs. Manual pentesting, red teaming, and vulnerability research that delivers working proof, not theoretical risk.`
- **OG image:** `TODO` (dark, starfish mark + tagline).
