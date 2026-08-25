import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { hero } from "@/content/hero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Stagger helper for the CSS-only entrance (no Framer here: hero must paint before hydration). */
const stagger = (step: number): CSSProperties => ({ animationDelay: `${step * 80}ms` });

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* Background motifs: faint dot grid + accent glow (docs/03 visual motifs) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 bg-accent-glow blur-3xl"
      />

      <Container className="flex min-h-[85vh] flex-col justify-center py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow animate-fade-up text-accent" style={stagger(0)}>
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="animate-fade-up mt-6 text-display text-balance"
            style={stagger(1)}
          >
            {hero.headline}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted"
            style={stagger(2)}
          >
            {hero.subheadline}
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={stagger(3)}
          >
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p className="animate-fade-up mt-6 text-small text-fg-muted" style={stagger(4)}>
            {hero.supportingLine}
          </p>
        </div>

        <div className="animate-fade-up mt-16" style={stagger(5)}>
          <div
            aria-hidden="true"
            className="inline-flex max-w-full items-center gap-3 rounded-card border border-border bg-bg-elev/70 px-4 py-3 font-mono text-small text-fg-muted"
          >
            <span className="flex gap-1.5">
              <span className="size-2 rounded-full bg-danger/70" />
              <span className="size-2 rounded-full bg-warn/70" />
              <span className="size-2 rounded-full bg-accent/70" />
            </span>
            <span className="truncate">
              <span className="text-accent">{hero.terminalLine.slice(0, 1)}</span>
              {hero.terminalLine.slice(1)}
              <span className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-accent motion-safe:animate-pulse" />
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
