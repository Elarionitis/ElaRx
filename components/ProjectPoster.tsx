/*
  One poster per project.

  They are drawn, not screenshotted or generated: every one is plain SVG, so
  it is sharp at card size and at thumbnail size, weighs nothing, and can be
  rendered on the server.

  Each poster keeps its own palette in both themes. A poster is an object with
  a colour, not a surface that follows the page, and the contrast between it
  and the quiet document around it is the point.

  No gradients or <defs>: the same poster is rendered more than once per page
  (thumbnail and floating card), and an id that resolves into a hidden copy
  renders as nothing in some browsers.
*/

const sans = { fontFamily: "var(--ff-body), system-ui, sans-serif" } as const;
const mono = { fontFamily: "var(--ff-mono), ui-monospace, monospace" } as const;

function Frame({
  children,
  ground,
  label,
}: {
  children: React.ReactNode;
  ground: string;
  label: string;
}) {
  return (
    <svg
      aria-label={label}
      className="poster"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      style={sans}
      viewBox="0 0 400 500"
    >
      <rect fill={ground} height="500" width="400" />
      {children}
    </svg>
  );
}

/* The strip every poster shares: name left, a tag right, a rule under both. */
function Masthead({ ink, name, tag }: { ink: string; name: string; tag: string }) {
  return (
    <g fill={ink} fontSize="11" letterSpacing="2.4" style={mono}>
      <text x="24" y="36">{name}</text>
      <text textAnchor="end" x="376" y="36">{tag}</text>
      <rect height="1" opacity="0.45" width="352" x="24" y="50" />
    </g>
  );
}

function Footer({ children, ink }: { children: string; ink: string }) {
  return (
    <text fill={ink} fontSize="10.5" letterSpacing="2" style={mono} x="24" y="476">
      {children}
    </text>
  );
}

function Orbit() {
  const lime = "#c8ff3e";
  return (
    <Frame ground="#0a0f1f" label="Orbit poster: concentric orbits around a core, 17.4 million deliveries per second">
      <g fill="none" stroke={lime}>
        <circle cx="200" cy="208" opacity="0.9" r="44" strokeWidth="1.5" />
        <circle cx="200" cy="208" opacity="0.6" r="84" strokeDasharray="2 7" strokeWidth="1.5" />
        <circle cx="200" cy="208" opacity="0.45" r="124" strokeWidth="1" />
        <circle cx="200" cy="208" opacity="0.3" r="166" strokeDasharray="14 10" strokeWidth="1" />
        <circle cx="200" cy="208" opacity="0.16" r="212" strokeWidth="1" />
      </g>
      <ellipse cx="200" cy="208" fill="none" opacity="0.55" rx="196" ry="58" stroke="#ffffff" strokeWidth="1" transform="rotate(-22 200 208)" />
      <circle cx="200" cy="208" fill={lime} r="15" />
      <circle cx="244" cy="208" fill="#ffffff" r="5" />
      <circle cx="141" cy="149" fill={lime} r="6" />
      <circle cx="288" cy="296" fill={lime} r="8" />
      <circle cx="70" cy="311" fill="#ffffff" r="4" />
      <circle cx="349" cy="135" fill="#ffffff" r="6" />
      <circle cx="18" cy="275" fill={lime} opacity="0.7" r="3" />
      <Masthead ink={lime} name="ORBIT" tag="C++20" />
      <text fill={lime} fontSize="96" fontWeight="700" letterSpacing="-5" x="20" y="440">
        17.4M<tspan fill="#ffffff" fontSize="44" letterSpacing="-1">/s</tspan>
      </text>
      <Footer ink="#ffffff">DELIVERIES · ZERO MESSAGES LOST</Footer>
    </Frame>
  );
}

/* The 21 hand landmarks MediaPipe returns, as an open palm. */
const WRIST: [number, number] = [200, 398];
const FINGERS: [number, number][][] = [
  [[152, 356], [116, 318], [96, 284], [80, 254]],
  [[166, 270], [156, 212], [151, 172], [147, 138]],
  [[200, 260], [200, 192], [200, 148], [200, 108]],
  [[232, 270], [242, 212], [247, 174], [250, 142]],
  [[260, 290], [280, 246], [290, 214], [297, 188]],
];

