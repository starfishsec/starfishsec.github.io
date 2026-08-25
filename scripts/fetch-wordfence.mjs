/**
 * Scrapes a public Wordfence Intelligence researcher page (all pagination pages) into JSON.
 *
 *   npm i -D playwright            # one-off; uses your locally installed Chrome (channel "chrome")
 *   node scripts/fetch-wordfence.mjs <researcher-slug> data/wordfence/<researcher-slug>.json
 *   node scripts/import-wordfence.mjs   # then regenerate content/cves.data.ts
 *
 * Example slug: ngo-thien-an-ancorn
 */
import { chromium } from "playwright";
import { writeFileSync } from "fs";
const slug = process.argv[2]; const out = process.argv[3];
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1400, height: 1000 } });
const rows = [];
for (let page = 1; page <= 20; page++) {
  await p.goto(`https://www.wordfence.com/threat-intel/vulnerabilities/researchers/${slug}?page=${page}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForSelector("table tbody tr", { timeout: 20000 }).catch(() => {});
  const got = await p.$$eval("table tbody tr", (trs) => trs.map((tr) => {
    const td = Array.from(tr.querySelectorAll("td")).map((c) => c.innerText.trim());
    const a = tr.querySelector("a"); return { title: td[0], cve: td[1], cvss: td[2], vector: td[3], date: td[4], href: a ? a.href : "" };
  }));
  const summary = await p.evaluate(() => (document.body.innerText.match(/Showing [^\n]+/) || [""])[0]);
  console.error(`page ${page}: ${got.length} rows | ${summary}`);
  if (!got.length) break;
  rows.push(...got);
  const m = summary.match(/of (\d+)/); if (m && rows.length >= Number(m[1])) break;
}
await b.close();
writeFileSync(out, JSON.stringify(rows, null, 1));
console.log("total rows:", rows.length);
