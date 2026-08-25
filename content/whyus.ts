export type WhyIcon = "fingerprint" | "book-open-check" | "award" | "file-check";

export interface WhyPoint {
  title: string;
  description: string;
  icon: WhyIcon;
}

export const whyHeading = {
  eyebrow: "Differentiators",
  title: "Why Starfish",
} as const;

export const whyPoints: WhyPoint[] = [
  {
    title: "Manual, not just automated.",
    description: "Scanners flag maybes. We deliver confirmed, exploitable findings with a PoC.",
    icon: "fingerprint",
  },
  {
    title: "Track record in the open.",
    description: "200+ CVEs is public, verifiable proof of depth.",
    icon: "book-open-check",
  },
  {
    title: "Certified and battle-tested.",
    description: "OSWE-certified, Synack Red Team researchers who find bugs for a living.",
    icon: "award",
  },
  {
    title: "Proof over paperwork.",
    description: "Every finding comes with a working exploit and clear remediation.",
    icon: "file-check",
  },
];
