import Link from "next/link";

import { siteConfig } from "@/lib/data/site";

const elsewhere = [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.x];

export function Colophon() {
  return (
    <footer className="mt-24 border-t border-rule-2">
      <div className="sheet grid gap-10 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
        <div className="min-w-0">
          <p className="label">Contact</p>
          <p className="measure mt-4 text-[1.35rem] leading-[1.35] tracking-[-0.02em] text-ink sm:text-[1.6rem]">
            If any of this is the kind of problem you are working on, I would like to hear about it.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a className="focus-ring btn btn-solid" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <Link className="focus-ring btn btn-line" href="/resume">
              Resume
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:items-end md:text-right">
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
          <p className="label">
            <span className="num">{new Date().getFullYear()}</span> &middot; Set in Archivo and IBM Plex Mono
          </p>
        </div>
      </div>
    </footer>
  );
}
