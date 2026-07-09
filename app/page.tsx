import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { siteConfig } from "@/lib/data/site";

export default function Home() {
  return (
    <main className="shell">
      <Hero />
      <About />
      <Experience />
      <Skills />

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
