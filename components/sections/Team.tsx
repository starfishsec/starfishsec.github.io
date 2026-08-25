import { ArrowUpRight } from "lucide-react";
import { certGlossary, initials, team, teamHeading } from "@/content/team";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoNote } from "@/components/ui/TodoNote";
import { Reveal } from "@/components/motion/Reveal";

export function Team() {
  return (
    <section
      id="team"
      className="scroll-mt-16 border-t border-border py-20 md:py-28 lg:py-32"
      aria-labelledby="team-title"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="team-title"
            eyebrow={teamHeading.eyebrow}
            title={teamHeading.title}
            subtitle={teamHeading.subtitle}
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {team.map((member, i) => (
            <li key={member.name} className="h-full">
              <Reveal delay={i * 0.08} className="h-full">
                <Card className="flex h-full flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    {/* Monogram avatar — no fake photos. TODO(owner): real headshots. */}
                    <div
                      aria-hidden="true"
                      className="flex size-14 items-center justify-center rounded-full border border-accent/30 bg-accent-dim font-mono text-lg text-accent"
                    >
                      {initials(member.name)}
                    </div>
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
                        className="inline-flex items-center gap-1 rounded-btn border border-border px-2.5 py-1 font-mono text-[0.75rem] text-fg-muted transition-colors hover:border-accent hover:text-fg"
                      >
                        LinkedIn
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="text-h3">{member.name}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-fg-muted">
                      <span>{member.role}</span>
                      {member.handle ? (
                        <span className="font-mono text-fg-muted">@{member.handle}</span>
                      ) : null}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2" aria-label="Certifications">
                    {member.certs.map((cert) => (
                      <li key={cert.short}>
                        <Badge tone="accent" title={cert.long}>
                          {cert.short}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto text-small text-fg-muted">
                    {member.bio ?? <TodoNote>TODO(owner): one-line bio</TodoNote>}
                  </p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.75rem] text-fg-muted">
            {certGlossary.map((cert) => (
              <div key={cert.short} className="flex gap-1.5">
                <dt className="text-fg">{cert.short}</dt>
                <dd>= {cert.long}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
