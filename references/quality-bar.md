# Quality bar: self-iteration and acceptance

## Self-iteration loop
After generating, do NOT hand over the first draft blindly:
1. Render your own output in a headless browser (for React, render it via an in-browser transform with Tailwind so you don't need a full install just to screenshot).
2. Screenshot your render.
3. Show the model BOTH images — original reference and your render — and ask it to fix the largest gaps (layout, spacing, colors, section order, missing blocks), returning the full corrected files.
4. Re-scaffold with the fix. Repeat.

Default: 2 rounds for a site clone, 1 for a fusion. Do more rounds for complex pages; fewer if the model/network is unreliable. If you can't render (offline, transform fails), skip iteration quietly rather than failing the whole job.

## Acceptance checklist
- Sections appear in the same order with the same column counts and rough spacing.
- Palette and fonts match the cited token values.
- Real downloaded assets are used where the reference had imagery (not invented placeholders).
- No un-installed third-party imports (icons via inline SVG/emoji; or the import is added to dependencies).
- Generated project builds / the single-file HTML opens and renders (not a blank page).
- Output is original: brand/wording changed, no trademarks reproduced.

## Honest limitations to communicate
- Not a 1:1 replica; fidelity depends on the model and network.
- Long generations can be truncated by token limits — raise max output tokens for full-page generation, and halve-and-retry if the provider rejects the size.
- Some providers block requests by region; surface that clearly and suggest switching providers rather than failing silently.
