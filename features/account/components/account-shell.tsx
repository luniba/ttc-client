"use client"

import { cn } from "cn"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

import { Container } from "@/components/common/container"
import { routes } from "@/config/routes"
import { LogoutButton } from "@/features/auth/components/logout-button"
import { useAuth } from "@/features/auth/services/me"

const tabs = [
  { href: routes.account(), label: "My courses" },
  { href: routes.accountProfile(), label: "Profile" },
  { href: routes.accountSettings(), label: "Settings" },
]

// Frame for every student page.
export function AccountShell({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <section className="py-10 md:py-16">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-brand-700">My account</p>
            <h1 className="text-display-xs font-semibold md:text-display-md">
              {user ? `Hello, ${user.name.split(" ")[0]}` : "Hello"}
            </h1>
          </div>
          <LogoutButton label="Log out" />
        </div>
        <nav
          aria-label="Account"
          className="flex gap-1 border-b border-neutral-200"
        >
          {tabs.map((t) => {
            const active = pathname === t.href
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "-mb-px border-b-2 px-4 py-3 text-base font-semibold transition-colors",
                  active
                    ? "border-brand-600 text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </Link>
            )
          })}
        </nav>
        {children}
      </Container>
    </section>
  )
}
