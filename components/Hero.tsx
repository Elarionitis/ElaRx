"use client";

import { useMemo } from "react";

import { siteConfig, type SiteLink } from "@/lib/data/site";

const ctaKeys: Array<keyof typeof siteConfig.links> = [
  "github",
  "linkedin",
  "leetcode",
  "codeforces",
  "email",
  "resume",
];

function HeroLink({ link, primary = false }: { link: SiteLink; primary?: boolean }) {
  const isExternal = link.url.startsWith("http");

  return (
    <a
      className={
        primary
          ? "focus-ring inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-mono text-sm font-semibold text-white transition-colors hover:bg-accent-strong motion-reduce:transition-none"
          : "focus-ring inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-5 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent motion-reduce:transition-none"
      }
      href={link.url}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
    </a>
  );
}

export function Hero() {
  const ctaLinks = useMemo(() => ctaKeys.map((key) => siteConfig.links[key]).filter((link) => link.visible), []);

  return (
    <section className="grid min-h-[calc(100vh-4rem)] content-center gap-10 py-20 sm:py-24">
      <div className="max-w-3xl">
        <h1 className="font-display text-5xl font-semibold tracking-normal text-foreground sm:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mt-5 max-w-2xl text-2xl leading-snug text-foreground">
          I am a CS undergrad at IIT Jodhpur, into distributed systems and building things that talk to models in
          real time.
        </p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          I like the parts where clean interfaces meet messy reality: retrieval that stays relevant, inference that
          stays responsive, and systems you can still reason about after they start growing.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {ctaLinks.map((link, index) => (
            <HeroLink key={link.url} link={link} primary={index === 0} />
          ))}
        </div>
      </div>

      <div className="status-strip grid min-h-24 gap-3 p-4 sm:min-h-16 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="flex min-w-0 items-center gap-3 font-mono text-xs text-muted" aria-live="polite">
          <span className="size-2 shrink-0 rounded-full bg-accent" />
          <span>online</span>
        </div>
      </div>
    </section>
  );
}
