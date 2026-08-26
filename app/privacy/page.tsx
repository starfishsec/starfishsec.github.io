import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoNote } from "@/components/ui/TodoNote";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "What Starfish Security collects through this website, and why.",
  alternates: { canonical: "/privacy" },
};

/**
 * Minimal privacy notice — required because of the contact form (docs/01 §6).
 * Facts reflect the v1 build: no analytics, no tracking cookies, contact form → email.
 * TODO(owner): legal review, controller details (legal entity, location).
 */
export default function PrivacyPage() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="privacy-title">
      <Container className="flex max-w-3xl flex-col gap-10">
        <SectionHeading
          as="h1"
          id="privacy-title"
          title="Privacy notice"
          subtitle="Short version: we collect what you type into the contact form, and nothing else."
        />
        <TodoNote className="self-start">
          TODO(owner): legal review, controller entity, location, founding year
        </TodoNote>

        <div className="flex flex-col gap-8 text-fg-muted">
          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">What we collect</h2>
            <p>
              When you submit the contact form we receive the details you enter: name, email
              address, company (optional), engagement type (optional), and your message. We use
              them solely to respond to your request and scope a potential engagement.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">What we don&apos;t do</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>No analytics or third-party tracking scripts run on this site.</li>
              <li>No advertising or tracking cookies are set, so no cookie banner is needed.</li>
              <li>We never sell or share your details with third parties for marketing.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">How messages are delivered</h2>
            <p>
              Form submissions are delivered to our inbox by email. When configured, delivery uses
              a transactional email provider (Resend) acting as a processor on our behalf. If
              delivery is not configured, the site offers a pre-filled <code className="font-mono text-fg">mailto:</code>{" "}
              link and your message goes straight from your own mail client to{" "}
              <span className="font-mono text-fg">{site.email}</span>.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Retention &amp; your rights</h2>
            <p>
              We keep correspondence for as long as needed to handle your request and any resulting
              engagement. To access, correct, or delete your data, email{" "}
              <a href={`mailto:${site.email}`} className="font-mono text-fg underline-offset-4 hover:text-accent hover:underline">
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
