# suhan.dev

Personal site and blog for **Suhan Ramani** — CS undergrad at IIT Jodhpur,
working on distributed systems and AI infrastructure.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Markdown
posts rendered at build time.

## Running it

```bash
npm install && npm run dev
```

Then http://localhost:3000.

```bash
npm run build    # production build, including OG images and the RSS feed
npm run start    # serve the build
npm run lint
```

## Configuration

The canonical origin is `https://elarx.dev`, set in `lib/data/site.ts`. It
drives canonical tags, OG URLs, the sitemap and the RSS feed.

Preview deployments detect themselves and use their own `.vercel.app` URL
instead, so branches don't compete with production for the same canonical.
`npm run dev` uses `http://localhost:3000`.

To point a deployment somewhere else, set `NEXT_PUBLIC_SITE_URL` (no trailing
slash). It overrides everything above.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | The decision log, plus selected work, writing and background. |
| `/projects` | Every project. One filterable index that expands in place. |
| `/writing` | Post index. |
| `/writing/[slug]` | Article. Its own measure and type scale. |
| `/about` | Background, experience, education, selected positions. |
| `/resume` | PDF viewer with zoom, open-in-tab and download. |

`/blog` and `/blog/:slug` permanently redirect to `/writing`. There are no
per-project routes: a project expands inline on `/projects`, and deep links
like `/projects#signease` open the row they name.

## The decision log

The spine of the site is `lib/data/decisions.ts`. Each entry is a real
constraint from real work and the choice that resolved it, with a stable
reference (`D-01`) printed in the margin.

Decisions and projects share a `domain` vocabulary, which is what lets the
projects page filter by the kind of problem rather than by language, and what
connects a project to the decisions it produced and an article back to both.

**Never renumber a published decision.** The id is a permalink.

## Command palette

`Cmd/Ctrl + K` anywhere. Indexes every route, every project with a case study,
every post, plus copy-email, toggle-theme and download-resume. Arrow keys and
Enter; Escape closes.

## Where the content lives

Nothing on the site is written inside a component. Editing it means editing one
of these:

| Content | File |
| --- | --- |
| Name, bio, links, stats, education, positions, achievements | `lib/data/site.ts` |
| Roles and what you did in them | `lib/data/experience.ts` |
| Projects and their case studies | `lib/data/projects.ts` |
| Stack groupings | `lib/data/skills.ts` |
| Blog posts | `content/blog/*.md` |
| Résumé, profile photo, post images | `public/` |

### Adding work

A project needs a `domain` and belongs in one of three categories. Case-study
fields (`problem`, `approach`, `architecture`, `decisions`, `challenges`,
`results`) are all optional and render only when present, so a thin project
reads as brief rather than unfinished.

If a project produced a decision worth writing down, add it to
`decisions.ts` with `source` set to the project slug. If it did not, it
belongs on `/projects` and not on the homepage.

Adding a project is one object appended to `lib/data/projects.ts`. Adding a
post is one file in `content/blog/` — see [WRITING.md](WRITING.md).

## Layout

```
app/
  page.tsx                     home
  blog/page.tsx                post index
  blog/[slug]/page.tsx         post, statically generated
  blog/rss.xml/route.ts        feed
  opengraph-image.tsx          link preview, drawn at build time
  sitemap.ts  robots.ts        SEO routes
  not-found.tsx  error.tsx
  globals.css                  design tokens and prose styles
components/                    the sections of the home page
lib/blog.ts                    markdown loading and rendering
lib/og.tsx                     shared link-preview card
assets/                        Instrument Serif, vendored for OG rendering
```

## How it is built

- **Paper, ink, and one annotation colour.** The reference object is a printed
  technical specification: warm paper, black ink, hairline rules, 2px corners,
  no shadows, and a vermillion used the way a red pen is used in a margin.
- **Light is primary.** Dark mode is warm charcoal, never near-black.
- **Archivo for text, IBM Plex Mono for apparatus.** Mono sets decision
  references, labels, dates and code — never running prose.
- **Base styles live in `@layer base`.** Unlayered CSS beats every cascade
  layer, so an unlayered `a { color: inherit }` silently overrides any
  component rule that colours an anchor.
- **Static by default.** Every route prerenders. Markdown is parsed and code is
  highlighted with Shiki at build time, so no highlighter ships to the browser.
- **Link previews are generated.** `next/og` draws a PNG per route, including
  one per post carrying its title and date.
- **No animation library.** Transitions are CSS, and
  `prefers-reduced-motion` turns them off.

## Deploying

Any host that runs a Next.js build. Set `NEXT_PUBLIC_SITE_URL`, point the build
at `npm run build`, and serve.

---

Built by [Suhan Ramani](https://github.com/Elarionitis).
