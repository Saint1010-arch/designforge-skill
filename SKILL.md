---
name: designforge
description: "Capture the visual design language of any reference — a live website (URL) or an HTML file (linked, uploaded, or pasted) — and turn it into one of four things: a structured design read, a reusable build prompt, a faithful same-style page, or a weighted blend of several references. Works by opening the reference in a real headless browser, pulling exact computed styles, screenshots, and assets, rebuilding section by section, and correcting each part against the captured screenshot. Use when someone wants to understand, recreate, blend, or upgrade the look of a site or an HTML document."
argument-hint: "<url-or-html-file> [more refs...]"
user-invocable: true
---

# DesignForge

DesignForge reads a **reference** and reproduces its *design language* — not its brand. A reference is either a **live URL** or an **HTML file** (a link to one, an uploaded/local file, or pasted markup). Both kinds run through the same pipeline; only the way the reference is opened differs.

From any reference you can produce four things:

- **Read** — a structured breakdown of the visual language (color, type, spacing, layout, motion) with concrete, reusable findings.
- **Build prompt** — a single paste-ready prompt that tells any model how to build a new, original page in that style.
- **Same-style page** — a real, working page that recreates the style with fresh placeholder content. Default output is a Next.js project; HTML mode can emit a single self-contained .html.
- **Blend** — combine two or more references by weight into one new, coherent look, then read + prompt + page for the blend.

This is not a one-shot generator. Fidelity comes from **extracting real values and rebuilding piece by piece against the actual screenshot** — the same loop whether the reference is a website or an HTML file.

---

## Start here: greet, check, then ask

When invoked with nothing specific, do these in order before any real work.

**1 — Environment check (one line).** Confirm the tools this needs and report briefly:
- *Browser control* — a way to drive a real headless browser (Playwright / Browser MCP / Chrome MCP, or a built-in browser). Required for extraction and screenshots. If missing, name the single step to enable it (see *Running on Codex* below) and continue.
- *A coding model* — to write the report and the page. Use whatever the host agent already has.
- *Vision* — optional but better; lets the iteration loop compare renders visually. Without it, fall back to structural comparison and say so.

**2 — Short intro.** Tell the user, in plain terms, what you can do and how to ask for it. Keep it tight:

> DesignForge here. Give me a website URL or an HTML file and I can: read its design language, hand you a reusable build prompt, build a same-style page, or blend several references by weight. I always show a read first, then build only if you want. What do you want to start with — and what's the reference?

Then wait for their answer. Match the user's language; don't force any particular one.

---

## Keep the conversation moving (ask, don't dump commands)

Be proactive about the obvious next step, and **offer to do it for them** rather than handing over a command line:

- If they ask for a **page**, when the read is ready also ask: *want the reusable build prompt too?*
- If they ask for a **prompt**, when it's ready ask: *want me to actually build the page from it?*
- When a **page is done**, ask how they want to see it — offer, in order: *I can start a local preview and give you a click-to-open link*, *export a self-contained version you can just open*, or *deploy it and hand you a live URL*.
- Prefer doing the run/preview/deploy yourself. Only show raw commands if the user asks for them or the environment can't do it automatically.

Always show the read before building. Recreate the *style*, never copy the brand, wording, logos, or trademarks.

---

## Pick the mode

| The user wants… | Mode |
|---|---|
| to understand a site/HTML's look | **Read** → breakdown + build prompt |
| a page in that style | **Same-style** → read, then build |
| a mix of A's layout and B's color, etc. | **Blend** → blend read, then build |
| to analyze / redo / upgrade / combine HTML files | **HTML mode** (link, upload, or paste) |

---

## How a reference is opened (URL vs HTML — the only fork)

- **URL:** navigate to it in the headless browser.
- **HTML file or pasted markup:** load it locally — open via `file://`, or set the page content directly. If the markup is a fragment (no `<html>`/`<body>`), wrap it in a minimal document first. If it references relative images/CSS/fonts, serve from the file's own folder (or a tiny static server) so nothing renders blank.

**After the reference is open, everything below is identical for both kinds.** Read, same-style, and blend all share one pipeline; only this open step branches.

---

## The pipeline

### Stage A — Survey
- Open the reference. Set the viewport to 1440×900 and take a full-page screenshot; repeat at 390 wide for mobile. Save the images.
- Slow-scroll the whole page to trigger lazy content, then return to top.
- Pull the global layer first: fonts (link tags, @font-face, computed families/weights), the real color palette with rough frequency, radii, shadows, heading scale, favicons/meta, and any site-wide tricks (custom scrollbars, scroll-snap, global keyframes, smooth-scroll libs).

### Stage B — Behavior pass
Before rebuilding anything, walk the page once to catalog what *moves*:
- Scroll slowly and note header changes, scroll-triggered reveals, auto-switching indicators, snap points.
- Exercise every interactive element: click each tab/pill and capture content per state (wait for transitions to finish before reading — frameworks fade over ~300–500ms, so wait ~1.2s and confirm the title changed); open dropdowns, accordions, modals; step through every carousel slide; hover the things that react. Record trigger, before/after values, and timing for each.

