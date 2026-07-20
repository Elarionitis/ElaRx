import { skillGroups } from "@/lib/data/skills";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-line/70 py-14">
      <p className="eyebrow text-accent">skills</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <section className="border-t border-line/70 pt-4" key={group.title}>
            <h2 className="font-display text-xl font-semibold text-foreground">{group.title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
