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
      // Blog re-enabled 2026-09-10: posts are Markdown, managed via the blog-manager app.
      { label: "Blog", href: "/blog" },
      { label: "CVE advisories", href: "/research" },
      { label: "Disclosure policy", href: "/disclosure" },
    ],
  },
];

export const site = {
  name: "Starfish Security",
  wordmark: "STARFISH SEC",
  url: "https://starfishsec.com",
  email: "info@starfishsec.com",
  title: "Starfish Security | Expert-Led Penetration Testing",
  description:
    "Expert-led penetration testing, red teaming, and security consulting from the researchers behind 200+ published CVEs. Every finding is run and verified by our experts. Working proof, not theoretical risk.",
  ogImage: "/og.png",
  status: "Available for engagements",
  legal: "© 2026 Starfish Security. All rights reserved.",
  mantra: "STARFISH SECURITY // PROOF OR IT DIDN'T HAPPEN",
} as const;

/**
 * Static-site form backend (GitHub Pages serves no server code, so the contact form posts to
 * FormSubmit.co — verified live 2026-09-08, formsubmit.co + /ajax-documentation).
 *
 * How it goes live: the FIRST submission triggers a one-time activation email from FormSubmit to
 * `site.email`; the owner clicks the confirmation link and every later submission is delivered.
 * No account, no key, nothing to commit.
 *
 * TODO(owner): after activating, FormSubmit's confirmation page shows a random alias endpoint
 * (formsubmit.co/<hash>) for this address. Swapping it in here hides the raw address from
 * form-scraping bots; the address is already public elsewhere on the site, so this is optional.
 */
export const contactFormBackend = {
  /** Native <form action>: works with JavaScript disabled; FormSubmit redirects to `_next`. */
  action: "https://formsubmit.co/info@starfishsec.com",
  /** Fetch endpoint for the enhanced path: JSON in, JSON out, no page navigation. */
  ajax: "https://formsubmit.co/ajax/info@starfishsec.com",
} as const;
