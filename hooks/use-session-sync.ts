"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

import { onSession } from "@/lib/session-channel"

// Any sign-in or sign-out, in any tab, drops every cached result so no user sees another's data.
// resetQueries (not clear) also makes on-screen queries fetch again, so the auth gate re-checks
// the session and redirects instead of showing the previous user.
export function useSessionSync() {
  const queryClient = useQueryClient()
  useEffect(
    () => onSession(() => void queryClient.resetQueries()),
    [queryClient]
  )
}
