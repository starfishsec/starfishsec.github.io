import Link from "next/link";
import { footerColumns, site, socials } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { StatusDot } from "@/components/ui/StatusDot";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elev/30">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <Logo />
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-small text-fg-muted transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <StatusDot />
            {/* Company social handles live with the brand block. The block is absent, not a
                placeholder, until the owner supplies them (TODO tracked in content/site.ts). */}
            {socials.length > 0 ? (
              <nav aria-label="Social">
                <ul className="flex flex-wrap gap-x-5 gap-y-1">
                  {socials.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        rel="me noopener"
                        className="inline-block py-1 text-small text-fg-muted transition-colors hover:text-fg"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow text-fg-muted">{col.title}</h2>
              <ul className="mt-3 flex flex-col gap-1">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    {/* Same visual rhythm as before (gap moved into padding) with a ≥24px target. */}
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-small text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      {/* Decorative monospace mantra — rendered via ::before so it is purely presentational. */}
      <div aria-hidden="true" className="overflow-hidden border-t border-border">
        <Container>
          <div
            data-text={site.mantra}
            className="select-none py-6 font-mono text-[clamp(0.72rem,2.55vw,2.5rem)] leading-none font-medium tracking-tight text-fg/[0.12] whitespace-nowrap before:content-[attr(data-text)]"
          />
        </Container>
      </div>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-6 text-[0.75rem] text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{site.legal}</p>
          <ul className="flex gap-5">
            <li>
              <Link href="/disclosure" className="inline-block py-1.5 transition-colors hover:text-fg">
                Disclosure policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="inline-block py-1.5 transition-colors hover:text-fg">
                Privacy
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
