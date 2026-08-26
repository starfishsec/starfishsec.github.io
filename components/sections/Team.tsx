import { ArrowUpRight } from "lucide-react";
import { certGlossary, initials, team, teamHeading } from "@/content/team";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoNote } from "@/components/ui/TodoNote";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The founding team: three hairline-topped columns, no card chrome — monogram, name, role, bio,
 * certifications, sourced highlights. Monograms stand in until the owner supplies headshots
 * (TODO(owner), content/team.ts). The "Read their research (n)" → /blog link is hidden with the
 * blog (owner, 2026-08-26); restore via `postsByAuthor` from content/blog.ts when it ships.
 */
export function Team() {
  return (
    <section
      id="team"
      className="scroll-mt-16 border-t border-border py-20 md:py-28"
      aria-labelledby="team-title"
    >
      <Container>
        <Reveal>
          <SectionHeading id="team-title" title={teamHeading.title} subtitle={teamHeading.subtitle} />
        </Reveal>

        <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {team.map((member, i) => {
            return (
              <li key={member.name} className="h-full">
                <Reveal delay={i * 0.08} className="h-full">
                  <article className="flex h-full flex-col gap-5 border-t border-border pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        aria-hidden="true"
                        className="flex size-12 items-center justify-center rounded-btn border border-accent/30 bg-accent-dim font-mono text-base text-accent"
                      >
                        {initials(member.name)}
                      </div>
                      {member.linkedin ? (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer me"
                          aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
                          className="inline-flex items-center gap-1 py-1 font-mono text-[0.75rem] text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
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
                        {member.handle ? <span className="font-mono">@{member.handle}</span> : null}
                      </p>
                    </div>

                    <p className="text-small leading-relaxed text-fg-muted">
                      {member.bio ?? <TodoNote>TODO(owner): one-line bio</TodoNote>}
                    </p>

                    <ul className="flex flex-wrap gap-2" aria-label="Certifications">
                      {member.certs.map((cert) => (
                        <li key={cert.short}>
                          <Badge tone="accent" title={cert.long}>
                            {cert.short}
                          </Badge>
                        </li>
                      ))}
                    </ul>

                    {member.achievements.length > 0 ? (
                      <ul className="flex flex-col gap-2 border-t border-border pt-4" aria-label="Highlights">
                        {member.achievements.map((a) => (
                          <li key={a.text} className="text-small text-fg">
                            {a.href ? (
                              <a
                                href={a.href}
                                target={a.href.startsWith("/") ? undefined : "_blank"}
                                rel={a.href.startsWith("/") ? undefined : "noopener noreferrer"}
                                className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                              >
                                {a.text}
                              </a>
                            ) : (
                              a.text
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="border-t border-border pt-4">
                        <TodoNote>TODO(owner): public highlights</TodoNote>
                      </div>
                    )}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.2}>
          <dl className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.75rem] text-fg-muted">
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
