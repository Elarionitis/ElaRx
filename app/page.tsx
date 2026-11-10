import Image from "next/image";
import Link from "next/link";

import { DecisionList } from "@/components/DecisionList";
import { Guestbook } from "@/components/Guestbook";
import { HeroHeadline } from "@/components/HeroHeadline";
import { HeroSignalField } from "@/components/HeroSignalField";
import { HeroSystem } from "@/components/HeroSystem";
import { MagneticLink } from "@/components/MagneticLink";
import { ProofStrip } from "@/components/ProofStrip";
import { SelectedWork } from "@/components/SelectedWork";
import { guestbookIsConfigured } from "@/lib/guestbook-store";
import { decisions } from "@/lib/data/decisions";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site";

/* The homepage is a document. Each clause opens with a rule and a label. */
function Clause({
  children,
  id,
  label,
  more,
  moreHref,
}: {
  children: React.ReactNode;
  id?: string;
  label: string;
  more?: string;
  moreHref?: string;
}) {
  return (
    <section className="scroll-mt-24 pt-14 sm:pt-20" data-reveal id={id}>
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
  const selected = projects.filter((project) => project.category === "featured");

  return (
    <div className="sheet pb-4">
      <HeroSignalField>
      <section className="pt-14 sm:pt-20 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.85fr)_minmax(13.75rem,1fr)] lg:items-start lg:gap-12">
          <div className="max-w-4xl">
            <p className="hero-reveal hero-reveal-1 label flex items-center gap-3">
              <span className="inline-block size-1.5 rounded-full bg-accent" />
              {siteConfig.location}
            </p>
            <p className="hero-reveal hero-reveal-2 mt-6 text-[clamp(2rem,3.5vw,2.75rem)] font-semibold leading-none tracking-[-0.05em] text-ink">
              {siteConfig.name}
            </p>
            <HeroHeadline
              className="lens-heading mt-4 text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.065em] text-ink"
              text="Software Engineer"
            />
            {/*
              One claim, then the evidence. The hero used to carry a tagline,
              a keyword line and a paragraph of philosophy stacked on top of
              each other, which asked a first-time visitor to read three
              descriptions of the same person before reaching anything they
              could click.
            */}
            <p className="hero-reveal hero-reveal-4 mt-7 max-w-3xl text-[clamp(1.2rem,2vw,1.65rem)] leading-[1.16] tracking-[-0.035em] text-ink">
              I build systems that stay correct when they get busy
              <span className="text-ink-2"> — and write down why they are built that way.</span>
            </p>
            <p className="hero-reveal hero-reveal-5 label mt-6 text-accent">Full-stack · AI/ML · Systems</p>

            <div className="hero-reveal hero-reveal-6 mt-8 flex flex-wrap gap-2">
              <MagneticLink className="focus-ring btn btn-solid" href="/resume">Resume</MagneticLink>
              <MagneticLink className="focus-ring btn btn-line" href={`mailto:${siteConfig.email}`}>Email</MagneticLink>
              <MagneticLink
                className="focus-ring btn btn-line"
                href={siteConfig.links.github.url}
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </MagneticLink>
              <MagneticLink
                className="focus-ring btn btn-line"
                href={siteConfig.links.x.url}
                rel="noreferrer"
                target="_blank"
              >
                X / @SuhanRamani09
              </MagneticLink>
            </div>
          </div>
          <aside className="hero-portrait-assembly lg:pt-24">
            <div className="hero-portrait" data-lens-target>
              <Image alt={siteConfig.name} height={400} priority quality={90} sizes="(min-width: 1024px) 256px, 128px" src={siteConfig.profileImage} width={400} />
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
        <ProofStrip stats={siteConfig.stats} />
        {/*
          The whole of "who is this" in one line. Everything it used to say at
          length — the education, the internships, the campus roles — is on
          /about and in the resume, where someone who wants it will look.
        */}
        <p className="mt-6 border-t border-rule pt-5 text-[0.95rem] leading-[1.6] text-ink-2">
          CS undergrad at IIT Jodhpur, two internships in, currently leading the campus makerspace.{" "}
          <Link className="focus-ring tlink text-ink" href="/about">
            More about me
          </Link>
        </p>
      </section>
      </HeroSignalField>

      <Clause label="Work" more={`All ${projects.length} projects`} moreHref="/projects">
        <SelectedWork projects={selected} />
      </Clause>

      <Clause id="decisions" label="How I think">
        <div className="thinking-intro">
          <div>
            <p className="label text-accent">Engineering decisions</p>
            <p className="mt-3 max-w-2xl text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.12] tracking-[-0.035em] text-ink">
              Every system has a tradeoff. These are the calls behind the work.
            </p>
          </div>
          <p>
            Open one for the constraint, the call, and what it changed.
          </p>
        </div>
        <div className="mt-8">
          <DecisionList initialLimit={6} items={decisions} />
        </div>
      </Clause>

      {/*
        Rendered only where there is somewhere to put what people write — see
        lib/guestbook-store.ts. A sign-in box that silently drops a message is
        worse than no sign-in box.
      */}
      {guestbookIsConfigured ? (
        <Clause id="guestbook" label="Guestbook">
          <div className="thinking-intro">
            <div>
              <p className="label text-accent">Leave a mark</p>
              <p className="mt-3 max-w-2xl text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.12] tracking-[-0.035em] text-ink">
                You have read mine. Say something back.
              </p>
            </div>
            <p>No account, no email, no newsletter. Just a name and a line.</p>
          </div>
          <div className="mt-8">
            <Guestbook />
          </div>
        </Clause>
      ) : null}
    </div>
  );
}
