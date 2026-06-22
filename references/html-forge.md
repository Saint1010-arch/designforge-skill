# HTML mode: analyze / recreate / fuse / upgrade HTML files

Use when the reference is an HTML file (uploaded or pasted) or a link whose page source you fetch — common for work deliverables: reports, case studies, data-story pages, internal dashboards, slide-style pages.

## Sources
- A link: fetch the page source, render it in a headless browser (inject <base href> so relative assets resolve).
- An uploaded/pasted HTML string: render it directly.
- Multiple sources are allowed (cap a handful) for compare/fusion.

## Actions
- **Analyze** — produce a design report for the HTML (same fields as a site report, plus a structure read and upgrade ideas).
- **Clone / upgrade** — produce a single-file HTML in the same style. "Upgrade" tightens visual polish and structure while keeping the content's intent. Output is one self-contained .html the user can double-click.
- **Compose** — build a single-file HTML from the user's raw content + options when there is no source to mimic.
- **Compare** — read several HTML files and report on differences/overlaps in their design.
- **Fuse** — blend several HTML files by weight into one new single-file HTML.

## Options the user can set (all optional)
language, purpose, tone, color mode (light/dark), density, animation level, whether to upgrade, target sections, extra content, font hint, creativity, plus free-form instructions. Expose as many of these as the user wants — more knobs = more control. Default sensibly when omitted.

## Output rules
- Single-file HTML: inline the styles; keep it openable offline as much as possible.
- Keep content original; if recreating, change brand/wording, keep the structure/intent.
