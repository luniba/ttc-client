"use client"

import { cn } from "cn"
import Link from "next/link"

import { MobileNav } from "@/components/common/mobile-nav"
import { navLinks } from "@/components/common/nav-links"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { useAuth } from "@/features/auth/services/me"

// Signed in: one button to their area. Otherwise Log in and Enroll now (what the server renders).
function useHeaderLinks() {
  const { user, status } = useAuth()
  if (status === "authenticated" && user) {
    const staff = user.role !== "student"
    return {
      signedIn: true,
      main: {
        href: staff ? routes.admin() : routes.account(),
        label: staff ? "Admin panel" : "My account",
      },
    }
  }
  return {
    signedIn: false,
    main: { href: routes.courses(), label: "Enroll now" },
  }
}

export function HeaderActions() {
  const { signedIn, main } = useHeaderLinks()
  return (
    <>
      {!signedIn && (
        <Link
          href={routes.login()}
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "rounded-full group-data-[tone=dark]/header:text-white group-data-[tone=dark]/header:hover:bg-white/10"
          )}
        >
          Log in
        </Link>
      )}
      <Link
        href={main.href}
        className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
      >
        {main.label}
      </Link>
    </>
  )
}

export function HeaderMobileNav() {
  const { signedIn, main } = useHeaderLinks()
  return (
    <MobileNav
      links={navLinks}
      menuLabel="Menu"
      login={
        signedIn
          ? { href: routes.courses(), label: "Browse courses" }
          : { href: routes.login(), label: "Log in" }
      }
      cta={main}
    />
  )
}
