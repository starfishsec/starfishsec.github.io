export type WhyIcon = "fingerprint" | "book-open-check" | "award" | "file-check" | "zap" | "coins";

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
    title: "AI-powered, expert-validated.",
    description:
      "Our platform covers more ground, faster. Researchers behind 200+ CVEs decide what's real and what matters — every finding is human-confirmed.",
    icon: "fingerprint",
  },
  {
    title: "Fast turnaround.",
    description:
      "AI does the heavy lifting, so validated findings and working exploits reach you fast — no waiting weeks for a final report.",
    icon: "zap",
  },
  {
    title: "Pricing that makes sense.",
    description:
      "AI efficiency means senior-researcher quality without the boutique-consultancy invoice. Clear, scoped pricing — no surprises.",
    icon: "coins",
  },
  {
    title: "Proof over paperwork.",
    description:
      "Every finding comes with a working exploit and clear remediation — not a scanner export. 200+ CVEs in the public record back it up.",
    icon: "file-check",
  },
];
