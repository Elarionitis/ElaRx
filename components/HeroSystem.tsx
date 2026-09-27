const paths = [
  "M24 172C112 150 127 65 224 72s83 95 173 86 112-90 203-77",
  "M-8 74c74 6 108 76 194 62s101-97 194-78 105 103 202 89",
  "M78 218c42-42 95-24 128-66s68-70 130-36 96 82 174 29",
];

export function HeroSystem() {
  return (
    <div aria-hidden="true" className="hero-system">
      <div className="hero-system-grid" />
      <svg className="hero-system-lines" fill="none" preserveAspectRatio="none" viewBox="0 0 520 250">
        {paths.map((path, index) => (
          <path className={`hero-system-path hero-system-path-${index + 1}`} d={path} key={path} pathLength="1" />
        ))}
      </svg>
      <span className="hero-node hero-node-one" />
      <span className="hero-node hero-node-two" />
      <span className="hero-node hero-node-three" />
      <span className="hero-node hero-node-four" />
      <span className="hero-signal hero-signal-one" />
      <span className="hero-signal hero-signal-two" />
      <span className="hero-signal hero-signal-three" />
      <div className="hero-system-key">
        <span>PRODUCT</span>
        <span>INTELLIGENCE</span>
        <span>RELIABILITY</span>
      </div>
    </div>
  );
}
