"use client"

import { cn } from "cn"
import { SearchNormal1, SidebarLeft } from "iconsax-reactjs"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Logo, LogoMark } from "@/components/common/logo"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { routes } from "@/config/routes"
import { NavLink } from "@/features/dashboard/components/nav-link"
import { SidebarSearch } from "@/features/dashboard/components/sidebar-search"
import {
  footerNav,
  mainNav,
  type NavItem,
} from "@/features/dashboard/config/nav"

function SidebarBrand({
  name,
  collapsed,
  onToggle,
  toggleLabel,
  focusToggle,
}: {
  name: string
  collapsed: boolean
  onToggle?: () => void
  toggleLabel: string
  focusToggle?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 ps-1",
        collapsed && "flex-col ps-0"
      )}
    >
      {collapsed ? <LogoMark /> : <Logo name={name} className="size-12" />}
      {onToggle && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggle}
          aria-label={toggleLabel}
          autoFocus={focusToggle}
          className="text-white/60 hover:bg-white/10 hover:text-white"
        >
          <SidebarLeft size={20} color="currentColor" aria-hidden />
        </Button>
      )}
    </div>
  )
}

type Props = {
  collapsed?: boolean
  onToggle?: () => void
  // Set when shown as the mobile drawer.
  onClose?: () => void
  searchId?: string
}

export function AppSidebar({
  collapsed = false,
  onToggle,
  onClose,
  searchId,
}: Props) {
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const visible = mainNav.filter((i) => i.label.toLowerCase().includes(q))

  const link = (item: NavItem) => {
    const href = routes.admin(item.area)
    return (
      <NavLink
        key={item.label}
        item={item}
        href={href}
        label={item.label}
        active={item.area ? pathname.startsWith(href) : pathname === href}
        collapsed={collapsed}
        onNavigate={() => {
          setQuery("")
          onClose?.()
        }}
      />
    )
  }

  return (
    <div className="flex h-full flex-col gap-5 p-3">
      <SidebarBrand
        name="TESOL TEFL Council"
        collapsed={collapsed}
        onToggle={onClose ?? onToggle}
        focusToggle={!!onClose}
        toggleLabel={
          onClose
            ? "Close menu"
            : collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
        }
      />
      {collapsed ? (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggle}
          aria-label="Search"
          className="mx-auto text-white/60 hover:bg-white/10 hover:text-white"
        >
          <SearchNormal1 size={18} color="currentColor" aria-hidden />
        </Button>
      ) : (
        <SidebarSearch
          value={query}
          onChange={setQuery}
          label="Search"
          shortcut="Ctrl K"
          id={searchId}
        />
      )}
      <ScrollArea className="-mx-3 min-h-0 flex-1">
        <nav aria-label="Main" className="flex flex-col gap-0.5 px-3">
          {visible.map(link)}
          {visible.length === 0 && (
            <p className="px-2.5 py-2 text-sm text-white/50">No matches</p>
          )}
        </nav>
      </ScrollArea>
      <div className="flex flex-col gap-0.5">{footerNav.map(link)}</div>
    </div>
  )
}
