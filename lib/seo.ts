import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

type Props = { path: string; title: string; description: string }

export function buildMetadata({ path, title, description }: Props): Metadata {
  const url = path || "/"
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
  }
}
