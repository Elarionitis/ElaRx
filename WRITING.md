# Adding a blog post

Posts are plain Markdown files. There is no CMS, no database and nothing to
log into — a post is a file, and publishing is a commit.

## 1. Create the file

Make a new `.md` file in `content/blog/`. The filename becomes the URL:

```
content/blog/why-my-rag-pipeline-was-slow.md
      →  /blog/why-my-rag-pipeline-was-slow
```

Use lowercase words separated by hyphens. Once a post is public, don't rename
the file — the URL goes with it and anything linking to it breaks.

## 2. Write the frontmatter

Every post starts with a block between two `---` lines:

```markdown
---
title: Why my RAG pipeline was slow
date: 2026-08-14
summary: The retrieval was fine. The embedding step was doing eight round trips it did not need.
tags: [rag, python, latency]
draft: true
---
```

| Field     | Required | What it does                                          |
| --------- | -------- | ----------------------------------------------------- |
| `title`   | yes      | Heading on the post, the browser tab, the link preview |
| `date`    | yes      | `YYYY-MM-DD`. Newest sorts first                       |
| `summary` | no       | One or two lines under the title and in the feed       |
| `tags`    | no       | Free-form list, shown at the bottom of the post        |
| `draft`   | no       | `true` keeps it out of the built site                  |

## 3. Write the post

Everything below the closing `---` is the body. Standard Markdown, plus GitHub
tables, task lists and strikethrough.

Code blocks are highlighted at build time. Tag the language, and optionally add
a filename:

````markdown
```python title="ingest.py"
async def embed(chunks: list[str]) -> list[list[float]]:
    ...
```
````

Highlight specific lines by listing them after the language:

````markdown
```ts {2,5-7}
const posts = getAllPosts();
```
````

Images go in `public/` and are referenced from the root:

```markdown
![Latency before and after](/posts/rag-latency.png)
```

## 4. Preview it

```bash
npm run dev
```

Open http://localhost:3000/blog. Drafts appear here and nowhere else. Edits
show up as you save.

## 5. Publish

Set `draft: false` (or delete the line), then commit and push:

```bash
git add content/blog/why-my-rag-pipeline-was-slow.md && git commit -m "Add a post on RAG latency"
```

The sitemap, the RSS feed at `/blog/rss.xml` and the post's link-preview image
are all generated from the file. Nothing else needs updating.

## Notes

- A file starting with `_` is ignored completely — useful for half-finished
  drafts you don't want the dev server listing.
- Reading time is estimated at 200 words per minute. It is not configurable,
  and it does not need to be.
- Deleting a file removes the post. There is no unpublish step.
