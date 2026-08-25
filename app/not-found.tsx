import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container className="flex flex-col items-start gap-6">
        <p className="eyebrow text-accent">404</p>
        <h1 className="text-h1">Page not found.</h1>
        <p className="max-w-xl text-fg-muted">
          The page you requested does not exist. If you followed a link from one of our advisories,
          the record may have moved.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/research" variant="secondary">
            Browse research
          </Button>
        </div>
      </Container>
    </section>
  );
}
