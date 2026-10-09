"use client"

import { cn } from "cn"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"

const HEIGHT = 80

// Pages whose first section is dark: the header starts transparent with light text.
const darkTop: string[] = []

export function HeaderShell({ children }: { children: ReactNode }) {
  const [pinned, setPinned] = useState(false)
  const [shown, setShown] = useState(true)
  const pinnedRef = useRef(false)
  const lastY = useRef(0)
  const pathname = usePathname()
  const dark = !pinned && darkTop.some((p) => pathname.endsWith(p))

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastY.current
      lastY.current = y
      if (y <= HEIGHT) {
        pinnedRef.current = false
        setPinned(false)
        setShown(true)
      } else if (dy < -4 && !pinnedRef.current) {
        // Pin it off-screen first so the slide-down has somewhere to start from.
        pinnedRef.current = true
        setPinned(true)
        setShown(false)
        requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
      } else if (dy < -4) {
        setShown(true)
      } else if (dy > 4) {
        setShown(false)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="relative h-20">
      <header
        data-tone={dark ? "dark" : "light"}
        className={cn(
          "group/header inset-x-0 top-0 z-40",
          pinned
            ? "fixed bg-background/75 backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none"
            : cn("absolute", dark ? "bg-transparent" : "bg-background"),
          pinned && !shown && "-translate-y-full"
        )}
      >
        {children}
      </header>
    </div>
  )
}
