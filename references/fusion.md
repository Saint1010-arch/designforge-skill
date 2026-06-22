# Fusion: blending references by weight

Use when the user wants one new look that combines two (or more) references — e.g. "A's layout with B's color", or "70% this site, 30% that one".

## Inputs
- Two or more references (URLs or HTML files).
- A weight per reference (e.g. A=70, B=30). Default to equal weight if unspecified. Clamp to a sane range.

## Method
1. Extract each reference fully (see extraction.md): tokens, topology, assets, screenshots.
2. Blend the tokens by weight: interpolate the dominant background/text colors, mix the palettes, choose fonts favoring the heavier side, average radii/spacing. Keep the result coherent — a fusion should look intentional, not like two sites stitched together.
3. Decide a section rhythm that merges both topologies sensibly (don't just concatenate). Favor the heavier reference for overall structure.
4. Produce a FUSION REPORT first: a blend rationale, the resulting color plan, typography plan, layout plan, vibe tags, and a same-style prompt for the blend.
5. Only then generate the fused page, driven by the fusion same-style prompt + blended tokens.

## Honesty
State the weight you used and what each side contributed. The blend is a new direction, not a copy of either input.
