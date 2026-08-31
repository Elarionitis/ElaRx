import type { Metadata } from "next";
import Image from "next/image";

import { experience } from "@/lib/data/experience";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Background, what I work on, and how I got here.",
  alternates: { canonical: "/about" },
};

/* Selected, not exhaustive. The resume is the complete record. */
const selectedPositions = siteConfig.positions.slice(0, 2);

export default function AboutPage() {
  return (
    <div className="sheet pb-4">
      <header className="grid gap-10 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_12rem] lg:gap-16">
        <div className="min-w-0">
          <h1 className="text-[clamp(1.85rem,4.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.035em] text-ink">
            About
          </h1>
          <div className="measure mt-7 flex flex-col gap-5 text-[1.05rem] leading-[1.7] text-ink-2">
            <p className="text-ink">
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
              Right now that is a Byzantine consensus framework with a professor at IIT Jodhpur, where the
              interesting result was that you can skip an entire round of communication if every node can
              derive the same answer independently. Before that it was a retrieval pipeline that had half a
              second to respond, and an expense ledger where the real problem turned out to be concurrency
              wearing a consumer-app costume.
            </p>
            <p>
              Away from all of it I play badminton, cycle, and set contest problems for the programming
              society here — which is a good weekly reminder that a problem is only as good as its edge
              cases.
            </p>
          </div>
        </div>

        <div className="lg:pt-3">
          <Image
            alt={siteConfig.name}
            className="w-full max-w-[12rem] border border-rule"
            height={384}
            sizes="12rem"
            src={siteConfig.profileImage}
            style={{ borderRadius: "var(--radius-sheet)" }}
            width={384}
          />
          <p className="label mt-3">
            {siteConfig.hometown} &rarr; {siteConfig.location}
          </p>
        </div>
      </header>

      <section className="pt-16">
        <h2 className="clause label">Experience</h2>
        <ul className="mt-8 border-b border-rule">
          {experience.map((item) => (
            <li className="border-t border-rule first:border-t-0" key={item.org}>
              <div className="grid gap-x-5 gap-y-3 py-7 sm:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="text-[1.05rem] leading-tight tracking-[-0.015em] text-ink">{item.org}</p>
                  <p className="label mt-1.5">{item.role}</p>
                  <p className="label mt-1">
                    <span className="num">{item.dates}</span>
                  </p>
                </div>
                <div className="measure">
                  <p className="text-[0.95rem] leading-[1.65] text-ink-2">{item.highlights[0]}</p>
                  <p className="mt-3 text-[0.95rem] leading-[1.65] text-ink-2">{item.highlights[1]}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-16">
        <h2 className="clause label">Education</h2>
        <ul className="mt-8 border-b border-rule">
          {siteConfig.education.map((item) => (
            <li className="border-t border-rule first:border-t-0" key={item.institution}>
              <div className="grid gap-x-5 gap-y-2 py-6 sm:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="text-[1.05rem] leading-tight tracking-[-0.015em] text-ink">{item.institution}</p>
                  <p className="label mt-1.5">
                    <span className="num">{item.dates}</span>
                  </p>
                </div>
                <p className="measure text-[0.95rem] leading-[1.65] text-ink-2">
                  {item.qualification}
                  {item.detail ? `. ${item.detail}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-16">
        <h2 className="clause label">Outside the code</h2>
        <ul className="mt-8 border-b border-rule">
          {selectedPositions.map((item) => (
            <li className="border-t border-rule first:border-t-0" key={item.org}>
              <div className="grid gap-x-5 gap-y-2 py-6 sm:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="text-[1.05rem] leading-tight tracking-[-0.015em] text-ink">{item.org}</p>
                  <p className="label mt-1.5">
                    <span className="num">{item.dates}</span>
                  </p>
                </div>
                <p className="measure text-[0.95rem] leading-[1.65] text-ink-2">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="measure mt-6 text-[0.9rem] leading-[1.6] text-ink-3">
          The complete record — every position, every result, every date — is on the{" "}
          <a className="tlink text-ink-2" href="/resume">
            resume
          </a>
          .
        </p>
      </section>
    </div>
  );
}
