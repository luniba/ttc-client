import { cn } from "cn"
import type { Metadata } from "next"

import "./globals.css"
import { Providers } from "@/components/common/providers"
import { siteConfig } from "@/config/site"
import { generalSans } from "@/lib/fonts"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s · ${siteConfig.name}` },
  description:
    "Accredited 120-hour and 180-hour TESOL and TEFL courses, 100% online. Get certified and teach English online or abroad.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(generalSans.variable, "motion-safe:scroll-smooth")}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
