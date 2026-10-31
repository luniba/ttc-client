"use client"

import { Lock } from "lucide-react"

import { useCourseStatus } from "@/features/account/services/account"

// A paid module's lock; hidden once the signed-in student has access.
export function ModuleLock({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  if (useCourseStatus(slug) === "enrolled") return null
  return <Lock className={className} aria-label="Locked" />
}