function SignEase() {
  const cream = "#fff1dc";
  const ink = "#1c0a04";
  return (
    <Frame ground="#ff4a26" label="SignEase poster: a hand drawn as tracked landmarks, 250 signs">
      <text fill="#e53a18" fontSize="250" fontWeight="700" letterSpacing="-14" textAnchor="middle" x="200" y="338">
        250
      </text>
      <g fill="none" stroke={cream} strokeLinecap="round" strokeWidth="3">
        {FINGERS.map((finger) => (
          <polyline key={finger[0]!.join()} points={[WRIST, ...finger].map((point) => point.join(",")).join(" ")} />
        ))}
        <polyline points={FINGERS.slice(1).map((finger) => finger[0]!.join(",")).join(" ")} />
      </g>
      {[WRIST, ...FINGERS.flat()].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} fill={cream} r="7.5" />
          <circle cx={x} cy={y} fill={ink} r="3" />
        </g>
      ))}
      <Masthead ink={ink} name="SIGNEASE" tag="LIVE" />
      <text fill={ink} fontSize="27" fontWeight="700" letterSpacing="-1" x="24" y="446">
        250 signs, read off a webcam.
      </text>
      <Footer ink={ink}>LANDMARKS TRACKED IN YOUR BROWSER</Footer>
    </Frame>
  );
}

/* Thirteen candles: seven climbing on tuned data, six falling on unseen. */
const CANDLES = [262, 240, 214, 196, 168, 142, 118, 136, 160, 178, 206, 228, 252];

function TradStrat() {
  const up = "#18e58a";
  const down = "#ff3358";
  return (
    <Frame ground="#090909" label="TradStrat poster: candlesticks rising then falling, zero of thirty strategies beat buy and hold">
      <rect fill="#ffffff" height="232" opacity="0.05" width="196" x="24" y="76" />
      {CANDLES.map((y, index) => {
        const rising = index < 7;
        const x = 34 + index * 27;
        return (
          <g fill={rising ? up : down} key={x}>
            <rect height="74" width="2" x={x + 6} y={y - 22} />
            <rect height="34" width="14" x={x} y={y - (rising ? 6 : 2)} />
          </g>
        );
      })}
      <polyline
        fill="none"
        points={CANDLES.map((y, index) => `${41 + index * 27},${y + 44}`).join(" ")}
        stroke="#ffffff"
        strokeDasharray="5 6"
        strokeWidth="1.5"
      />
      <g transform="rotate(-11 268 150)">
        <rect fill="#090909" height="40" stroke={down} strokeWidth="2.5" width="204" x="170" y="130" />
        <text fill={down} fontSize="15" fontWeight="500" letterSpacing="2.6" style={mono} textAnchor="middle" x="272" y="156">
          NOT SIGNIFICANT
        </text>
      </g>
      <Masthead ink="#ffffff" name="TRADSTRAT" tag="2007 – 2025" />
      <text fill="#ffffff" fontSize="150" fontWeight="700" letterSpacing="-9" x="16" y="442">
        0<tspan fill={down}>/</tspan>30
      </text>
      <Footer ink="#ffffff">STRATEGIES THAT BEAT BUY &amp; HOLD</Footer>
    </Frame>
  );
}

function CareQueue() {
  const red = "#e3002a";
  const ink = "#191919";
  const rows = [96, 136, 176];
  const columns = [48, 92, 136, 180, 224, 268, 312, 356];
  return (
    <Frame ground="#f5ecdd" label="CareQueue poster: a waiting room of identical circles with one flagged, 56.7 percent of critical outcomes caught">
      {rows.flatMap((y) =>
        columns.map((x) =>
          x === 268 && y === 136 ? null : (
            <circle cx={x} cy={y} fill="none" key={`${x}-${y}`} r="13" stroke={ink} strokeWidth="1.5" />
          ),
        ),
      )}
      <circle cx="268" cy="136" fill={red} opacity="0.14" r="46" />
      <circle cx="268" cy="136" fill={red} opacity="0.28" r="29" />
      <circle cx="268" cy="136" fill={red} r="14" />
      <path
        d="M24 262h118l14-12 12 12h22l12 34 22-104 20 96 12-26h20l10-10 12 10h82"
        fill="none"
        stroke={red}
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <Masthead ink={ink} name="CAREQUEUE" tag="TRIAGE" />
      <text fill={ink} fontSize="118" fontWeight="700" letterSpacing="-7" x="18" y="438">
        56.7<tspan fill={red}>%</tspan>
      </text>
      <Footer ink={ink}>CRITICAL OUTCOMES CAUGHT · VS 39.0%</Footer>
    </Frame>
  );
}

