"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { ProjectPoster } from "@/components/ProjectPoster";

/*
  The one interaction on the homepage, shared by everything that names a
  project: point at the name and its poster arrives beside the cursor.

  It lives in a provider so that the sentence in the introduction and the rows
  of the project list drive the same card. That is what makes the page feel
  like one thing — the first screen behaves the way the rest of it does,
  rather than a still page with an effect waiting further down.

  The card is on springs rather than on a transition, which is the whole of
  the effect: it lags, overshoots, leans into the direction it is moving and
  squashes when it changes project, so it reads as an object with weight
  instead of a tooltip.

  Three springs, integrated once per frame:
    · position, underdamped, chasing the cursor
    · scale, underdamped, which is the bounce on arrival and departure
    · wobble, kicked whenever the poster changes

  The loop runs only while the card is visible or still settling. Reduced
  motion gets the card without the physics; touch never triggers it at all.
*/

const CARD_WIDTH = 272;
const CARD_HEIGHT = 340;
const GAP = 36;

type Handlers = {
  onBlur: () => void;
  onFocus: (event: React.FocusEvent<HTMLElement>) => void;
  onPointerEnter: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: React.PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLElement>) => void;
};

type PosterApi = {
  /** Slug of the project whose name is being pointed at, if any. */
  active: string | null;
  bind: (slug: string) => Handlers;
};

const PosterContext = createContext<PosterApi | null>(null);

