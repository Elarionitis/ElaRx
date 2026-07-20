import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { siteConfig } from "@/lib/data/site";

export default function Home() {
  return (
    <div id="top" className="shell">
      <Hero />
      <About />
      <Experience />
      <Skills />

      <section id="projects" className="scroll-mt-24 border-t border-line/70 py-14">
        <p className="eyebrow text-accent">projects</p>
        <div className="mt-5 border-y border-line/70">
          <div className="grid gap-3 py-6 sm:grid-cols-[2rem_1fr]">
            <p className="font-mono text-sm text-accent">&gt;</p>
            <div>
              <p className="font-display text-2xl font-semibold">Project list scaffold</p>
              <p className="mt-2 max-w-2xl leading-7 text-muted">
                This section is reserved for the project-list signature from the design plan: list rows, filled chips, links, and a terminal-style detail pane.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-line/70 py-14">
        <p className="eyebrow text-accent">contact</p>
        <a className="focus-ring mt-4 inline-block text-lg text-foreground" href={siteConfig.links.email.href}>
          {siteConfig.email}
        </a>
      </section>
    </div>
  );
}
