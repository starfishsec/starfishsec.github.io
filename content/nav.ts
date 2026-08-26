export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Research", href: "/#research" },
  // Blog tab hidden (owner, 2026-08-26) until the blog is complete. The `/blog` route still
  // builds; re-add `{ label: "Blog", href: "/blog" }` here to surface it again.
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/contact" },
];

export const navCta: NavLink = { label: "Request a Pentest", href: "/contact" };
