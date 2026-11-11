import type { Metadata } from "next";

import { Underlined } from "@/components/Ink";
import { experience } from "@/lib/data/experience";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, what I like building, and where to find me.",
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
              I&rsquo;m a third-year computer science student at IIT Jodhpur, and I like building tools that
              are really useful to other people.
            </p>
            <p>
              That is the whole test for me. Not whether something is clever, but whether someone else can
              pick it up and it makes their day a little easier.
            </p>
            <p>
              I like open-source work for the same reason. The code sits where anyone can read it, use it,
              and tell me what is wrong with it.
            </p>
            <p>I work hard, and I believe in hard work. Most of what I am good at, I got good at slowly.</p>
            <p>
              Away from the screen I coordinate the Tinkerers&rsquo; Lab, the 3,000 sq. ft. makerspace on
              campus, play badminton, cycle, and set contest problems for the programming society.
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
                B.Tech Computer Science, third year
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

      {/*
        A line per job and no more. What I built there, and why, belongs with
        the work; this page is about the person.
      */}
      <section className="about-section scroll-mt-24" data-reveal id="experience">
        <h2 className="section-title">
          <Underlined>Where I have worked</Underlined>
        </h2>
        <ul className="jobs">
          {experience.map((item) => (
            <li key={item.org}>
              <p className="job-org">{item.org}</p>
              <p className="job-role">{item.role}</p>
              <p className="job-role">
                {item.context}, {item.dates}
              </p>
            </li>
          ))}
        </ul>
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
