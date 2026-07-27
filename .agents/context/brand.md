# Brand And Visual Style

## Source Material

The current brand references are:

- Logo image: `C:\Users\Luis Loredo\Desktop\WebRuth\Logo Sobre Negro.jpeg`.
- Lettering/business card image: `C:\Users\Luis Loredo\Desktop\WebRuth\Tarjeta Presentacion.jpeg`.

Color values were extracted manually with a color picker. Because the source images are raster images, text and logo edges include blended border pixels. Use the central colors for main fills and the border colors for subtle anti-aliased edges, shadows, dividers, or supporting accents.

## Visual Direction

- Elegant, calm, premium, and therapeutic.
- The logo uses a black luxury background with metallic gold initials and botanical ginkgo-like leaves.
- The card uses a warm beige background, gold serif lettering, wide tracking, and a refined spa/wellness feel.
- The website should feel polished and serene rather than clinical or generic.

## Core Colors

| Token | Hex | Notes |
| --- | --- | --- |
| Web background | `#f9ece3` | Warm beige page background. |
| Black logo background | `#0a0a0a` | Deep black used behind the gold logo. |
| Dark font | `#443a28` | Primary dark text color for beige backgrounds. |
| Dark font border | `#b7b0a2` | Soft mixed edge/border tone from raster lettering. |
| Golden font strong | `#7f5614` | Strong central gold/brown tone from lettering. |
| Golden font alternate | `#6f4f13` | Alternate darker gold tone from lettering. |
| Golden border medium | `#947e4c` | Medium blended border/accent color. |
| Golden border light | `#b7b0a2` | Light blended border/accent color. |
| Logo leaf bright | `#6f4f13` | Bright leaf fill/accent from logo. |
| Logo leaf dark | `#794a03` | Dark leaf fill/accent from logo. |
| Logo leaf border | `#946c2d` | Leaf border/accent color. |

## Usage Guidance

- Prefer `#f9ece3` as the main website background.
- Use `#443a28` for readable body text on the beige background.
- Use gold tones sparingly for brand accents, logo-adjacent elements, calls to action, icons, and subtle highlights.
- Use `#0a0a0a` when the design needs a premium contrast area that echoes the black logo background.
- Avoid flattening the whole site into only beige and brown; add enough contrast and whitespace for readability.
- When reproducing logo-like lettering effects, account for central fill and blended border colors instead of assuming a single flat color.
- The black/gold logo can be used as a contained brand mark on dark sections, but should not force the whole website to be black.
- The beige card style is a better reference for the default website surface.

## Typography Direction

The source typography was created by AI and may not correspond to one exact real font.

Recommended approximations:

- Main display headings: high-contrast elegant serif, similar to Didot, Bodoni, Cormorant Garamond, Playfair Display, or Libre Baskerville.
- Brand-style large name text: use a high-contrast serif with generous letter spacing.
- Small uppercase labels such as "MASSOTHERAPEUTE" or "CONTACT": use wide tracking and a refined serif or small-caps style.
- Body text: use a more readable companion typeface. Avoid using the ornate display style for paragraphs.

Preferred web direction:

- Headings and brand-style display text: Cormorant Garamond.
- Playfair Display was considered but rejected because it feels too wide and visually saturated for this brand.
- Body text: Brawler.
- Navigation/forms/small UI text: start with Brawler, then review readability at small sizes during implementation.
- Review French and Spanish accents during visual QA.

## Logo Asset Guidance

- Current logo is raster over black, not a transparent PNG.
- Because the black background is mostly uniform, a transparent extraction is possible, but fine shadows and metallic edges may be lost.
- For the first web version, it is acceptable to use the logo as a cropped image on a black background.
- For a cleaner long-term asset, recreate or vectorize the monogram and botanical leaf mark as SVG or export a transparent high-resolution PNG.
- If extracting the logo, preserve a version with the original black background as fallback because it carries the premium metallic effect better.

## Open Brand Questions

- Whether to extract the current logo to transparent PNG or recreate/vectorize it.
- Whether the website should be primarily light beige, black/gold, or a balanced combination.
- Whether Brawler remains readable enough for navigation, forms, and small UI text.
- Whether French and Spanish accents render cleanly in the selected font setup.
- Exact hover, focus, and disabled states for gold buttons and links.
