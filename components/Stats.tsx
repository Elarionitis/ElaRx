import { siteConfig } from "@/lib/data/site";

/*
  Four figures, above the fold. Everything here is stated again in context
  further down the page — this is the version someone reads in two seconds.
*/
export function Stats() {
  return (
    <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
      {siteConfig.stats.map((stat) => (
        <div className="bg-surface px-4 py-4 sm:px-5" key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="figure block text-xl text-accent sm:text-2xl">{stat.value}</span>
            <span className="eyebrow mt-1.5 block">{stat.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
