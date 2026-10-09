import type { Metadata } from "next"

import { AboutPage } from "@/features/about/components/about-page"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  path: "/about",
  title: "About",
  description:
    "TESOL TEFL Council is one of the top TESOL and TEFL training providers worldwide. Get certified online and teach English anywhere.",
})

export default function Page() {
  return <AboutPage />
}
