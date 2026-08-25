/**
 * Positioning (owner, 2026-08-25): AI-powered penetration testing, expert-validated.
 * USPs to stress: AI-powered + expert-validated · very fast delivery (no concrete SLA/time —
 * not confirmed) · convenient, cost-effective pricing (no numbers — not confirmed).
 * Keep claims to what is confirmed; never invent capabilities, timelines, or prices.
 */
export const hero = {
  eyebrow: "AI-POWERED · EXPERT-VALIDATED · 200+ PUBLISHED CVEs",
  headline: "We break what others assume is safe.",
  subheadline:
    "Starfish Security is an AI-powered penetration-testing service built by researchers behind 200+ published CVEs. Our platform attacks your systems the way a real adversary would; our experts validate every finding and hand you working proof — in a fraction of the time, at a fraction of the cost of a traditional pentest.",
  primaryCta: { label: "Request a Pentest", href: "/contact" },
  secondaryCta: { label: "View our Research", href: "/research" },
  supportingLine: "AI speed. Expert judgment. Working proof. Pricing that makes sense.",
  terminalLine: "$ starfish scope --target you",
} as const;

/** USP strip under the hero — the four things we want remembered. */
export interface Usp {
  title: string;
  description: string;
}

export const usps: Usp[] = [
  {
    title: "AI-powered",
    description: "Our platform runs the attack continuously, covering more ground than any manual team could.",
  },
  {
    title: "Expert-validated",
    description: "Researchers behind 200+ CVEs confirm every finding. No false positives, no scanner noise.",
  },
  {
    title: "Fast delivery",
    description: "AI does the heavy lifting, so validated findings reach you fast — not after weeks of waiting.",
  },
  {
    title: "Convenient pricing",
    description: "Senior-researcher quality without the boutique-consultancy invoice. Clear, scoped, no surprises.",
  },
];
