/**
 * Positioning (owner, 2026-09-08, second revision the same day): EXPERT-ONLY. No page mentions
 * AI assistance at all; the experts do the work. (Supersedes the morning's "expert-led,
 * AI-assisted" and 2026-08-25's "AI-powered".) Verbatim public records that happen to contain
 * "AI" (CVE platform names, published article titles) are data, not positioning, and stay.
 * USPs to stress: expert-led · working proof · fast delivery (no concrete SLA/time) ·
 * convenient, cost-effective pricing (no numbers). Never invent capabilities, timelines, prices.
 *
 * Redesign (2026-08-26): the hero carries headline + subhead + two CTAs only. Speed and pricing
 * are stated once, in the USP section directly below (they used to repeat in a tagline under the
 * CTAs). The right-hand column shows real records from `content/cves.ts` instead of a mock terminal.
 */
export const hero = {
  headline: "We break what others assume is safe.",
  subheadline:
    "Expert-led penetration testing from the researchers behind 200+ published CVEs. Our experts run every engagement and verify every finding with working proof.",
  primaryCta: { label: "Request a Pentest", href: "/contact" },
  /** Same label wherever the page links to /research (one label per intent). */
  secondaryCta: { label: "View our research", href: "/research" },
  /** Title of the live CVE panel beside the headline. */
  proofLabel: "Public CVE record",
} as const;

/** USP section under the stats strip: the four things we want remembered. */
export type UspIcon = "terminal" | "user-check" | "gauge" | "receipt";

export interface Usp {
  title: string;
  description: string;
  icon: UspIcon;
}

export const uspHeading = {
  title: "Why teams choose Starfish",
} as const;

export const usps: Usp[] = [
  {
    title: "Expert-led",
    description:
      "Researchers behind 200+ CVEs run every engagement and verify every finding themselves. No false positives, no scanner noise.",
    icon: "user-check",
  },
  {
    title: "Working proof",
    description:
      "Every finding ships with a working exploit or proof-of-concept and a clear fix. No theoretical risk, no severity-score hand-waving.",
    icon: "terminal",
  },
  {
    title: "Fast delivery",
    description:
      "Expert-verified findings and working exploits reach you as the work happens, not after weeks of waiting for a final report.",
    icon: "gauge",
  },
  {
    title: "Convenient pricing",
    description:
      "Senior-researcher quality without the boutique-consultancy invoice. Clear, scoped, no surprises.",
    icon: "receipt",
  },
];
