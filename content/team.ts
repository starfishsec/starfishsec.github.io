export interface Certification {
  short: string;
  long: string;
}

export interface TeamMember {
  name: string;
  handle?: string;
  role: string;
  certs: Certification[];
  /** Public profile links. */
  linkedin?: string;
  /** TODO(owner): one-line bios. `undefined` renders a visible placeholder. */
  bio?: string;
}

export const teamHeading = {
  eyebrow: "Team",
  title: "The team",
  subtitle: "Three researchers. One standard: prove it.",
} as const;

const OSWE: Certification = { short: "OSWE", long: "OffSec Web Expert" };
const CPTS: Certification = {
  short: "CPTS",
  long: "Certified Penetration Testing Specialist (Hack The Box)",
};
const SRT: Certification = { short: "SRT Hero", long: "Synack Red Team, Hero tier" };

export const certGlossary: Certification[] = [OSWE, CPTS, SRT];

// Roles + LinkedIn confirmed by owner 2026-08-25 (docs/02 §8).
export const team: TeamMember[] = [
  {
    name: "Phuoc Pham",
    role: "Founder",
    certs: [OSWE],
    linkedin: "https://www.linkedin.com/in/phamphuoc/",
  },
  {
    name: "An Ngo",
    handle: "ancorn_",
    role: "Co-Founder",
    certs: [OSWE, SRT],
    linkedin: "https://www.linkedin.com/in/ngothienan/",
  },
  {
    name: "Dau Hoang Tai",
    handle: "taidh",
    role: "Co-Founder",
    certs: [CPTS, SRT],
    linkedin: "https://www.linkedin.com/in/taidh/",
  },
];

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}
