"use client";

/*
  A footer link rather than a floating button. By the time someone is down
  here they have read the page; what they need is a way back to the top of it,
  not a control that has been hovering over the text the whole way down.
*/
export function BackToTop() {
  return (
    <button
      className="back-to-top focus-ring label"
      onClick={() => {
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ behavior: smooth ? "smooth" : "auto", top: 0 });
      }}
      type="button"
    >
      <span aria-hidden="true" className="back-to-top-rule" />
      Back to top
    </button>
  );
}
