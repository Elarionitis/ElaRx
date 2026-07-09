# Design Plan

## Palette

- `Packet Navy` `#101820`: deep interface base, chosen to feel closer to a terminal and systems dashboard than a portfolio template.
- `Trace Ink` `#1f2933`: primary text on light surfaces; crisp without using pure black.
- `Signal Cyan` `#2bb3a3`: active links and live-system accents, hinting at network traces and inference signals.
- `Warm Process` `#e0b15a`: secondary highlight for ranks, timestamps, and small status cues so the palette is not one-note.
- `Log Paper` `#f6f4ee`: light background with a little warmth, but not cream/terracotta/editorial.
- `Wire Gray` `#9aa6b2`: borders, dividers, and muted metadata.

## Type

- Display: `Space Grotesk` for compact, technical headings that still feel human.
- Body: `Inter` for readable paragraphs and project descriptions.
- Utility/mono: `JetBrains Mono` for stack pills, section labels, status lines, commit-like metadata, and project readouts.

## Layout Concept

The site should feel like an engineer's working notebook made public: narrow enough to scan, dense enough to respect the reader, and structured around live signals rather than marketing blocks. The first viewport opens with a short first-person note, a moving distributed-systems motif, and a terminal-style status line. Projects are explicitly a LIST, never a card grid: title, one-line description, stack pills, live link, repo link, and a persistent detail panel.

```text
+--------------------------------------------------------------+
| sticky nav: suhan.ram / about experience projects contact  o |
+--------------------------------------------------------------+
| intro copy + live status line        | interactive node mesh  |
| focused proof: IIT Jodhpur CSE, AIR, | cursor-reactive signal |
| links                                |                       |
+--------------------------------------------------------------+
| about / experience as compact log entries                    |
+--------------------------------------------------------------+
| projects LIST                         | persistent detail pane|
| > project title   pills  live repo    | terminal readout      |
|   one-line why it exists              | stack / notes / links |
| > project title   pills  live repo    | changes on hover/focus|
+--------------------------------------------------------------+
| contact + footer                                             |
+--------------------------------------------------------------+
```

## Signature Elements

1. Hero signature: an animated node-and-packet canvas motif tied to distributed systems. Nodes drift slightly, packets move between them, and pointer movement pulls the nearest nodes just enough to make the network feel alive. A mono status line beside it cycles through short system-style messages like `rag index warm`, `inference path live`, and `latency budget watched`.

2. Project-list signature: master-detail list interaction. Hovering or focusing a project row updates a persistent terminal-style detail panel next to the list with `stack`, `why`, `interesting bit`, and links. The row itself uses a left prompt marker and inline stack pills; it does not tilt, glow as a card, or use shadow/gradient overlay effects.

## Voice

First person, conversational, and specific. Write like Suhan is explaining the work to another engineer: what he built, where the hard edge was, and why he cared. Avoid resume-summary language and bullet phrasing like "Engineered X reducing Y by Z%"; use direct sentences instead.

## Self-Critique Against Ruled-Out Patterns

- No gradient headline or stat-card hero: the hero uses a live status line and interactive systems canvas, with achievements kept as concise proof points.
- No project card grid: projects are a scannable list with inline pills and live/repo links, plus a separate detail panel.
- No banned palettes: the colors avoid cream/serif/terracotta, acid-green-on-black, and newspaper hairlines.
- No resume-summary bio: copy will be first-person and concrete, not "passionate CS student skilled in...".
- Revision made during planning: the first palette draft leaned too monochrome blue/cyan, so `Warm Process` was added as a restrained second signal color for ranks and timestamps.
