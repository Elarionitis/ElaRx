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
| `/` | Discovery. Preview of each section with a route into it. Never the full list. |
| `/projects` | Every project, grouped Featured / More work / Experiments. |
| `/projects/[slug]` | Case study. Only generated for projects that have one written. |
| `/writing` | Post index. |
| `/writing/[slug]` | Article. |
| `/about` | Bio, experience, education, positions, skills, achievements. |
| `/resume` | PDF viewer with zoom, open-in-tab and download. |

`/blog` and `/blog/:slug` permanently redirect to `/writing`.

Contact is global (footer CTA plus the command palette), so there is no
`/contact` route.

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

### Case studies are opt-in

A project renders only the sections it has content for. `problem`, `approach`,
`architecture`, `decisions`, `challenges` and `results` are all optional, and
`hasCaseStudy()` decides whether a project gets a page at all. A project with
none of them stays on the index and links straight to its repo, rather than
opening a page with headings and nothing under them.

Three projects currently have write-ups: leader-election, signease, spendly.
Aeris, repo-context-mcp and orbit do not — add a `problem` and an
`architecture` array to either one and its page appears automatically.

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

- **One accent, three faces.** Bricolage Grotesque for display, Instrument Sans
  for body, JetBrains Mono for every piece of metadata. Colours are CSS custom
  properties in `app/globals.css`; the light set is on `:root`, the dark set on
  `.dark`, and the `dark:` variant is pointed at that class.
- **Layered surfaces.** `--background` for the page, `--surface` for cards,
  `--surface-2` for hover, hairlines between. Density plus layering is what
  carries the visual weight, not decoration.
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
