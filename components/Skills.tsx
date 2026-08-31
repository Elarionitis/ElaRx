import { Section } from "@/components/Section";
import { skillGroups } from "@/lib/data/skills";

export function Skills() {
  return (
    <Section id="stack" label="Stack">
      <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <div
            className={`bg-surface px-5 py-4 ${
              index === skillGroups.length - 1 && skillGroups.length % 2 === 1 ? "sm:col-span-2" : ""
            }`}
            key={group.title}
          >
            <dt className="eyebrow">{group.title}</dt>
            <dd className="mt-2 text-sm leading-[1.55] text-muted">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
