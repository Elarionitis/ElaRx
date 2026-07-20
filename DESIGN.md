# Design Plan

## Palette

- `Paper White` `#f7f8f4`: a quiet reading surface that stays clean without drifting into cream/editorial warmth.
- `Ink Console` `#151a1f`: primary text, chosen for terminal-adjacent sharpness without pure black harshness.
- `Panel Mist` `#e8edf0`: filled chips, shallow panels, and low-contrast dividers.
- `Signal Teal` `#117c72`: the main accent with real visual weight on primary buttons, active links, and focus states.
- `Process Amber` `#c47a13`: a secondary systems cue for status text and small terminal readouts.
- `Deep Console` `#0d1418`: dark-mode surface for the same restrained systems feel.

## Type

- Display: `Space Grotesk`, used for the name and section headings because it feels technical but still human.
- Body: `Inter`, used for readable paragraphs and navigation copy.
- Utility/mono: `JetBrains Mono`, used for eyebrow lines, stack chips, status readouts, and footer metadata so the terminal influence is present but not the whole site.

## Layout Concept

The site should read like an indie systems engineer's personal page: one focused column, deliberate whitespace, and sections that feel like maintained notes instead of resume blocks. The hero stays minimal: eyebrow line, name, one-liner, 1-2 sentence bio, and a CTA row only. Projects are explicitly a list, not a card grid, with inline stack chips and links so later work cannot drift back to tiled cards.

```text
+------------------------------------------------------------+
| sticky nav: suhan.dev        about experience projects  o  |
+------------------------------------------------------------+
| eyebrow                                                     |
| Suhan Ramani                                               |
| one-liner                                                  |
| short first-person bio                                     |
| [primary CTA] [secondary links]       mono status strip     |
+------------------------------------------------------------+
| about: compact prose, no stat cards                        |
+------------------------------------------------------------+
| experience: concise log-style rows                         |
+------------------------------------------------------------+
| projects LIST                         detail/readout pane   |
| > title   chips   links               changes on focus      |
|   one-line description                                     |
+------------------------------------------------------------+
| contact + footer                                           |
+------------------------------------------------------------+
```

## Signature Elements

1. Hero signature: a single fixed-height mono status strip beside or below the CTA row, cycling between three concrete system states: `rag index warm`, `inference loop live`, and `latency budget watched`. It uses a small filled status dot and text only, with no absolute positioning and no graphical elements that can collide with hero copy.
2. Project-list signature: a master-detail list interaction. Hovering or focusing a project row updates a persistent terminal-style detail panel with `stack`, `why`, `interesting bit`, and links. Rows use a left prompt marker and filled stack chips; they do not tilt, glow, cast card shadows, or use gradient overlays.

## Voice

First person, conversational, confident, and specific. Copy should sound like Suhan explaining what he builds to another engineer: what mattered, what was tricky, and why he cared. Avoid corporate phrasing and resume bullets such as "Engineered X reducing Y by Z%".

## Self-Critique Against Ruled-Out Patterns

- The hero has no big gradient headline, stat cards, exam scores, percentiles, or ranks; it is limited to the requested five content pieces plus the scoped status strip.
- Projects are specified as a list with inline chips and links, not a repeated card grid with tilt, shadow, or gradient-hover behavior.
- The plan avoids absolute-positioned decorative elements entirely, and fixed-height containers are reserved for the status strip/readout so 375px, 768px, and 1280px checks can verify no overlap.
- Chips are defined as filled UI elements with background, padding, border radius, and border, never bare bordered text.
- The hero signature is not a decorative node diagram, so there are no fake nodes or edges to justify.
- A grid-paper background is not part of the design; if a subtle texture is added later it must remain secondary to the palette.
- The palette avoids cream/serif/terracotta, near-black with acid green, and broadsheet newspaper styling.
- The bio voice is first-person and concrete, not a resume-summary sentence about being passionate or broadly skilled.

Revision note: the first instinct was to include a small request-path motif, but that risked becoming a generic diagram. I changed it to a concrete status strip so the signature stays small, meaningful, and easy to verify.
