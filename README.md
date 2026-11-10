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
| `/` | An introduction: one sentence about me, the projects with a line each, the guestbook. |
| `/projects` | Every project. One filterable index that expands in place. |
| `/writing` | Post index. Returns 404 until `content/blog/` has a post. |
| `/writing/[slug]` | Article. Its own measure and type scale. |
| `/about` | Background, experience, education, selected positions. |
| `/resume` | PDF viewer with zoom, open-in-tab and download. |

`/blog` and `/blog/:slug` permanently redirect to `/writing`. There are no
per-project routes: a project expands inline on `/projects`, and deep links
like `/projects#signease` open the row they name.

The writing section is derived from the content directory rather than declared
anywhere: `hasPosts()` in `lib/blog.ts` decides whether the nav entry, the RSS
feed, the sitemap entries and the routes themselves exist. Add the first file
to `content/blog/` and all of it appears; there is no flag to flip. Drafts
count in development, so a post in progress is previewable before it is
public.

## Ship log

`/` also carries a short "Lately" list: the newest commit in each of the four
most recently pushed repositories, read from GitHub's public API when the page
is built and revalidated hourly. No token — everything it reads is public, and
five requests an hour sits far inside the unauthenticated rate limit.

Forks and the profile README repository are skipped, merge commits are passed
over in favour of the most recent commit that says what changed, and the rows
are sorted by commit date rather than by repository. If GitHub is unreachable
or rate limited the list comes back empty and the section does not render:
`lib/ship-log.ts`.

## Guestbook

`/` carries a guestbook. There is no account, no sign-in and no email field —
the defences are on the server: a length limit, a ban on links, a honeypot
field and one signature per address per ten minutes, keyed on a salted hash so
the store never holds anything that identifies a visitor.

Storage is a Redis list, trimmed to the most recent 200 entries. Credentials
come from either naming convention, so whichever way the database was created
works without renaming anything:

| Source | Variables |
| --- | --- |
| Vercel -> Storage -> Upstash for Redis | `KV_REST_API_URL`, `KV_REST_API_TOKEN` (injected automatically) |
| A database created at upstash.com | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |

With neither pair set, `npm run dev` keeps entries in memory so the form is
testable immediately, and the section does not render in production at all. A
sign-in box that silently drops what someone wrote is worse than no sign-in
box.

See [.env.example](.env.example). `lib/guestbook.ts` holds the shared types and
limits, `lib/guestbook-store.ts` the storage, and `app/api/guestbook/route.ts`
the validation.

## The homepage

The homepage introduces a person and nothing else. Figures, architecture and
reasoning live on `/projects`, under the project they belong to; putting them
on the front page made it read as documentation for the projects.

There is one interaction and it is used everywhere: point at a project's name
— in the opening sentence or in the list — and its poster comes up beside the
cursor on springs. `components/PosterCard.tsx` holds the provider, the physics
and `PosterLink`; `components/ProjectPoster.tsx` holds the seven posters, drawn
in SVG. A new project needs a poster added there and an `intro` in
`lib/data/projects.ts`: one sentence a stranger would understand, no figures.

## Decisions

`lib/data/decisions.ts` holds the reasoning behind the work: each entry is a
real constraint and the choice that resolved it, with a stable reference
(`D-01`). They render as an accordion inside the project they came from on
`/projects`, or under the job they came from on `/about`, matched by `source`.

**Never renumber a published decision.**

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
fields (`problem`, `approach`, `architecture`, `results`) are all optional and render only when present, so a thin project
reads as brief rather than unfinished.

If a project produced a decision worth writing down, add it to
`decisions.ts` with `source` set to the project slug, and it appears in that
project's case study.

Adding a project is one object appended to `lib/data/projects.ts`. Adding a
post is one file in `content/blog/` — see [WRITING.md](WRITING.md).

## Layout

```
app/
  page.tsx                     home
  writing/page.tsx             post index
  writing/[slug]/page.tsx      post, statically generated
  writing/rss.xml/route.ts     feed
  opengraph-image.tsx          link preview, drawn at build time
  sitemap.ts  robots.ts        SEO routes
  not-found.tsx  error.tsx
  globals.css                  design tokens and prose styles
components/                    the sections of the home page
lib/blog.ts                    markdown loading and rendering
lib/guestbook.ts               guestbook types and limits
lib/guestbook-store.ts         guestbook storage
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
