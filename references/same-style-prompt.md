# Report fields + writing a great same-style prompt

## The design report (bilingual: Chinese first, then English)
Return these fields:
- summary — 2–3 sentences on the overall design identity.
- vibe — 3–6 short adjective tags (minimal, editorial, dark, playful, …).
- colorAnalysis — how color is used (background, text, accents, contrast, mood) citing real values.
- typographyAnalysis — font choices, hierarchy, sizes, pairing, citing values.
- layoutAnalysis — grid/flex usage, section rhythm, spacing, density.
- motionAnalysis — scroll behavior, video usage, likely animation patterns.
- score — overall 1–10 plus a one-line justification.
- recommendations — 3–5 concrete, reusable takeaways someone could apply.
- sameStylePrompt — the paste-ready prompt (below). Always include it.

## The same-style prompt (the most reusable artifact)
Write ONE self-contained prompt that another model could paste and use to build a new, original page in this style. It must encode concrete specifics, not vibes:
- Exact colors (hex/rgb) for background, text, primary/secondary accents.
- Fonts (families + rough weights/sizes for headings vs body).
- Spacing and layout structure: section order, column counts, density, radii, shadow style.
- Motion: scroll feel, hover behaviors, animation style.
- A clear instruction that this is a STYLE reference for an original page — change copy, do not reproduce the brand or trademarks.

Keep it tight and directly usable. A single model + this prompt won't perfectly match the original (that needs extraction + iteration), but it should get a strong, on-brand first draft. Say that honestly when you hand it over.
