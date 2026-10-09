"use client"

import { Lock1 } from "iconsax-reactjs"

import { EmptyState } from "@/components/custom/empty-state"

// Shown instead of a page the member's role cannot use (the API refuses it anyway).
export function NoAccess() {
  return (
    <EmptyState
      icon={Lock1}
      title="You don't have access to this page"
      description="Ask an administrator if you need to use this page."
    />
  )
}
