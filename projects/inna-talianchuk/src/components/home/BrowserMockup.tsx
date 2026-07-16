/** Purely decorative layered browser-window composition (no fake analytics/metrics). */
export function BrowserMockup() {
  return (
    <div aria-hidden="true" className="relative">
      <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-card-border bg-glass-light backdrop-blur-md" />
      <div className="relative rounded-2xl border border-card-border bg-background shadow-soft overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-card-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-card-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-card-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-card-border" />
        </div>
        <div className="space-y-4 p-6">
          <div className="h-3 w-2/3 rounded-full bg-background-secondary" />
          <div className="h-3 w-1/2 rounded-full bg-background-secondary" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-16 rounded-xl bg-background-secondary" />
            <div className="h-16 rounded-xl bg-background-secondary" />
            <div className="h-16 rounded-xl bg-background-secondary" />
          </div>
          <div className="h-3 w-1/3 rounded-full bg-background-secondary" />
        </div>
      </div>
    </div>
  );
}
