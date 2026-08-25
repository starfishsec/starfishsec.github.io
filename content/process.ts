export interface ProcessStep {
  title: string;
  description: string;
}

export const processHeading = {
  eyebrow: "Process",
  title: "How we work",
  subtitle: "From scope to working exploit — a process built on real research.",
} as const;

export const processSteps: ProcessStep[] = [
  { title: "Scope", description: "We map your attack surface and agree on rules of engagement." },
  {
    title: "Attack",
    description: "We test manually, chaining real vulnerabilities the way an attacker would.",
  },
  {
    title: "Prove",
    description: "Every finding ships with a working proof-of-concept. No theoretical risk.",
  },
  {
    title: "Report & retest",
    description: "Clear, prioritized remediation guidance, then we verify the fixes.",
  },
];
