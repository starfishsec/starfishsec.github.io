"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  buildMailto,
  buildSubject,
  contactSchema,
  readValues,
  type ContactField,
} from "@/lib/contact";
import { engagementTypes } from "@/content/services";
import { contactFormBackend, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Static-build contact form (GitHub Pages, no server): progressive enhancement over FormSubmit.
 * Without JavaScript the form is a plain POST to `contactFormBackend.action` and FormSubmit
 * redirects back to `_next` (/thanks). With JavaScript, submit is intercepted, validated with the
 * same zod schema the old server action used, sent to the AJAX endpoint, and routed to /thanks
 * client-side. If the network or the service fails, the visitor gets a prefilled mailto: draft —
 * the message is never silently lost. UI is unchanged from the server-action version.
 */

type FormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<ContactField, string>>;
      values: Partial<Record<ContactField, string>>;
    }
  | { status: "fallback"; message: string; mailto: string };

const initialContactState: FormState = { status: "idle" };

const inputClass =
  "w-full rounded-btn border border-border bg-bg-elev px-3.5 py-2.5 text-body text-fg placeholder:text-fg-muted " +
  "transition-colors hover:border-fg-subtle focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "aria-[invalid=true]:border-danger";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>
      {pending ? "Sending…" : "Request a Pentest"}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Button>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-baseline justify-between text-small text-fg">
        <span>{label}</span>
        {optional ? <span className="font-mono text-[0.75rem] text-fg-muted">optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-small text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const router = useRouter();
  const [state, setState] = useState<FormState>(initialContactState);
  const [pending, setPending] = useState(false);
  const uid = useId();
  const idFor = (f: ContactField) => `${uid}-${f}`;
  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};
  const invalid = (f: ContactField) => (errors[f] ? true : undefined);
  const describedBy = (f: ContactField) => (errors[f] ? `${idFor(f)}-error` : undefined);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const raw = readValues(formData);

    // Honeypot tripped: pretend success without sending anything (same behavior as before).
    const honey = formData.get("_honey");
    if (typeof honey === "string" && honey.length > 0) {
      router.push("/thanks");
      return;
    }

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<ContactField, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in fieldErrors)) {
          fieldErrors[key as ContactField] = issue.message;
        }
      }
      setState({
        status: "error",
        message: "Please fix the highlighted fields.",
        fieldErrors,
        values: raw,
      });
      return;
    }

    const data = parsed.data;
    setPending(true);
    try {
      const res = await fetch(contactFormBackend.ajax, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || "—",
          engagement: data.engagement || "—",
          message: data.message,
          _subject: buildSubject(data),
          _template: "table",
        }),
      });
      const body: unknown = await res.json().catch(() => null);
      const ok =
        res.ok &&
        typeof body === "object" &&
        body !== null &&
        "success" in body &&
        (body.success === true || body.success === "true");
      if (!ok) throw new Error(`FormSubmit rejected the submission (HTTP ${res.status})`);
      router.push("/thanks");
    } catch {
      // Network down, service down, or blocked: hand the visitor a prefilled email draft instead.
      setState({
        status: "fallback",
        message: "We couldn't send your message automatically. Send us the same details directly:",
        mailto: buildMailto(data),
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      action={contactFormBackend.action}
      method="POST"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      {/* No-JS path: FormSubmit handles the POST and redirects back to /thanks. These fields are
          inert on the JS path (the AJAX payload is built explicitly above). */}
      <input type="hidden" name="_next" value={`${site.url}/thanks/`} />
      <input type="hidden" name="_subject" value="[starfishsec.com] Pentest request" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      {state.status === "error" ? (
        <p
          className="rounded-btn border border-danger/40 bg-danger/10 px-4 py-3 text-small text-danger"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      {state.status === "fallback" ? (
        <div
          className="flex flex-col gap-3 rounded-card border border-accent/30 bg-accent-dim p-5"
          role="status"
        >
          <p className="text-small text-fg">{state.message}</p>
          <Button href={state.mailto} variant="secondary" className="self-start">
            <Mail className="size-4" aria-hidden="true" />
            Open email draft
          </Button>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={idFor("name")} label="Name" error={errors.name}>
          <input
            id={idFor("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            defaultValue={values.name}
            aria-invalid={invalid("name")}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
        </Field>
        <Field id={idFor("email")} label="Work email" error={errors.email}>
          <input
            id={idFor("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            aria-invalid={invalid("email")}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
        </Field>
        <Field id={idFor("company")} label="Company" error={errors.company} optional>
          <input
            id={idFor("company")}
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={values.company}
            aria-invalid={invalid("company")}
            aria-describedby={describedBy("company")}
            className={inputClass}
          />
        </Field>
        <Field id={idFor("engagement")} label="Engagement type" error={errors.engagement} optional>
          <select
            id={idFor("engagement")}
            name="engagement"
            defaultValue={values.engagement ?? ""}
            aria-invalid={invalid("engagement")}
            aria-describedby={describedBy("engagement")}
            className={cn(inputClass, "appearance-none")}
          >
            <option value="">Not sure yet</option>
            {engagementTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={idFor("message")} label="What should we look at?" error={errors.message}>
        <textarea
          id={idFor("message")}
          name="message"
          rows={6}
          required
          minLength={20}
          defaultValue={values.message}
          placeholder="Target scope (apps, APIs, infra), timeline, and anything an attacker would care about."
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("message")}
          className={cn(inputClass, "resize-y")}
        />
      </Field>

      {/* Honeypot — hidden from humans and assistive tech. `_honey` is FormSubmit's own honeypot
          field name, so the no-JS path is filtered by the service too; the JS path drops the
          submission itself when the field is filled. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${uid}-honey`}>Website</label>
        <input id={`${uid}-honey`} name="_honey" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="shrink-0">
          <SubmitButton pending={pending} />
        </div>
        <p className="text-small text-fg-muted sm:text-right">
          We reply from <span className="font-mono text-fg">info@starfishsec.com</span>. No
          newsletters.
        </p>
      </div>
    </form>
  );
}
