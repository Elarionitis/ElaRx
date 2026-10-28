/*
  A template re-mounts on every navigation, which is the one hook the App
  Router gives a route change. The animation is short and purely visual —
  navigation is never held back waiting for it, and the gate keeps it off for
  reduced motion and for visitors without JavaScript.
*/
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-frame">{children}</div>;
}
