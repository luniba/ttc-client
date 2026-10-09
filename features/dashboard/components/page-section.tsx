import type { ReactNode } from "react"

type Props = {
  title: string
  description: string
  aside?: ReactNode
  children: ReactNode
}

// Heading + one-line description, then the section body — the rhythm every app page follows.
export function PageSection({ title, description, aside, children }: Props) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {aside}
      </div>
      {children}
    </section>
  )
}
