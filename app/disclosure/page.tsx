import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Vulnerability Disclosure Policy",
  description:
    "How Starfish Security reports and publishes the vulnerabilities we discover in third-party software: private report first, a 90-day coordinated window, then a public advisory with CVE, proof-of-concept and timeline.",
  alternates: { canonical: "/disclosure" },
};

/**
 * Drafted 2026-08-26 on the owner's request, modelled on how pwn.ai runs disclosure in practice
 * (they publish no standalone policy page; every research post carries a private-report-first
 * process, a disclosure timeline, a working PoC and the rule "we publish zero-days affecting vendors
 * that fail to respond within a reasonable timeframe"), plus the industry-standard 90-day window
 * (Google Project Zero, ZDI). Owner to confirm the two numbers (90 days, 7 days) before launch.
 */

const DEFAULT_WINDOW_DAYS = 90;
const ACTIVE_EXPLOITATION_DAYS = 7;

interface TimelineStep {
  when: string;
  title: string;
  body: string;
}

const timeline: TimelineStep[] = [
  {
    when: "Day 0",
    title: "Private report",
    body: "We send the full report to the vendor's security contact, or through a coordinating CNA when the vendor has none. The clock starts the day the report is sent, not the day it is read.",
  },
  {
    when: "Day 0–14",
    title: "Acknowledgement",
    body: "We expect an acknowledgement within 14 days. If none arrives we retry through every public channel we can find: security@ addresses, bug-bounty programs, support desks, GitHub, social profiles, and the CNA.",
  },
  {
    when: `Day 1–${DEFAULT_WINDOW_DAYS}`,
    title: "Coordinated window",
    body: `The vendor has ${DEFAULT_WINDOW_DAYS} days to ship a fix. During that time we answer questions, retest candidate patches, and keep every detail private. Nothing is shared with third parties.`,
  },
  {
    when: "Fix released",
    title: "Publication",
    body: "Once a fix is generally available we publish the advisory and request the CVE be made public. If a fix ships early, we publish shortly after it, giving users time to update first.",
  },
  {
    when: `Day ${DEFAULT_WINDOW_DAYS}`,
    title: "Deadline",
    body: `If no fix is available and no extension has been agreed, we publish on day ${DEFAULT_WINDOW_DAYS}. This applies equally to vendors who never replied: silence does not stop the clock.`,
  },
];

const commitments: string[] = [
  "Vendor first. We never publish, sell, or share vulnerability details before the vendor has had the chance to fix them, except as described in the timeline below.",
  "Complete reports. Every report contains affected versions, a working proof-of-concept, the root cause, and a suggested fix, so the vendor can reproduce and remediate immediately.",
  "Minimal footprint. We only go as far as needed to prove impact. We do not access, modify, or exfiltrate user data, pivot into internal systems, or degrade a live service.",
  "Expert-verified. Every finding is reproduced and confirmed by a Starfish researcher before any report leaves our hands. We do not send unverified scanner output to vendors.",
  "No strings attached. We do not ask for payment, a bounty, or a contract as a condition of reporting or of staying quiet. Vendors that run bounty programs are welcome to reward the report under their own rules.",
  "Credit, not blame. Our advisories describe the flaw and the fix, and credit vendors that respond well. We name unresponsive vendors only because users deserve to know what is unpatched.",
];

