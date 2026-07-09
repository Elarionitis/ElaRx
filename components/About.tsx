export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-[color:var(--line)]/30 py-14">
      <p className="mono-label text-[color:var(--accent)]">about</p>
      <div className="mt-5 max-w-3xl space-y-4 text-lg leading-8 text-[color:var(--muted)]">
        <p>
          I am doing B.Tech CS at IIT Jodhpur, class of 2028. I like building end-to-end: the UI,
          the API, the data path, and the uncomfortable middle where everything has to stay fast
          enough.
        </p>
        <p>
          Lately I keep circling back to <span className="font-mono text-[color:var(--foreground)]">distributed systems</span>{" "}
          and <span className="font-mono text-[color:var(--foreground)]">AI-integrated software</span> because that is
          where small design choices become visible under real traffic.
        </p>
      </div>
    </section>
  );
}
