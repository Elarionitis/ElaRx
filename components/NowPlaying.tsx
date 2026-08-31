"use client";

import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/data/site";

type Track = { song: string; artist: string };
type Lanyard = { discord_status: string; spotify?: Track | null };

const CACHE_KEY = "elarx:last-track";

function readCache(): Track | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Track;
    return parsed.song && parsed.artist ? parsed : null;
  } catch {
    return null;
  }
}

/*
  One line in the "Currently" list rather than a card of its own — it is a
  currently, so it belongs with the others. Renders nothing at all until there
  is a track, so an offline day leaves no empty row behind.
*/
export function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!/^\d{15,22}$/.test(siteConfig.discordUserId)) return;

    let cancelled = false;

    // Every state change happens inside this callback rather than the effect
    // body, including the fall back to the cached track.
    async function poll() {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${siteConfig.discordUserId}`, {
          cache: "no-store",
        });
        const payload = (await response.json()) as { success: boolean; data?: Lanyard };
        if (cancelled || !payload.success || !payload.data) return;

        const spotify = payload.data.spotify;
        if (spotify?.song) {
          const next = { song: spotify.song, artist: spotify.artist };
          setTrack(next);
          setLive(true);
          window.localStorage.setItem(CACHE_KEY, JSON.stringify(next));
        } else {
          setLive(false);
          setTrack((current) => current ?? readCache());
        }
      } catch {
        if (cancelled) return;
        setLive(false);
        setTrack((current) => current ?? readCache());
      }
    }

    poll();
    const timer = window.setInterval(poll, 30000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  if (!track) return null;

  const search = `https://open.spotify.com/search/${encodeURIComponent(`${track.song} ${track.artist}`)}`;

  return (
    <li>
      <span className="label flex items-center gap-1.5">
        {live ? (
          <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
        ) : null}
        {live ? "Listening" : "Last played"}
      </span>
      <a
        className="focus-ring group mt-1 block"
        href={search}
        rel="noreferrer"
        target="_blank"
        title={`${track.song} — ${track.artist}`}
      >
        <span className="block truncate text-ink-2 transition-colors group-hover:text-accent">{track.song}</span>
        <span className="block truncate text-ink-3">{track.artist}</span>
      </a>
    </li>
  );
}
