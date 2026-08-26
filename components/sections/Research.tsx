import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cves, cveUrl, researchHeading, severityLabel } from "@/content/cves";
import { hero } from "@/content/hero";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const LANDING_CAP = 6;

export function Research() {
  // `cves` is already sorted highest-severity-first → the landing shows the most severe findings.
  const featured = cves.slice(0, LANDING_CAP);

  return (
    <section
      id="research"
      className="scroll-mt-16 border-t border-border py-20 md:py-28"
      aria-labelledby="research-title"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="research-title"
            title={researchHeading.title}
            subtitle={researchHeading.subtitle}
          />
        </Reveal>

        {/* The severity-count chip row ("3 Critical · n High · …") was removed from the landing
            (owner, 2026-08-26); the full breakdown still lives on /research. */}
        <Reveal delay={0.1} className="mt-10">
          {/* Below `sm` the same six records render as a stacked list so the severity badge (the
              payload) is never scrolled off-screen; from `sm` the table takes over. */}
          <ul className="divide-y divide-border rounded-card border border-border bg-bg-elev sm:hidden">
            {featured.map((cve) => (
              <li key={cve.id}>
                <a
                  href={cveUrl(cve)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 px-4 py-4 transition-colors duration-200 hover:bg-bg-elev-2 focus-visible:bg-bg-elev-2"
                  aria-label={`${cve.id}: ${cve.title}, ${cve.platform}, ${severityLabel[cve.severity]} severity. Opens the public record in a new tab.`}
                >
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="font-mono text-small text-fg">{cve.id}</span>
                    <span className="text-small text-pretty text-fg">{cve.title}</span>
                    <span className="truncate text-small text-fg-muted" title={cve.platform}>
                      {cve.platform}
                    </span>
                  </span>
                  <Badge tone={cve.severity}>
                    {severityLabel[cve.severity]}
                    {cve.cvss !== undefined ? ` ${cve.cvss.toFixed(1)}` : ""}
                  </Badge>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto rounded-card border border-border bg-bg-elev sm:block">
            <table className="w-full min-w-[640px] text-left text-small">
              <thead className="eyebrow text-fg-muted">
                <tr className="border-b border-border">
                  <th scope="col" className="px-5 py-3 font-normal">
                    CVE
                  </th>
                  <th scope="col" className="px-5 py-3 font-normal">
                    Platform
                  </th>
                  <th scope="col" className="px-5 py-3 font-normal">
                    Type
                  </th>
                  <th scope="col" className="px-5 py-3 text-right font-normal">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody>
                {featured.map((cve) => (
                  <tr key={cve.id} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-4 font-mono whitespace-nowrap">
                      {/* The ID is the link to the public record (same treatment as the hero panel). */}
                      <a
                        href={cveUrl(cve)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg underline-offset-4 transition-colors hover:text-accent hover:underline"
                        aria-label={`${cve.id} (opens the public record in a new tab)`}
                      >
                        {cve.id}
                      </a>
                    </td>
                    <td className="max-w-[16rem] truncate px-5 py-4 text-fg" title={cve.platform}>
                      {cve.platform}
                    </td>
                    <td className="max-w-[20rem] truncate px-5 py-4 text-fg-muted" title={cve.title}>
                      {cve.title}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Badge tone={cve.severity}>
                        {severityLabel[cve.severity]}
                        {cve.cvss !== undefined ? ` ${cve.cvss.toFixed(1)}` : ""}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small text-fg-muted">
              Showing the {featured.length} most severe of {cves.length} published CVEs on record.
            </p>
            {/* "Read the write-ups → /blog" hidden with the blog (owner, 2026-08-26). */}
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 py-1 font-medium text-accent underline-offset-4 hover:underline"
            >
              {hero.secondaryCta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
