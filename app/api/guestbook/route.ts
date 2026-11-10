import { MAX_MESSAGE, MAX_NAME } from "@/lib/guestbook";
import { addEntry, guestbookIsConfigured, isRateLimited, readEntries } from "@/lib/guestbook-store";

/*
  The guestbook is written to and read from at request time, so the route opts
  out of caching entirely. A cached GET here would show a visitor the page as
  it looked before they signed it, which reads as the entry having been lost.
*/
export const dynamic = "force-dynamic";

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

/*
  Anything that survives this is plain text someone typed. Control characters
  go because they can disguise what a line actually says; runs of whitespace
  collapse so a signature cannot shove the rest of the list off the screen.
*/
function clean(value: unknown, limit: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

/*
  No links. The guestbook has nothing a spammer wants except an outbound link,
  and refusing them removes the reason to target it — which is cheaper than
  moderating what arrives, and cheaper than asking a visitor to sign in.
*/
const LINK = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|ru|cn|xyz|top|shop|info|biz|link)\b)/i;

function visitorAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function GET() {
  if (!guestbookIsConfigured) return json({ entries: [] });

  try {
    return json({ entries: await readEntries() });
  } catch {
    // A storage outage should cost the page its guestbook, not its homepage.
    return json({ entries: [], error: "The guestbook is not reachable right now." }, 503);
  }
}

export async function POST(request: Request) {
  if (!guestbookIsConfigured) return json({ error: "The guestbook is closed." }, 503);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "That did not arrive as JSON." }, 400);
  }

  const payload = (body ?? {}) as Record<string, unknown>;

  // A field no human sees and every naive bot fills in.
  if (clean(payload.company, 64)) return json({ error: "No." }, 400);

  const message = clean(payload.message, MAX_MESSAGE);
  const name = clean(payload.name, MAX_NAME) || "Anonymous";

  if (!message) return json({ error: "Write something first." }, 400);
  if (LINK.test(message) || LINK.test(name)) {
    return json({ error: "Links are not allowed here — say it in words." }, 400);
  }

  try {
    if (await isRateLimited(visitorAddress(request))) {
      return json({ error: "You have already signed recently. Come back in a few minutes." }, 429);
    }
    return json({ entry: await addEntry({ message, name }) }, 201);
  } catch {
    return json({ error: "That could not be saved. Try again in a moment." }, 503);
  }
}
