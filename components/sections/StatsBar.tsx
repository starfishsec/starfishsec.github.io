import { stats } from "@/content/stats";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import { Reveal } from "@/components/motion/Reveal";

export function StatsBar() {
  return (
    <section aria-label="Key figures" className="border-y border-border bg-bg-elev/40">
      <Container className="px-0 md:px-8">
        <ul className="grid divide-border max-sm:divide-y sm:grid-cols-3 sm:divide-x">
          {stats.map((stat, i) => (
            <li key={stat.label}>
              <Reveal delay={i * 0.08} className="h-full">
                <StatCard {...stat} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
