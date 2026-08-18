"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";

import { LanyardStatus } from "@/components/LanyardStatus";
import { siteConfig, type SiteLink } from "@/lib/data/site";

const ctaKeys: Array<keyof typeof siteConfig.links> = [
  "github",
  "linkedin",
  "x",
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
  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  useEffect(() => {
    const pageBackground = document.body;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    function updateMotionPreference() {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      pageBackground.style.setProperty("--mx", "50%");
      pageBackground.style.setProperty("--my", "50%");
      pageBackground.style.setProperty("--cursor-opacity", "0");

      if (reducedMotion.matches) return () => {};

      function updatePosition(event: PointerEvent) {
        if (event.pointerType !== "mouse" || frameId) return;

        frameId = window.requestAnimationFrame(() => {
          const x = (event.clientX / window.innerWidth) * 100;
          const y = (event.clientY / window.innerHeight) * 100;

          pageBackground.style.setProperty("--mx", `${Math.min(100, Math.max(0, x))}%`);
          pageBackground.style.setProperty("--my", `${Math.min(100, Math.max(0, y))}%`);
          pageBackground.style.setProperty("--cursor-opacity", "0.05");
          frameId = 0;
        });
      }

      function hideGlow() {
        pageBackground.style.setProperty("--cursor-opacity", "0");
      }

      window.addEventListener("pointermove", updatePosition, { passive: true });
      window.addEventListener("blur", hideGlow);
      return () => {
        window.removeEventListener("pointermove", updatePosition);
        window.removeEventListener("blur", hideGlow);
      };
    }

    let removePointerListener = updateMotionPreference();
    function handleMotionChange() {
      removePointerListener();
      removePointerListener = updateMotionPreference();
    }

    reducedMotion.addEventListener("change", handleMotionChange);
    return () => {
      removePointerListener();
      if (frameId) window.cancelAnimationFrame(frameId);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <section className="grid min-h-[calc(100vh-4rem)] content-center gap-10 py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent">FULL STACK DEVELOPER · systems and real-time AI</p>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-normal text-foreground sm:text-6xl">
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

        <div className="order-first size-40 overflow-hidden rounded-full border border-line bg-panel p-1.5 ring-8 ring-panel/40 sm:size-48 lg:order-none lg:ml-auto lg:size-72 xl:size-80">
          {siteConfig.profileImage ? (
            <Image
              alt={`${siteConfig.name} profile`}
              className="size-full rounded-full object-cover"
              height={320}
              src={siteConfig.profileImage}
              width={320}
            />
          ) : (
            <div className="grid size-full place-items-center rounded-full bg-surface font-display text-5xl font-semibold text-accent lg:text-7xl">
              {initials}
            </div>
          )}
        </div>
      </div>

      <LanyardStatus />
    </section>
  );
}
