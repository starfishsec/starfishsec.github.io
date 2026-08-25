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
    handle: "p3tl0v3r",
    role: "Founder",
    certs: [OSWE],
    linkedin: "https://www.linkedin.com/in/phamphuoc/",
    bio: "Founder. OSWE-certified web-application security researcher with published WordPress CVEs to his name, who leads Starfish's offensive methodology and the expert review behind every engagement.",
    // TODO(owner): add non-public-record achievements (programs, talks, bounties) if desired.
    achievements: [
      {
        text: "4 CVEs credited on Wordfence Intelligence (stored XSS in widely used WordPress plugins)",
        href: "https://www.wordfence.com/threat-intel/vulnerabilities/researchers/phuoc-pham-p3tl0v3r",
      },
      { text: "OffSec Web Expert (OSWE) certified" },
    ],
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
    bio: "Co-Founder. Penetration tester, red-team operator and CTF player who hunts on live enterprise targets through the Synack Red Team, with a research focus on browsers and enterprise software. CPTS-certified Synack Red Team Hero.",
    // Verified 2026-08-25: CPTS + SRT Hero (owner), HackerOne profile (1 resolved IBB report — too minor to list).
    // NOT yet verifiable in primary records, so intentionally NOT shown:
    //   - "28 Firefox security bugs in two months, 4 CVEs" (MFSA 2026-25/46/68/74 credit only collaborator "Khanh Nguyen")
    //   - "ManageEngine PAM360 SQLi, CVE-2026-12371" (ID not found in NVD)
    // TODO(owner): send Bugzilla/MFSA links or the vendor advisory and they go straight back on the card.
    achievements: [
      { text: "Synack Red Team — Hero tier", href: "https://www.synack.com/red-team/" },
      { text: "Hack The Box Certified Penetration Testing Specialist (CPTS)" },
      { text: "Bug bounty hunter — HackerOne / Internet Bug Bounty", href: "https://hackerone.com/taidh" },
    ],
  },
];

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}
