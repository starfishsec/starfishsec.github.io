"use client";

import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import {
  cveUrl,
  cveYear,
  severityLabel,
  type Cve,
  type Severity,
} from "@/content/cves";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

const ALL = "all";
const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium", "low"];

interface CveTableProps {
  cves: Cve[];
}

const selectClass =
  "h-10 rounded-btn border border-border bg-bg-elev px-3 font-mono text-small text-fg " +
  "transition-colors hover:border-fg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function CveTable({ cves }: CveTableProps) {
  const [vendor, setVendor] = useState<string>(ALL);
  const [year, setYear] = useState<string>(ALL);
  const [severity, setSeverity] = useState<string>(ALL);

  const vendors = useMemo(
    () => Array.from(new Set(cves.map((c) => c.platform))).sort((a, b) => a.localeCompare(b)),
    [cves],
  );
  const years = useMemo(
    () => Array.from(new Set(cves.map(cveYear))).sort((a, b) => b - a),
    [cves],
  );
  const severities = useMemo(
    () => SEVERITY_ORDER.filter((s) => cves.some((c) => c.severity === s)),
    [cves],
  );

  const filtered = useMemo(
    () =>
      cves.filter(
        (c) =>
          (vendor === ALL || c.platform === vendor) &&
          (year === ALL || String(cveYear(c)) === year) &&
          (severity === ALL || c.severity === severity),
      ),
    [cves, vendor, year, severity],
  );

  const reset = () => {
    setVendor(ALL);
    setYear(ALL);
    setSeverity(ALL);
  };
  const isFiltered = vendor !== ALL || year !== ALL || severity !== ALL;

  return (
    <div className="flex flex-col gap-6">
      <form
        className="flex flex-wrap items-end gap-4"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Filter advisories"
      >
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow text-fg-muted">Vendor</span>
          <select className={selectClass} value={vendor} onChange={(e) => setVendor(e.target.value)}>
            <option value={ALL}>All vendors</option>
            {vendors.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow text-fg-muted">Year</span>
          <select className={selectClass} value={year} onChange={(e) => setYear(e.target.value)}>
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
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value={ALL}>All severities</option>
            {severities.map((s) => (
              <option key={s} value={s}>
                {severityLabel[s]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={reset}
          disabled={!isFiltered}
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
        <table className="w-full min-w-[720px] text-left text-small">
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
                Year
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
              filtered.map((cve) => (
                <tr
                  key={cve.id}
                  id={cve.id}
                  className="scroll-mt-24 border-b border-border transition-colors last:border-b-0 hover:bg-bg-elev-2 target:bg-accent-dim"
                >
                  <td className="px-5 py-4 font-mono text-fg">{cve.id}</td>
                  <td className="px-5 py-4 text-fg">{cve.platform}</td>
                  <td className="px-5 py-4 text-fg-muted">{cve.title}</td>
                  <td className="px-5 py-4 font-mono text-fg-muted">{cveYear(cve)}</td>
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
                      className="inline-flex items-center gap-1 font-mono text-fg-muted transition-colors hover:text-accent"
                      aria-label={`${cve.id} on NVD (opens in a new tab)`}
                    >
                      NVD
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
