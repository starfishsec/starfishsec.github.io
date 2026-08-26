import { processHeading, processSteps } from "@/content/process";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Split layout: the heading stays pinned on the left (desktop) while the four steps read as a
 * single hairline-divided list on the right. The <ol> carries the order for assistive tech; the
 * mono numerals are decorative.
 */
export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-16 border-t border-border py-20 md:py-28"
      aria-labelledby="process-title"
    >
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            id="process-title"
            title={processHeading.title}
            subtitle={processHeading.subtitle}
          />
        </Reveal>

        <ol className="divide-y divide-border border-t border-border">
          {processSteps.map((step, i) => (
            <li key={step.title}>
              <Reveal
                delay={i * 0.06}
                className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-6"
              >
                <span className="pt-1 font-mono text-small text-accent" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-h3">{step.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-fg-muted">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
