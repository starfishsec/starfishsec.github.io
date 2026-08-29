import type { Cve } from "./cves";

/**
 * Advisories that are NOT in the Wordfence export (`cves.data.ts` is generated from
 * `data/wordfence/*.json` and only covers the WordPress ecosystem). Hand-maintained: add a row here
 * only when the CVE is verifiable in a public record, and note the source you checked.
 */
export const cveManual: Cve[] = [
  // Verified 2026-08-29 against the NVD API record for CVE-2022-29317: description, CVSS v3.1
  // 9.8 CRITICAL (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H) and publish date are taken verbatim from it.
  // "Unauthenticated" reflects PR:N in that official vector. NVD's only reference for this CVE is
  // the writeup on @taidh's HackMD account, which is the public credit for the finding (the note
  // itself is no longer publicly readable, so we link the NVD entry instead of the writeup).
  {
    id: "CVE-2022-29317",
    platform: "Simple Bus Ticket Booking System",
    title: "Unauthenticated SQL Injection via username and password parameters",
    severity: "critical",
    cvss: 9.8,
    publishedAt: "2022-05-11",
    researchers: ["taidh"],
  },
  // Verified 2026-08-29 against the NVD record for CVE-2025-39518 (CNA: Patchstack) and the
  // Patchstack advisory, which credits "Pham Van Phuoc - VNPT Cyber Immunity". CVSS v3.1 7.6 HIGH
  // (AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:N/A:L) — "Admin+" reflects PR:H in that official vector.
  {
    id: "CVE-2025-39518",
    platform: "BMA Lite – Appointment Booking and Scheduling",
    title: "Authenticated (Admin+) SQL Injection",
    severity: "high",
    cvss: 7.6,
    publishedAt: "2025-04-16",
    source:
      "https://patchstack.com/database/Wordpress/Plugin/bma-lite-appointment-booking-and-scheduling/vulnerability/wordpress-bma-lite-1-4-2-sql-injection-vulnerability",
    researchers: ["p3tl0v3r"],
  },
];
