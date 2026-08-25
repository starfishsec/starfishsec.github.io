import { whyHeading, whyPoints } from "@/content/whyus";
import { Container } from "@/components/ui/Container";
import { iconMap } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function WhyUs() {
  return (
    <section
      id="why"
      className="scroll-mt-16 border-t border-border py-20 md:py-28 lg:py-32"
      aria-labelledby="why-title"
    >
      <Container>
        <Reveal>
          <SectionHeading id="why-title" eyebrow={whyHeading.eyebrow} title={whyHeading.title} />
        </Reveal>

        <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {whyPoints.map((point, i) => {
            const Icon = iconMap[point.icon];
            return (
              <li key={point.title}>
                <Reveal delay={i * 0.08} className="flex gap-5">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-btn border border-border bg-bg-elev text-accent">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-h3">{point.title}</h3>
                    <p className="mt-2 text-fg-muted">{point.description}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
