// Placeholder rows while a list loads, shaped like the real rows.
export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div
      aria-busy
      className="divide-y divide-neutral-200 rounded-xl border border-neutral-200"
    >
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <div className="size-10 shrink-0 animate-pulse rounded-lg bg-neutral-100" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-100" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-100" />
          </div>
        </div>
      ))}
    </div>
  )
}
