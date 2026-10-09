"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"

import { routes } from "@/config/routes"
import { useAuth } from "@/features/auth/services/me"

// Renders children only for a signed-in user. "unknown" (still asking /auth/me) shows a skeleton,
// so a hard reload never bounces a signed-in user to the login page.
export function AuthGate({ children }: { children: ReactNode }) {
  const { status } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "unauthenticated") router.replace(routes.login(pathname))
  }, [status, router, pathname])

  if (status !== "authenticated")
    return (
      <div
        aria-busy
        className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-20"
      >
        <div className="h-8 w-1/2 animate-pulse rounded-lg bg-muted" />
        <div className="h-24 animate-pulse rounded-2xl bg-muted" />
      </div>
    )
  return children
}
