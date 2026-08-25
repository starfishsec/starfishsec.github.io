import { ArrowRight, Mail } from "lucide-react";
import { finalCta } from "@/content/cta";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA() {
  return (
    <section className="border-t border-border py-20 md:py-28 lg:py-32" aria-labelledby="cta-title">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-card border border-border bg-bg-elev px-6 py-16 text-center md:px-16 md:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 bg-accent-glow blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
            />
            <h2 id="cta-title" className="text-h1 text-balance">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-fg-muted">{finalCta.body}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
