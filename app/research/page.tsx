import type { Metadata } from "next";
import {
  cves,
  researchHeading,
  severityCounts,
  severityLabel,
  severityOrder,
} from "@/content/cves";
import { CveTable } from "@/components/research/CveTable";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Research & Advisories",
  description:
    "Published CVEs and security advisories by the Starfish Security research team: WordPress plugins, Apache, and other widely deployed software.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  const counts = severityCounts(cves);
  const researchers = Array.from(new Set(cves.flatMap((c) => c.researchers ?? [])));

  return (
    <section className="py-20 md:py-28" aria-labelledby="research-page-title">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          as="h1"
          id="research-page-title"
          title={researchHeading.title}
          subtitle={researchHeading.subtitle}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Published CVEs by severity">
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
          <p className="font-mono text-small text-fg-muted">
            {cves.length} CVEs on public record, credited to{" "}
            {researchers.map((r) => `@${r}`).join(", ")}
          </p>
        </div>

        <CveTable cves={cves} />
      </Container>
    </section>
  );
}
