import Image from "next/image";
import Link from "next/link";

import { Guestbook } from "@/components/Guestbook";
import { Circled, Pen, PenArrow, Underlined } from "@/components/Ink";
import { PosterLink, PosterProvider } from "@/components/PosterCard";
import { ShipLog } from "@/components/ShipLog";
import { WorkList } from "@/components/WorkList";
import { guestbookIsConfigured } from "@/lib/guestbook-store";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site";

/*
  The homepage introduces a person. That is all it is for.

  One printed sentence carries it: I build things, then I try to break them.
  It is the honest summary of the work — a chat server that is killed
  mid-write to see what it loses, a backtester whose job is to disprove the
  strategy, a model that had to be re-taught what a webcam does — and it is a
  claim a reader can check against the three projects named directly under it.

  Everything that explains those projects lives on /projects. What is left
  here is who I am, what I have made, and somewhere to answer.

  There is one interaction and it is the same one everywhere: point at a
  project's name, in the sentence or in the list, and its poster comes up
  beside the cursor.
*/

const elsewhere = [
  siteConfig.links.github,
  siteConfig.links.x,
  siteConfig.links.linkedin,
  { label: "Email", url: `mailto:${siteConfig.email}` },
  { label: "Resume", url: "/resume" },
];

export default function Home() {
  const featured = projects.filter((project) => project.category === "featured");

  return (
    <PosterProvider slugs={projects.map((project) => project.slug)}>
      <div className="sheet pb-4">
        <section className="hero">
          <div className="hero-id" data-reveal>
            <div className="hero-portrait">
              <Image
                alt={siteConfig.name}
                height={320}
                priority
                quality={90}
                sizes="128px"
                src={siteConfig.profileImage}
                width={320}
              />
            </div>
            <Pen>
              <PenArrow flip />
              that&rsquo;s me, Suhan
            </Pen>
          </div>

          <h1 className="hero-line" data-reveal style={{ "--reveal-delay": "70ms" } as React.CSSProperties}>
            I build things, then I try to <Circled delay={350}>break</Circled> them.
          </h1>

          <div className="hero-body" data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
            <p className="hero-about">
              I&rsquo;m a third-year computer science student at <strong>IIT Jodhpur</strong>. I like building
              tools that are really useful to other people, and I like doing that work in the open.
            </p>
            <div>
              <p className="hero-proof">
                <PosterLink slug="orbit">Orbit</PosterLink> gets <code>kill -9</code>&rsquo;d mid-write to see what it
                loses. <PosterLink slug="tradstrat">TradStrat</PosterLink> told me the strategies I tested do not beat
                just holding. <PosterLink slug="signease">SignEase</PosterLink> had to learn what a laptop webcam does
                to a hand.
              </p>
              <p className="hero-hint">
                <PenArrow />
                <Pen>hover the underlined ones</Pen>
              </p>
            </div>
          </div>

          <div className="hero-foot" data-reveal style={{ "--reveal-delay": "220ms" } as React.CSSProperties}>
            <ul className="hero-links">
              {elsewhere.map((link) => (
                <li key={link.url}>
                  <a
                    className="focus-ring tlink"
                    href={link.url}
                    {...(link.url.startsWith("http") ? { rel: "noreferrer", target: "_blank" } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link className="focus-ring tlink" href="/about">
                  About
                </Link>
              </li>
            </ul>
            <a className="stamp focus-ring" href={`mailto:${siteConfig.email}`}>
              Open to internships
            </a>
          </div>
        </section>

        <section className="section scroll-mt-24" id="work">
          <div className="section-head" data-reveal>
            <h2 className="section-title">
              <Underlined>Things I&rsquo;ve built</Underlined>
            </h2>
            <Link className="focus-ring tlink text-ink-2" href="/projects">
              See all {projects.length}
            </Link>
          </div>
          <WorkList projects={featured} />
        </section>

        {/* Live, and the only thing here that is true this week. */}
        <ShipLog />

        {/*
          Rendered only where there is somewhere to put what people write — see
          lib/guestbook-store.ts. A sign-in box that silently drops a message is
          worse than no sign-in box.
        */}
        {guestbookIsConfigured ? (
          <section className="section scroll-mt-24" data-reveal id="guestbook">
            <div className="section-head">
              <h2 className="section-title">
                <Underlined>Leave a note</Underlined>
              </h2>
              <p className="text-ink-2">No account, no email. A name and a line.</p>
            </div>
            <Guestbook />
          </section>
        ) : null}
      </div>
    </PosterProvider>
  );
}
