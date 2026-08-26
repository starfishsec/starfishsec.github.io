import { ArrowRight, Mail } from "lucide-react";
import { finalCta } from "@/content/cta";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

/** Closing band: full-width, headline left, actions right. Same masked grid + wash as the hero. */
export function FinalCTA() {
  return (
    <section
      className="relative isolate overflow-hidden border-t border-border"
      aria-labelledby="cta-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_15%_50%,black_0%,transparent_65%)]" />
        <div className="absolute top-1/2 left-[-5%] h-[24rem] w-[40rem] -translate-y-1/2 bg-accent-glow blur-3xl" />
      </div>

      <Container className="py-20 md:py-28">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-h1 text-balance">
                {finalCta.title}
              </h2>
              <p className="mt-4 max-w-xl text-fg-muted">{finalCta.body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
              <Button href={finalCta.primary.href} size="lg">
                {finalCta.primary.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href={`mailto:${site.email}`} variant="secondary" size="lg">
                <Mail className="size-4" aria-hidden="true" />
                <span className="font-mono text-small">{site.email}</span>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
