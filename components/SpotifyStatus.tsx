"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type NowPlaying = {
  title: string;
  artist: string;
  albumArtUrl: string | null;
  trackUrl: string | null;
};

export function SpotifyStatus() {
  const [track, setTrack] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchTrack() {
      try {
        const response = await fetch("/api/spotify", { cache: "no-store" });
        if (response.status === 204) {
          if (!cancelled) setTrack(null);
          return;
        }

        if (!response.ok) throw new Error("Spotify request failed");

        const payload = (await response.json()) as NowPlaying;
        if (!cancelled) setTrack(payload);
      } catch {
        if (!cancelled) setTrack(null);
      }
    }

    fetchTrack();
    const timer = window.setInterval(fetchTrack, 30_000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  if (!track) return null;

  const content = (
    <>
      {track.albumArtUrl ? (
        <Image alt="" className="size-9 shrink-0 rounded object-cover" height={36} src={track.albumArtUrl} width={36} />
      ) : null}
      <span className="min-w-0 truncate">
        <span className="text-foreground">Now playing</span> · {track.title} — {track.artist}
      </span>
    </>
  );

  return (
    <div className="status-strip flex min-h-16 min-w-0 items-center p-4 font-mono text-xs text-muted" aria-live="polite">
      {track.trackUrl ? (
        <a
          className="focus-ring flex min-w-0 items-center gap-3 rounded text-inherit hover:text-accent"
          href={track.trackUrl}
          rel="noreferrer"
          target="_blank"
        >
          {content}
        </a>
      ) : (
        <div className="flex min-w-0 items-center gap-3">{content}</div>
      )}
    </div>
  );
}
