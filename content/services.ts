export type ServiceIcon = "crosshair" | "microscope" | "swords" | "shield-check" | "terminal";

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
}

export const servicesHeading = {
  title: "What we do",
} as const;

export const services: Service[] = [
  {
    title: "Penetration Testing",
    description:
      "Expert-led, exploit-focused testing of web apps, APIs, and infrastructure. Every finding is run and verified by senior researchers and delivered fast, with a working exploit and clear, cost-effective scoping.",
    icon: "crosshair",
  },
  {
    title: "Vulnerability Research",
    description:
      "Zero-day research and responsible disclosure on the platforms you depend on. 200+ CVEs and counting.",
    icon: "microscope",
  },
  {
    title: "Red Team / Adversary Simulation",
    description:
      "Objective-based, stealth engagements that emulate a real attacker's full kill chain.",
    icon: "swords",
  },
  {
    title: "Security Consulting",
    description: "Secure-design review, threat modeling, and on-call expertise for your team.",
    icon: "shield-check",
  },
  {
    title: "Exploit Development Support",
    description:
      "We build reliable proof-of-concept and working exploits to validate risk and support your remediation.",
    icon: "terminal",
  },
];

/**
 * Scope options for the "Engagement type" field on the contact form. Kept separate from `services`
 * (which is the marketing section on the homepage) so the form can ask for a concrete scope without
 * changing the service positioning. Owner-supplied list (2026-08-29).
 */
export const engagementTypes: string[] = [
  "Web application pentest",
  "API pentest",
  "Mobile application pentest (iOS / Android)",
  "External network / infrastructure pentest",
  "Internal network pentest",
  "Cloud pentest (AWS / Azure / GCP)",
  "Red team / adversary simulation",
  "Source code review",
  "Vulnerability research / zero-day",
  "Security consulting",
];
