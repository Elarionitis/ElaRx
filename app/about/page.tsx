import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { experience } from "@/lib/data/experience";
import { siteConfig } from "@/lib/data/site";
import { skillGroups } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience, education and what I am working on now.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="shell pb-8">
      <PageHeader
        actions={
          <>
            <Link className="focus-ring btn btn-primary" href="/resume">
              Resume
            </Link>
            <a
              className="focus-ring btn btn-ghost"
              href={siteConfig.links.github.url}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
              <span aria-hidden="true" className="arrow">
                &#8599;
              </span>
            </a>
          </>
        }
        label={`${siteConfig.hometown} &rarr; ${siteConfig.location}`.replace("&rarr;", "→")}
        title="About"
      />

      <div className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="flex flex-col gap-14">
          <section>
            <div className="flex flex-col gap-6">
              {siteConfig.bio.map((paragraph, index) => (
                <p
                  className={
                    index === 0
                      ? "text-lg leading-[1.65] text-foreground sm:text-xl"
                      : "leading-[1.7] text-muted"
                  }
                  key={paragraph.slice(0, 32)}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="eyebrow border-b border-line pb-3 text-foreground">Experience</h2>
            <div className="mt-6 grid gap-3">
              {experience.map((item) => (
                <article className="card p-5" key={item.org}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold tracking-[-0.025em] text-foreground">
                        {item.role}
                      </h3>
                      <p className="mt-0.5 text-sm">
                        <span className="text-accent">{item.org}</span>
                        <span className="text-faint"> &middot; {item.context}</span>
                      </p>
                    </div>
                    <p className="figure shrink-0 text-xs text-faint">{item.dates}</p>
                  </div>

                  <ul className="mt-4 grid gap-2 border-t border-line pt-4 text-sm leading-[1.55] text-muted">
                    {item.highlights.map((highlight) => (
                      <li className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-2" key={highlight}>
                        <span aria-hidden="true" className="mt-[0.6em] h-px w-2 bg-line-strong" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.7rem] text-faint">
                    {item.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="eyebrow border-b border-line pb-3 text-foreground">Education</h2>
            <div className="mt-6 grid gap-3">
              {siteConfig.education.map((item) => (
                <article className="card p-5" key={item.institution}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold tracking-[-0.02em] text-foreground">
                        {item.institution}
                      </h3>
                      <p className="mt-0.5 text-sm text-accent">{item.qualification}</p>
                    </div>
                    <p className="figure shrink-0 text-xs text-faint">{item.dates}</p>
                  </div>
                  {item.detail ? <p className="mt-3 text-sm leading-[1.55] text-muted">{item.detail}</p> : null}
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="eyebrow border-b border-line pb-3 text-foreground">Positions of responsibility</h2>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line">
              {siteConfig.positions.map((item) => (
                <li className="bg-surface px-5 py-4" key={item.org}>
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="text-sm font-medium text-foreground">
                      {item.role}
                      <span className="text-faint"> &middot; {item.org}</span>
                    </p>
                    <p className="figure shrink-0 text-xs text-faint">{item.dates}</p>
                  </div>
                  <p className="mt-1.5 text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
          <div className="portrait mx-auto size-40 lg:mx-0 lg:size-full lg:max-w-[14rem]">
            <Image
              alt={siteConfig.name}
              className="size-full rounded-full object-cover"
              height={448}
              sizes="(min-width: 1024px) 14rem, 10rem"
              src={siteConfig.profileImage}
              width={448}
            />
          </div>

          <div>
            <h2 className="eyebrow border-b border-line pb-3 text-foreground">Skills</h2>
            <dl className="mt-4 grid gap-4">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <dt className="eyebrow">{group.title}</dt>
                  <dd className="mt-1.5 text-sm leading-[1.55] text-muted">{group.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="eyebrow border-b border-line pb-3 text-foreground">Achievements</h2>
            <dl className="mt-4 grid gap-3">
              {siteConfig.achievements.map((item) => (
                <div key={item.title}>
                  <dt className="text-sm font-medium text-foreground">{item.title}</dt>
                  {item.detail ? <dd className="text-sm text-muted">{item.detail}</dd> : null}
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
