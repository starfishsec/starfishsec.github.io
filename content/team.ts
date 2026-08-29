export interface Certification {
  short: string;
  long: string;
}

export interface Achievement {
  text: string;
  /** Public source for the claim (advisory, leaderboard, profile). */
  href?: string;
}

export interface TeamMember {
  name: string;
  handle?: string;
  role: string;
  certs: Certification[];
  /** Public profile link. */
  linkedin?: string;
  /**
   * One-line bio. Drafted 2026-08-26 from the members' own LinkedIn profiles (read via the
   * owner's browser) plus public records (CVE databases, leaderboards, published research).
   * Owner to review wording.
   */
  bio?: string;
  /** Public, sourced highlights shown on the card. Keep verifiable — no vanity claims. */
  achievements: Achievement[];
  /** TODO(owner): headshot path under /public/team/. Monogram is used while undefined. */
  photo?: string;
}

// Owner (2026-08-26): this section presents the *founding team*, not "the experts behind" —
// the wider validating bench is described elsewhere (UspStrip / stats), not here.
export const teamHeading = {
  title: "The founders behind the platform",
  subtitle:
    "Three offensive-security researchers who built Starfish and still run every engagement. One standard: prove it.",
} as const;

const OSWE: Certification = { short: "OSWE", long: "OffSec Web Expert" };
const CPTS: Certification = {
  short: "CPTS",
  long: "Certified Penetration Testing Specialist (Hack The Box)",
};
const SRT_HERO: Certification = { short: "SRT Hero", long: "Synack Red Team, Hero tier" };
const SRT: Certification = { short: "SRT", long: "Synack Red Team member" };

export const certGlossary: Certification[] = [OSWE, CPTS, SRT_HERO, SRT];

// Roles + LinkedIn confirmed by owner 2026-08-25. Bios/highlights verified 2026-08-26 from public
// records (LinkedIn, Wordfence, Patchstack, Synack Acropolis, NVD, VNPT Cyber Immunity blog) — docs/02 §8.
export const team: TeamMember[] = [
  {
    name: "Phuoc Pham",
    handle: "p3tl0v3r",
    role: "Founder",
    certs: [OSWE, SRT],
    linkedin: "https://www.linkedin.com/in/phamphuoc/",
    bio: "Founder. OSWE-certified web-application researcher and Synack Red Team member (ex-VNPT Cyber Immunity). Publishes weaponized analyses of critical enterprise vulnerabilities and reports plugin CVEs. He sets Starfish's offensive methodology and leads the expert review behind every engagement.",
    achievements: [
      {
        text: "Author: Sitecore CVE-2025-53690 (CVSS 9.0) weaponized PoC & MemShell analysis",
        href: "https://sec.vnpt.vn/2025/11/Sitecore-CVE-2025-53690-Detailed-Analysis-andamp-Weaponized-POC-Why-you-shouldnt-blindly-trust-the-documentation",
      },
      {
        // Verified 2026-08-29 on Mitel's advisory: MTLVULN-1672, NuPoint Unified Messaging (NPM)
        // component of MiCollab, Critical / CVSS 9.8, credited to "Phuoc Pham and Dung Pham".
        // No CVE assigned yet ("CVE identifiers have been requested but are not yet assigned"),
        // so this is not in the /research table.
        text: "MTLVULN-1672: unauthenticated command injection in Mitel MiCollab (NuPoint UM), CVSS 9.8 Critical — with Dung Pham",
        href: "https://www.mitel.com/support/security-advisories/mitel-product-security-advisory-misa-2026-0005",
      },
      {
        text: "4 CVEs credited on Wordfence Intelligence (stored XSS in widely used WordPress plugins)",
        href: "https://www.wordfence.com/threat-intel/vulnerabilities/researchers/phuoc-pham-p3tl0v3r",
      },
      {
        text: "CVE-2025-39518: SQL injection in BMA Lite, CVSS 7.6 High (Patchstack)",
        href: "https://patchstack.com/database/Wordpress/Plugin/bma-lite-appointment-booking-and-scheduling/vulnerability/wordpress-bma-lite-1-4-2-sql-injection-vulnerability",
      },
      // TODO(owner): the two claims below are owner-attested (2026-08-29) — no public source
      // found. Synack Acropolis has no /inductees/p3tl0v3r page, and no public acknowledgement
      // page was found for the Oracle / Domino's / Swisscom credits. Supply a link, or drop them.
      { text: "2× winner of the Synack “15 For 15” competition" },
      {
        text: "Responsible disclosure on VDP programs including Oracle, Sitecore, Mitel MiCollab, Domino’s Pizza and Swisscom, plus bug-bounty work on Synack",
      },
      { text: "OffSec Web Expert (OSWE) · Synack Red Team member" },
    ],
  },
  {
    name: "An Ngo",
    handle: "ancorn_",
    role: "Co-Founder",
    certs: [OSWE, SRT_HERO],
    linkedin: "https://www.linkedin.com/in/ngothienan/",
    bio: "Co-Founder. OSWE-certified security engineer and one of the most prolific WordPress-ecosystem researchers on record: 246 CVEs credited on Wordfence, including critical unauthenticated privilege-escalation and object-injection findings. Two-time Synack Red Team Hero and Apple Hall of Fame honoree.",
    achievements: [
      {
        text: "246 CVEs credited on Wordfence Intelligence (all-time rank #34)",
        href: "https://www.wordfence.com/threat-intel/vulnerabilities/researchers/ngo-thien-an-ancorn",
      },
      {
        text: "Synack Red Team Hero, two years running (Class of 2025 & 2026)",
        href: "https://acropolis.synack.com/inductees/ancorn_",
      },
      {
        text: "Patchstack Alliance verified researcher: 154 reports, top-40 all-time",
        href: "https://patchstack.com/database/researcher/090515a6-9651-41fa-9465-fd542e38e526",
      },
      {
        text: "3 critical CVEs (CVSS 9.1-9.8): unauthenticated privilege escalation & PHP object injection",
        href: "/research?severity=critical",
      },
      { text: "Apple Hall of Fame honoree (2024)" },
    ],
  },
  {
    name: "Dau Hoang Tai",
    handle: "taidh",
    role: "Co-Founder",
    certs: [CPTS, SRT],
    linkedin: "https://www.linkedin.com/in/taidh/",
    bio: "Co-Founder. Penetration tester at VNPT Cyber Immunity, red-team operator and CTF player specializing in enterprise-software vulnerability analysis, from MOVEit Transfer to Mitel MiCollab, increasingly with AI in the loop. CPTS-certified Synack Red Team member.",
    achievements: [
      {
        text: "CVE-2022-29317: SQL injection, CVSS 9.8 Critical",
        href: "https://nvd.nist.gov/vuln/detail/CVE-2022-29317",
      },
      {
        text: "Author: AI-assisted Mitel MiCollab CVE analysis (Claude MCP + JADX + IDA Pro)",
        href: "https://sec.vnpt.vn/tin-tuc/blog/AI-Assisted-Mitel-CVE-Analysis-Claude-MCP-JADX-andamp-IDA-Pro",
      },
      {
        text: "Deep-dive analysis of MOVEit Transfer CVE-2023-34362 / CVE-2023-35036",
        href: "https://sec.vnpt.vn/tin-tuc/blog/analysis-cve-2023-34362-cve-2023-35036-moveit-transfer",
      },
      { text: "Hack The Box CPTS · Synack Red Team member" },
    ],
  },
];

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}
