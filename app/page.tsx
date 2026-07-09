import { siteConfig } from "@/lib/data/site";

export default function Home() {
  return (
    <main className="shell py-16">
      <section className="grid min-h-[62vh] content-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="mono-label mb-5 text-[color:var(--accent)]">systems / ai / retrieval</p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-[color:var(--foreground)] sm:text-6xl">
            I like software that has to stay correct while the real world is being annoying.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[color:var(--muted)]">{siteConfig.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {siteConfig.proof.map((item) => (
              <span
                className="border border-[color:var(--line)]/40 bg-[color:var(--surface)] px-3 py-2 font-mono text-xs text-[color:var(--foreground)]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="border border-[color:var(--line)]/35 bg-[color:var(--surface)] p-5 font-mono text-sm text-[color:var(--muted)]">
          <p className="text-[color:var(--accent)]">$ status --watch</p>
          <p className="mt-4">rag index warm</p>
          <p>inference path live</p>
          <p>latency budget watched</p>
          <p className="mt-4 text-[color:var(--accent-alt)]">packet stream ready</p>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-t border-[color:var(--line)]/30 py-14">
        <p className="mono-label text-[color:var(--accent)]">about</p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          I am an undergrad at IIT Jodhpur CSE, mostly pulled toward distributed systems, RAG
          pipelines, and real-time ML inference. I care about the parts where clean models meet
          messy constraints: data freshness, queueing, retrieval quality, and the tiny failures that
          only show up when something is live.
        </p>
      </section>

      <section id="experience" className="scroll-mt-24 border-t border-[color:var(--line)]/30 py-14">
        <p className="mono-label text-[color:var(--accent)]">experience</p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          I am interested in engineering work where the system has to be observable, fast enough,
          and honest about its failure modes. The parts I enjoy most are usually the ones between
          clean APIs and messy runtime behavior.
        </p>
      </section>

      <section id="projects" className="scroll-mt-24 border-t border-[color:var(--line)]/30 py-14">
        <p className="mono-label text-[color:var(--accent)]">projects</p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          I keep project notes short: what I built, what made it tricky, and where the code lives.
          The interesting part is usually the tradeoff, not the screenshot.
        </p>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-[color:var(--line)]/30 py-14">
        <p className="mono-label text-[color:var(--accent)]">contact</p>
        <a className="mt-4 inline-block text-lg text-[color:var(--foreground)]" href={siteConfig.links.email.href}>
          {siteConfig.email}
        </a>
      </section>
    </main>
  );
}
