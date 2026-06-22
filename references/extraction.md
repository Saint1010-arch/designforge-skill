# Extraction routine

Goal: give the generator everything it needs so it never has to guess a value.

## Browser setup
- Launch a headless Chromium. Desktop viewport 1440×900.
- Navigate to the URL with a real User-Agent. For an HTML file, set the page content directly (inject a <base href> if a base URL is known so relative assets resolve).
- Wait for the DOM to settle (a couple seconds), then scroll the whole page top-to-bottom in steps to trigger lazy-loaded images and scroll-driven content. Return to top.

## Screenshots (visual ground truth)
- Full-page screenshot at 1440 (desktop).
- Resize to 390×844 (mobile), settle, full-page screenshot.
- Keep both as the reference images for self-iteration later.

## Design tokens
Read computed styles, not source CSS:
- Body background and text color.
- Color palette: collect colors across visible elements, rank by frequency, keep the top ~18 with counts.
- Fonts: computed font-family on headings/body/buttons/labels; Google Fonts <link> hrefs; @font-face families.
- Radii and box-shadows: collect and rank the common values.
- Heading sizes: for the first several h1–h3, capture sample text, font-size, weight, line-height.

## Topology (precise layout — this is what makes clones accurate)
Walk down to the main content container, then for each major section (tall blocks) capture:
- Name (id/class/tag), visual order, top offset, height.
- Layout: grid / flex / block — from computed display.
- For grid: gridTemplateColumns and the resulting column count. For flex: flexDirection and the count of meaningful children.
- gap, padding (real px), background (color or "image").
- Image/video/svg count inside the section.
- Interactive states: labels of any tabs / pills / [role=tab] inside (so the generator knows there are multiple states to recreate).

## Assets
- <img> (currentSrc/src, alt, natural width/height), <video> sources, CSS background-image URLs, favicons / apple-touch-icons.
- Keep the FULL url including query strings (CDNs put auth tokens there; stripping them 404s the download). Only sanitize the filename for local saving.
- De-dupe by URL.

## Metadata & motion
- Title, description, <html lang>, page height, video count.
- Smooth-scroll libraries: look for Lenis / Locomotive markers and scroll-snap.
- Header nav links (text + href).

## Downloading assets for generation
- Before generating, download the images/backgrounds into the project's public/assets folder (cap ~24, de-dupe filenames). Pass the local file list to the generator so it references real images under /assets/ instead of inventing them.
