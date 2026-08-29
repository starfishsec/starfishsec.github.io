import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoNote } from "@/components/ui/TodoNote";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "What Starfish Security collects through this website and why: no analytics, no tracking cookies, no third-party scripts. The contact form is the only place we receive personal data.",
  alternates: { canonical: "/privacy" },
};

/**
 * Expanded 2026-08-29 on the owner's request to model this on pwn.ai. pwn.ai publishes no privacy
 * notice at all — their footer carries no legal links — so there was nothing to mirror, the same
 * finding /disclosure already records about their disclosure process. The structure here instead
 * follows what a privacy notice has to carry (controller, data, purpose, processors, retention,
 * rights, complaint route), written in the same plain voice as /disclosure.
 *
 * Every factual claim below was verified against the source and the production build on
 * 2026-08-29:
 *  - no analytics or tracking script anywhere in the codebase
 *  - no cookies set by the app: no `cookies()`, no `document.cookie`, no `Set-Cookie`
 *  - `next/font/google` self-hosts Geist at build time — 11 .woff2 files ship from our own origin
 *    and the build contains no fonts.googleapis.com / fonts.gstatic.com reference, so a visitor's
 *    browser never makes a request to Google
 *  - no remote image patterns in next.config.ts, no external URL in the app shell
 *  - the fields listed under "What we collect" are exactly the contact form's fields
 *  - there is no database (CLAUDE.md forbids one): a submission exists only as the email it becomes
 *
 * TODO(owner): legal review. The open facts are flagged inline — the controller entity and its
 * country (which also decides which law applies and which authority hears a complaint), the
 * hosting provider, and a concrete retention period.
 */

/** Verified against the build, not aspirational — see the note above before editing. */
const doesNot: string[] = [
  "No analytics. There is no Google Analytics, Plausible, PostHog, Segment or equivalent on this site. We do not measure your visit.",
  "No cookies. The site sets none at all — not for tracking, not for preferences. That is why you were never asked to dismiss a cookie banner.",
  "No third-party scripts. Nothing on these pages is loaded from someone else's domain, so no third party learns that you came here.",
  "No fonts from Google. Our typefaces are compiled into the site and served from our own domain, so your browser never requests them from Google.",
  "No CAPTCHA. Spam is filtered by a hidden field that real people never fill in, not by a service that profiles you to decide whether you are human.",
  "No advertising, no profiling, no sale of data. We do not build a profile of you, and we never sell or rent your details or share them for anyone's marketing.",
];

