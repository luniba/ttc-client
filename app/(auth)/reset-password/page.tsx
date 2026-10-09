import { LockKeyhole } from "lucide-react"
import type { Metadata } from "next"

import { routes } from "@/config/routes"
import { AuthShell } from "@/features/auth/components/auth-shell"
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form"

export async function generateMetadata(): Promise<Metadata> {
  // The token sits in this page's URL, so it must not leak to other sites through Referer.
  return {
    title: "Set a new password",
    robots: { index: false },
    referrer: "no-referrer",
  }
}

export default async function ResetPasswordPage({
  searchParams,
}: PageProps<"/reset-password">) {
  const { token } = await searchParams

  return (
    <AuthShell
      home={routes.home()}
      siteName="TESOL TEFL Council"
      icon={LockKeyhole}
      title="Set a new password"
      description="Choose a new password for your account."
    >
      <ResetPasswordForm token={typeof token === "string" ? token : ""} />
    </AuthShell>
  )
}
