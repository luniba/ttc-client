import type { Metadata } from "next"
import Link from "next/link"

import { routes } from "@/config/routes"
import { AuthShell } from "@/features/auth/components/auth-shell"
import { LoginForm } from "@/features/auth/components/login-form"
import { UserCircleIcon } from "@/features/auth/components/user-circle-icon"

export const metadata: Metadata = { title: "Log in", robots: { index: false } }

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams

  return (
    <AuthShell
      home={routes.home()}
      siteName="TESOL TEFL Council"
      icon={UserCircleIcon}
      title="Log in to your account"
      description="Welcome back. Log in with your email."
      footer={
        <>
          {"New here?"}{" "}
          <Link
            href={routes.courses()}
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            Browse our courses
          </Link>
        </>
      }
    >
      <LoginForm next={typeof next === "string" ? next : undefined} />
    </AuthShell>
  )
}
