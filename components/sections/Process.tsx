import { processHeading, processSteps } from "@/content/process";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Process() {
  return (
    <section id="process" className="py-20 md:py-28 lg:py-32" aria-labelledby="process-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="process-title"
            eyebrow={processHeading.eyebrow}
            title={processHeading.title}
            subtitle={processHeading.subtitle}
          />
        </Reveal>

        <div className="relative mt-14">
          {/* connector line (desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-5 left-0 right-0 hidden h-px bg-gradient-to-r from-accent/40 via-border to-border lg:block"
          />
          <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.08} className="flex gap-4 lg:flex-col lg:gap-6">
                  <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg font-mono text-small text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-h3">{step.title}</h3>
                    <p className="mt-2 text-fg-muted">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
