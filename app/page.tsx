import { Hero } from "@/components/Hero";
import { siteConfig } from "@/lib/data/site";

const stackTags = ["distributed systems", "RAG pipelines", "real-time inference"];

export default function Home() {
  return (
    <div id="top" className="shell">
      <Hero />

      <section id="about" className="scroll-mt-24 border-t border-line/70 py-14">
        <p className="eyebrow text-accent">about</p>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
          I like building software where the interface is simple and the internals have to be careful: retrieval that stays relevant, inference that stays responsive, and systems that stay understandable.
        </p>
      </section>

      <section id="experience" className="scroll-mt-24 border-t border-line/70 py-14">
        <p className="eyebrow text-accent">experience</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {stackTags.map((tag) => (
            <span className="chip" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>

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
