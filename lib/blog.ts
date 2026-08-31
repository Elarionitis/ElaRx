import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type PostMeta = {
  slug: string;
  title: string;
  /** ISO date string, e.g. "2026-08-14". */
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & {
  html: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// Drafts are visible while you write and disappear from the built site.
const showDrafts = process.env.NODE_ENV !== "production";

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && value.trim()) return value.trim().slice(0, 10);
  return "";
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim()) return value.split(",").map((item) => item.trim());
  return [];
}

function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readPostFile(fileName: string) {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { content, data } = matter(raw);

  const meta: PostMeta = {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: toIsoDate(data.date),
    summary: typeof data.summary === "string" ? data.summary : "",
    tags: toStringArray(data.tags),
    draft: data.draft === true,
    readingMinutes: estimateReadingMinutes(content),
  };

  return { content, meta };
}

function listPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  // Files starting with _ are ignored, which leaves room for notes and partials.
  return fs.readdirSync(POSTS_DIR).filter((file) => /\.mdx?$/.test(file) && !file.startsWith("_"));
}

export function getAllPosts(): PostMeta[] {
  return listPostFiles()
    .map((file) => readPostFile(file).meta)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort();
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: "wrap" })
  .use(rehypePrettyCode, {
    // Both themes are emitted as CSS variables so the code block follows the
    // site theme without a second render.
    theme: { light: "vitesse-light", dark: "vitesse-dark" },
    keepBackground: false,
  })
  .use(rehypeStringify);

export async function getPost(slug: string): Promise<Post | null> {
  const fileName = listPostFiles().find((file) => file.replace(/\.mdx?$/, "") === slug);
  if (!fileName) return null;

  const { content, meta } = readPostFile(fileName);
  if (!showDrafts && meta.draft) return null;

  const html = String(await processor.process(content));
  return { ...meta, html };
}

export function formatPostDate(date: string): string {
  if (!date) return "";
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
