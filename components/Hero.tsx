import Image from "next/image";

import { LanyardStatus } from "@/components/LanyardStatus";
import { siteConfig, type SiteLink } from "@/lib/data/site";

const secondaryKeys = ["github", "linkedin", "x", "email"] as const;

function QuietLink({ link }: { link: SiteLink }) {
  const isExternal = link.url.startsWith("http");

  return (
    <a
      className="focus-ring group inline-flex items-baseline gap-1 text-muted transition-colors hover:text-foreground"
      href={link.url}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      <span className="border-b border-transparent transition-colors group-hover:border-current">{link.label}</span>
      {isExternal ? <span aria-hidden="true" className="text-[0.7em] text-faint">&#8599;</span> : null}
    </a>
  );
}

export function Hero() {
  const { resume } = siteConfig.links;
  const secondary = secondaryKeys.map((key) => siteConfig.links[key]).filter((link) => link.visible);
  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section className="pb-16 pt-16 sm:pb-20 sm:pt-24">
      <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="min-w-0">
          <p className="eyebrow">{siteConfig.location}</p>
          <h1 className="mt-3 font-display text-[clamp(3rem,10vw,4.5rem)] leading-[0.95] tracking-[-0.015em] text-foreground">
            {siteConfig.name}
          </h1>
        </div>

        <div className="size-20 shrink-0 overflow-hidden rounded-full border border-line bg-panel sm:size-24">
          {siteConfig.profileImage ? (
            <Image
              alt={siteConfig.name}
              className="size-full object-cover"
              height={192}
              priority
              src={siteConfig.profileImage}
              width={192}
            />
          ) : (
            <span className="grid size-full place-items-center font-display text-2xl text-muted">{initials}</span>
          )}
        </div>
      </div>

      <div className="mt-9 max-w-[36rem] space-y-4">
        <p className="text-xl leading-[1.55] text-foreground sm:text-[1.375rem]">{siteConfig.lead}</p>
        <p className="text-muted">{siteConfig.intro}</p>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <a
          className="focus-ring inline-flex h-10 items-center rounded border border-foreground px-4 font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          href={resume.url}
        >
          {resume.label}
        </a>
        {secondary.map((link) => (
          <QuietLink key={link.url} link={link} />
        ))}
      </div>

      <LanyardStatus />
    </section>
  );
}
