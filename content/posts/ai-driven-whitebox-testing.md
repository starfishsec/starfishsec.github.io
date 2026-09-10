---
title: "AI-driven code analysis: a field report on whitebox testing with an AI agent"
authorHandle: "ancorn_"
date: "2026-03-05"
topics: ["AI & Security", "Web Security", "WordPress"]
language: "en"
summary: "Whitebox testing is thorough but slow. Here's how structured guidance files and specialized skills turn an AI agent into a precision auditor — driven across a 224K-line WordPress plugin to rediscover a real object-injection bug, at pennies per audit."
readingTime: "6 min"
featured: true
references:
  - label: "Original post — ngothienan.github.io"
    href: "https://ngothienan.github.io/posts/ai-driven-code-analysis---the-future-of-whitebox-security-testing/"
---

Whitebox penetration testing is the most thorough kind of testing and the most tedious. Reading tens of thousands of lines, tracing every source to every sink, drafting a working PoC — that grind is exactly what a well-directed AI agent can absorb. This is a field report on running a real whitebox audit with one.

## Give the agent a map: AGENTS.md

The difference between a generic chatbot and a precision auditor is context. An `AGENTS.md` at the repo root carries the pentest plan, project context, rules of engagement, tech stack and constraints. With that in place the model stops guessing about the target and starts reasoning inside its actual reality — which is also what keeps hallucination down.

## Specialized skills instead of one giant prompt

Rather than one mega-prompt, decompose the work into focused skills. A planning skill (`penetration-test-planner`) first emits a `WHITEBOX_PENTEST_PLAN.md`; execution skills such as `insecure-deserialization-checker` and `pentest-auth-bypass` then hunt specific bug classes against that plan.

## Target: Essential Addons for Elementor (2M+ installs)

The run targeted **Essential Addons for Elementor ≤ 5.9.13** — roughly **224,334 lines of code**, over two million active installs, and home to CVE-2024-3018 (PHP object injection). Driven across the whole codebase, the agent located the object-injection flaw and produced an accurate proof-of-concept.

> [!INFO] The economics change
> High-quality discovery came in at pennies per audit. When deep whitebox review costs that little, the question shifts from "can we afford to look?" to "why wouldn't we?"

## What it means

- Automation scales analysis across codebases no human reads end-to-end.
- Structured context — `AGENTS.md` plus scoped skills — is what turns a general model into a precise, low-hallucination auditor.
- The cost curve reshapes who can afford serious whitebox review, and how often.
