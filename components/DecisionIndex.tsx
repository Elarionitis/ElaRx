import Link from "next/link";

import type { Decision } from "@/lib/data/decisions";

/*
  A cross-reference index, the way a specification lists its clauses by subject
  at the back. It answers "what kind of problems does this person actually
  solve" in one glance, using nothing but the decisions that already exist —
  and every reference is a link into the one it names.
*/
export function DecisionIndex({ decisions }: { decisions: Decision[] }) {
  const byDomain = new Map<string, Decision[]>();
  for (const decision of decisions) {
    byDomain.set(decision.domain, [...(byDomain.get(decision.domain) ?? []), decision]);
  }

  const groups = [...byDomain.entries()].sort((a, b) => b[1].length - a[1].length);

  return (
    <div>
      <p className="label clause">Index</p>
      <dl className="mt-4 grid gap-3">
        {groups.map(([domain, items]) => (
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4" key={domain}>
            <dt className="text-[0.95rem] text-ink-2">{domain}</dt>
            <dd className="flex flex-wrap justify-end gap-x-2.5">
              {items.map((decision) => (
                <Link
                  className="focus-ring ref transition-colors hover:text-ink"
                  href={`/#${decision.id}`}
                  key={decision.id}
                  title={decision.title}
                >
                  {decision.id}
                </Link>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
