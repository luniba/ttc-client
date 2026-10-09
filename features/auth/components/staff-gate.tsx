"use client"

import { cn } from "cn"
import { Lock1 } from "iconsax-reactjs"
import Link from "next/link"
import type { ReactNode } from "react"

import { EmptyState } from "@/components/custom/empty-state"
import { LoadingButton } from "@/components/custom/loading-button"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { useCan } from "@/features/auth/lib/permissions"
import { useLogout } from "@/features/auth/services/logout"

// The admin panel is for staff. A signed-in student gets a way out instead of a broken panel;
// the API refuses their requests either way.
export function StaffGate({ children }: { children: ReactNode }) {
  const logout = useLogout()
  if (useCan("panel.access")) return children

  return (
    <main className="mx-auto flex min-h-svh max-w-lg items-center px-4">
      <EmptyState
        icon={Lock1}
        title="This area is for staff only"
        description="The admin panel is for council staff. If you're a student, your courses will be available from your own account."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={routes.home()}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Back to the website
            </Link>
            <LoadingButton
              loading={logout.isPending}
              onClick={() => logout.mutate()}
            >
              Log out
            </LoadingButton>
          </div>
        }
      />
    </main>
  )
}
