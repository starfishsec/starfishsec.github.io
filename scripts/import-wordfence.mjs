/**
 * Generates `content/cves.data.ts` from the raw Wordfence researcher exports in `data/wordfence/*.json`.
 *
 *   node scripts/import-wordfence.mjs
 *
 * To refresh the raw data first (needs `npx playwright` + a local Chrome):
 *   node scripts/fetch-wordfence.mjs ngo-thien-an-ancorn data/wordfence/ngo-thien-an-ancorn.json
 *
 * Every row is public record (Wordfence Intelligence, credited to the researcher). Nothing here is
 * invented: platform / type / CVSS are parsed verbatim from the Wordfence title and score.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "data", "wordfence");
const OUT = join(process.cwd(), "content", "cves.data.ts");

/** slug → handle shown on the site */
const RESEARCHERS = {
  "ngo-thien-an-ancorn": "ancorn_",
  "phuoc-pham-p3tl0v3r": "p3tl0v3r",
};

const MONTHS = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

function toIsoDate(s) {
  const m = /^([A-Z][a-z]+) (\d{1,2}), (\d{4})$/.exec(s.trim());
  if (!m) return undefined;
  return `${m[3]}-${MONTHS[m[1]]}-${m[2].padStart(2, "0")}`;
}

function severity(cvss) {
  if (cvss >= 9) return "critical";
  if (cvss >= 7) return "high";
  if (cvss >= 4) return "medium";
  return "low";
}

/** "Plugin Name <= 1.2.3 - Authenticated (Contributor+) Stored XSS via foo" → { platform, type } */
function splitTitle(title) {
  const [head, ...rest] = title.split(" - ");
  const platform = head.replace(/\s*<=?\s*[\w.\-]+\s*$/, "").trim();
  const type = rest.join(" - ").trim() || "See advisory";
  return { platform: platform || head.trim(), type };
}

const q = (s) => JSON.stringify(s);
const rows = [];

for (const file of readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"))) {
  const slug = file.replace(/\.json$/, "");
  const researcher = RESEARCHERS[slug] ?? slug;
  const raw = JSON.parse(readFileSync(join(DATA_DIR, file), "utf8"));
  for (const r of raw) {
    if (!/^CVE-\d{4}-\d{4,}$/.test(r.cve)) continue;
    const cvss = Number.parseFloat(r.cvss);
    const { platform, type } = splitTitle(r.title);
    rows.push({
      id: r.cve,
      platform,
      title: type,
      severity: severity(cvss),
      cvss: Number.isFinite(cvss) ? cvss : undefined,
      publishedAt: toIsoDate(r.date),
      source: r.href || undefined,
      researchers: [researcher],
    });
  }
}

// Highest severity first, then newest.
rows.sort(
  (a, b) =>
    (b.cvss ?? 0) - (a.cvss ?? 0) || (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
);

// A CVE can be credited to more than one of our researchers (joint findings appear on each
// researcher's page). Merge the credits instead of dropping the duplicate row.
const byId = new Map();
for (const r of rows) {
  const prev = byId.get(r.id);
  if (!prev) {
    byId.set(r.id, r);
    continue;
  }
  for (const who of r.researchers) {
    if (!prev.researchers.includes(who)) prev.researchers.push(who);
  }
}
const unique = [...byId.values()];

const lines = unique.map((r) => {
  const parts = [
    `id: ${q(r.id)}`,
    `platform: ${q(r.platform)}`,
    `title: ${q(r.title)}`,
    `severity: ${q(r.severity)}`,
    r.cvss !== undefined ? `cvss: ${r.cvss}` : null,
    r.publishedAt ? `publishedAt: ${q(r.publishedAt)}` : null,
    r.source ? `source: ${q(r.source)}` : null,
    `researchers: [${r.researchers.map(q).join(", ")}]`,
  ].filter(Boolean);
  return `  { ${parts.join(", ")} },`;
});

const header = `// GENERATED FILE — do not edit by hand.
// Source: Wordfence Intelligence researcher pages (public record), see data/wordfence/*.json.
// Regenerate with: node scripts/import-wordfence.mjs
// Rows: ${unique.length} · generated ${new Date().toISOString().slice(0, 10)}
import type { Cve } from "./cves";

// prettier-ignore
export const cveData: Cve[] = [
`;

writeFileSync(OUT, header + lines.join("\n") + "\n];\n");
console.log(`wrote ${unique.length} CVEs → ${OUT}`);
