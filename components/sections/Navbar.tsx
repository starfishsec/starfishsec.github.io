"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { navCta, navLinks } from "@/content/nav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { StatusDot } from "@/components/ui/StatusDot";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // A 1px sentinel sits exactly where the header rests. The moment it leaves the viewport the
  // header is stuck, so it gains its chrome. IntersectionObserver instead of a scroll listener:
  // no per-frame work, and it fires exactly at the sticking point.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry) setScrolled(!entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Esc to close, lock body scroll, focus first link, and trap Tab inside the panel.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    focusables()[0]?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab") {
        const items = focusables();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="-mb-px h-px w-full" />
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-border bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container as="nav" aria-label="Primary" className="flex h-16 items-center justify-between gap-6">
          <Logo />

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                {/* py-2 lifts the 21px text line to a ≥24px pointer target (WCAG 2.5.8) without moving the baseline. */}
                <Link
                  href={link.href}
                  className="inline-block py-2 text-small text-fg-muted transition-colors hover:text-fg focus-visible:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 md:flex">
            <StatusDot className="hidden lg:inline-flex" />
            {/* One green fill per viewport (DESIGN.md, One Signal Rule): while the hero's primary is
                on screen the nav action is a ghost; it turns green once the header sticks. */}
            <Button href={navCta.href} variant={scrolled ? "primary" : "secondary"}>
              {navCta.label}
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-btn border border-border text-fg md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </Container>

        {/* Mobile panel */}
        <div
          id={menuId}
          ref={panelRef}
          hidden={!open}
          className="border-t border-border bg-bg md:hidden"
        >
          <Container className="flex flex-col gap-2 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-btn px-3 py-3 text-h3 text-fg transition-colors hover:bg-bg-elev-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-4">
              <Button href={navCta.href} size="lg" className="w-full">
                {navCta.label}
              </Button>
              <StatusDot className="justify-center" />
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
