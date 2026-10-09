import { cn } from "cn"
import { Check } from "lucide-react"
import type { ReactNode } from "react"

export function CheckItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <span
        aria-hidden
        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600"
      >
        <Check className="size-3" strokeWidth={3.5} />
      </span>
      {children}
    </li>
  )
}
