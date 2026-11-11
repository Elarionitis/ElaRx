import type { Metadata } from "next";

import { Decisions } from "@/components/Decisions";
import { Underlined } from "@/components/Ink";
import { decisions } from "@/lib/data/decisions";
import { experience } from "@/lib/data/experience";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Background, what I work on, and how I got here.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="sheet pb-4">
      <header className="grid gap-10 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16" data-reveal>
        <div className="min-w-0">
          <h1 className="page-title">About</h1>
          <div className="about-prose">
            <p>
              I came to computer science expecting to like the theory, and ended up liking the failure modes
              more.
            </p>
            <p>
              What happens to a system when the network partitions. When four writers hit the same record.
              When a query that was fine at a thousand rows stops being fine at a million. Those are the
              questions I keep coming back to, and they are why almost everything I have built ends up being
              about coordination rather than features.
            </p>
            <p>
              In practice that has been a retrieval pipeline with half a second to respond, an expense
              ledger where the real problem turned out to be concurrency wearing a consumer-app costume, and
              an internship where the fix for a slow page was almost never the thing anyone suggested first.
            </p>
            <p>
              Away from all of it I coordinate the Tinkerers&rsquo; Lab, the 3,000 sq. ft. makerspace on
              campus, play badminton, cycle, and set contest problems for the programming society — which is
              a good weekly reminder that a problem is only as good as its edge cases.
            </p>
          </div>
        </div>

        {/* The facts someone might want without reading four paragraphs. */}
        <aside className="lg:sticky lg:top-24 lg:self-start lg:pt-3">
          <dl className="facts">
            <div>
              <dt>Based in</dt>
              <dd>
                Jodhpur, Rajasthan
                <span>from {siteConfig.hometown}</span>
              </dd>
            </div>
            <div>
              <dt>Studying</dt>
              <dd>
                B.Tech Computer Science
                <span>IIT Jodhpur, class of 2028</span>
              </dd>
            </div>
            <div>
              <dt>Currently</dt>
              <dd>
                Overall Coordinator
                <span>Anand Rathi Tinkerers&rsquo; Lab</span>
              </dd>
            </div>
            {/*
              Each exam is its own fact. The JEE figure is a category rank, so
              the category is part of the line rather than a footnote to it.
            */}
            <div>
              <dt>GUJCET 2024</dt>
              <dd>State rank 3</dd>
            </div>
            <div>
              <dt>JEE Advanced 2024</dt>
              <dd>Rank 397, GEN-EWS category</dd>
            </div>
            <div>
              <dt>Find me</dt>
              <dd className="facts-links">
                {[
                  siteConfig.links.github,
                  siteConfig.links.linkedin,
                  siteConfig.links.x,
                  siteConfig.links.leetcode,
                  siteConfig.links.codeforces,
                ].map((link) => (
                  <a className="focus-ring tlink" href={link.url} key={link.url} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </header>

      {/* Decisions that came out of a job link straight to this section. */}
      <section className="about-section scroll-mt-24" id="experience">
        <h2 className="section-title" data-reveal>
          <Underlined>Where I have worked</Underlined>
        </h2>
        <div className="mt-8">
          {experience.map((item) => {
            const notes = decisions.filter((decision) => decision.source === item.org);

            return (
              <article className="job" data-reveal key={item.org}>
                <h3 className="job-org">{item.org}</h3>
                <p className="job-role">
                  {item.role}, {item.dates}
                </p>
                <p className="job-text">{item.highlights[0]}</p>
                <p className="job-text">{item.highlights[1]}</p>
                {notes.length > 0 ? (
                  <div className="job-notes">
                    <p className="job-notes-title">Decisions I had to make there</p>
                    <Decisions items={notes} />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-section" data-reveal>
        <h2 className="section-title">
          <Underlined>Why I build</Underlined>
        </h2>
        {/*
          This was a dashed box reading "campus photo placeholder", which is
          the one thing a published page should never say about itself. The
          statement is strong enough to be the whole block, so it is set as
          one, with the second paragraph as its annotation.
        */}
        <div className="why-build mt-8">
          <p className="why-build-statement">
            I like building because it turns a vague, shared frustration into something another person can
            actually use.
          </p>
          <p className="why-build-note">
            The best part is usually the moment a rough idea stops being a conversation and becomes a tool:
            a person tries it, something unexpected happens, and the next useful question appears.
          </p>
        </div>
      </section>

      {/*
        The page used to end with two more tables — education, then every
        society position with its dates. Both are on the resume, and
        reprinting them here made this read as a document to be processed
        rather than as a person to be met. One line is enough to say where
        the full record lives.
      */}
      <p className="measure mt-16 text-[1rem] leading-[1.6] text-ink-2">
        Every position, result and date is on the{" "}
        <a className="tlink text-ink-2" href="/resume">
          resume
        </a>
        .
      </p>

    </div>
  );
}
