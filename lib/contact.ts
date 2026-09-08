import { z } from "zod";
import { engagementTypes } from "@/content/services";
import { site } from "@/content/site";

/**
 * Client-side contact-form logic for the static build (GitHub Pages has no server, so the old
 * server action is gone). Validation runs in the browser with the same zod schema the action used;
 * delivery goes through the FormSubmit endpoint configured in `content/site.ts`, with a `mailto:`
 * draft as the no-network fallback.
 */

export type ContactField = "name" | "email" | "company" | "engagement" | "message";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120, "Name is too long."),
  email: z.email("Please enter a valid email address.").max(200, "Email is too long."),
  company: z.string().trim().max(200, "Company name is too long."),
  engagement: z
    .string()
    .trim()
    .refine((v) => v === "" || engagementTypes.includes(v), "Please pick a valid option."),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(5000, "Message is too long (5000 characters max)."),
});

export type ContactValues = z.infer<typeof contactSchema>;

export function readValues(formData: FormData): Record<ContactField, string> {
  const get = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    engagement: get("engagement"),
    message: get("message"),
  };
}

export function buildSubject(v: Pick<ContactValues, "name" | "company">): string {
  return `[starfishsec.com] Pentest request from ${v.name}${v.company ? ` (${v.company})` : ""}`;
}

function buildEmailBody(v: ContactValues): string {
  return [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Company: ${v.company || "—"}`,
    `Engagement: ${v.engagement || "—"}`,
    "",
    v.message,
  ].join("\n");
}

export function buildMailto(v: ContactValues): string {
  const subject = encodeURIComponent(
    `Pentest request${v.company ? ` — ${v.company}` : ""}${v.engagement ? ` (${v.engagement})` : ""}`,
  );
  const body = encodeURIComponent(buildEmailBody(v));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}
