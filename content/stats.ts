export interface Stat {
  value: string;
  label: string;
  /** Visible footnote for values the owner still needs to confirm. */
  todo?: string;
}

export const stats: Stat[] = [
  { value: "200+", label: "CVEs published" },
  { value: "3", label: "Offensive researchers" },
  { value: "2×", label: "OSWE — OffSec Web Expert" },
  {
    value: "Millions",
    label: "plugin installs affected by our disclosures",
    todo: "TODO(owner): confirm exact wording",
  },
];