export default function DisclosurePage() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="disclosure-title">
      <Container className="flex max-w-3xl flex-col gap-12">
        <SectionHeading
          as="h1"
          id="disclosure-title"
          title="Vulnerability disclosure policy"
          subtitle="Private report first, a fixed coordinated window, then a public advisory with a CVE, a working proof-of-concept, and the full timeline. The same rules for every vendor, every time."
        />

        <div className="flex flex-col gap-10 text-fg-muted">
          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Scope</h2>
            <p>
              This policy governs vulnerabilities that Starfish Security researchers discover
              independently in third-party software: open source projects, WordPress plugins and
              themes, commercial products, and internet-facing services. It is the basis for the{" "}
              <Link
                href="/research"
                className="text-fg underline-offset-4 hover:text-accent hover:underline"
              >
                CVEs on our research page
              </Link>
              .
            </p>
            <p>
              It does not cover client engagements. Anything we find under contract belongs to the
              client, is governed by that engagement&apos;s rules, and is never published without
              the client&apos;s written consent.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-h2 text-fg">Our commitments</h2>
            <ul className="flex flex-col gap-3">
              {commitments.map((c) => {
                const [lead, ...rest] = c.split(". ");
                return (
                  <li key={c} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <p>
                      <span className="text-fg">{lead}.</span> {rest.join(". ")}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-h2 text-fg">Disclosure timeline</h2>
              <p>
                We follow the industry-standard {DEFAULT_WINDOW_DAYS}-day coordinated disclosure
                window. It is a deadline, not a negotiation: it gives responsive vendors ample time
                and gives users certainty that unpatched issues will not stay secret indefinitely.
              </p>
            </div>
            <ol className="flex flex-col divide-y divide-border rounded-card border border-border bg-bg-elev">
              {timeline.map((step) => (
                <li
                  key={step.when}
                  className="grid gap-2 px-5 py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
                >
                  <span className="font-mono text-small text-accent">{step.when}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-fg">{step.title}</h3>
                    <p className="text-small leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Exceptions</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="text-fg">Extensions.</span> A vendor actively working on a fix can
                ask for more time before the deadline. We grant reasonable extensions when a release
                date is committed; we do not grant open-ended ones.
              </li>
              <li>
                <span className="text-fg">Active exploitation.</span> If we see the vulnerability
                being exploited in the wild, or it becomes public through another party, the window
                shrinks to {ACTIVE_EXPLOITATION_DAYS} days so users can defend themselves.
              </li>
              <li>
                <span className="text-fg">Silent fixes.</span> If a vendor patches without an
                advisory or a CVE, we publish once we confirm the fix has shipped, so users know
                they need to update.
              </li>
              <li>
                <span className="text-fg">Abandoned software.</span> For projects with no maintainer
                and no contact, we notify the ecosystem (plugin directory, distribution, CNA) and
                publish on the standard schedule so the software can be removed or forked.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">What we publish</h2>
            <p>
              Every advisory carries the CVE identifier, affected and fixed versions, a technical
              analysis of the root cause, a proof-of-concept that demonstrates real impact, and the
              complete disclosure timeline with dates, so anyone can see how the process went. Where
              a fix exists, the PoC is published only after users have had time to apply it.
            </p>
            <p>
              We request CVE identifiers through the vendor&apos;s own CNA or a coordinating CNA
              (for example Wordfence or Patchstack for the WordPress ecosystem) so each issue is
              tracked in the public record independently of us.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Received a report from us?</h2>
            <p>
              Reply to the original message or email{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-fg underline-offset-4 hover:text-accent hover:underline"
              >
                {site.email}
              </a>{" "}
              with the report reference. We will confirm the researcher&apos;s identity, walk you
              through reproduction, retest your fix, and agree the publication date. Everything
              stays confidential until then.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Found something in our own systems?</h2>
            <p>
              We hold ourselves to the same standard. Report vulnerabilities in this website or any
              Starfish service to{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-fg underline-offset-4 hover:text-accent hover:underline"
              >
                {site.email}
              </a>
              . Good-faith research that respects this policy, avoids privacy violations and service
              disruption, and gives us a reasonable time to fix will never be met with legal action.
              We will acknowledge within 14 days, keep you informed, and credit you when we publish.
            </p>
          </section>

          <p className="border-t border-border pt-6 font-mono text-[0.75rem]">
            Policy version 1.0, effective 2026-08-26. Changes are published on this page.
          </p>
        </div>
      </Container>
    </section>
  );
}
