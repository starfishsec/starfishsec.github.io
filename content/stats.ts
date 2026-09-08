export interface Stat {
  value: string;
  label: string;
  /** Visible footnote for values the owner still needs to confirm. */
  todo?: string;
}

/**
 * Owner decisions (2026-08-25): the "2× OSWE" card was removed; the fourth card now speaks to
 * impact ("websites affected") rather than plugin installs.
 * Owner (2026-09-08): card 2 changed from "Many" to a concrete "10+" senior experts.
 */
export const stats: Stat[] = [
  { value: "200+", label: "CVEs published" },
  { value: "10+", label: "senior experts running and verifying every engagement" },
  { value: "Millions", label: "of websites affected by our disclosures" },
];
