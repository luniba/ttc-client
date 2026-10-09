"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { useState, type ReactNode } from "react"
import { Toaster } from "react-hot-toast"

import { TooltipProvider } from "@/components/ui/tooltip"
import { useSessionSync } from "@/hooks/use-session-sync"
import { makeQueryClient } from "@/lib/query-client"

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <SessionSync />
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "rounded-lg! border border-border bg-popover! text-sm! font-medium text-foreground! shadow-lg!",
        }}
      />
    </QueryClientProvider>
  )
}

function SessionSync() {
  useSessionSync()
  return null
}
