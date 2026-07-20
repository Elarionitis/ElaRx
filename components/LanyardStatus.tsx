"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/data/site";

type DiscordStatus = "online" | "idle" | "dnd" | "offline";

type LanyardData = {
  discord_status: DiscordStatus;
  spotify?: {
    song: string;
    artist: string;
    album_art_url?: string;
  } | null;
};

type LanyardResponse = {
  success: boolean;
  data?: LanyardData;
};

const statusClass: Record<DiscordStatus, string> = {
  online: "bg-accent",
  idle: "bg-accent-alt",
  dnd: "bg-red-500",
  offline: "bg-muted",
};

function hasUsableDiscordId(id: string) {
  return /^\d{15,22}$/.test(id);
}

export function LanyardStatus() {
  const [data, setData] = useState<LanyardData | null>(null);

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

  const spotifySearchUrl = data.spotify
    ? `https://open.spotify.com/search/${encodeURIComponent(`${data.spotify.song} ${data.spotify.artist}`)}`
    : null;

  return (
    <div className="status-strip grid min-h-20 gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-4">
      <div className="flex min-w-0 items-center gap-3 font-mono text-xs text-muted" aria-live="polite">
        <span className={`size-2 shrink-0 rounded-full ${statusClass[data.discord_status]}`} />
        <span>Discord · {data.discord_status}</span>
      </div>

      {data.spotify && spotifySearchUrl ? (
        <a
          className="focus-ring group flex min-w-0 items-center gap-3 rounded-lg p-1 transition-colors hover:bg-panel motion-reduce:transition-none"
          href={spotifySearchUrl}
          rel="noreferrer"
          target="_blank"
        >
          {data.spotify.album_art_url ? (
            <Image
              alt=""
              className="size-11 shrink-0 rounded-md border border-line object-cover"
              height={44}
              src={data.spotify.album_art_url}
              width={44}
            />
          ) : null}
          <span className="min-w-0">
            <span className="block font-mono text-[0.68rem] font-semibold uppercase tracking-wide text-[#1db954]">Spotify</span>
            <span className="block truncate text-sm font-medium text-foreground">{data.spotify.song}</span>
            <span className="block truncate font-mono text-xs text-muted">{data.spotify.artist}</span>
          </span>
          <span className="shrink-0 font-mono text-xs text-muted transition-colors group-hover:text-accent motion-reduce:transition-none">
            Open ↗
          </span>
        </a>
      ) : null}
    </div>
  );
}
