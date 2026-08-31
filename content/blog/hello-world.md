---
title: Hello world
date: 2026-08-31
summary: A starter post that doubles as a reference for everything the blog renderer supports.
tags: [meta]
draft: true
---

This post is a template. It is marked `draft: true`, so it shows up while you
run `npm run dev` and disappears from the built site. Delete it once you have
written something real, or flip the flag to publish it.

## Headings

Use `##` for sections and `###` for anything under them. Every heading gets an
id automatically, so you can link straight to one.

### A subsection

Body text is Inter at 17px. Links look [like this](https://example.com), and
`inline code` looks like that.

## Lists

- Bullets are short dashes rather than dots
- They stay quiet next to body text
- Nesting works too

1. Numbered lists use a mono numeral
2. Which keeps them distinct from the prose
3. Without shouting

## Code

Fenced blocks are highlighted at build time, so no JavaScript ships to do it.
Add a title after the language and it gets a header bar.

```python title="ingest.py"
async def embed(chunks: list[str]) -> list[list[float]]:
    async with httpx.AsyncClient(timeout=10) as client:
        responses = await asyncio.gather(*(embed_one(client, c) for c in chunks))
    return [r.vector for r in responses]
```

Highlight specific lines with `{2,4}` after the language:

```ts {2}
const posts = getAllPosts();
const recent = posts.slice(0, 5);
```

## Quotes and rules

> A blockquote sits behind a thin accent rule. Good for the one line you want
> someone to remember.

---

## Tables

| Field     | Required | Notes                              |
| --------- | -------- | ---------------------------------- |
| `title`   | yes      | Shown in the list and the tab      |
| `date`    | yes      | `YYYY-MM-DD`, drives the ordering  |
| `summary` | no       | One or two lines under the title   |
| `tags`    | no       | Free-form list                     |
| `draft`   | no       | `true` hides it from the built site |

That is everything. See `WRITING.md` in the repo root for how to add a post.
