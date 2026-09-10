---
title: "Reversing Mitel MiCollab with an AI agent: Claude over MCP + JADX + IDA Pro"
authorHandle: "taidh"
date: "2026-06-30"
topics: ["AI & Security", "Reverse Engineering", "CVE Analysis"]
language: "en"
summary: "MiCollab's request path crosses Java, SOAP, CGI binaries and SQL — four trust boundaries. A field report on reversing it with Claude wired to real RE tooling, and the unauthenticated command injection, SQLi and auth bypass it surfaced."
readingTime: "10 min"
featured: true
references:
  - label: "Original analysis — VNPT Cyber Immunity"
    href: "https://sec.vnpt.vn/tin-tuc/blog/AI-Assisted-Mitel-CVE-Analysis-Claude-MCP-JADX-andamp-IDA-Pro"
---

Mitel MiCollab is a unified-communications platform, and its codebase is a stack of eras: Java servlets, a SOAP layer, native CGI binaries, and a SQL backend. That layering is exactly where bugs hide. This is a field report on reversing it with an AI agent wired to real reverse-engineering tools.

## The rig: Claude over MCP + JADX + IDA Pro

The analysis connected **Claude** to **JADX** (Java decompiler) and **IDA Pro** (binary analysis) through the **Model Context Protocol**. That let the agent pivot between decompiled Java, native CGI binaries and the SOAP layer in one loop while a human steered — no constant copy-pasting between tools.

## A request that crosses four runtimes

A single MiCollab request travels a long way: `HTTP → Java servlet / DWR → SOAP → UDP backend → CGI executable or PostgreSQL`. Every hop is a trust boundary, and sanitization missing at any one of them cascades downstream.

## The findings

- **Unauthenticated command injection (MTLVULN-1631):** a DWR-exposed method, `RecordingUtils.installRecordingFile()`, passes an unsanitized path to `soapserver.cgi`, which concatenates it into a shell `system()` call.
- **SQL injection:** sinks in `DataManager` build queries by string concatenation instead of parameterized queries, reachable via the unauthenticated `conf_setUserJoinInfo` SOAP operation.
- **Authentication bypass:** `redirectIfNotLoggedIn()` effectively returns false, so pages that should be gated aren't.

> [!INFO] Watch your DWR
> Direct Web Remoting exposes public Java methods to the web unless you set access rules. It's a recurring foot-gun: a method never meant to face the internet ends up one HTTP call away.

## Takeaways

- AI-assisted RE removes the context-switching grind so the human focuses on the actual vulnerability, not tool plumbing.
- Multi-runtime architectures multiply trust boundaries — one missing check anywhere in the chain is enough.
- Frameworks like DWR need explicit allow-lists; "exposed by default" is how methods leak.
