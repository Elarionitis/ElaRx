import { Pen, Underlined } from "@/components/Ink";
import { getShipLog } from "@/lib/ship-log";

/*
  Dates are deliberately coarse. The page is regenerated hourly, so anything
  finer than a day would be rendered once and then slowly become a lie —
  "2 minutes ago" is only true for two minutes. At this resolution an hour of
  drift cannot change what the row says.
*/
function when(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.round(days / 7)} weeks ago`;
  return `${Math.round(days / 30)} months ago`;
}

export async function ShipLog() {
  const pushes = await getShipLog();
  // GitHub unreachable, rate limited, or nothing to report: say nothing.
  if (pushes.length === 0) return null;

  return (
    <section className="section scroll-mt-24" data-reveal id="lately">
      <div className="section-head">
        <h2 className="section-title">
          <Underlined>Lately</Underlined>
        </h2>
        <Pen className="ship-aside">straight from GitHub, I don&rsquo;t type these</Pen>
      </div>

      <ul className="ship-log">
        {pushes.map((push) => (
          <li key={push.url}>
            <a className="focus-ring ship-row" href={push.url} rel="noreferrer" target="_blank">
              <span className="ship-repo">{push.repo}</span>
              <span className="ship-message">{push.message}</span>
              <time className="ship-when label" dateTime={push.at}>
                {when(push.at)}
              </time>
            </a>
          </li>
        ))}
      </ul>

    </section>
  );
}
