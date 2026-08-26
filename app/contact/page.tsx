import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { finalCta } from "@/content/cta";
import { site } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusDot } from "@/components/ui/StatusDot";

export const metadata: Metadata = {
  title: "Request a Pentest",
  description:
    "Book a scoping call with Starfish Security. AI-powered, expert-validated penetration testing, red teaming, and vulnerability research.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="contact-title">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            as="h1"
            id="contact-title"
            title={finalCta.title}
            subtitle={finalCta.body}
          />
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-3 font-mono text-small text-fg-muted transition-colors hover:text-accent"
            >
              <Mail className="size-4" aria-hidden="true" />
              {site.email}
            </a>
            <StatusDot />
          </div>
          <ul className="flex flex-col gap-3 border-l border-border pl-5 text-small text-fg-muted">
            <li>Our platform runs the attack, our experts validate it, and you get working proof-of-concepts, not scanner output.</li>
            <li>Every finding ships with clear, prioritized remediation guidance and a retest.</li>
            <li>We&apos;ll tell you honestly where you stand, including when you don&apos;t need us yet.</li>
          </ul>
        </div>

        <div className="rounded-card border border-border bg-bg-elev/60 p-6 md:p-8">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
