"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { engagementTypes } from "@/content/services";
import { site } from "@/content/site";

export type ContactField = "name" | "email" | "company" | "engagement" | "message";

export type ContactState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<ContactField, string>>;
      values: Partial<Record<ContactField, string>>;
    }
  | {
      status: "fallback";
      message: string;
      mailto: string;
    };

const schema = z.object({
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
  // Honeypot: real users never fill this.
  website: z.string().max(0),
});

function readValues(formData: FormData): Record<ContactField | "website", string> {
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
    website: get("website"),
  };
}

function buildEmailBody(v: z.infer<typeof schema>): string {
  return [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Company: ${v.company || "—"}`,
    `Engagement: ${v.engagement || "—"}`,
    "",
    v.message,
  ].join("\n");
}

function buildMailto(v: z.infer<typeof schema>): string {
  const subject = encodeURIComponent(
    `Pentest request${v.company ? ` — ${v.company}` : ""}${v.engagement ? ` (${v.engagement})` : ""}`,
  );
  const body = encodeURIComponent(buildEmailBody(v));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = readValues(formData);
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && key !== "website" && !(key in fieldErrors)) {
        fieldErrors[key as ContactField] = issue.message;
      }
    }
    // Honeypot tripped → pretend success without sending anything.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) {
      redirect("/thanks");
    }
    const { website: _w, ...values } = raw;
    void _w;
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  // TODO: set CONTACT_FROM_EMAIL to a sender on a verified Resend domain (e.g. "Starfish Security <noreply@starfishsec.com>").
  const from = process.env.CONTACT_FROM_EMAIL ?? "Starfish Security <onboarding@resend.dev>";

  if (!apiKey) {
    // Graceful fallback when email is not configured: hand the visitor a prefilled mailto link.
    return {
      status: "fallback",
      message: "Our contact form isn't wired to email yet. Send us the same details directly:",
      mailto: buildMailto(data),
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `[starfishsec.com] Pentest request from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text: buildEmailBody(data),
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (err) {
    console.error("[contact] send failed:", err);
    return {
      status: "fallback",
      message: "We couldn't send your message automatically. Please email us directly:",
      mailto: buildMailto(data),
    };
  }

  redirect("/thanks");
}