function Spendly() {
  const ink = "#121212";
  const violet = "#5a2bff";
  const hub: [number, number] = [206, 190];
  const people: [number, number][] = [[70, 108], [336, 96], [352, 262], [200, 312], [52, 262]];
  return (
    <Frame ground="#ffd60a" label="Spendly poster: five people settled through one hub, n minus one payments">
      <circle cx="132" cy="176" fill={violet} r="112" />
      <circle cx="286" cy="226" fill={ink} r="78" />
      <circle cx="286" cy="226" fill="none" r="96" stroke={ink} strokeWidth="1.5" />
      <g stroke="#ffffff" strokeWidth="2.5">
        {people.map(([x, y]) => (
          <line key={`${x}-${y}`} x1={hub[0]} x2={x} y1={hub[1]} y2={y} />
        ))}
      </g>
      {people.map(([x, y]) => (
        <circle cx={x} cy={y} fill="#ffffff" key={`${x}-${y}`} r="11" stroke={ink} strokeWidth="2.5" />
      ))}
      <circle cx={hub[0]} cy={hub[1]} fill="#ffd60a" r="17" stroke={ink} strokeWidth="2.5" />
      <Masthead ink={ink} name="SPENDLY" tag="LEDGER" />
      <text fill={ink} fontSize="150" fontWeight="700" letterSpacing="-8" x="18" y="442">
        n<tspan fill={violet}>−</tspan>1
      </text>
      <Footer ink={ink}>PAYMENTS TO SETTLE N PEOPLE</Footer>
    </Frame>
  );
}

function Aeris() {
  const pale = "#c9f2e6";
  const sun = "#ff9f1c";
  return (
    <Frame ground="#0d4a59" label="Aeris poster: layered air currents under a hazy sun, ward-level air quality forecasting">
      <circle cx="292" cy="150" fill={sun} opacity="0.14" r="96" />
      <circle cx="292" cy="150" fill={sun} opacity="0.3" r="66" />
      <circle cx="292" cy="150" fill={sun} r="42" />
      <g fill="none" stroke={pale} strokeLinecap="round">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
          const y = 118 + index * 25;
          const lift = index % 2 === 0 ? 18 : -14;
          return (
            <path
              d={`M-10 ${y}C70 ${y - lift} 130 ${y + lift} 200 ${y}S330 ${y - lift} 410 ${y + lift / 2}`}
              key={y}
              opacity={0.25 + index * 0.085}
              strokeWidth={1 + index * 0.35}
            />
          );
        })}
      </g>
      <Masthead ink={pale} name="AERIS" tag="WARD LEVEL" />
      <text fill="#f0fff9" fontSize="150" fontWeight="700" letterSpacing="-8" x="16" y="442">
        AQ<tspan fill={sun}>I</tspan>
      </text>
      <Footer ink={pale}>FORECAST · ATTRIBUTE · INSPECT</Footer>
    </Frame>
  );
}

const TREE = ["repo/", "├─ README.md", "├─ package.json", "├─ src/", "│  ├─ server.ts", "│  └─ tools.ts", "└─ → context.json"];

function RepoContext() {
  const green = "#3dff8b";
  return (
    <Frame ground="#0e0f0e" label="Repo Context MCP poster: a file tree handed to an agent as structured context">
      <text fill={green} fontSize="300" fontWeight="500" opacity="0.13" style={mono} x="150" y="330">
        {"}"}
      </text>
      <g fill={green} fontSize="17" style={mono}>
        {TREE.map((line, index) => (
          <text key={line} opacity={index === TREE.length - 1 ? 1 : 0.78} x="26" xmlSpace="preserve" y={104 + index * 30}>
            {line}
          </text>
        ))}
      </g>
      <rect fill={green} height="20" width="11" x="216" y="269" />
      <Masthead ink={green} name="REPO CONTEXT" tag="MCP" />
      <text fill="#ffffff" fontSize="140" fontWeight="700" letterSpacing="-8" x="16" y="442">
        MC<tspan fill={green}>P</tspan>
      </text>
      <Footer ink={green}>A REPOSITORY, AS AN AGENT READS IT</Footer>
    </Frame>
  );
}

const POSTERS: Record<string, () => React.JSX.Element> = {
  aeris: Aeris,
  carequeue: CareQueue,
  orbit: Orbit,
  "repo-context-mcp": RepoContext,
  signease: SignEase,
  spendly: Spendly,
  tradstrat: TradStrat,
};

/** Whether a project has a poster. A new project renders without one until it is drawn. */
export function hasPoster(slug: string) {
  return slug in POSTERS;
}

export function ProjectPoster({ slug }: { slug: string }) {
  const Poster = POSTERS[slug];
  return Poster ? <Poster /> : null;
}
