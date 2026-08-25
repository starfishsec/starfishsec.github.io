import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoNote } from "@/components/ui/TodoNote";

export const metadata: Metadata = {
  title: "Responsible Disclosure Policy",
  description:
    "How Starfish Security reports vulnerabilities we discover in third-party software, and how to reach us about our advisories.",
  alternates: { canonical: "/disclosure" },
};

/**
 * Minimal, factual policy text. The docs do not yet contain owner-approved wording,
 * so this page is flagged for review. TODO(owner): review / replace wording.
 */
export default function DisclosurePage() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="disclosure-title">
      <Container className="flex max-w-3xl flex-col gap-10">
        <SectionHeading
          as="h1"
          id="disclosure-title"
          eyebrow="Policy"
          title="Responsible disclosure"
          subtitle="How we handle the vulnerabilities we find in software we don't own."
        />
        <TodoNote className="self-start">TODO(owner): review policy wording before launch</TodoNote>

        <div className="flex flex-col gap-8 text-fg-muted">
          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Scope</h2>
            <p>
              This policy covers vulnerabilities that Starfish Security researchers discover
              independently in third-party software — for example WordPress plugins, Apache
              projects, and other widely deployed open-source or commercial products. Client
              engagements are governed by their own rules of engagement and are never published
              without written consent.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">How we report</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                We report privately to the vendor or maintainer first, using their published
                security contact or a coordinating party (for example a CNA or vulnerability
                database).
              </li>
              <li>
                Each report includes a working proof-of-concept, affected versions, and suggested
                remediation.
              </li>
              <li>We do not access, modify, or exfiltrate data beyond what is needed to prove impact.</li>
              <li>
                We request a CVE identifier so the issue can be tracked publicly once fixed.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Publication</h2>
            <p>
              We publish advisories after a fix is available or after a reasonable coordinated
              disclosure window has passed. <TodoNote>TODO(owner): confirm window (e.g. 90 days)</TodoNote>{" "}
              We are happy to extend timelines for vendors actively working on a fix.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Are you a vendor who received a report from us?</h2>
            <p>
              Reply to the original report or email{" "}
              <a href={`mailto:${site.email}`} className="font-mono text-fg underline-offset-4 hover:text-accent hover:underline">
                {site.email}
              </a>
              . We will confirm the researcher&apos;s identity and coordinate on timelines.{" "}
              <TodoNote>TODO(owner): PGP key / Signal (optional)</TodoNote>
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
