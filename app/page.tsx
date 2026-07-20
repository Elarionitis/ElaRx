import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { siteConfig } from "@/lib/data/site";

export default function Home() {
  return (
    <div id="top" className="shell">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />

      <section id="contact" className="scroll-mt-24 border-t border-line/70 py-14">
        <p className="eyebrow text-accent">contact</p>
        <a className="focus-ring mt-4 inline-block text-lg text-foreground" href={siteConfig.links.email.href}>
          {siteConfig.email}
        </a>
      </section>
    </div>
  );
}
