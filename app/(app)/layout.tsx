import type { Metadata } from "next"

import { AuthGate } from "@/features/auth/components/auth-gate"
import { StaffGate } from "@/features/auth/components/staff-gate"
import { AppShell } from "@/features/dashboard/components/app-shell"

export const metadata: Metadata = { robots: { index: false } }

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <AuthGate>
      <StaffGate>
        <AppShell>{children}</AppShell>
      </StaffGate>
    </AuthGate>
  )
}
