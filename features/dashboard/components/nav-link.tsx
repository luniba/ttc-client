import { cn } from "cn"
import Link from "next/link"

import type { NavItem } from "@/features/dashboard/config/nav"

type Props = {
  item: NavItem
  href: string
  label: string
  active: boolean
  collapsed: boolean
  onNavigate?: () => void
}

export function NavLink({
  item,
  href,
  label,
  active,
  collapsed,
  onNavigate,
}: Props) {
  const Icon = item.icon
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      className={cn(
        // On the navy sidebar: soft white text, brighter on hover; the current page gets a
        // tinted pill and a gold icon (the public site's accent).
        "flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white",
        active && "bg-white/10 text-white",
        collapsed && "justify-center px-0"
      )}
    >
      <Icon
        size={18}
        color="currentColor"
        aria-hidden
        className={cn("shrink-0", active && "text-[#DDA540]")}
      />
      <span className={cn("truncate", collapsed && "sr-only")}>{label}</span>
    </Link>
  )
}
