export interface Certification {
  short: string;
  long: string;
}

export interface TeamMember {
  name: string;
  handle?: string;
  role: string;
  /** Set when the role still needs owner confirmation. */
  roleTodo?: string;
  certs: Certification[];
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

export const team: TeamMember[] = [
  { name: "Phuoc Pham", role: "Founder", certs: [OSWE] },
  { name: "An Ngo", handle: "ancorn_", role: "Co-Founder", certs: [OSWE, SRT] },
  {
    name: "Dau Hoang Tai",
    handle: "taidh",
    role: "Security Researcher",
    roleTodo: "TODO(owner): confirm title",
    certs: [CPTS, SRT],
  },
];

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}
