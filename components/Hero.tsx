import Image from "next/image";

import { LanyardStatus } from "@/components/LanyardStatus";
import { siteConfig, type SiteLink } from "@/lib/data/site";

const actionKeys = ["github", "resume", "linkedin", "x", "email"] as const;

function ActionLink({ link, primary = false }: { link: SiteLink; primary?: boolean }) {
  const isExternal = link.url.startsWith("http");

  return (
    <a
      className={`focus-ring btn ${primary ? "btn-primary" : "btn-ghost"}`}
      href={link.url}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
      {isExternal && !primary ? (
        <span aria-hidden="true" className="arrow">
          &#8599;
        </span>
      ) : null}
    </a>
  );
}

export function Hero() {
  const actions = actionKeys.map((key) => siteConfig.links[key]).filter((link) => link.visible);
  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section className="pb-14 pt-14 sm:pb-16 sm:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div className="order-2 min-w-0 lg:order-1">
          <p className="eyebrow text-accent">
            {siteConfig.role}
            <span aria-hidden="true" className="mx-2 text-faint">
              /
            </span>
            <span className="text-faint">{siteConfig.location}</span>
          </p>

          <h1 className="mt-4 font-display text-[clamp(3rem,9vw,4.75rem)] leading-[0.95] tracking-[-0.02em] text-foreground">
            {siteConfig.name}
          </h1>

          <p className="mt-6 max-w-[34rem] text-xl leading-[1.5] text-foreground sm:text-[1.4rem]">
            {siteConfig.lead}
          </p>
          <p className="mt-4 max-w-[34rem] text-muted">{siteConfig.intro}</p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {actions.map((link, index) => (
              <ActionLink key={link.url} link={link} primary={index === 0} />
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="portrait size-44 sm:size-56 lg:size-[19rem]">
            {siteConfig.profileImage ? (
              <Image
                alt={siteConfig.name}
                className="size-full rounded-full object-cover"
                height={608}
                priority
                sizes="(min-width: 1024px) 19rem, (min-width: 640px) 14rem, 11rem"
                src={siteConfig.profileImage}
                width={608}
              />
            ) : (
              <span className="grid size-full place-items-center rounded-full bg-panel font-display text-5xl text-accent">
                {initials}
              </span>
            )}
          </div>
        </div>
      </div>

      <LanyardStatus />
    </section>
  );
}
