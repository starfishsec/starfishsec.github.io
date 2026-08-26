"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactField, type ContactState } from "@/app/actions/contact";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const initialContactState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-btn border border-border bg-bg-elev px-3.5 py-2.5 text-body text-fg placeholder:text-fg-muted " +
  "transition-colors hover:border-fg-subtle focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "aria-[invalid=true]:border-danger";

function SubmitButton() {
  const { pending } = useFormStatus();
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
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitContact,
    initialContactState,
  );
  const uid = useId();
  const idFor = (f: ContactField) => `${uid}-${f}`;
  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};
  const invalid = (f: ContactField) => (errors[f] ? true : undefined);
  const describedBy = (f: ContactField) => (errors[f] ? `${idFor(f)}-error` : undefined);

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
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
            {services.map((s) => (
              <option key={s.title} value={s.title}>
                {s.title}
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

      {/* Honeypot — hidden from humans and assistive tech. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="shrink-0">
          <SubmitButton />
        </div>
        <p className="text-small text-fg-muted sm:text-right">
          We reply from{" "}
          <span className="font-mono text-fg">info@starfishsec.com</span>. No newsletters.
        </p>
      </div>
    </form>
  );
}
