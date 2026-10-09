import { cn } from "cn"
import Link from "next/link"

import { Logo } from "@/components/common/logo"
import { MobileNav } from "@/components/common/mobile-nav"
import { navLinks } from "@/components/common/nav-links"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { Container } from "@/components/common/container"
import { HeaderShell } from "@/components/common/header-shell"

export function SiteHeader() {
  return (
    <HeaderShell>
      <Container className="flex h-20 items-center justify-between gap-8">
        <div className="flex items-center gap-10 xl:gap-12">
          <Link
            href={routes.home()}
            aria-label="TESOL TEFL Council"
            className="text-foreground group-data-[tone=dark]/header:text-white"
          >
            <Logo name="TESOL TEFL Council" />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-base font-semibold text-muted-foreground transition-colors group-data-[tone=dark]/header:text-white/80 hover:text-foreground group-data-[tone=dark]/header:hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={routes.login()}
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "rounded-full group-data-[tone=dark]/header:text-white group-data-[tone=dark]/header:hover:bg-white/10"
            )}
          >
            Log in
          </Link>
          <Link
            href={routes.courses()}
            className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
          >
            Enroll now
          </Link>
        </div>
        <MobileNav
          links={navLinks}
          menuLabel="Menu"
          login={{ href: routes.login(), label: "Log in" }}
          cta={{
            href: routes.courses(),
            label: "Enroll now",
          }}
        />
      </Container>
    </HeaderShell>
  )
}
