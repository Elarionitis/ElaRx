"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/data/site";

type DiscordStatus = "online" | "idle" | "dnd" | "offline";

type SpotifyPresence = {
  song: string;
  artist: string;
  album_art_url?: string;
};

type LanyardData = {
  discord_status: DiscordStatus;
  spotify?: SpotifyPresence | null;
};

type LanyardResponse = {
  success: boolean;
  data?: LanyardData;
};

const statusColor: Record<DiscordStatus, string> = {
  online: "bg-emerald-500",
  idle: "bg-amber-500",
  dnd: "bg-red-500",
  offline: "bg-faint",
};

const lastSpotifyStorageKey = "elarx:last-spotify";

function hasUsableDiscordId(id: string) {
  return /^\d{15,22}$/.test(id);
}

function readLastSpotify() {
  if (typeof window === "undefined") return null;

  try {
    const storedTrack = window.localStorage.getItem(lastSpotifyStorageKey);
    if (!storedTrack) return null;

    const parsedTrack = JSON.parse(storedTrack) as SpotifyPresence;
    return parsedTrack.song && parsedTrack.artist ? parsedTrack : null;
  } catch {
    return null;
  }
}

export function LanyardStatus() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [lastSpotify, setLastSpotify] = useState<SpotifyPresence | null>(readLastSpotify);

  useEffect(() => {
    if (!hasUsableDiscordId(siteConfig.discordUserId)) return;

    let cancelled = false;

    async function fetchPresence() {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${siteConfig.discordUserId}`, {
          cache: "no-store",
        });
        const payload = (await response.json()) as LanyardResponse;

        if (!cancelled && payload.success && payload.data) {
          setData(payload.data);
          if (payload.data.spotify) {
            setLastSpotify(payload.data.spotify);
            window.localStorage.setItem(lastSpotifyStorageKey, JSON.stringify(payload.data.spotify));
          }
        }
      } catch {
        if (!cancelled) setData(null);
      }
    }

    fetchPresence();
    const timer = window.setInterval(fetchPresence, 25000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  if (!data) return null;

  const spotify = data.spotify ?? lastSpotify;
  const spotifySearchUrl = spotify
    ? `https://open.spotify.com/search/${encodeURIComponent(`${spotify.song} ${spotify.artist}`)}`
    : null;

  return (
    <div className="mt-14 grid gap-3 border-t border-line pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="flex min-w-0 items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint" aria-live="polite">
        <span className={`size-2 shrink-0 rounded-full ${statusColor[data.discord_status]}`} />
        <span>{data.discord_status}</span>
      </div>

      {spotify && spotifySearchUrl ? (
        <a
          className="focus-ring group flex min-w-0 items-center gap-3"
          href={spotifySearchUrl}
          rel="noreferrer"
          target="_blank"
        >
          {spotify.album_art_url ? (
            <Image
              alt=""
              className="size-10 shrink-0 rounded border border-line object-cover"
              height={40}
              src={spotify.album_art_url}
              width={40}
            />
          ) : null}
          <span className="min-w-0">
            <span className="eyebrow block">{data.spotify ? "Now playing" : "Last played"}</span>
            <span className="mt-1 block truncate text-sm text-foreground group-hover:underline">{spotify.song}</span>
            <span className="block truncate text-xs text-muted">{spotify.artist}</span>
          </span>
        </a>
      ) : null}
    </div>
  );
}