type Spring = {
  x: number; y: number; vx: number; vy: number; tx: number; ty: number;
  scale: number; vScale: number; targetScale: number;
  wobble: number; vWobble: number;
  placed: boolean; frame: number; last: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/* True in the browser, false on the server, with no effect and no flash. */
const subscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function PosterProvider({ children, slugs }: { children: React.ReactNode; slugs: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  // The poster outlives the hover by the length of the exit bounce; clearing
  // it with the highlight would shrink an empty card.
  const [poster, setPoster] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);
  const isClient = useIsClient();
  const spring = useRef<Spring>({
    x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0,
    scale: 0, vScale: 0, targetScale: 0,
    wobble: 0, vWobble: 0,
    placed: false, frame: 0, last: 0,
  });

  const step = useCallback(function tick(now: number) {
    const s = spring.current;
    const card = cardRef.current;
    if (!card) return;

    // Capped, so a background tab coming back does not integrate one enormous
    // step and fling the card across the page.
    const dt = Math.min((now - s.last) / 1000, 0.032);
    s.last = now;

    if (reduced.current) {
      s.x = s.tx;
      s.y = s.ty;
      s.scale = s.targetScale;
      s.vx = s.vy = s.vScale = s.wobble = s.vWobble = 0;
    } else {
      s.vx += ((s.tx - s.x) * 130 - s.vx * 14) * dt;
      s.vy += ((s.ty - s.y) * 130 - s.vy * 14) * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      s.vScale += ((s.targetScale - s.scale) * 240 - s.vScale * 15) * dt;
      s.scale = Math.max(0, s.scale + s.vScale * dt);

      s.vWobble += (-s.wobble * 320 - s.vWobble * 11) * dt;
      s.wobble += s.vWobble * dt;
    }

    // Stretch along the direction of travel and thin across it, like anything
    // soft that is being pulled.
    const stretchX = clamp(Math.abs(s.vx) / 4200, 0, 0.16);
    const stretchY = clamp(Math.abs(s.vy) / 4200, 0, 0.16);
    const scaleX = s.scale * (1 + stretchX - stretchY + s.wobble);
    const scaleY = s.scale * (1 + stretchY - stretchX - s.wobble);
    const lean = clamp(s.vx / 85, -13, 13);

    card.style.transform = `translate3d(${s.x - CARD_WIDTH / 2}px, ${s.y - CARD_HEIGHT / 2}px, 0) rotate(${lean}deg) scale(${scaleX}, ${scaleY})`;
    card.style.opacity = String(clamp(s.scale * 1.8, 0, 1));

    if (s.targetScale === 0 && s.scale < 0.002 && Math.abs(s.vScale) < 0.02) {
      s.frame = 0;
      s.placed = false;
      card.style.opacity = "0";
      return;
    }
    s.frame = window.requestAnimationFrame(tick);
  }, []);

  const wake = useCallback(() => {
    const s = spring.current;
    if (s.frame) return;
    s.last = performance.now();
    s.frame = window.requestAnimationFrame(step);
  }, [step]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { reduced.current = query.matches; };
    sync();
    query.addEventListener("change", sync);
    const s = spring.current;
    return () => {
      query.removeEventListener("change", sync);
      if (s.frame) window.cancelAnimationFrame(s.frame);
      s.frame = 0;
    };
  }, []);

  /* Beside the cursor, on whichever side has room for it. */
  const aim = useCallback((clientX: number, clientY: number) => {
    const s = spring.current;
    const fitsRight = clientX + GAP + CARD_WIDTH < window.innerWidth - 12;
    s.tx = fitsRight ? clientX + GAP + CARD_WIDTH / 2 : clientX - GAP - CARD_WIDTH / 2;
    s.ty = clamp(clientY, CARD_HEIGHT / 2 + 12, window.innerHeight - CARD_HEIGHT / 2 - 12);
    if (!s.placed) {
      // First appearance: start where it is going, so it grows in place
      // rather than flying in from the corner of the window.
      s.x = s.tx;
      s.y = s.ty;
      s.vx = s.vy = 0;
      s.placed = true;
    }
  }, []);

  const show = useCallback((slug: string) => {
    const s = spring.current;
    s.targetScale = 1;
    // A change of poster is a small impact. Arrival already has its bounce.
    if (activeRef.current && activeRef.current !== slug) s.vWobble += 2.4;
    activeRef.current = slug;
    setActive(slug);
    setPoster(slug);
    wake();
  }, [wake]);

  const hide = useCallback(() => {
    spring.current.targetScale = 0;
    activeRef.current = null;
    setActive(null);
    wake();
  }, [wake]);

  const bind = useCallback((slug: string): Handlers => ({
    onBlur: hide,
    onFocus: (event) => {
      // Keyboard users get the card too, parked beside what they focused.
      if (!event.currentTarget.matches(":focus-visible")) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      aim(bounds.right, bounds.top + bounds.height / 2);
      show(slug);
    },
    onPointerEnter: (event) => {
      if (event.pointerType !== "mouse") return;
      aim(event.clientX, event.clientY);
      show(slug);
    },
    onPointerLeave: (event) => {
      if (event.pointerType === "mouse") hide();
    },
    onPointerMove: (event) => {
      if (event.pointerType !== "mouse") return;
      aim(event.clientX, event.clientY);
      wake();
    },
  }), [aim, hide, show, wake]);

  const api = useMemo(() => ({ active, bind }), [active, bind]);

  return (
    <PosterContext.Provider value={api}>
      {children}
      {/*
        Portalled to the body. The page-transition wrapper carries a
        transform, and a transformed ancestor becomes the containing block
        for position: fixed — inside it the card was placed relative to the
        top of the document and rendered a screen away from the cursor.

        Decorative: whatever was pointed at already names the project.
      */}
      {isClient
        ? createPortal(
            <div aria-hidden="true" className="poster-card" ref={cardRef}>
              {slugs.map((slug) => (
                <div className={`poster-card-face ${poster === slug ? "is-active" : ""}`} key={slug}>
                  <ProjectPoster slug={slug} />
                </div>
              ))}
            </div>,
            document.body,
          )
        : null}
    </PosterContext.Provider>
  );
}

export function usePoster(): PosterApi {
  const api = useContext(PosterContext);
  if (!api) throw new Error("usePoster needs a PosterProvider above it");
  return api;
}

/** A project's name inside running text. Pointing at it shows the poster. */
export function PosterLink({ children, slug }: { children: React.ReactNode; slug: string }) {
  const { active, bind } = usePoster();
  return (
    <Link
      className={`poster-link focus-ring ${active === slug ? "is-active" : ""}`}
      href={`/projects/${slug}`}
      {...bind(slug)}
    >
      {children}
    </Link>
  );
}