export default function PrivacyPage() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="privacy-title">
      <Container className="flex max-w-3xl flex-col gap-12">
        <SectionHeading
          as="h1"
          id="privacy-title"
          title="Privacy notice"
          subtitle="We are a security company, so we hold as little as possible: what you cannot breach is what we never collected. This site sets no cookies, runs no analytics, and loads nothing from a third party. The contact form is the only place we receive personal data."
        />

        <div className="flex flex-col gap-10 text-fg-muted">
          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Scope</h2>
            <p>
              This notice covers this website only: the pages you are reading and the contact form
              on them.
            </p>
            <p>
              It does not cover client engagements. Anything we access, find, or are given while
              testing under contract is governed by that engagement&apos;s agreement and NDA,
              handled under the rules we agree with you before testing starts, and never published
              without your written consent. Nor does it cover the vulnerability reports we send
              vendors — those follow our{" "}
              <Link
                href="/disclosure"
                className="text-fg underline-offset-4 hover:text-accent hover:underline"
              >
                disclosure policy
              </Link>
              .
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Who is responsible</h2>
            <p>
              {site.name} decides why and how the data described here is processed, and is the
              contact point for any question or request about it.
            </p>
            <TodoNote className="self-start">
              TODO(owner): registered legal entity, address and country — this also determines the
              applicable law and which supervisory authority hears a complaint
            </TodoNote>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">What we collect</h2>
            <p>
              Only what you type into the contact form: your <span className="text-fg">name</span>,{" "}
              <span className="text-fg">email address</span>, and{" "}
              <span className="text-fg">message</span>, plus your{" "}
              <span className="text-fg">company</span> and the{" "}
              <span className="text-fg">engagement type</span> if you choose to fill them in. That
              is the entire list. There is no account to create, nothing to log into, and no hidden
              field that collects anything else.
            </p>
            <p>
              The form does contain one hidden field, and it is not for you. Automated spam fills it
              in; browsers used by people leave it empty. If it arrives filled, the submission is
              discarded immediately and nothing is sent or stored.
            </p>
            <p>
              As with any website, the server that delivers these pages records ordinary technical
              request data such as IP address, timestamp and user agent, for security and to keep
              the site running. We do not combine those logs with form submissions or use them to
              identify visitors.
            </p>
            <TodoNote className="self-start">
              TODO(owner): name the hosting provider and its server-log retention, so this paragraph
              can be specific
            </TodoNote>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Why we use it</h2>
            <p>
              To read your message, reply to it, and scope the engagement you are asking about. That
              is the only purpose. We process the details because you asked us to get in touch and
              because doing so is a necessary step towards a possible contract between us; the
              server logs we keep because a public website has to be defended.
            </p>
            <p>
              We do not use your message to train anything, and we do not repurpose it for
              marketing. You will not be added to a mailing list by writing to us.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">What this site does not do</h2>
            <ul className="flex flex-col gap-3">
              {doesNot.map((line) => {
                const [lead, ...rest] = line.split(". ");
                return (
                  <li key={line} className="flex gap-3">
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

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Who else handles it</h2>
            <p>
              Your message becomes an email to our own inbox. Reaching that inbox involves two
              suppliers and no one else: the provider that hosts this site, and{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline-offset-4 hover:text-accent hover:underline"
              >
                Resend
              </a>
              , the service that delivers it. Both act on our instructions only and may not use your
              data for their own purposes.
            </p>
            <p>
              If email delivery is not configured, the site does not quietly swallow your message:
              it hands you a pre-filled <code className="font-mono text-fg">mailto:</code> link
              instead, and the message travels from your own mail client straight to{" "}
              <span className="font-mono text-fg">{site.email}</span>. In that case it never passes
              through this website at all.
            </p>
            <p>
              We keep no database. There is no copy of your enquiry on this website — only the email
              it became. Beyond the two suppliers above, we disclose your data to no one, unless we
              are legally compelled to.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">How long we keep it</h2>
            <p>
              Correspondence is kept while we are answering you and for the life of any engagement
              that follows, because we need the trail of what was agreed. If your enquiry does not
              lead anywhere, the thread is deleted once it is clear there is nothing to follow up.
              You can ask us to delete it sooner at any point.
            </p>
            <TodoNote className="self-start">
              TODO(owner): a concrete retention period for enquiries that go nowhere, and for
              closed-engagement correspondence
            </TodoNote>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Your rights</h2>
            <p>
              Whatever your local law entitles you to, we will do the following on request: tell you
              what we hold about you, correct it if it is wrong, delete it, send you a copy, or stop
              using it. Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-fg underline-offset-4 hover:text-accent hover:underline"
              >
                {site.email}
              </a>{" "}
              and we will answer within 30 days. There is no charge and no form to fill in.
            </p>
            <p>
              Depending on where you live, data-protection law may give you further rights, and the
              right to complain to your national data-protection authority if you think we have
              handled your data badly. We would rather you told us first so we can fix it, but that
              route is yours either way.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Keeping this site safe</h2>
            <p>
              We would be poor advertisements for our own work if this site were sloppy. It is
              served over HTTPS, it stores nothing in your browser, and it has no login, no database
              and no third-party code — which is the shortest way to say that there is very little
              here to attack.
            </p>
            <p>
              Found a flaw in it anyway? Tell us. Good-faith research on this site is welcome under
              our{" "}
              <Link
                href="/disclosure"
                className="text-fg underline-offset-4 hover:text-accent hover:underline"
              >
                disclosure policy
              </Link>
              , which commits us to acknowledge within 14 days, keep you posted, and credit you when
              we publish.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h2 text-fg">Questions or changes</h2>
            <p>
              Ask us anything about this notice at{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-fg underline-offset-4 hover:text-accent hover:underline"
              >
                {site.email}
              </a>
              . If we change how we handle your data we will update this page and move the version
              and date below, so you can see that something changed.
            </p>
          </section>

          <p className="border-t border-border pt-6 font-mono text-[0.75rem]">
            Notice version 1.0, effective 2026-08-29. Changes are published on this page.
          </p>
        </div>
      </Container>
    </section>
  );
}
