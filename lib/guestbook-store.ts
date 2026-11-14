import { createHash } from "node:crypto";

import { Redis } from "@upstash/redis";

import type { Entry } from "@/lib/guestbook";

/*
  The guestbook.

  Storage is a Redis list, newest first, and nothing is ever trimmed from it:
  every note is kept. A list rather than a sorted set because the only queries
  are "the most recent n" and "the next n after those", and LRANGE answers
  both without an index to keep.

  Credentials come from either naming convention: Vercel's Upstash integration
  injects KV_REST_API_*, while a database created directly at Upstash gives
  UPSTASH_REDIS_REST_*. Accepting both means connecting it does not also mean
  renaming anything.

  With no credentials at all the guestbook falls back to memory in development,
  so it is testable before anyone signs up for anything, and simply does not
  render in production. A sign-in box that silently drops what you wrote is
  worse than no sign-in box.
*/

const ENTRIES_KEY = "guestbook:entries";

/** One signature per address per ten minutes. */
const RATE_LIMIT_SECONDS = 600;

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const guestbookIsConfigured = Boolean(url && token) || process.env.NODE_ENV === "development";

const redis = url && token ? new Redis({ url, token }) : null;

/*
  The development fallback. Module state, so it survives within one server
  process and disappears on restart — which is the right lifetime for data
  that only exists to prove the interface works.
*/
const memory: Entry[] = [];
const memoryRateLimit = new Map<string, number>();

function newId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/*
  Addresses are hashed with a salt before they are used as a rate-limit key,
  so the store never holds anything that identifies a visitor. Without
  GUESTBOOK_SALT the hash is still per-deployment rather than guessable from
  the address alone.
*/
function visitorKey(address: string): string {
  const salt = process.env.GUESTBOOK_SALT ?? url ?? "elarx";
  return `guestbook:rl:${createHash("sha256").update(`${salt}:${address}`).digest("hex").slice(0, 24)}`;
}

export async function countEntries(): Promise<number> {
  if (!redis) return memory.length;
  return redis.llen(ENTRIES_KEY);
}

export async function readEntries(limit = 50, offset = 0): Promise<Entry[]> {
  if (!redis) return memory.slice(offset, offset + limit);

  const raw = await redis.lrange<Entry | string>(ENTRIES_KEY, offset, offset + limit - 1);
  return raw
    .map((item) => {
      // The client parses JSON itself when it can, so an entry arrives as an
      // object or as the string it was stored as, depending on the response.
      if (typeof item !== "string") return item;
      try {
        return JSON.parse(item) as Entry;
      } catch {
        return null;
      }
    })
    .filter((entry): entry is Entry => Boolean(entry && entry.message));
}

export async function isRateLimited(address: string): Promise<boolean> {
  const key = visitorKey(address);

  if (!redis) {
    const until = memoryRateLimit.get(key) ?? 0;
    if (until > Date.now()) return true;
    memoryRateLimit.set(key, Date.now() + RATE_LIMIT_SECONDS * 1000);
    return false;
  }

  // NX makes the check and the claim one operation, so two requests arriving
  // together cannot both find the key absent.
  const claimed = await redis.set(key, 1, { nx: true, ex: RATE_LIMIT_SECONDS });
  return claimed === null;
}

export async function addEntry(entry: Omit<Entry, "id" | "at">): Promise<Entry> {
  const stored: Entry = { ...entry, id: newId(), at: Date.now() };

  if (!redis) {
    memory.unshift(stored);
    return stored;
  }

  await redis.lpush(ENTRIES_KEY, JSON.stringify(stored));
  return stored;
}
