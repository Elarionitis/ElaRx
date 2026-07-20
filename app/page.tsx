import { siteConfig } from "@/lib/data/site";

const statusLines = ["rag index warm", "inference loop live", "latency budget watched"];
const stackTags = ["distributed systems", "RAG pipelines", "real-time inference"];

export default function Home() {
  return (
    <div id="top" className="shell">
      <section className="grid min-h-[calc(100vh-4rem)] content-center gap-10 py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent">systems / AI / latency</p>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-normal text-foreground sm:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="mt-5 max-w-2xl text-2xl leading-snug text-foreground">{siteConfig.tagline}</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">{siteConfig.bio}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              className="focus-ring inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-mono text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
              href={siteConfig.links.email.href}
            >
              contact me
            </a>
            <a
              className="focus-ring inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-5 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
              href={siteConfig.links.github.href}
              rel="noreferrer"
              target="_blank"
            >
              github
            </a>
          </div>
        </div>

        <div className="status-strip grid gap-3 p-4 sm:grid-cols-3">
          {statusLines.map((line) => (
            <div className="flex items-center gap-3 font-mono text-xs text-muted" key={line}>
              <span className="size-2 rounded-full bg-accent" />
              <span>{line}</span>
            </div>
          ))}
        </div>
      </section>

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
