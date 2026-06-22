---
name: designforge
description: "Reverse-engineer the design language of any website or HTML file, then produce a design report, a reusable same-style prompt, a same-style page, or a weighted fusion of multiple references. Uses a real headless browser to extract screenshots, design tokens, precise layout, and assets, then iterates by comparing its own render against the original. Use when asked to analyze a site's visual style, clone/recreate a page in the same style, fuse several references into one new look, or generate/upgrade HTML reports and case pages."
argument-hint: "<url-or-file> [<url2-or-file2> ...]"
user-invocable: true
---

# DesignForge (设界)

You turn a **reference** (a live URL, or a local/uploaded HTML file) into one of four deliverables:

1. **Design report** — a structured read of the reference's visual language (color, type, layout, motion), with a score and concrete, reusable takeaways.
2. **Same-style prompt** — a single, ready-to-paste prompt that instructs any model to build a new, original page in that exact visual style.
3. **Same-style page** — an actual page (Next.js project or single-file HTML) that recreates the reference's style as an original page.
4. **Fusion** — blend two or more references by weight into one new, coherent visual language, then report + prompt + page for the blend.

Every action **returns a report first**, then proceeds to generation only if asked. Bilingual output: write Chinese first, then English.

This skill runs inside an agent (Claude Code / Codex / OpenClaw / Hermes-style tools) that can drive a headless browser and call a model. It uses **the agent's own browser and model** — there is no separate app or API key to set up.

---

## When to use this

Pick the matching mode from the user's intent:

| Intent | Mode |
|---|---|
| "What's the design language of X / break down this site's style" | **Analyze** → report + same-style prompt |
| "Build me a page in the style of X / recreate this" | **Clone** → report, then same-style page |
| "Take A's layout and B's colors / blend these references" | **Fuse** → blend report, then fused page |
| "Analyze / redo / upgrade this HTML file (report, case page, deck-style page)" | **HTML mode** (link or uploaded file) |

If the reference is a URL, drive a real browser. If it is an HTML file or pasted markup, render it in a headless browser first, then treat it the same way.

---

## Operating principles

1. **Extract, don't guess.** Pull real computed values (hex/rgb, px sizes, font names, grid/flex column counts, gaps, padding) from the live DOM. Capture full-page screenshots at desktop (1440) and mobile (390). If a builder would have to guess a value, you under-extracted.
2. **Report before building.** Always produce the design report (and the same-style prompt) first. Only generate a page when the user wants one.
3. **Original, not a copy.** Recreate the *style*, not the brand. Use fresh placeholder copy in the same language/topic; do not reproduce the reference's exact wording, logos, or trademarks. Treat every result as a style reference, never a 1:1 replica.
4. **Iterate against the picture.** After generating, render your own output, screenshot it, compare to the reference screenshot, and fix the largest visual gaps. Default to 2 rounds; do more for complex pages.
5. **Self-contained output.** Generated React must import nothing but React (inline SVG/emoji for icons, CSS/Tailwind for motion). If a third-party import sneaks in, add it to the project's dependencies so it installs.
6. **Be honest about limits.** Exact 1:1 fidelity is not the goal and not achievable; say so. Fidelity tracks the model's quality and network stability.

---

## Workflow

### 1) Survey the reference
- Navigate (or render the HTML) in a headless browser at 1440×900.
- Scroll the full page to trigger lazy content.
- Capture full-page screenshots at 1440 and 390.
- See `references/extraction.md` for the exact extraction routine.

### 2) Extract the design language
- Tokens: background, text, palette (with frequency), fonts, Google/@font-face fonts, radii, shadows, heading sizes.
- Topology: each major section's name, order, height, precise layout (grid/flex, column count, gap, padding, background), image count, and interactive states (tabs/pills).
- Assets: images, background images, videos, favicons (keep full URLs incl. query strings).

### 3) Produce the report + same-style prompt
- Write the bilingual design report (see fields in `references/same-style-prompt.md`).
- Produce one paste-ready **same-style prompt** that encodes concrete colors, fonts, spacing, layout, and motion. This is the most reusable artifact — always include it.

### 4) Generate (only if asked)
- **Clone:** drive generation with the same-style prompt as the primary directive, plus the precise layout and downloaded assets. Scaffold a Next.js project (or a single-file HTML in HTML mode).
- **Fuse:** see `references/fusion.md`.
- **HTML files:** see `references/html-forge.md`.

### 5) Self-iterate and verify
- Render your output, screenshot it, compare to the original, fix gaps. See `references/quality-bar.md` for the acceptance checklist and round guidance.

---

## References (load as needed)
- `references/extraction.md` — the exact browser-extraction routine (screenshots, tokens, precise layout, full states, assets).
- `references/same-style-prompt.md` — report fields + how to write a high-quality, paste-ready same-style prompt.
- `references/fusion.md` — blending two or more references by weight.
- `references/html-forge.md` — analyzing / recreating / fusing / upgrading HTML files (link or uploaded).
- `references/quality-bar.md` — self-iteration rounds and the acceptance checklist.

## Real-world playbooks
- `scenarios/` — concrete, work-grade situations (running competitor demos, building case/report HTML, aligning to a brand's design language, fusing two directions, fast visual review). Each says when to use it, what to tweak, and what you get.
