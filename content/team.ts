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
  /** Public profile links. */
  linkedin?: string;
  /**
   * One-line bio. Drafted 2026-08-25 from public records only (certs, CVE databases, leaderboards).
   * LinkedIn is auth-walled, so nothing was copied from it. Owner to review wording.
   */
  bio?: string;
  /** Public, sourced highlights shown on the card. Keep verifiable — no vanity claims. */
  achievements: Achievement[];
  /** TODO(owner): headshot path under /public/team/. Monogram is used while undefined. */
  photo?: string;
}

export const teamHeading = {
  eyebrow: "Team",
  title: "The experts behind the platform",
  subtitle: "Three researchers who find bugs for a living. One standard: prove it.",
} as const;

const OSWE: Certification = { short: "OSWE", long: "OffSec Web Expert" };
const CPTS: Certification = {
  short: "CPTS",
  long: "Certified Penetration Testing Specialist (Hack The Box)",
};
const SRT: Certification = { short: "SRT Hero", long: "Synack Red Team, Hero tier" };

export const certGlossary: Certification[] = [OSWE, CPTS, SRT];

// Roles + LinkedIn confirmed by owner 2026-08-25 (docs/02 §8). Highlights sourced 2026-08-25.
export const team: TeamMember[] = [
  {
    name: "Phuoc Pham",
    role: "Founder",
    certs: [OSWE],
    linkedin: "https://www.linkedin.com/in/phamphuoc/",
    bio: "Founder. OSWE-certified web-application security researcher who leads Starfish's offensive methodology and the expert review behind every engagement.",
    // TODO(owner): no public research record found under this name — add CVEs / talks / programs.
    achievements: [{ text: "OffSec Web Expert (OSWE) certified" }],
  },
  {
    name: "An Ngo",
    handle: "ancorn_",
    role: "Co-Founder",
    certs: [OSWE, SRT],
    linkedin: "https://www.linkedin.com/in/ngothienan/",
    bio: "Co-Founder. OSWE-certified penetration tester and one of the most prolific WordPress-ecosystem researchers on record — 246 CVEs credited on Wordfence, including critical unauthenticated privilege-escalation and object-injection findings. Synack Acropolis inductee and Apple Hall of Fame honoree.",
    achievements: [
      {
        text: "246 CVEs credited on Wordfence Intelligence — all-time rank #34",
        href: "https://www.wordfence.com/threat-intel/vulnerabilities/researchers/ngo-thien-an-ancorn",
      },
      {
        text: "Synack Acropolis inductee (Class of 2025) — Hero tier 2025 & 2026",
        href: "https://acropolis.synack.com/inductees/ancorn_",
      },
      {
        text: "Patchstack Alliance verified researcher — 154 reports, top-40 all-time",
        href: "https://patchstack.com/database/researcher/090515a6-9651-41fa-9465-fd542e38e526",
      },
      {
        text: "3 critical CVEs (CVSS 9.1–9.8): unauthenticated privilege escalation & PHP object injection",
        href: "/research?severity=critical",
      },
      { text: "Apple Hall of Fame honoree", href: "https://ngothienan.github.io/about/" },
    ],
  },
  {
    name: "Dau Hoang Tai",
    handle: "taidh",
    role: "Co-Founder",
    certs: [CPTS, SRT],
    linkedin: "https://www.linkedin.com/in/taidh/",
    bio: "Co-Founder. Penetration tester and CTF player with a browser- and enterprise-software research streak — dozens of Firefox security bugs reported to Mozilla in a single research sprint. CPTS-certified Synack Red Team Hero.",
    // TODO(owner): confirm counts/IDs below from Mozilla advisories & the PAM360 advisory (sourced from public posts, not primary records).
    achievements: [
      { text: "28 Firefox security bugs reported to Mozilla in two months, 4 assigned CVEs" },
      { text: "SQL injection → privilege escalation in ManageEngine PAM360 (CVE-2026-12371)" },
      { text: "Synack Red Team — Hero tier" },
    ],
  },
];

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}
