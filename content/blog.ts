/**
 * Blog / research writing — ON-SITE articles.
 *
 * Each post is a full article rendered on our own site (`/blog/[slug]`). The bodies are original
 * write-ups authored by / for the Starfish team, grounded in public, verifiable facts (CVE records,
 * the founders' own published analyses, vendor advisories). We do not invent exploit specifics we
 * can't source; where a primary write-up exists it is credited under "References" at the end.
 *
 * Authors are linked to `content/team.ts` by handle.
 */
import { team } from "./team";
import type { Severity } from "./cves";

export type BlogTopic =
  | "CVE Analysis"
  | "AI & Security"
  | "Web Security"
  | "Reverse Engineering"
  | "Deserialization"
  | "WordPress";

/** A rendered article body is a list of typed blocks (no markdown engine needed). */
export type ContentBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "code"; lang?: string; code: string }
  | { kind: "callout"; tone?: "info" | "warn"; title?: string; text: string }
  | { kind: "quote"; text: string };

export interface Reference {
  label: string;
  href: string;
}

export interface BlogPost {
  /** Stable slug for `/blog/[slug]`. */
  slug: string;
  title: string;
  /** Team handle — links to the author in content/team.ts. */
  authorHandle: string;
  /** ISO date (YYYY-MM-DD). Only set when verified. */
  date?: string;
  topics: BlogTopic[];
  cve?: string;
  cvss?: number;
  severity?: Severity;
  language: "en" | "vi";
  /** Card + meta-description summary. */
  summary: string;
  readingTime?: string;
  featured?: boolean;
  /** The on-site article body. */
  body: ContentBlock[];
  /** Primary sources / further reading, shown at the end of the article. */
  references?: Reference[];
}

export const blogHeading = {
  title: "Research and writing from the people who find the bugs.",
  subtitle:
    "Deep-dive vulnerability analyses, weaponized proofs-of-concept, and security research, written by the Starfish founders. Grounded in the public record; sources credited.",
} as const;

