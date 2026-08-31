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

| Variable               | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, no trailing slash. Drives canonical tags, OG URLs, the sitemap and the feed. Defaults to `https://suhan.dev`. |

Set it in your host's environment. Getting it wrong means every canonical URL
and link preview points at the wrong domain.

## Where the content lives

Nothing on the site is written inside a component. Editing it means editing one
of these:

| Content                              | File                     |
| ------------------------------------ | ------------------------ |
| Name, bio, links, exam results       | `lib/data/site.ts`       |
| Roles and what you did in them       | `lib/data/experience.ts` |
| Projects                             | `lib/data/projects.ts`   |
| Stack groupings                      | `lib/data/skills.ts`     |
| Blog posts                           | `content/blog/*.md`      |
| Résumé, profile photo, post images   | `public/`                |

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

- **One accent colour, two typefaces plus a mono.** Instrument Serif for
  headings, Inter for body, JetBrains Mono for anything that is metadata rather
  than prose. Colours are CSS custom properties in `app/globals.css`; the light
  set lives on `:root` and the dark set on `.dark`.
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
