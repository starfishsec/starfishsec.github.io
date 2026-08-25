import type { Metadata } from "next";
import { cves, cveTotalClaim, researchHeading } from "@/content/cves";
import { CveTable } from "@/components/research/CveTable";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoNote } from "@/components/ui/TodoNote";

export const metadata: Metadata = {
  title: "Research & Advisories",
  description:
    "Published CVEs and security advisories by the Starfish Security research team — WordPress plugins, Apache, and other widely deployed software.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="research-page-title">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          as="h1"
          id="research-page-title"
          eyebrow={researchHeading.eyebrow}
          title={researchHeading.title}
          subtitle={researchHeading.subtitle}
        />

        <div className="flex flex-col gap-3 rounded-card border border-dashed border-warn/30 bg-warn/5 p-4 text-small text-fg-muted">
          <p>
            <TodoNote className="mr-2">TODO(owner)</TodoNote>
            This page currently lists {cves.length} featured advisories credited on public records — a
            sample of the team&apos;s {cveTotalClaim} CVEs. The full export (all three researchers,
            including Apache and other databases) is pending and will populate{" "}
            <code className="font-mono text-fg">content/cves.ts</code>.
          </p>
        </div>

        <CveTable cves={cves} />
      </Container>
    </section>
  );
}
