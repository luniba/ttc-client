import type { Metadata } from "next"

import { DownloadPage } from "@/features/courses/components/download-page"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  path: "/download-tesol-course",
  title: "Free course guide",
  description:
    "Download a free preview of the TESOL TEFL Council course content (PDF).",
})

export default function Page() {
  return <DownloadPage />
}
