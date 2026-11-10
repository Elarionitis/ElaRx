import Image from "next/image";
import Link from "next/link";

import { Guestbook } from "@/components/Guestbook";
import { PosterLink, PosterProvider } from "@/components/PosterCard";
import { ShipLog } from "@/components/ShipLog";
import { WorkList } from "@/components/WorkList";
import { guestbookIsConfigured } from "@/lib/guestbook-store";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site";

/*
  The homepage introduces a person. That is all it is for.

  It used to carry a statistics strip, a diagram panel and a twenty-entry
  decision log, and the effect was a front page that read as documentation
  for the projects. Those things still exist — on /projects, under the
  project they belong to — and what is left here is three short sections:
  who I am, what I have made, and somewhere to answer.

  There is one interaction, and it is the same one everywhere: point at a
  project's name, in the opening sentence or in the list, and its poster
  comes up beside the cursor. The first screen behaves the way the rest of
  the page does.
*/

const elsewhere = [
  siteConfig.links.github,
  siteConfig.links.x,
  siteConfig.links.linkedin,
  { label: "Email", url: `mailto:${siteConfig.email}` },
  { label: "Resume", url: "/resume" },
];

function SectionHeading({ children, more, moreHref }: { children: string; more?: string; moreHref?: string }) {
  return (
    <div className="clause flex items-baseline justify-between gap-4">
      <h2 className="label">{children}</h2>
      {more && moreHref ? (
        <Link className="focus-ring tlink shrink-0 text-sm text-ink-2" href={moreHref}>
          {more}
        </Link>
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <PosterProvider slugs={projects.map((project) => project.slug)}>
      <div className="sheet pb-4">
        <section className="intro">
          <div className="intro-id" data-reveal>
            <div className="intro-portrait">
              <Image
                alt={siteConfig.name}
                height={160}
                priority
                quality={90}
                sizes="72px"
                src={siteConfig.profileImage}
                width={160}
              />
            </div>
            <div>
              <p className="intro-name">{siteConfig.name}</p>
              <p className="label mt-1.5">Software engineer &middot; {siteConfig.location}</p>
            </div>
          </div>

          <h1 className="intro-statement" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            I like building software from the layer underneath.{" "}
            <span className="intro-quiet">Lately that has been</span> <PosterLink slug="orbit">Orbit</PosterLink>
            <span className="intro-quiet">, a chat server written from the socket up;</span>{" "}
            <PosterLink slug="signease">SignEase</PosterLink>
            <span className="intro-quiet">, which reads sign language off a webcam; and</span>{" "}
            <PosterLink slug="tradstrat">TradStrat</PosterLink>
            <span className="intro-quiet">, a backtester that tries to prove your strategy wrong.</span>
          </h1>

          <div className="intro-foot" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            <p className="intro-now">
              <span aria-hidden="true" className="ship-pulse" />
              CS undergrad at IIT Jodhpur. {siteConfig.contact}{" "}
              <Link className="focus-ring tlink text-ink" href="/about">
                More about me
              </Link>
            </p>
            <ul className="intro-links">
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
            </ul>
          </div>
        </section>

        <section className="scroll-mt-24 pt-14 sm:pt-20" id="work">
          <div data-reveal>
            <SectionHeading more="Read the case studies" moreHref="/projects">
              Things I have built
            </SectionHeading>
          </div>
          <div className="mt-2">
            <WorkList projects={projects} />
          </div>
        </section>

        {/* Live, and the only thing here that is true this week. */}
        <ShipLog />

        {/*
          Rendered only where there is somewhere to put what people write — see
          lib/guestbook-store.ts. A sign-in box that silently drops a message is
          worse than no sign-in box.
        */}
        {guestbookIsConfigured ? (
          <section className="scroll-mt-24 pt-14 sm:pt-20" data-reveal id="guestbook">
            <SectionHeading>Guestbook</SectionHeading>
            <p className="guestbook-invite">
              You have read mine. Say something back.{" "}
              <span>No account, no email — a name and a line.</span>
            </p>
            <div className="mt-6">
              <Guestbook />
            </div>
          </section>
        ) : null}
      </div>
    </PosterProvider>
  );
}
