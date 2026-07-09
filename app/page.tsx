import { Hero } from "@/components/Hero";
import { siteConfig } from "@/lib/data/site";

export default function Home() {
  return (
    <main className="shell">
      <Hero />

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
