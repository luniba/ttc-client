"use client"

import { LogOut } from "lucide-react"

import { LoadingButton } from "@/components/custom/loading-button"
import { useLogout } from "@/features/auth/services/logout"

export function LogoutButton({ label }: { label: string }) {
  const logout = useLogout()
  return (
    <LoadingButton
      variant="outline"
      className="rounded-full"
      loading={logout.isPending}
      icon={<LogOut />}
      onClick={() => logout.mutate()}
    >
      {label}
    </LoadingButton>
  )
}
