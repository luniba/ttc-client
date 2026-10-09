import { ArrowLeft2 } from "iconsax-reactjs"
import Link from "next/link"
import type { ReactNode } from "react"

// "← All courses" above an admin page that was opened from a list.
export function BackLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 self-start text-sm font-semibold text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft2 size={16} color="currentColor" aria-hidden />
      {children}
    </Link>
  )
}
