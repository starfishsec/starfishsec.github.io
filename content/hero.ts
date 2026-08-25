/**
 * Positioning (owner, 2026-08-25): Starfish is an AI-powered penetration-testing service.
 * The platform runs the testing; the experts behind it (200+ published CVEs) validate every
 * finding. Keep claims to what is confirmed — no invented capabilities or numbers.
 */
export const hero = {
  eyebrow: "AI-POWERED PENTESTING · BACKED BY 200+ PUBLISHED CVEs",
  headline: "We break what others assume is safe.",
  subheadline:
    "Starfish Security is an AI-powered penetration-testing service built by offensive-security researchers behind 200+ published CVEs. Our platform tests your systems the way a real attacker would; our experts validate every finding and hand you working proof.",
  primaryCta: { label: "Request a Pentest", href: "/contact" },
  secondaryCta: { label: "View our Research", href: "/research" },
  supportingLine: "AI speed. Expert judgment. Proof, not checklists.",
  terminalLine: "$ starfish scope --target you",
} as const;
