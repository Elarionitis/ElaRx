import { skillGroups } from "@/lib/data/skills";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-[color:var(--line)]/30 py-14">
      <p className="mono-label text-[color:var(--accent)]">skills</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <section className="border-l border-[color:var(--line)]/35 pl-4" key={group.name}>
            <h2 className="font-mono text-sm text-[color:var(--foreground)]">{group.name}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  className="border border-[color:var(--line)]/35 bg-[color:var(--surface)] px-3 py-2 font-mono text-xs text-[color:var(--muted)]"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
