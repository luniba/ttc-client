"use client"

import { cn } from "cn"
import { SidebarLeft } from "iconsax-reactjs"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { routes } from "@/config/routes"
import { useAuth } from "@/features/auth/services/me"
import { AppSidebar } from "@/features/dashboard/components/app-sidebar"
import { UserMenu } from "@/features/dashboard/components/user-menu"
import { allNav } from "@/features/dashboard/config/nav"

const searchId = "app-search"

// Navy sidebar and frame (#0E172B, the brand primary); the current page floats in a white card.
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const drawer = useRef<HTMLDialogElement>(null)

  // Ctrl/⌘ K jumps to the sidebar search, opening the sidebar first if it's collapsed.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "k") return
      e.preventDefault()
      setCollapsed(false)
      requestAnimationFrame(() => document.getElementById(searchId)?.focus())
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Nested pages (a course's modules, say) keep their section's title.
  const current =
    allNav.find((i) => i.area && pathname.startsWith(routes.admin(i.area))) ??
    allNav[0]

  return (
    <div className="flex h-svh bg-primary">
      <aside
        className={cn(
          "hidden shrink-0 transition-[width] duration-200 motion-reduce:transition-none lg:block",
          collapsed ? "w-17" : "w-68"
        )}
      >
        <AppSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          searchId={searchId}
        />
      </aside>
      <dialog
        ref={drawer}
        onClick={(e) => e.target === e.currentTarget && drawer.current?.close()}
        className="m-0 h-dvh max-h-none w-72 max-w-[85vw] bg-primary backdrop:bg-neutral-950/40 lg:hidden"
      >
        <AppSidebar onClose={() => drawer.current?.close()} />
      </dialog>
      <div className="flex min-w-0 flex-1 p-1 lg:ps-0 lg:pe-1.5 lg:pt-1.5 lg:pb-1.5">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-xs">
          <header className="flex items-center gap-3 px-4 pt-4 pb-2 sm:px-6 sm:pt-5">
            <Button
              variant="ghost"
              size="icon-sm"
              className="-ms-1.5 text-neutral-600 lg:hidden"
              aria-label="Open menu"
              onClick={() => drawer.current?.showModal()}
            >
              <SidebarLeft size={20} color="currentColor" aria-hidden />
            </Button>
            <h1 className="flex-1 truncate text-2xl font-medium tracking-tight">
              {current.label}
            </h1>
            {user && <UserMenu user={user} />}
          </header>
          <ScrollArea className="min-h-0 flex-1">
            {/* Full height so a page can fill it and scroll its own panes (see CourseShell). */}
            <main className="flex min-h-full flex-col px-4 pt-4 pb-10 sm:px-6">
              {children}
            </main>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
