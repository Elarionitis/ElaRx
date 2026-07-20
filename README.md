# My Portfolio

A personal portfolio for **Suhan Ramani**, a Computer Science undergraduate at IIT Jodhpur building dependable systems and real-time AI experiences.

The site is intentionally calm and direct: it presents the work, the thinking behind it, and the people-friendly details without turning the portfolio into a dashboard of noise.

## What it showcases

- **Real-time AI work** — transformer-based ASL recognition with live WebSocket inference.
- **Systems-minded engineering** — retrieval pipelines, responsive model-facing services, and latency-conscious product work.
- **Selected experience** — full-stack production work and RAG development with Gemini and Qdrant.
- **Practical projects** — including SignEase and Spendly, with source and live links where available.
- **A direct way to connect** — GitHub, LinkedIn, email, and a downloadable résumé.

## Built with

Next.js · React · TypeScript · Tailwind CSS · next-themes · Lanyard

## Site sections

| Section | Purpose |
| --- | --- |
| Hero | A concise introduction, profile links, and résumé access. |
| About | The engineering interests and approach behind the work. |
| Experience | Selected roles with concrete outcomes and technical context. |
| Skills | The tools and areas used across projects. |
| Projects | A focused project list with stack details, source links, and live demos. |
| Contact | A simple closing path for collaboration or conversation. |

## A few thoughtful details

- Responsive light and dark themes.
- Accessible keyboard focus states and reduced-motion support.
- A project list with an interactive detail panel instead of a generic card grid.
- Optional live Discord and Spotify presence, shown only when Lanyard data is available.
- Content separated from presentation, keeping updates simple and deliberate.

## Content map

The portfolio content lives in small typed modules, so changing the site does not require digging through UI components.

| Content | Location |
| --- | --- |
| Personal details and social links | `lib/data/site.ts` |
| Experience | `lib/data/experience.ts` |
| Skills | `lib/data/skills.ts` |
| Projects | `lib/data/projects.ts` |
| Résumé and static media | `public/` |

---

Designed and built by [Suhan Ramani](https://github.com/Elarionitis).
