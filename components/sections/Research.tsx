import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  cves,
  cveTotalClaim,
  researchHeading,
  severityCounts,
  severityLabel,
  severityOrder,
} from "@/content/cves";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const LANDING_CAP = 6;

export function Research() {
  // `cves` is already sorted highest-severity-first → the landing shows the most severe findings.
  const featured = cves.slice(0, LANDING_CAP);
  const counts = severityCounts(cves);

  return (
    <section
      id="research"
      className="relative scroll-mt-16 overflow-hidden border-t border-border py-20 md:py-28 lg:py-32"
      aria-labelledby="research-title"
    >
      {/* Large mono anchor number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-0 select-none font-mono text-[14rem] leading-none font-medium tracking-tighter text-fg/[0.035] md:text-[22rem]"
      >
        {cveTotalClaim}
      </div>

      <Container className="relative">
        <Reveal>
          <SectionHeading
            id="research-title"
            eyebrow={researchHeading.eyebrow}
            title={researchHeading.title}
            subtitle={researchHeading.subtitle}
          />
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Published CVEs by severity">
            {severityOrder
              .filter((s) => counts[s] > 0)
              .map((s) => (
                <li key={s}>
                  <Badge tone={s}>
                    {counts[s]} {severityLabel[s]}
                  </Badge>
                </li>
              ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="overflow-x-auto rounded-card border border-border bg-bg-elev">
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
                  <tr
                    key={cve.id}
                    className="border-b border-border transition-colors last:border-b-0 hover:bg-bg-elev-2"
                  >
                    <td className="px-5 py-4 font-mono text-fg">{cve.id}</td>
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
            <Link
              href="/research"
              className="inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline"
            >
              See all advisories
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
