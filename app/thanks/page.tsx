import type { Metadata } from "next";
import { Check } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Thanks",
  description: "We received your request and will get back to you shortly.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <section className="py-32" aria-labelledby="thanks-title">
      <Container className="flex flex-col items-start gap-6">
        <span className="inline-flex size-12 items-center justify-center rounded-full border border-accent/40 bg-accent-dim text-accent">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <p className="eyebrow text-accent">Request received</p>
        <h1 id="thanks-title" className="text-h1">
          Thanks — we&apos;ll be in touch.
        </h1>
        <p className="max-w-xl text-fg-muted">
          We read every request ourselves. Expect a reply from{" "}
          <span className="font-mono text-fg">{site.email}</span> to schedule a scoping call.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/research" variant="secondary">
            Browse our research
          </Button>
        </div>
      </Container>
    </section>
  );
}
