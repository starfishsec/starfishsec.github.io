import { uspHeading, usps } from "@/content/hero";
import { Container } from "@/components/ui/Container";
import { iconMap } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The four USPs (expert-led · working proof · fast · convenient pricing) as a hairline-topped
 * four-column row: no card chrome, so it reads differently from the bento and the team columns.
 * Keeps the `#why` anchor that the footer "About" link targets (the former WhyUs section repeated
 * these points and was folded in here).
 */
export function UspStrip() {
  return (
    <section id="why" aria-labelledby="usp-title" className="scroll-mt-16 py-20 md:py-28">
      <Container>
        <Reveal>
          <h2 id="usp-title" className="text-h2 text-balance">
            {uspHeading.title}
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((usp, i) => {
            const Icon = iconMap[usp.icon];
            return (
              <li key={usp.title}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col gap-5 border-t border-border pt-6">
                    <Icon className="size-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
                    <div>
                      <h3 className="font-medium text-fg">{usp.title}</h3>
                      <p className="mt-2 text-small leading-relaxed text-fg-muted">
                        {usp.description}
                      </p>
                    </div>
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
