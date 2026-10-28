import Link from "next/link";

import { BackToTop } from "@/components/BackToTop";
import { siteConfig } from "@/lib/data/site";

const elsewhere = [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.x];

export function Colophon() {
  return (
    <footer className="mt-24 border-t border-rule-2">
      <div className="sheet grid gap-10 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
        <div className="min-w-0" data-reveal>
          <p className="label">Contact</p>
          <p className="measure mt-4 text-[1.35rem] leading-[1.35] tracking-[-0.02em] text-ink sm:text-[1.6rem]">
            If any of this is the kind of problem you are working on, I would like to hear about it.
          </p>

          {/*
            The address is the point of the footer, so it is set as the one
            oversized line on the page rather than as another small button.
          */}
          <a className="contact-address focus-ring" href={`mailto:${siteConfig.email}`}>
            <span className="contact-address-text">{siteConfig.email}</span>
            <span aria-hidden="true" className="contact-address-arrow">
              &#8599;
            </span>
          </a>

          <div className="mt-7 flex flex-wrap gap-2">
            <Link className="focus-ring btn btn-line" href="/resume">
              Resume
            </Link>
            <Link className="focus-ring btn btn-line" href="/projects">
              Projects
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:items-end md:text-right" data-reveal>
          <div>
            <p className="label">Elsewhere</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm md:justify-end">
              {elsewhere.map((link) => (
                <li key={link.url}>
                  <a className="focus-ring tlink text-ink-2" href={link.url} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="focus-ring tlink text-ink-2" href="/writing/rss.xml">
                  RSS
                </a>
              </li>
            </ul>
          </div>
          <BackToTop />
          <p className="label flex flex-wrap gap-x-2 md:justify-end">
            <span className="num">{new Date().getFullYear()}</span>
            <span aria-hidden="true">&middot;</span>
            <span>Set in Archivo and IBM Plex Mono</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
