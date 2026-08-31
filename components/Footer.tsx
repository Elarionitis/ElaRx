import Link from "next/link";

import { siteConfig } from "@/lib/data/site";

const social = [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.x];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="shell py-14 sm:py-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
              Let&rsquo;s build something.
            </h2>
            <p className="mt-3 max-w-md text-muted">{siteConfig.contact}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a className="focus-ring btn btn-primary" href={`mailto:${siteConfig.email}`}>
              Email me
            </a>
            <Link className="focus-ring btn btn-ghost" href="/resume">
              Resume
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
            {social.map((link) => (
              <li key={link.url}>
                <a
                  className="focus-ring text-muted transition-colors hover:text-accent"
                  href={link.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                className="focus-ring text-muted transition-colors hover:text-accent"
                href="/writing/rss.xml"
              >
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
