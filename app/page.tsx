import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { siteConfig } from "@/lib/data/site";

export default function Home() {
  return (
    <main className="shell">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />

      <section id="contact" className="scroll-mt-24 border-t border-[color:var(--line)]/30 py-14">
        <p className="mono-label text-[color:var(--accent)]">contact</p>
        <a className="mt-4 inline-block text-lg text-[color:var(--foreground)]" href={siteConfig.links.email.href}>
          {siteConfig.email}
        </a>
      </section>
    </main>
  );
}
