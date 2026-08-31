import Image from "next/image";
import Link from "next/link";

import { DecisionList } from "@/components/DecisionList";
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
      {/* Identity. A statement, not a hero. */}
      <section className="grid gap-10 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-16">
        <div className="min-w-0">
          {/*
            The name is the heading. The thesis reads immediately under it and
            still carries the weight, but a portfolio whose h1 is a sentence
            gives a visitor nothing to remember it by.
          */}
          <h1 className="text-[clamp(2.25rem,5.5vw,3.5rem)] font-medium leading-[1] tracking-[-0.04em] text-ink">
            {siteConfig.name}
          </h1>
          <p className="label mt-4">
            {siteConfig.role}
            <span aria-hidden="true" className="mx-2 text-rule-2">
              &#9679;
            </span>
            {siteConfig.location}
          </p>

          <p className="measure mt-9 text-[clamp(1.2rem,2.2vw,1.5rem)] leading-[1.35] tracking-[-0.02em] text-ink">
            I build backend systems, and I am mostly interested in the point where they stop being correct
            under load.
          </p>
          <p className="measure mt-5 text-[1.05rem] leading-[1.65] text-ink-2">
            So far that has meant retrieval that had half a second to answer, a ledger where the hard part
            turned out to be concurrency rather than arithmetic, and a lot of time spent on why a query
            stopped being fast.
          </p>
        </div>

        <aside className="lg:pt-2">
          <div className="portrait w-full max-w-[13.5rem]">
            <Image
              alt={siteConfig.name}
              height={432}
              priority
              sizes="13.5rem"
              src={siteConfig.profileImage}
              width={432}
            />
          </div>
          <div className="mt-9 border-t border-rule pt-5">
            <p className="label">Currently</p>
            <ul className="mt-4 grid gap-4 text-sm text-ink-2">
              <li>
                <span className="label block">Leading</span>
                <span className="mt-1 block">Anand Rathi Tinkerers&rsquo; Lab, the student-run makerspace here</span>
              </li>
              <li>
                <span className="label block">Reading</span>
                <span className="mt-1 block">Consensus protocols, and how much of them survives a real network</span>
              </li>
              <li>
                <span className="label block">Away</span>
                <span className="mt-1 block">Badminton, cycling, and setting contest problems</span>
              </li>
            </ul>
          </div>
        </aside>
      </section>

      {/*
        The spine of the site. Not "here are my projects" but "here are the
        decisions", because that is the thing a résumé cannot show.
      */}
      <Clause label={`Decisions · ${decisions.length}`}>
        <p className="measure -mt-2 mb-8 text-[0.95rem] leading-[1.6] text-ink-2">
          Every project I have worked on came down to a handful of choices, each with an obvious
          alternative I did not take. These are those choices. Open one to see the reasoning.
        </p>
        <DecisionList items={decisions} />
      </Clause>

      <Clause label="Work" more={`All ${projects.length} projects`} moreHref="/projects">
        <ul className="border-b border-rule">
          {selected.map((project) => (
            <li className="border-t border-rule first:border-t-0" key={project.slug}>
              <Link
                className="focus-ring group grid grid-cols-[minmax(0,1fr)] gap-x-5 gap-y-2 py-6 sm:grid-cols-[13rem_minmax(0,1fr)]"
                href={`/projects#${project.slug}`}
              >
                <div>
                  <h3 className="text-[1.05rem] leading-tight tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                    {project.name}
                  </h3>
                  <p className="label mt-1.5">{project.role}</p>
                </div>
                <p className="measure text-[0.95rem] leading-[1.6] text-ink-2">{project.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
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
