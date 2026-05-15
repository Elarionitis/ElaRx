# ElaRx

**A production-grade full-stack developer portfolio and engineering platform.**

Built with Next.js, TypeScript, Tailwind CSS, PostgreSQL, and Prisma. Integrates live Spotify playback, GitHub activity, WakaTime coding stats, and competitive programming metrics into a unified developer dashboard.

> This is not just a portfolio. It is a real software product built to the standard of a production application - with clean architecture, proper data modeling, API design, and deployment practices.

---

## Features

- **Home** — minimal hero, animated introduction
- **Projects** — curated work with live links and source
- **Blog** — markdown-based writing system
- **Dashboard** — GitHub activity, Spotify now playing, coding stats
- **Contact** — direct email form

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js |
| APIs | Spotify API, GitHub API |
| Deployment | Vercel |

---

## Preview

> _Screenshots / live demo link coming soon._

---

## Folder Structure

```
elarx/
├── app/                  # Next.js App Router pages
│   ├── (site)/           # Public-facing routes
│   ├── api/              # API route handlers
│   └── dashboard/        # Developer dashboard
├── components/           # Shared UI components
├── lib/                  # Utilities, API clients, helpers
├── prisma/               # Schema and migrations
├── public/               # Static assets
└── styles/               # Global CSS
```

---

## Local Setup

**Prerequisites:** Node.js 18+, PostgreSQL

```bash
# Clone the repo
git clone https://github.com/yourusername/elarx.git
cd elarx

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Push database schema
npx prisma db push

# Start dev server
npm run dev
```

---

## Environment Variables

```env
# Database
DATABASE_URL=

# Spotify
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# GitHub
GITHUB_TOKEN=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

> See `.env.example` for the full list.

---

## Development Roadmap

```
v0.1  Core layout, home page, projects section
v0.2  Blog system with markdown rendering
v0.3  Spotify + GitHub API integrations
v0.4  Developer dashboard (coding stats, activity feed)
v0.5  Admin panel for content management
v1.0  Production deployment
```

---

## Feature Checklist

**Core**
- [ ] Home page with animated hero
- [ ] Projects page
- [ ] Responsive layout
- [ ] Dark mode

**Integrations**
- [ ] Spotify now playing widget
- [ ] GitHub contribution graph
- [ ] WakaTime / coding activity stats

**Blog**
- [ ] MDX rendering
- [ ] Tag filtering
- [ ] Reading time estimate

**Dashboard**
- [ ] Activity timeline
- [ ] Stats cards
- [ ] Admin content editor

---

## Deployment

Deployed on **Vercel** with a managed PostgreSQL instance (Vercel Postgres or Supabase).

```bash
# Deploy via Vercel CLI
vercel --prod
```

Set all environment variables in the Vercel project dashboard before deploying.

---

## Future Improvements

- RSS feed for blog
- OG image generation per post
- Email newsletter integration
- CLI-style command palette (`⌘K`)
- Lighthouse score badge automation

---

## Contributing

This is a personal project, but feedback and suggestions are welcome.
Open an issue or submit a pull request.

---

## License

[MIT](./LICENSE)
