/**
 * Positioning (owner, 2026-08-25): AI-powered penetration testing, expert-validated.
 * USPs to stress: AI-powered + expert-validated · very fast delivery (no concrete SLA/time,
 * not confirmed) · convenient, cost-effective pricing (no numbers, not confirmed).
 * Keep claims to what is confirmed; never invent capabilities, timelines, or prices.
 *
 * Redesign (2026-08-26): the hero carries headline + subhead + two CTAs only. Speed and pricing
 * are stated once, in the USP section directly below (they used to repeat in a tagline under the
 * CTAs). The right-hand column shows real records from `content/cves.ts` instead of a mock terminal.
 */
export const hero = {
  headline: "We break what others assume is safe.",
  subheadline:
    "AI-powered penetration testing from the researchers behind 200+ published CVEs. The platform attacks like a real adversary; our experts validate every finding with working proof.",
  primaryCta: { label: "Request a Pentest", href: "/contact" },
  /** Same label wherever the page links to /research (one label per intent). */
  secondaryCta: { label: "View our research", href: "/research" },
  /** Title of the live CVE panel beside the headline. */
  proofLabel: "Public CVE record",
} as const;

/** USP section under the stats strip: the four things we want remembered. */
export type UspIcon = "cpu" | "user-check" | "gauge" | "receipt";

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
    title: "AI-powered",
    description: "Our platform runs the attack continuously, covering more ground than any manual team could.",
    icon: "cpu",
  },
  {
    title: "Expert-validated",
    description: "Researchers behind 200+ CVEs confirm every finding. No false positives, no scanner noise.",
    icon: "user-check",
  },
  {
    title: "Fast delivery",
    description: "AI does the heavy lifting, so validated findings reach you fast, not after weeks of waiting.",
    icon: "gauge",
  },
  {
    title: "Convenient pricing",
    description: "Senior-researcher quality without the boutique-consultancy invoice. Clear, scoped, no surprises.",
    icon: "receipt",
  },
];
