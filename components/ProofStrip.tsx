import type { Stat } from "@/lib/data/site";

/*
  Four figures, set as instrument readings rather than as marketing counters.
  Each one is stated again in context further down the site — this row exists
  so the first screen carries evidence, not only a claim.
*/
export function ProofStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl className="proof-strip">
      {stats.map((stat, index) => (
        <div
          className="proof-cell"
          data-reveal
          key={stat.label}
          style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
        >
          <dt className="proof-value num">{stat.value}</dt>
          <dd className="proof-label label">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}
