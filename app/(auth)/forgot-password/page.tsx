import { KeyRound } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { routes } from "@/config/routes"
import { AuthShell } from "@/features/auth/components/auth-shell"
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot password",
  robots: { index: false },
}

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      home={routes.home()}
      siteName="TESOL TEFL Council"
      icon={KeyRound}
      title="Forgot your password?"
      description="Enter your email and we'll send you a link to set a new password."
      footer={
        <Link
          href={routes.login()}
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          Back to log in
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  )
}
