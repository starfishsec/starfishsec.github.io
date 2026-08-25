import { Bot, Coins, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { usps } from "@/content/hero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const icons: LucideIcon[] = [Bot, ShieldCheck, Zap, Coins];

/** Four USPs directly under the hero: AI-powered · expert-validated · fast · convenient pricing. */
export function UspStrip() {
  return (
    <section aria-label="Why teams choose Starfish" className="pb-20 md:pb-24">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((usp, i) => {
            const Icon = icons[i] ?? ShieldCheck;
            return (
              <li key={usp.title}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="flex h-full gap-4 rounded-card border border-border bg-bg-elev/60 p-5">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-btn border border-accent/30 bg-accent-dim text-accent">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-semibold text-fg">{usp.title}</h2>
                      <p className="mt-1 text-small text-fg-muted">{usp.description}</p>
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
