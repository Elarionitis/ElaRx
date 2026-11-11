"use client";

import { useEffect, useState } from "react";

/*
  One short live line: where I am, the time there, and the temperature.

  It is the cheapest way to say there is a person at the other end of this
  page, in a real place. The time is worked out in the
  visitor's browser and kept current; the temperature comes from /api/here.

  Nothing renders until the browser has mounted it. The server does not know
  what minute the page will be read in, and a clock that is right for the
  build and wrong for the reader is worse than a clock that arrives a moment
  late.
*/

const ZONE = "Asia/Kolkata";

type Weather = { temperature?: number; sky?: string };

function clock(now: Date) {
  return new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: ZONE })
    .format(now)
    .toLowerCase();
}

export function LiveHere({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<Weather>({});

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 20_000);

    let cancelled = false;
    fetch("/api/here")
      .then((response) => (response.ok ? response.json() : {}))
      .then((data: Weather) => {
        if (!cancelled) setWeather(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);

  if (!now) return null;

  const degrees = typeof weather.temperature === "number" ? `${weather.temperature}°C` : null;

  return (
    <p className="live-here" title={weather.sky ? `Jodhpur right now: ${weather.sky}` : "Jodhpur right now"}>
      <span aria-hidden="true" className="live-dot" />
      {compact ? null : <span>Jodhpur</span>}
      <span>{clock(now)}</span>
      {degrees ? <span>{degrees}</span> : null}
    </p>
  );
}
