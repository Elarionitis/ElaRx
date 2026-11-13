import { DecisionDemo } from "@/components/DecisionDemo";
import type { Decision } from "@/lib/data/decisions";

/*
  The decisions behind one project or one job, written out as short notes.

  Each one is a heading and two paragraphs: what the situation was, then what
  was done about it and why. If it produced something measurable, that goes
  last on its own line.

  This used to be an accordion that opened into three side-by-side columns.
  In a narrow column the three squeezed down to a word or two per line, and
  the reader had to click to find out whether a note was worth reading at all.
  Plain paragraphs in one column have neither problem.
*/
export function Decisions({ items }: { items: Decision[] }) {
  if (items.length === 0) return null;

  return (
    <ol className="why-list">
      {items.map((decision) => (
        <li className="why-item" key={decision.id}>
          <h3 className="why-title">{decision.title}</h3>
          <p className="why-situation">{decision.constraint}</p>
          <p className="why-reason">{decision.reasoning}</p>
          {decision.outcome ? (
            <p className="why-outcome">
              <span className="why-outcome-mark">Result</span>
              {decision.outcome}
            </p>
          ) : null}
          {decision.demo ? <DecisionDemo demo={decision.demo} /> : null}
        </li>
      ))}
    </ol>
  );
}
