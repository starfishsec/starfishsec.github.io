import { pentestScopes, services, servicesHeading } from "@/content/services";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { iconMap } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Bento: five services in exactly six cells (the core Penetration Testing card spans two columns; four
 * singles fill the rest). Background variation: the featured cell carries the masked grid + accent
 * wash, the adjacent research cell is tinted one step lighter; the others stay flat.
 */
export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-16 border-t border-border py-20 md:py-28"
      aria-labelledby="services-title"
    >
      <Container>
        <Reveal>
          <SectionHeading id="services-title" title={servicesHeading.title} />
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            const featured = i === 0;
            const tinted = i === 1;
            return (
              <li key={service.title} className={cn("h-full", featured && "md:col-span-2")}>
                <Reveal delay={Math.min(i, 4) * 0.06} className="h-full">
                  <article
                    className={cn(
                      "relative isolate flex h-full flex-col gap-5 overflow-hidden rounded-card border p-6 transition-colors duration-200",
                      featured
                        ? "border-accent/30 bg-bg-elev md:p-8"
                        : "border-border hover:border-accent/40",
                      tinted ? "bg-bg-elev-2" : !featured && "bg-bg-elev",
                    )}
                  >
                    {featured ? (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10"
                      >
                        <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_100%_0%,black_0%,transparent_60%)]" />
                        <div className="absolute -top-24 -right-16 h-[18rem] w-[26rem] bg-accent-glow blur-2xl" />
                      </div>
                    ) : null}

                    <span
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-btn border",
                        featured
                          ? "border-accent/40 bg-accent-dim text-accent"
                          : "border-border bg-bg text-fg-muted",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className={featured ? "text-h2" : "text-h3"}>{service.title}</h3>
                      <p
                        className={cn(
                          "mt-2 text-fg-muted",
                          featured ? "max-w-2xl leading-relaxed" : "text-small leading-relaxed",
                        )}
                      >
                        {service.description}
                      </p>
                    </div>

                    {/* The featured cell names every pentest scope (owner, 2026-09-08) so a buyer
                        can see their surface in the list without opening the contact form. */}
                    {featured ? (
                      <ul className="mt-auto flex flex-wrap gap-2" aria-label="Pentest scopes">
                        {pentestScopes.map((scope) => (
                          <li key={scope}>
                            <Badge>{scope}</Badge>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
