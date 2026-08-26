import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { hero } from "@/content/hero";
import { cves, cveUrl, severityLabel } from "@/content/cves";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Stagger helper for the CSS-only entrance (no JS: the hero must paint before hydration). */
const stagger = (step: number): CSSProperties => ({ animationDelay: `${step * 80}ms` });

/** Headline copy comes from content/hero.ts; only the final word takes the accent. */
const headlineMatch = /^(.*\s)(\S+)$/.exec(hero.headline.trim());
const headlineLead = headlineMatch?.[1] ?? "";
const headlineLast = headlineMatch?.[2] ?? hero.headline;

/**
 * Proof panel: the three most severe records on file (`cves` is sorted severity-first), each
 * linking to its public advisory. Real data in place of a mock terminal (redesign 2026-08-26).
 */
const PROOF_ROWS = 3;
const proof = cves.slice(0, PROOF_ROWS);

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* Ambient depth: one masked engineering grid + one low-opacity accent wash behind the panel. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_72%_35%,black_0%,transparent_68%)]" />
        <div className="absolute top-[8%] right-[-12%] h-[30rem] w-[42rem] bg-accent-glow blur-3xl" />
      </div>

      {/* Sized by padding, never a viewport lock: headline, subhead and both CTAs sit above a 900px fold. */}
      <Container className="grid items-center gap-12 pt-14 pb-16 md:pt-20 md:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
        {/* ── Copy ─────────────────────────────────────────────────────── */}
        <div className="max-w-2xl">
          <h1
            id="hero-title"
            className="animate-fade-up text-display text-balance"
            style={stagger(0)}
          >
            {headlineLead}
            <span className="text-accent">{headlineLast}</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
            style={stagger(1)}
          >
            {hero.subheadline}
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={stagger(2)}
          >
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* ── Proof panel ──────────────────────────────────────────────── */}
        <aside
          className="animate-fade-up w-full lg:justify-self-end"
          style={stagger(2)}
          aria-labelledby="proof-title"
        >
          <div className="mx-auto max-w-md overflow-hidden rounded-card border border-border bg-bg-elev/90 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm">
            <div className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-3.5">
              <h2 id="proof-title" className="eyebrow text-fg-muted">
                {hero.proofLabel}
              </h2>
              <p className="font-mono text-small tabular-nums">
                <span className="font-medium text-fg">{cves.length}</span>{" "}
                <span className="text-fg-muted">credited</span>
              </p>
            </div>

            <ul className="divide-y divide-border">
              {proof.map((cve) => (
                <li key={cve.id}>
                  <a
                    href={cveUrl(cve)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 px-5 py-4 transition-colors duration-200 hover:bg-bg-elev-2 focus-visible:bg-bg-elev-2"
                    aria-label={`${cve.id}: ${cve.title}, ${cve.platform}, ${severityLabel[cve.severity]} severity. Opens the public record in a new tab.`}
                  >
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="font-mono text-small text-fg">{cve.id}</span>
                      {/* The vulnerability type is the evidence: it wraps rather than truncates. */}
                      <span className="text-small text-pretty text-fg">{cve.title}</span>
                      <span className="truncate text-small text-fg-muted" title={cve.platform}>
                        {cve.platform}
                      </span>
                    </span>
                    <Badge tone={cve.severity}>
                      {severityLabel[cve.severity]}
                      {cve.cvss !== undefined ? ` ${cve.cvss.toFixed(1)}` : ""}
                    </Badge>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </section>
  );
}
