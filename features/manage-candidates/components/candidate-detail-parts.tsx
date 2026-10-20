import type { ReactNode } from "react"

// A titled card and one labelled value in it.
export function Group({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      <dl className="grid gap-x-6 gap-y-4 rounded-xl bg-neutral-50 p-4 sm:grid-cols-2">
        {children}
      </dl>
    </section>
  )
}

export function Item({
  term,
  wide,
  mono,
  children,
}: {
  term: string
  wide?: boolean
  mono?: boolean
  children: ReactNode
}) {
  return (
    <div
      className={
        wide ? "flex flex-col gap-1 sm:col-span-2" : "flex flex-col gap-1"
      }
    >
      <dt className="text-xs text-muted-foreground">{term}</dt>
      <dd
        className={
          mono
            ? "font-mono text-sm break-all"
            : "text-sm font-medium break-words"
        }
      >
        {children}
      </dd>
    </div>
  )
}
