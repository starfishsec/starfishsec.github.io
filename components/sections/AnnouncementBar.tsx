"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { announcement } from "@/content/announcement";
import { Container } from "@/components/ui/Container";

const STORAGE_KEY = "starfish:announcement-dismissed:v1";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") setVisible(false);
    } catch {
      /* storage unavailable — keep visible */
    }
  }, []);

  if (!announcement || !visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="border-b border-accent/20 bg-accent-dim">
      <Container className="flex items-center justify-between gap-4 py-2">
        <p className="min-w-0 truncate font-mono text-[0.75rem] text-fg">
          <span className="text-accent">{announcement.prefix}</span>{" "}
          <span className="text-fg-muted">{announcement.text}</span>{" "}
          <Link
            href={announcement.href}
            className="inline-flex items-center gap-1 text-fg underline-offset-4 hover:text-accent hover:underline"
          >
            {announcement.linkLabel}
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="shrink-0 rounded-sm p-1 text-fg-muted transition-colors hover:text-fg"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </Container>
    </div>
  );
}
