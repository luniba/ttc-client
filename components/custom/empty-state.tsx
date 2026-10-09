import type { Icon } from "iconsax-reactjs"
import type { ReactNode } from "react"

type Props = {
  icon: Icon
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50 px-6 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-xl border border-neutral-200 text-neutral-600 shadow-xs">
        <Icon size={24} color="currentColor" aria-hidden />
      </span>
      <p className="text-[15px] font-medium">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
