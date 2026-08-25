export type ServiceIcon = "crosshair" | "microscope" | "swords" | "shield-check" | "terminal";

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
}

export const servicesHeading = {
  eyebrow: "Services",
  title: "What we do",
} as const;

export const services: Service[] = [
  {
    title: "AI-Powered Penetration Testing",
    description:
      "AI-driven, exploit-focused testing of web apps, APIs, and infrastructure — every finding validated by senior researchers, delivered fast, with a working exploit and clear, cost-effective scoping.",
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
