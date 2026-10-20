"use client"

import { cn } from "cn"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { KeyboardEvent, ReactNode } from "react"

export type CandidateTab = { id: string; label: string; panel: ReactNode }

// The open tab is in the URL (?tab=login). Only it renders, so the login isn't fetched until opened.
export function CandidateTabs({ tabs }: { tabs: CandidateTab[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const current = tabs.find((t) => t.id === params.get("tab")) ?? tabs[0]

  const open = (id: string) => {
    const next = new URLSearchParams(params)
    next.set("tab", id)
    router.replace(`${pathname}?${next}`, { scroll: false })
  }

  // Arrow keys move between tabs, like a native tab list.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
    if (!step) return
    e.preventDefault()
    const target = tabs[(i + step + tabs.length) % tabs.length]
    open(target.id)
    document.getElementById(`tab-${target.id}`)?.focus()
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Candidate"
        className="flex gap-1 overflow-x-auto border-b border-neutral-200"
      >
        {tabs.map((t, i) => {
          const active = t.id === current.id
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${t.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => open(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "-mb-px shrink-0 border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-none",
                active
                  ? "border-brand-600 text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
      >
        {current.panel}
      </div>
    </div>
  )
}
