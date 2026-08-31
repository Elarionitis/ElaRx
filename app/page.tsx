import Image from "next/image";
import Link from "next/link";

import { HomeSection } from "@/components/HomeSection";
import { LanyardStatus } from "@/components/LanyardStatus";
import { ProjectCard } from "@/components/ProjectCard";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { experience } from "@/lib/data/experience";
import { featuredProjects, projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site";

const heroActions = ["github", "linkedin", "email"] as const;

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const [lead, ...rest] = featuredProjects;

  return (
    <div className="shell">
      <section className="pt-12 sm:pt-16">
        <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
          <div className="min-w-0">
            <p className="eyebrow">
              {siteConfig.role}
              <span aria-hidden="true" className="mx-2 text-line-strong">
                &#9679;
              </span>
              {siteConfig.location}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-foreground">
              {siteConfig.name}
            </h1>
            <p className="mt-5 max-w-[32rem] text-balance text-lg leading-[1.45] text-foreground sm:text-xl">
              {siteConfig.lead}
            </p>
            <p className="mt-2 max-w-[32rem] text-muted">{siteConfig.intro}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              <Link className="focus-ring btn btn-primary" href="/projects">
                View projects
              </Link>
              {heroActions.map((key) => {
                const link = siteConfig.links[key];
                const external = link.url.startsWith("http");
                return (
                  <a
                    className="focus-ring btn btn-ghost"
                    href={link.url}
                    key={link.url}
                    rel={external ? "noreferrer" : undefined}
                    target={external ? "_blank" : undefined}
                  >
                    {link.label}
                    {external ? (
                      <span aria-hidden="true" className="arrow">
                        &#8599;
                      </span>
                    ) : null}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="portrait size-32 shrink-0 sm:size-44 lg:size-52">
            <Image
              alt={siteConfig.name}
              className="size-full rounded-full object-cover"
              height={416}
              priority
              sizes="(min-width: 1024px) 13rem, (min-width: 640px) 11rem, 8rem"
              src={siteConfig.profileImage}
              width={416}
            />
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div className="bg-surface px-4 py-4 sm:px-5" key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="figure block text-xl text-accent sm:text-2xl">{stat.value}</span>
                <span className="eyebrow mt-1.5 block">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <LanyardStatus />
      </section>

      <HomeSection id="work" label="Selected work" more={`All ${projects.length} projects`} moreHref="/projects" title="Things I have built">
        <div className="grid gap-3">
          {lead ? <ProjectCard featured project={lead} /> : null}
          <div className="grid gap-3 sm:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </HomeSection>

      <HomeSection label="Experience" more="More about me" moreHref="/about" title="Where I have worked">
        <div className="grid gap-3">
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
              <p className="mt-4 border-t border-line pt-4 text-sm leading-[1.55] text-muted">
                {item.highlights[0]}
              </p>
            </article>
          ))}
        </div>
      </HomeSection>

      <HomeSection label="Writing" more="All writing" moreHref="/writing" title="Notes on what broke">
        {posts.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-muted">First post is still being written.</p>
            <Link className="focus-ring more mt-3 inline-flex" href="/writing">
              Check the writing page
              <span aria-hidden="true" className="chev">
                &rarr;
              </span>
            </Link>
          </div>
        ) : (
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link className="focus-ring group block bg-surface px-5 py-4 transition-colors hover:bg-surface-2" href={`/writing/${post.slug}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="min-w-0 truncate font-display text-base font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <span className="figure shrink-0 text-xs text-faint">{formatPostDate(post.date)}</span>
                  </div>
                  {post.summary ? <p className="mt-1 line-clamp-1 text-sm text-muted">{post.summary}</p> : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </HomeSection>
    </div>
  );
}
