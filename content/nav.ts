export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Research", href: "/#research" },
  // Blog re-enabled 2026-09-10: Markdown posts in content/posts/, managed via blog-manager.
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/contact" },
];

export const navCta: NavLink = { label: "Request a Pentest", href: "/contact" };
