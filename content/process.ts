export interface ProcessStep {
  title: string;
  description: string;
}

export const processHeading = {
  title: "How we work",
  subtitle: "From scope to working exploit. Run by our experts at every step.",
} as const;

export const processSteps: ProcessStep[] = [
  { title: "Scope", description: "We map your attack surface and agree on rules of engagement." },
  {
    title: "Attack",
    description:
      "Our experts attack your systems the way a real adversary would, chaining real vulnerabilities into working attack paths.",
  },
  {
    title: "Prove",
    description:
      "Our researchers validate every finding and ship a working proof-of-concept. No noise, no theoretical risk.",
  },
  {
    title: "Report & retest",
    description:
      "Clear, prioritized remediation guidance delivered fast, then we verify the fixes.",
  },
];
