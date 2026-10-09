import Link from "next/link"
import type { ComponentType, ReactNode, SVGProps } from "react"

import { Container } from "@/components/common/container"
import { Logo } from "@/components/common/logo"
import { FeaturedIcon } from "@/components/custom/featured-icon"

type Props = {
  home: string
  siteName: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: ReactNode
  children?: ReactNode
  footer?: ReactNode
}

export function AuthShell({
  home,
  siteName,
  icon,
  title,
  description,
  children,
  footer,
}: Props) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Container className="flex justify-center pt-6">
        <Link href={home} aria-label={siteName}>
          <Logo name={siteName} />
        </Link>
      </Container>
      <main className="flex flex-1 justify-center px-4 pt-14 pb-16 sm:pt-20">
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          <FeaturedIcon icon={icon} />
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-display-xs font-semibold text-balance">
              {title}
            </h1>
            <p className="text-base text-muted-foreground">{description}</p>
          </div>
          {children && (
            <div className="flex w-full flex-col gap-5">{children}</div>
          )}
          {footer && (
            <div className="text-center text-sm text-muted-foreground">
              {footer}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
