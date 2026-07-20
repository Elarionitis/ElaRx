# Suhan Ramani Portfolio

Personal portfolio for Suhan Ramani, focused on systems work, AI-integrated software, and real-time inference projects.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- next-themes
- Lanyard REST API for Discord presence and Spotify status

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm run start
```

## Structure

- `app/` — App Router pages, layout, and global CSS.
- `components/` — Hero, nav, footer, sections, and live status widgets.
- `lib/data/` — Typed content modules for site config, experience, skills, and projects.
- `public/` — Static assets such as `Resume.pdf`, favicon, and social preview image.

## Add A Project

Append one object to `lib/data/projects.ts` in the existing shape. No other file needs to change.

## Lanyard

`discordUserId` in `lib/data/site.ts` must be a numeric Discord user ID, and that account needs to be joined at `lanyard.rest`. If the ID is missing, invalid, or the API is down, the status widget hides itself.
