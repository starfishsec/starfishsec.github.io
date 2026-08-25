export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Research", href: "/#research" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/contact" },
];

export const navCta: NavLink = { label: "Request a Pentest", href: "/contact" };
