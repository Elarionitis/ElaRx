"use client";

import { useEffect, useState } from "react";

/*
  One live line: where I am, what time it is there, and what the air is doing.

  It is the cheapest way to say there is a person at the other end of this
  page, in a real place, who may well be asleep. The time is worked out in the
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

function hourThere(now: Date) {
  return Number(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: ZONE }).format(now)) % 24;
}

/** How far Jodhpur is from the reader's own clock, in words. */
function gap(now: Date): string {
  // India is UTC+5:30 all year; getTimezoneOffset is minutes behind UTC.
  const minutes = 330 + now.getTimezoneOffset();
  if (minutes === 0) return "same time as you";

  const size = Math.abs(minutes);
  const hours = Math.floor(size / 60);
  const rest = size % 60;
  const amount = [hours ? `${hours}h` : "", rest ? `${rest}m` : ""].filter(Boolean).join(" ");
  return `${amount} ${minutes > 0 ? "ahead of" : "behind"} you`;
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

  const hour = hourThere(now);
  const asleep = hour >= 2 && hour < 7;
  const degrees = typeof weather.temperature === "number" ? `${weather.temperature}°C` : null;

  if (compact) {
    return (
      <p className="live-here">
        <span aria-hidden="true" className="live-dot" />
        Jodhpur {clock(now)}
        {degrees ? `, ${degrees}` : ""}
      </p>
    );
  }

  return (
    <p className="live-here">
      <span aria-hidden="true" className="live-dot" />
      <span>
        Jodhpur, {clock(now)}
        {degrees ? `, ${degrees}` : ""}
        {weather.sky ? ` and ${weather.sky}` : ""}
      </span>
      <span className="live-note">{asleep ? "I am probably asleep" : gap(now)}</span>
    </p>
  );
}
