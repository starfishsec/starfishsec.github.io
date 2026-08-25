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
    title: "AI speed, expert judgment.",
    description:
      "Our platform covers more ground, faster. Researchers behind 200+ CVEs decide what's real and what matters.",
    icon: "fingerprint",
  },
  {
    title: "Track record in the open.",
    description: "200+ CVEs is public, verifiable proof of the depth behind the platform.",
    icon: "book-open-check",
  },
  {
    title: "Built by people who find bugs for a living.",
    description:
      "OSWE- and CPTS-certified, Synack Red Team researchers designed the methodology and review every result.",
    icon: "award",
  },
  {
    title: "Proof over paperwork.",
    description: "Every finding comes with a working exploit and clear remediation — not a scanner export.",
    icon: "file-check",
  },
];
