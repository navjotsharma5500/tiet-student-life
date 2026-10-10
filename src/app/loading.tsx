export default function Loading() {
  return (
    <div className="container py-16" aria-busy="true" aria-live="polite">
      <div className="h-3 w-24 rounded bg-cream-deep" />
      <div className="mt-4 h-10 w-2/3 max-w-xl rounded-lg bg-cream-deep" />
      <div className="mt-3 h-5 w-1/2 max-w-md rounded bg-cream-deep" />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="h-48 rounded-2xl bg-cream-deep animate-pulse" />)}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
