import { services, servicesHeading } from "@/content/services";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { iconMap } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-16 border-t border-border py-20 md:py-28 lg:py-32"
      aria-labelledby="services-title"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="services-title"
            eyebrow={servicesHeading.eyebrow}
            title={servicesHeading.title}
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <li key={service.title} className="h-full">
                <Reveal delay={i * 0.08} className="h-full">
                  <Card className="group flex h-full flex-col gap-5">
                    <span className="inline-flex size-11 items-center justify-center rounded-btn border border-border bg-bg text-fg-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-h3">{service.title}</h3>
                      <p className="mt-2 text-fg-muted">{service.description}</p>
                    </div>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
