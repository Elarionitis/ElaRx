import Image from "next/image";

import { LanyardStatus } from "@/components/LanyardStatus";
import { Stats } from "@/components/Stats";
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
    <section className="pb-8 pt-12 sm:pt-14">
      <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
        <div className="min-w-0">
          <p className="eyebrow">
            {siteConfig.role}
            <span aria-hidden="true" className="mx-2 text-line-strong">
              &#9679;
            </span>
            {siteConfig.location}
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.75rem,7.5vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-foreground">
            {siteConfig.name}
          </h1>

          <p className="mt-5 max-w-[32rem] text-balance text-lg leading-[1.45] text-foreground sm:text-xl">
            {siteConfig.lead}
          </p>
          <p className="mt-2 max-w-[32rem] text-muted">{siteConfig.intro}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {actions.map((link, index) => (
              <ActionLink key={link.url} link={link} primary={index === 0} />
            ))}
          </div>
        </div>

        <div className="portrait size-36 shrink-0 sm:size-48 lg:size-[15.5rem]">
          {siteConfig.profileImage ? (
            <Image
              alt={siteConfig.name}
              className="size-full rounded-full object-cover"
              height={416}
              priority
              sizes="(min-width: 1024px) 15.5rem, (min-width: 640px) 12rem, 9rem"
              src={siteConfig.profileImage}
              width={416}
            />
          ) : (
            <span className="grid size-full place-items-center rounded-full bg-surface-2 font-display text-4xl text-accent">
              {initials}
            </span>
          )}
        </div>
      </div>

      <Stats />
      <LanyardStatus />
    </section>
  );
}
