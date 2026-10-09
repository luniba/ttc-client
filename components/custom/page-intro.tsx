import type { ReactNode } from "react"

// The line under a page's title saying why it matters, with the page's main action beside it.
export function PageIntro({
  children,
  action,
}: {
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <p className="max-w-2xl text-sm text-muted-foreground">{children}</p>
      {action}
    </div>
  )
}
