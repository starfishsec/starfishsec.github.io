export interface ProcessStep {
  title: string;
  description: string;
}

export const processHeading = {
  eyebrow: "Process",
  title: "How we work",
  subtitle: "From scope to working exploit — AI-driven testing, expert-verified.",
} as const;

export const processSteps: ProcessStep[] = [
  { title: "Scope", description: "We map your attack surface and agree on rules of engagement." },
  {
    title: "Attack",
    description:
      "Our AI-powered platform tests your systems continuously, chaining real vulnerabilities the way an attacker would.",
  },
  {
    title: "Prove",
    description:
      "Our researchers validate every finding and ship a working proof-of-concept. No noise, no theoretical risk.",
  },
  {
    title: "Report & retest",
    description: "Clear, prioritized remediation guidance, then we verify the fixes.",
  },
];
