"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  cveUrl,
  cveYear,
  severityLabel,
  severityOrder,
  type Cve,
} from "@/content/cves";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

const ALL = "all";
/** Rows rendered per batch — keeps the initial DOM small (Lighthouse) on a 200+ row list. */
const PAGE_SIZE = 50;
type Sort = "severity" | "newest";

interface CveTableProps {
  cves: Cve[];
}

const selectClass =
  "h-10 max-w-[16rem] rounded-btn border border-border bg-bg-elev px-3 font-mono text-small text-fg " +
  "transition-colors hover:border-fg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

export function CveTable({ cves }: CveTableProps) {
  const [vendor, setVendor] = useState<string>(ALL);
  const [year, setYear] = useState<string>(ALL);
  const [severity, setSeverity] = useState<string>(ALL);
  const [sort, setSort] = useState<Sort>("severity");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const pendingHash = useRef<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  // Deep links (`/research#CVE-…`): make sure the row is rendered, then scroll to it.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!/^CVE-\d{4}-\d{4,}$/.test(id)) return;
    const idx = cves.findIndex((c) => c.id === id);
    if (idx < 0) return;
    pendingHash.current = id;
    setHighlightId(id);
    setLimit((l) => Math.max(l, Math.ceil((idx + 1) / PAGE_SIZE) * PAGE_SIZE));
  }, [cves]);

  useEffect(() => {
    const id = pendingHash.current;
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    pendingHash.current = null;
    el.scrollIntoView({ block: "center" });
  }, [limit]);

  const vendors = useMemo(
    () => Array.from(new Set(cves.map((c) => c.platform))).sort((a, b) => a.localeCompare(b)),
    [cves],
  );
  const years = useMemo(
    () => Array.from(new Set(cves.map(cveYear))).sort((a, b) => b - a),
    [cves],
  );
  const severities = useMemo(
    () => severityOrder.filter((s) => cves.some((c) => c.severity === s)),
    [cves],
  );

  const filtered = useMemo(() => {
    const list = cves.filter(
      (c) =>
        (vendor === ALL || c.platform === vendor) &&
        (year === ALL || String(cveYear(c)) === year) &&
        (severity === ALL || c.severity === severity),
    );
    if (sort === "newest") {
      return [...list].sort(
        (a, b) =>
          (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "") || (b.cvss ?? 0) - (a.cvss ?? 0),
      );
    }
    // "severity": input order is already highest-severity-first, then newest.
    return list;
  }, [cves, vendor, year, severity, sort]);

  const visible = filtered.slice(0, limit);
  const remaining = filtered.length - visible.length;

  const update = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setLimit(PAGE_SIZE);
  };
  const reset = () => {
    setVendor(ALL);
    setYear(ALL);
    setSeverity(ALL);
    setSort("severity");
    setLimit(PAGE_SIZE);
  };
  const isDirty = vendor !== ALL || year !== ALL || severity !== ALL || sort !== "severity";

  return (
    <div className="flex flex-col gap-6">
      <form
        className="flex flex-wrap items-end gap-4"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Filter advisories"
      >
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow text-fg-muted">Vendor</span>
          <select
            className={selectClass}
            value={vendor}
            onChange={(e) => update(setVendor)(e.target.value)}
          >
            <option value={ALL}>All vendors ({vendors.length})</option>
            {vendors.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow text-fg-muted">Year</span>
          <select
            className={selectClass}
            value={year}
            onChange={(e) => update(setYear)(e.target.value)}
          >
            <option value={ALL}>All years</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow text-fg-muted">Severity</span>
          <select
            className={selectClass}
            value={severity}
            onChange={(e) => update(setSeverity)(e.target.value)}
          >
            <option value={ALL}>All severities</option>
            {severities.map((s) => (
              <option key={s} value={s}>
                {severityLabel[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow text-fg-muted">Sort</span>
          <select
            className={selectClass}
            value={sort}
            onChange={(e) => update(setSort)(e.target.value as Sort)}
          >
            <option value="severity">Highest severity</option>
            <option value="newest">Newest first</option>
          </select>
        </label>
        <button
          type="button"
          onClick={reset}
          disabled={!isDirty}
          className={cn(
            "h-10 rounded-btn border border-border px-4 font-mono text-small text-fg-muted transition-colors hover:border-accent hover:text-fg",
            "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-fg-muted",
          )}
        >
          Reset
        </button>
        <p className="ml-auto font-mono text-small text-fg-muted" role="status" aria-live="polite">
          {filtered.length} / {cves.length} shown
        </p>
      </form>

      <div className="overflow-x-auto rounded-card border border-border bg-bg-elev">
        <table className="w-full min-w-[840px] text-left text-small">
          <thead className="eyebrow text-fg-muted">
            <tr className="border-b border-border">
              <th scope="col" className="px-5 py-3 font-normal">
                CVE
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Vendor / Platform
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Type
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Published
              </th>
              <th scope="col" className="px-5 py-3 text-right font-normal">
                Severity
              </th>
              <th scope="col" className="px-5 py-3 text-right font-normal">
                Record
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-fg-muted">
                  No advisories match these filters.
                </td>
              </tr>
            ) : (
              visible.map((cve) => (
                <tr
                  key={cve.id}
                  id={cve.id}
                  className={cn(
                    "scroll-mt-24 border-b border-border transition-colors last:border-b-0 hover:bg-bg-elev-2",
                    cve.id === highlightId && "bg-accent-dim",
                  )}
                >
                  <td className="px-5 py-4 font-mono whitespace-nowrap text-fg">{cve.id}</td>
                  <td className="max-w-[18rem] px-5 py-4 text-fg">
                    <span className="line-clamp-2" title={cve.platform}>
                      {cve.platform}
                    </span>
                  </td>
                  <td className="max-w-[22rem] px-5 py-4 text-fg-muted">
                    <span className="line-clamp-2" title={cve.title}>
                      {cve.title}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono whitespace-nowrap text-fg-muted">
                    {formatDate(cve.publishedAt)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Badge tone={cve.severity}>
                      {severityLabel[cve.severity]}
                      {cve.cvss !== undefined ? ` ${cve.cvss.toFixed(1)}` : ""}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <a
                      href={cveUrl(cve)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono whitespace-nowrap text-fg-muted transition-colors hover:text-accent"
                      aria-label={`${cve.source ? "Advisory" : "NVD"} record for ${cve.id} (opens in a new tab)`}
                    >
                      {cve.source ? "Advisory" : "NVD"}
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {remaining > 0 ? (
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="rounded-btn border border-border px-5 py-2.5 font-mono text-small text-fg transition-colors hover:border-accent hover:bg-bg-elev-2"
          >
            Show {Math.min(PAGE_SIZE, remaining)} more
          </button>
          <p className="font-mono text-[0.75rem] text-fg-muted">
            {visible.length} of {filtered.length} shown
          </p>
        </div>
      ) : null}
    </div>
  );
}