export const blogPosts: BlogPost[] = [
  // ── Phuoc Pham (p3tl0v3r / Erik) ─────────────────────────────────────────
  {
    slug: "sitecore-cve-2025-53690",
    title: "Sitecore CVE-2025-53690: how a machine key from the docs became unauthenticated RCE",
    authorHandle: "p3tl0v3r",
    date: "2025-10-30",
    topics: ["CVE Analysis", "Deserialization", "Reverse Engineering"],
    cve: "CVE-2025-53690",
    cvss: 9.0,
    severity: "critical",
    language: "en",
    readingTime: "8 min",
    featured: true,
    summary:
      "A leaked ASP.NET machine key — copied straight from Sitecore's own deployment docs — lets attackers forge malicious ViewState and reach unauthenticated RCE. From ysoserial.net gadget selection to a fileless, in-memory RouteBase shell.",
    body: [
      {
        kind: "p",
        text: "Sitecore is an enterprise CMS and digital-experience platform that runs some very large sites. **CVE-2025-53690** is a CVSS 9.0, pre-authentication remote code execution in it — and the interesting part is the root cause: the vulnerability starts with a cryptographic key that was copied out of Sitecore's own documentation.",
      },
      { kind: "h2", text: "The root cause: a sample key that became a production key" },
      {
        kind: "p",
        text: "ASP.NET protects `ViewState` — the serialized control state round-tripped through hidden form fields — by signing and optionally encrypting it with a *machine key*. If you know the machine key, you can forge a `ViewState` blob that the server will accept as genuine and then deserialize.",
      },
      {
        kind: "p",
        text: "A Sitecore deployment guide from 2017 shipped an **example** `machineKey`. Plenty of real deployments pasted it in verbatim instead of generating their own, and the value eventually turned up in public GitHub wordlists. At that point the key is not a secret at all — it's a well-known constant that unlocks `ViewState` forgery against every site that reused it.",
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Documentation is a supply chain",
        text: "A sample credential in an official guide becomes a production credential the moment someone copies it. Treat every value in setup docs as a placeholder to replace, never to ship.",
      },
      { kind: "h2", text: "From a forged ViewState to code execution" },
      {
        kind: "ol",
        items: [
          "Recover the leaked machine key from documentation / public wordlists (Google dorking works).",
          "Stand up a vulnerable Sitecore instance in Docker to build and test the exploit safely.",
          "Generate a malicious `ViewState` with **ysoserial.net**, using the `TypeConfuseDelegate` gadget chain.",
          "POST the forged `ViewState` to an unauthenticated endpoint such as `/sitecore/blocked.aspx`.",
          "The server validates the signature (with the known key), deserializes the payload, and the gadget chain executes code.",
        ],
      },
      {
        kind: "p",
        text: "Gadget selection matters: across differing target dependencies, `TypeConfuseDelegate` proved more portable than `TextFormattingRunProperties`. Picking a chain whose types are actually present on the target is half the battle.",
      },
      { kind: "h2", text: "Going quiet: echoing output and a fileless shell" },
      {
        kind: "p",
        text: "Two refinements turn a proof-of-concept into a usable capability. The **echo technique** uses the `XamlAssemblyLoadFromFile` gadget to load a small assembly that writes command output back into HTTP response headers — so you get single-request command execution *and* confirmation.",
      },
      {
        kind: "p",
        text: "The **MemShell** goes further: it injects a custom `RouteBase` into the ASP.NET routing pipeline, so commands run through ordinary-looking HTTP requests with nothing written to disk. No web shell file means file-integrity monitoring has nothing to catch.",
      },
      { kind: "h2", text: "Takeaways" },
      {
        kind: "ul",
        items: [
          "Default and sample configuration values are a real supply-chain risk — rotate machine keys and never reuse documented samples.",
          "`ViewState` is an under-audited attack surface, and Sitecore exposes several unauthenticated endpoints that accept it.",
          "Memory-resident shells evade file-based detection — defenders need pipeline/routing and process telemetry, not just file monitoring.",
        ],
      },
    ],
    references: [
      {
        label: "Original analysis — eriklearningsec.com",
        href: "https://eriklearningsec.com/p/cve-2025-53690/",
      },
      {
        label: "Sitecore CVE-2025-53690 write-up — VNPT Cyber Immunity",
        href: "https://sec.vnpt.vn/2025/11/Sitecore-CVE-2025-53690-Detailed-Analysis-andamp-Weaponized-POC-Why-you-shouldnt-blindly-trust-the-documentation",
      },
      { label: "NVD — CVE-2025-53690", href: "https://nvd.nist.gov/vuln/detail/CVE-2025-53690" },
    ],
  },

  // ── An Ngo (ancorn_) ─────────────────────────────────────────────────────
  {
    slug: "ai-driven-whitebox-testing",
    title: "AI-driven code analysis: a field report on whitebox testing with an AI agent",
    authorHandle: "ancorn_",
    date: "2026-03-05",
    topics: ["AI & Security", "Web Security", "WordPress"],
    language: "en",
    readingTime: "6 min",
    featured: true,
    summary:
      "Whitebox testing is thorough but slow. Here's how structured guidance files and specialized skills turn an AI agent into a precision auditor — driven across a 224K-line WordPress plugin to rediscover a real object-injection bug, at pennies per audit.",
    body: [
      {
        kind: "p",
        text: "Whitebox penetration testing is the most thorough kind of testing and the most tedious. Reading tens of thousands of lines, tracing every source to every sink, drafting a working PoC — that grind is exactly what a well-directed AI agent can absorb. This is a field report on running a real whitebox audit with one.",
      },
      { kind: "h2", text: "Give the agent a map: AGENTS.md" },
      {
        kind: "p",
        text: "The difference between a generic chatbot and a precision auditor is context. An `AGENTS.md` at the repo root carries the pentest plan, project context, rules of engagement, tech stack and constraints. With that in place the model stops guessing about the target and starts reasoning inside its actual reality — which is also what keeps hallucination down.",
      },
      { kind: "h2", text: "Specialized skills instead of one giant prompt" },
      {
        kind: "p",
        text: "Rather than one mega-prompt, decompose the work into focused skills. A planning skill (`penetration-test-planner`) first emits a `WHITEBOX_PENTEST_PLAN.md`; execution skills such as `insecure-deserialization-checker` and `pentest-auth-bypass` then hunt specific bug classes against that plan.",
      },
      { kind: "h2", text: "Target: Essential Addons for Elementor (2M+ installs)" },
      {
        kind: "p",
        text: "The run targeted **Essential Addons for Elementor ≤ 5.9.13** — roughly **224,334 lines of code**, over two million active installs, and home to CVE-2024-3018 (PHP object injection). Driven across the whole codebase, the agent located the object-injection flaw and produced an accurate proof-of-concept.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "The economics change",
        text: 'High-quality discovery came in at pennies per audit. When deep whitebox review costs that little, the question shifts from "can we afford to look?" to "why wouldn\'t we?"',
      },
      { kind: "h2", text: "What it means" },
      {
        kind: "ul",
        items: [
          "Automation scales analysis across codebases no human reads end-to-end.",
          "Structured context — `AGENTS.md` plus scoped skills — is what turns a general model into a precise, low-hallucination auditor.",
          "The cost curve reshapes who can afford serious whitebox review, and how often.",
        ],
      },
    ],
    references: [
      {
        label: "Original post — ngothienan.github.io",
        href: "https://ngothienan.github.io/posts/ai-driven-code-analysis---the-future-of-whitebox-security-testing/",
      },
    ],
  },
  {
    slug: "cve-2024-24842-knowledge-base-poi",
    title: "CVE-2024-24842: unauthenticated PHP object injection via a WordPress cookie",
    authorHandle: "ancorn_",
    date: "2024-02-19",
    topics: ["CVE Analysis", "WordPress", "Deserialization"],
    cve: "CVE-2024-24842",
    cvss: 9.8,
    severity: "critical",
    language: "en",
    readingTime: "5 min",
    summary:
      "The article-view counter of a popular WordPress plugin ran an attacker-controlled cookie through maybe_unserialize() on an unauthenticated hook — a textbook object-injection sink. The bug, and why the fix had to be architectural.",
    body: [
      {
        kind: "p",
        text: "**CVE-2024-24842** is a CVSS 9.8 unauthenticated PHP object injection in the *Knowledge Base for Documentation, FAQs with AI Assistance* WordPress plugin (versions ≤ 11.30.2, 10,000+ active installs). It's a clean example of how one unsafe deserialize call opens the whole door.",
      },
      { kind: "h2", text: "The sink: maybe_unserialize() on a cookie" },
      {
        kind: "p",
        text: "The plugin's \"recently viewed\" feature calls `is_article_recently_viewed()`, which reads the `epkb_article_views_counter` cookie and passes it straight through `maybe_unserialize()` — a thin wrapper over PHP's `unserialize()`. Because the cookie is attacker-controlled, attacker-supplied serialized data becomes attacker-instantiated PHP objects.",
      },
      {
        kind: "code",
        lang: "php",
        code: "// simplified — the dangerous pattern\n$cookie = $_COOKIE['epkb_article_views_counter'] ?? '';\n$views  = maybe_unserialize( $cookie ); // untrusted input → object injection",
      },
      { kind: "h2", text: "Why it's unauthenticated" },
      {
        kind: "p",
        text: "The `epkb_count_article_view` action is registered with `wp_ajax_nopriv`, so any anonymous visitor can reach the vulnerable path. Given a suitable gadget chain in the surrounding WordPress environment, object injection escalates toward code execution or other high-impact outcomes — no login required.",
      },
      { kind: "h2", text: "The fix" },
      {
        kind: "p",
        text: 'Version 11.31.0 removed `unserialize()` entirely in favor of JSON parsing. That\'s the right call: you cannot safely "sanitize" input into `unserialize()`, so the only real fix is to stop feeding it untrusted data at all.',
      },
      { kind: "h2", text: "Takeaways" },
      {
        kind: "ul",
        items: [
          "Never pass untrusted input to `unserialize()` / `maybe_unserialize()` — use JSON for cookie and state data.",
          "`wp_ajax_nopriv` exposes handlers to anonymous users; audit every nopriv action as an unauthenticated entry point.",
          "Object injection is only as contained as the gadgets available — assume a chain exists.",
        ],
      },
    ],
    references: [
      {
        label: "Original PoC — ngothienan.github.io",
        href: "https://ngothienan.github.io/posts/poc--cve-2024-24842---unauthenticated-php-object-injection-in-plugin-knowledge-base/",
      },
      { label: "NVD — CVE-2024-24842", href: "https://nvd.nist.gov/vuln/detail/CVE-2024-24842" },
    ],
  },
  {
    slug: "cve-2020-7769-nodemailer-command-injection",
    title: "CVE-2020-7769: command injection in nodemailer's sendmail transport",
    authorHandle: "ancorn_",
    date: "2023-09-03",
    topics: ["CVE Analysis", "Web Security"],
    cve: "CVE-2020-7769",
    severity: "high",
    language: "en",
    readingTime: "4 min",
    summary:
      '"Just calling the local sendmail binary" is still command execution. How an unsanitized recipient field turns into argument injection — and, chained with prototype pollution, into RCE.',
    body: [
      {
        kind: "p",
        text: "**CVE-2020-7769** is a command-injection issue in **nodemailer**'s sendmail transport. It's a good reminder that handing user input to a local binary is command execution, whether or not a shell is involved.",
      },
      { kind: "h2", text: "Argument injection into sendmail" },
      {
        kind: "p",
        text: "When the sendmail transport is enabled, nodemailer invokes the `sendmail` binary and passes message fields as process arguments. The recipient (`to`) field is passed without neutralizing option-like input, so a value that begins with `-` is interpreted by `sendmail` as a **flag** rather than an address.",
      },
      { kind: "h2", text: "From flag injection to file write — and beyond" },
      {
        kind: "p",
        text: "Sendmail flags such as `-D` let an attacker write files to arbitrary paths; the fact that the transport's path and args are configurable widens the surface further. Chained with a prototype-pollution primitive in the surrounding Node.js application, this argument injection can be escalated toward remote code execution.",
      },
      { kind: "h2", text: "Takeaways" },
      {
        kind: "ul",
        items: [
          "Passing user input as process arguments IS command execution — validate and escape, or better, don't.",
          "Prefer APIs that separate the command from its data instead of building argument lists from user input.",
          'Treat every email field as untrusted; recipients are not "safe" strings.',
        ],
      },
    ],
    references: [
      {
        label: "Original PoC — ngothienan.github.io",
        href: "https://ngothienan.github.io/posts/poc-cve-2020-7769---command-injection-in-nodemailer/",
      },
      { label: "NVD — CVE-2020-7769", href: "https://nvd.nist.gov/vuln/detail/CVE-2020-7769" },
    ],
  },

  // ── Dau Hoang Tai (taidh) ────────────────────────────────────────────────
  {
    slug: "ai-assisted-mitel-micollab",
    title: "Reversing Mitel MiCollab with an AI agent: Claude over MCP + JADX + IDA Pro",
    authorHandle: "taidh",
    date: "2026-06-30",
    topics: ["AI & Security", "Reverse Engineering", "CVE Analysis"],
    language: "en",
    readingTime: "10 min",
    featured: true,
    summary:
      "MiCollab's request path crosses Java, SOAP, CGI binaries and SQL — four trust boundaries. A field report on reversing it with Claude wired to real RE tooling, and the unauthenticated command injection, SQLi and auth bypass it surfaced.",
    body: [
      {
        kind: "p",
        text: "Mitel MiCollab is a unified-communications platform, and its codebase is a stack of eras: Java servlets, a SOAP layer, native CGI binaries, and a SQL backend. That layering is exactly where bugs hide. This is a field report on reversing it with an AI agent wired to real reverse-engineering tools.",
      },
      { kind: "h2", text: "The rig: Claude over MCP + JADX + IDA Pro" },
      {
        kind: "p",
        text: "The analysis connected **Claude** to **JADX** (Java decompiler) and **IDA Pro** (binary analysis) through the **Model Context Protocol**. That let the agent pivot between decompiled Java, native CGI binaries and the SOAP layer in one loop while a human steered — no constant copy-pasting between tools.",
      },
      { kind: "h2", text: "A request that crosses four runtimes" },
      {
        kind: "p",
        text: "A single MiCollab request travels a long way: `HTTP → Java servlet / DWR → SOAP → UDP backend → CGI executable or PostgreSQL`. Every hop is a trust boundary, and sanitization missing at any one of them cascades downstream.",
      },
      { kind: "h2", text: "The findings" },
      {
        kind: "ul",
        items: [
          "**Unauthenticated command injection (MTLVULN-1631):** a DWR-exposed method, `RecordingUtils.installRecordingFile()`, passes an unsanitized path to `soapserver.cgi`, which concatenates it into a shell `system()` call.",
          "**SQL injection:** sinks in `DataManager` build queries by string concatenation instead of parameterized queries, reachable via the unauthenticated `conf_setUserJoinInfo` SOAP operation.",
          "**Authentication bypass:** `redirectIfNotLoggedIn()` effectively returns false, so pages that should be gated aren't.",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Watch your DWR",
        text: "Direct Web Remoting exposes public Java methods to the web unless you set access rules. It's a recurring foot-gun: a method never meant to face the internet ends up one HTTP call away.",
      },
      { kind: "h2", text: "Takeaways" },
      {
        kind: "ul",
        items: [
          "AI-assisted RE removes the context-switching grind so the human focuses on the actual vulnerability, not tool plumbing.",
          "Multi-runtime architectures multiply trust boundaries — one missing check anywhere in the chain is enough.",
          'Frameworks like DWR need explicit allow-lists; "exposed by default" is how methods leak.',
        ],
      },
    ],
    references: [
      {
        label: "Original analysis — VNPT Cyber Immunity",
        href: "https://sec.vnpt.vn/tin-tuc/blog/AI-Assisted-Mitel-CVE-Analysis-Claude-MCP-JADX-andamp-IDA-Pro",
      },
    ],
  },
  {
    slug: "moveit-cve-2023-34362",
    title: "The MOVEit Transfer chain (CVE-2023-34362 / CVE-2023-35036), layer by layer",
    authorHandle: "taidh",
    date: "2023-06-19",
    topics: ["CVE Analysis", "Web Security", "Deserialization"],
    cve: "CVE-2023-34362",
    cvss: 9.8,
    severity: "critical",
    language: "vi",
    readingTime: "8 min",
    summary:
      "The MOVEit Transfer chain drove one of 2023's largest mass-exploitation waves. Two SQL-injection roots, an SSRF to bypass localhost checks, and unsafe .NET deserialization on upload — composed into full RCE.",
    body: [
      {
        kind: "p",
        text: "The **MOVEit Transfer** chain (CVE-2023-34362 / CVE-2023-35036) powered one of 2023's largest mass-exploitation campaigns against a managed-file-transfer product. It's worth walking layer by layer, because no single bug does the damage — the *composition* does.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Note",
        text: "The original deep-dive is written in Vietnamese. This is an English summary of that analysis.",
      },
      { kind: "h2", text: "Two SQL-injection roots" },
      {
        kind: "ul",
        items: [
          "**CVE-2023-34362:** input validation was removed from `UserGetUsersWithEmailAddress()`, opening SQL injection through a guest-accessible endpoint.",
          "**CVE-2023-35036:** insufficient sanitization in `FolderIDToPath()` and in certificate CN handling enables SQLi via crafted headers and client certificates.",
        ],
      },
      { kind: "h2", text: "The full kill chain" },
      {
        kind: "ol",
        items: [
          "Bypass localhost restrictions with an SSRF via ISAPI-extension header injection.",
          "Set malicious session variables through `SetAllSessionVarsFromHeaders`.",
          "Use SQL injection to create an admin account and whitelist the attacker's IP.",
          "Authenticate as that admin and upload a file carrying a serialized payload.",
          "Trigger unsafe .NET deserialization during file processing → remote code execution.",
        ],
      },
      { kind: "h2", text: "Takeaways" },
      {
        kind: "ul",
        items: [
          "Several small validation gaps compose into full compromise — threat-model the chain, not just each bug.",
          "SQL injection plus unsafe deserialization is a classic RCE pairing worth hunting together.",
          "Patch to 15.0.2+ and treat managed-file-transfer software as a high-value, internet-facing target.",
        ],
      },
    ],
    references: [
      { label: "Original analysis — HackMD (@taidh)", href: "https://hackmd.io/@taidh/rJH4zPuvh" },
      { label: "NVD — CVE-2023-34362", href: "https://nvd.nist.gov/vuln/detail/CVE-2023-34362" },
    ],
  },
  {
    slug: "confluence-cve-2022-26134",
    title: "CVE-2022-26134: OGNL injection to pre-auth RCE in Atlassian Confluence",
    authorHandle: "taidh",
    date: "2022-06-05",
    topics: ["CVE Analysis", "Web Security"],
    cve: "CVE-2022-26134",
    cvss: 9.8,
    severity: "critical",
    language: "vi",
    readingTime: "5 min",
    summary:
      "An unauthenticated OGNL expression-injection in Confluence Server and Data Center — exploited as a zero-day in June 2022 — turned a single crafted request into arbitrary Java execution.",
    body: [
      {
        kind: "p",
        text: "**CVE-2022-26134** was an unauthenticated OGNL injection in **Atlassian Confluence Server and Data Center**, exploited as a zero-day in June 2022 and rated CVSS 9.8. It became an immediate mass-exploitation event and a CISA emergency directive.",
      },
      { kind: "h2", text: "OGNL injection = arbitrary Java" },
      {
        kind: "p",
        text: "Confluence evaluates certain request input as **OGNL** (Object-Graph Navigation Language) expressions. Because that input reaches the expression evaluator without adequate restriction, an unauthenticated attacker can inject an expression that executes arbitrary Java — i.e. pre-authentication remote code execution, typically demonstrated with a single crafted request against a vulnerable URI.",
      },
      { kind: "h2", text: "Why it mattered so much" },
      {
        kind: "p",
        text: "Confluence is widely deployed and frequently internet-facing. A reliable, unauthenticated, single-request RCE against it is close to a worst case — which is exactly why exploitation was near-instant and widespread once details emerged.",
      },
      { kind: "h2", text: "Takeaways" },
      {
        kind: "ul",
        items: [
          "Evaluating expression languages (OGNL, SpEL, EL) on user input is dangerous by default — never let untrusted data reach an evaluator.",
          "Internet-facing collaboration software needs rapid patch SLAs and virtual-patching options.",
          "Assume public RCEs in popular software are exploited within hours; detection and patching speed is the control that matters.",
        ],
      },
    ],
    references: [
      { label: "Original analysis — HackMD (@taidh)", href: "https://hackmd.io/@taidh/B1fi5nLK5" },
      { label: "NVD — CVE-2022-26134", href: "https://nvd.nist.gov/vuln/detail/CVE-2022-26134" },
    ],
  },
  {
    slug: "parse-server-cve-2022-39396",
    title: "CVE-2022-39396: prototype pollution to RCE in Parse Server",
    authorHandle: "taidh",
    topics: ["CVE Analysis", "Web Security"],
    cve: "CVE-2022-39396",
    severity: "critical",
    language: "vi",
    readingTime: "5 min",
    summary:
      'Prototype pollution is rarely "just" a denial of service. In Parse Server, the primitive is chained — via a gadget in the request-handling path — all the way to unauthenticated remote code execution.',
    body: [
      {
        kind: "p",
        text: "**CVE-2022-39396** is an unauthenticated remote code execution in **Parse Server** that starts from a prototype-pollution primitive. It's a clean demonstration that prototype pollution is rarely the endgame — it's the first link in a chain.",
      },
      { kind: "h2", text: "From prototype pollution to RCE" },
      {
        kind: "p",
        text: "Prototype pollution lets an attacker set properties on `Object.prototype` that later code implicitly trusts. In Parse Server's query and request-processing pipeline, that primitive can be chained — via a suitable gadget in the handling path — into full code execution, without authentication. The analysis walks the gadget hunt from the pollution sink to the final exploit.",
      },
      { kind: "h2", text: "Takeaways" },
      {
        kind: "ul",
        items: [
          "Prototype pollution plus the right gadget is RCE, not a curiosity — treat it as high severity.",
          "Validate and null-prototype untrusted objects; reject `__proto__` / `constructor` keys at the boundary.",
          "Keep backend frameworks patched; pollution gadgets often live in dependencies, not your own code.",
        ],
      },
    ],
    references: [
      { label: "Original analysis — HackMD (@taidh)", href: "https://hackmd.io/@taidh/HJTRr83Lo" },
      { label: "NVD — CVE-2022-39396", href: "https://nvd.nist.gov/vuln/detail/CVE-2022-39396" },
    ],
  },
  {
    slug: "wso2-cve-2022-29464",
    title: "CVE-2022-29464: unauthenticated file upload to RCE across WSO2 products",
    authorHandle: "taidh",
    topics: ["CVE Analysis", "Web Security"],
    cve: "CVE-2022-29464",
    cvss: 9.8,
    severity: "critical",
    language: "vi",
    readingTime: "4 min",
    summary:
      "A flaw in file-upload handling lets an unauthenticated attacker drop an executable web shell into a web-accessible directory across several WSO2 products — request it, and you have remote code execution.",
    body: [
      {
        kind: "p",
        text: '**CVE-2022-29464** is an unauthenticated arbitrary file upload affecting multiple **WSO2** products (API Manager, Identity Server and others), rated CVSS 9.8. It\'s the shortest possible path from "no access" to "full server control."',
      },
      { kind: "h2", text: "Upload a shell, get RCE" },
      {
        kind: "p",
        text: "A flaw in file-upload handling lets an unauthenticated attacker write a file of their choosing — including an executable web shell (e.g. a JSP) — into a web-accessible directory. Once the shell is on disk under the web root, simply requesting it executes it, yielding remote code execution on the server.",
      },
      { kind: "h2", text: "Takeaways" },
      {
        kind: "ul",
        items: [
          "Validate upload type, extension and destination server-side — never trust the client.",
          "Never store uploads inside an executable web root; keep them outside the served path.",
          "WSO2 operators should confirm they're on a patched version and hunt for shells dropped before patching.",
        ],
      },
    ],
    references: [
      { label: "Original analysis — HackMD (@taidh)", href: "https://hackmd.io/@taidh/rJlXEQaC4q" },
      { label: "NVD — CVE-2022-29464", href: "https://nvd.nist.gov/vuln/detail/CVE-2022-29464" },
    ],
  },
];

/** Author display name for a handle (falls back to the handle). */
export function authorName(handle: string): string {
  return team.find((m) => m.handle === handle)?.name ?? handle;
}

/** LinkedIn (or other) profile link for an author handle, if known. */
export function authorLink(handle: string): string | undefined {
  return team.find((m) => m.handle === handle)?.linkedin;
}

/** Author role (from the team data), if known. */
export function authorRole(handle: string): string | undefined {
  return team.find((m) => m.handle === handle)?.role;
}

/** Posts by a given author handle, sorted. */
export function postsByAuthor(handle: string): BlogPost[] {
  return sortPosts(blogPosts.filter((p) => p.authorHandle === handle));
}

/** Look up a single post by slug. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Every topic present across the posts, in a stable, curated order. */
export const allTopics: BlogTopic[] = [
  "CVE Analysis",
  "AI & Security",
  "Reverse Engineering",
  "Web Security",
  "Deserialization",
  "WordPress",
];

/** Sort: featured first, then by date (undated last), then title. */
export function sortPosts(list: BlogPost[]): BlogPost[] {
  return [...list].sort((a, b) => {
    if (!!b.featured !== !!a.featured) return a.featured ? -1 : 1;
    const da = a.date ?? "";
    const db = b.date ?? "";
    if (da !== db) return db.localeCompare(da);
    return a.title.localeCompare(b.title);
  });
}

export const sortedPosts: BlogPost[] = sortPosts(blogPosts);
