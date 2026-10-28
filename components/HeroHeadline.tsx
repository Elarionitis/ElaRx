/*
  The display line is the one piece of type on the site large enough for the
  reveal to read as choreography rather than as a fade. Each word sits in its
  own clipped box and rises from under it, a fifth of a second apart.

  Splitting happens on the server, so the markup a crawler or a reader-mode
  parser sees is still one heading with one accessible name.
*/
export function HeroHeadline({ className, text }: { className?: string; text: string }) {
  const words = text.split(" ");

  return (
    <h1
      className={`hero-headline ${className ?? ""}`}
      data-lens-copy={text}
      data-lens-target
    >
      {words.map((word, index) => (
        // The space lives between the clip boxes, never inside one: an
        // `overflow: hidden` inline-block eats a trailing space whole.
        <span key={`${word}-${index}`}>
          <span className="hero-word">
            <span className="hero-word-inner" style={{ "--word-index": index } as React.CSSProperties}>
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}
