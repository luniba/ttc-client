import { cn } from "cn"
import Link from "next/link"

import { Container } from "@/components/common/container"
import { Logo } from "@/components/common/logo"
import { footerColumns, footerMore } from "@/config/footer"
import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"

const link = "transition-colors hover:text-foreground"

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-neutral-50">
      <Container className="relative z-10">
        <div className="pt-20 pb-10">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
            <div>
              <Link href={routes.home()} aria-label="TESOL TEFL Council">
                <Logo name="TESOL TEFL Council" className="size-20" />
              </Link>
              <p className="mt-6 max-w-sm text-base text-muted-foreground">
                {
                  "Accredited, internationally recognised TESOL and TEFL courses. Study online at your own pace and start teaching English anywhere in the world."
                }
              </p>
              <address className="mt-4 text-base text-muted-foreground not-italic">
                {siteConfig.address}
              </address>
            </div>
            <div className="flex flex-wrap gap-x-16 gap-y-10">
              {footerColumns.map((column) => (
                <div key={column.title} className="space-y-3">
                  <p className="text-base font-semibold">{column.title}</p>
                  {column.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "block text-base text-muted-foreground",
                        link
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between pt-8 text-base text-muted-foreground md:flex-row md:items-center md:pb-4">
          <p>
            {`© ${new Date().getFullYear()} TESOL TEFL Council. All rights reserved.`}
          </p>
          <div className="mt-4 flex items-center gap-8 md:mt-0">
            {footerMore.map((item) => (
              <Link key={item.label} href={item.href} className={link}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
      <div className="relative h-42.25 md:h-82.5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 select-none"
        >
          <div className="text-center text-[160px] leading-[0.8] font-bold tracking-tighter whitespace-nowrap text-neutral-100 md:text-[390px]">
            {siteConfig.shortName}
          </div>
        </div>
      </div>
    </footer>
  )
}