### Stage C — Topology
List every distinct section top to bottom with a working name, its real layout (grid/flex, column count, gaps, padding, background), its interaction model (static / click / scroll / hover / time-driven), and which assets belong to it. Decide the interaction model by **scrolling before clicking** — building click-tabs for a scroll-driven section is the most expensive mistake here.

### Stage D — Foundation (do this yourself, in order)
1. Set fonts to match. 2. Write the extracted color tokens, spacing, and global keyframes into global CSS. 3. Define types for the content shapes you saw. 4. Pull inline SVGs out as named icon components. 5. Download every asset — images (incl. background and pseudo-element images, and layered/overlay images), videos, fonts, favicons — keeping **full URLs with query strings** (CDN tokens live there). 6. Verify the project builds before going further.

### Stage E — Build, section by section
For each section, top to bottom: **extract → spec → build → verify.**
- *Extract* the section's real computed styles for every element (exact px/hex/weights, grid/flex, transitions, transforms) plus its per-state content. Don't estimate — read `getComputedStyle`.
- *Spec* it: write a self-contained brief for that section — DOM shape, exact styles, interaction model, every state's content, assets, verbatim text, and responsive changes at 1440/768/390. The brief must stand alone (no "go read another file").
- *Build* it against the section screenshot. Keep generated React importing only React (inline SVG/emoji for icons; CSS/Tailwind for motion); if a third-party lib is truly needed, add it to dependencies so it installs.
- *Verify* types/compile after each section; never let the build break.
- If a section has 3+ distinct sub-parts or the brief runs long, split it into smaller build units.

> **Parallel vs serial:** if the host agent can run builders concurrently (e.g. Claude Code worktrees/subagents), build sections in parallel and merge. If it can't (e.g. Codex), build them **one at a time, still per-section, still verifying each** — never collapse this into a single dump of the whole page. Per-section build + per-section screenshot check is what creates fidelity; keep it regardless of parallelism.

### Stage F — Assemble
Wire the sections into the page in topology order: layout containers, sticky/z-layering, scroll-snap, tab state, carousel autoplay, scroll-driven animations, smooth scroll. Build must pass.

### Stage G — Fidelity check (don't skip)
Put your render next to the reference at 1440 and at 390, section by section, and fix the biggest gaps at their source (re-extract if needed). Then exercise every interactive element and confirm it behaves. Compare every visible image — missing assets are bugs. Default to 2 correction rounds; do more for complex pages. See `references/quality-bar.md`.

---

## The four deliverables

- **Read / build prompt:** fields and prompt-writing guidance in `references/same-style-prompt.md`. Always include the build prompt — it's the most reusable artifact.
- **Same-style page:** the pipeline above, default Next.js project.
- **Blend:** weighting and reconciliation in `references/fusion.md`. Blends work across kinds — URL×URL, HTML×HTML, or URL×HTML — because you're blending extracted design data, not the sources.
- **HTML mode:** analyze / redo / upgrade / compare / combine HTML files (link, upload, paste), single or multi-file; details in `references/html-forge.md`.

---

## Running on Codex (adaptation note)

The pipeline is host-agnostic. On Codex specifically:
- **Browser:** if no browser MCP is configured, drive Playwright through the Node REPL — dynamically import `playwright`, launch headless Chromium, and run the same navigation, `evaluate(getComputedStyle…)`, screenshot, and scroll steps. If Playwright isn't installed, tell the user to add it (`npx playwright install chromium`) or add a browser MCP, then continue.
- **No parallel subagents:** build sections **serially** as described in Stage E — one section at a time, each verified and screenshot-checked. Do not shortcut to a single all-in-one generation.
- Everything else (extraction scripts, blueprint discipline, fidelity loop, Next.js output) is unchanged.

---

## Honest limits
Pixel-perfect 1:1 is not the goal and not achievable; this reproduces the *style* and gives reusable prompts. Quality tracks the model and network. Login-walled, geo-restricted, or anti-bot pages extract poorly — say so when it happens.

---

## References (load as needed)
- `references/extraction.md` — the exact open + extract routine for URLs and HTML files (screenshots, global tokens, per-section computed styles, states, assets).
- `references/same-style-prompt.md` — read fields + how to write a strong, paste-ready build prompt.
- `references/fusion.md` — blending references by weight, across kinds.
- `references/html-forge.md` — analyzing / recreating / combining / upgrading HTML files.
- `references/quality-bar.md` — the correction loop and the acceptance checklist.

## Playbooks
- `scenarios/` — concrete work situations (running reference pages, building HTML report/case/showcase pages, aligning to a brand's look, blending directions, fast structured review). Each says when to use it, what to tweak, and what you get.
