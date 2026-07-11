// ponytail: thin wrapper — no-ops when the tracker isn't loaded (dev, blockers, unset id)
export function track(event: string) {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(event);
  }
}
