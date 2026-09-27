import Image from "next/image";
import Link from "next/link";

import { DecisionList } from "@/components/DecisionList";
import { HeroSystem } from "@/components/HeroSystem";
import { SelectedWork } from "@/components/SelectedWork";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { decisions } from "@/lib/data/decisions";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site";

/* The homepage is a document. Each clause opens with a rule and a label. */
function Clause({
  children,
  label,
  more,
  moreHref,
}: {
  children: React.ReactNode;
  label: string;
  more?: string;
  moreHref?: string;
}) {
  return (
    <section className="pt-14 sm:pt-20">
      <div className="clause flex items-baseline justify-between gap-4">
        <h2 className="label">{label}</h2>
        {more && moreHref ? (
          <Link className="focus-ring tlink shrink-0 text-sm text-ink-2" href={moreHref}>
            {more}
          </Link>
        ) : null}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const selected = projects.filter((project) => project.category === "featured");

  return (
    <div className="sheet pb-4">
      <section className="pt-14 sm:pt-20 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_10rem] lg:items-center lg:gap-12">
          <div className="max-w-4xl">
            <p className="label flex items-center gap-3">
              <span className="inline-block size-1.5 rounded-full bg-accent" />
              {siteConfig.name} · {siteConfig.location}
            </p>
            <h1 className="mt-7 text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.065em] text-ink">
              Software Engineer
            </h1>
            <p className="mt-7 max-w-3xl text-[clamp(1.55rem,3.6vw,2.8rem)] leading-[1.08] tracking-[-0.045em] text-ink">
              Building full-stack products, intelligent systems <span className="text-ink-2">&amp; things that ship.</span>
            </p>
            <p className="label mt-7 text-accent">Full-stack · AI/ML · Systems</p>
            <p className="measure mt-6 text-[1.02rem] leading-[1.7] text-ink-2">
              I care about the moment an idea becomes useful: the interface people touch, the intelligence behind it,
              and the engineering that keeps it working when reality arrives.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <Link className="focus-ring btn btn-solid" href="/resume">
                Resume
              </Link>
              <a className="focus-ring btn btn-line" href={`mailto:${siteConfig.email}`}>
                Email
              </a>
              <a
                className="focus-ring btn btn-line"
                href={siteConfig.links.github.url}
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="focus-ring btn btn-line"
                href={siteConfig.links.x.url}
                rel="noreferrer"
                target="_blank"
              >
                X / @SuhanRamani09
              </a>
            </div>
          </div>
          <aside className="hero-portrait-assembly">
            <div className="hero-portrait">
              <Image alt={siteConfig.name} height={264} priority sizes="(min-width: 1024px) 132px, 108px" src={siteConfig.profileImage} width={264} />
              <span aria-hidden="true" className="hero-portrait-orbit" />
              <span aria-hidden="true" className="hero-portrait-node hero-portrait-node-one" />
              <span aria-hidden="true" className="hero-portrait-node hero-portrait-node-two" />
              <span aria-hidden="true" className="hero-portrait-signal" />
            </div>
          </aside>
        </div>
        <div className="mt-12 sm:mt-16">
          <HeroSystem />
        </div>
        <div className="mt-6 grid gap-5 border-t border-rule pt-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] sm:gap-12">
          <p className="text-[0.95rem] leading-[1.6] text-ink-2">
            Make the constraint visible. Prefer the smaller moving part. Leave behind a trail someone else can follow.
          </p>
          <div>
            <p className="label">Currently</p>
            <p className="mt-1 text-sm leading-[1.55] text-ink-2">
              Leading Anand Rathi Tinkerers&rsquo; Lab, reading consensus protocols, and building.
            </p>
          </div>
        </div>
      </section>

      <Clause label="Work" more={`All ${projects.length} projects`} moreHref="/projects">
        <SelectedWork projects={selected} />
      </Clause>

      <Clause label="How I think">
        <div className="thinking-intro">
          <div>
            <p className="label text-accent">Engineering decisions</p>
            <p className="mt-3 max-w-2xl text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.12] tracking-[-0.035em] text-ink">
              Every system has a tradeoff. These are the calls behind the work.
            </p>
          </div>
          <p>
            Open an entry for the constraint, the decision, and what it changed.
          </p>
        </div>
        <div className="mt-8">
          <DecisionList items={decisions} />
        </div>
      </Clause>

      <Clause label="Writing" more="All writing" moreHref="/writing">
        {posts.length === 0 ? (
          <p className="measure text-[0.95rem] text-ink-2">
            Nothing published yet. The first few will be write-ups of the decisions above.
          </p>
        ) : (
          <ul className="border-b border-rule">
            {posts.map((post) => (
              <li className="border-t border-rule first:border-t-0" key={post.slug}>
                <Link
                  className="focus-ring group grid gap-x-5 gap-y-1 py-5 sm:grid-cols-[6.5rem_minmax(0,1fr)]"
                  href={`/writing/${post.slug}`}
                >
                  <time className="label pt-1" dateTime={post.date}>
                    {formatPostDate(post.date)}
                  </time>
                  <span className="min-w-0">
                    <span className="block text-[1.05rem] leading-tight tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                      {post.title}
                    </span>
                    {post.summary ? (
                      <span className="measure mt-1.5 block text-[0.95rem] leading-[1.55] text-ink-2">
                        {post.summary}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Clause>

      <Clause label="Background" more="More about me" moreHref="/about">
        <div className="measure text-[0.95rem] leading-[1.65] text-ink-2">
          <p>
            Two internships so far: a web agency where I spent most of my time on query shapes and
            production incidents, and an AI learning platform where I built the retrieval pipeline. On
            campus I coordinate the Tinkerers&rsquo; Lab, set problems for the programming society, and help
            run placement outreach.
          </p>
        </div>
      </Clause>
    </div>
  );
}
