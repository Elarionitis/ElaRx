import { Section } from "@/components/Section";
import { skillGroups } from "@/lib/data/skills";

export function Skills() {
  return (
    <Section id="skills" label="Stack">
      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <dt className="eyebrow">{group.title}</dt>
            <dd className="mt-2 text-[0.95rem] leading-[1.6] text-muted">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
