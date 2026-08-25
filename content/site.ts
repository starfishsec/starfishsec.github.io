/**
 * Site-wide facts & metadata. Source: docs/01-PRD.md §2, docs/02-CONTENT.md (SEO / Footer).
 * Anything unknown is an explicit TODO(owner) — never guessed.
 */
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
}

/** TODO(owner): social handles (X, GitHub, LinkedIn) — owner said "later". Empty = not rendered. */
export const socials: SocialLink[] = [];

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/#why" },
      { label: "Team", href: "/#team" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Penetration Testing", href: "/#services" },
      { label: "Red Team", href: "/#services" },
      { label: "Research", href: "/#research" },
      { label: "Consulting", href: "/#services" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "Advisories", href: "/research" },
      { label: "CVEs", href: "/research" },
      { label: "Disclosure policy", href: "/disclosure" },
    ],
  },
];

export const site = {
  name: "Starfish Security",
  wordmark: "STARFISH SEC",
  url: "https://starfishsec.com",
  email: "info@starfishsec.com",
  title: "Starfish Security — Offensive Security & Pentesting",
  description:
    "A boutique offensive-security team behind 200+ published CVEs. Manual pentesting, red teaming, and vulnerability research that delivers working proof, not theoretical risk.",
  ogImage: "/og.png",
  status: "Available for engagements",
  legal: "© 2026 Starfish Security. All rights reserved.",
  mantra: "STARFISH SECURITY // PROOF OR IT DIDN'T HAPPEN",
} as const;
