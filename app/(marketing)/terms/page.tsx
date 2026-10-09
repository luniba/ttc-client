import type { Metadata } from "next"

import { terms } from "@/content/terms"
import { LegalPage } from "@/features/legal/components/legal-page"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  path: "/terms",
  title: "Terms & conditions",
  description:
    "The terms that apply when you use our website, enrol in a course or verify a certificate.",
})

export default function TermsPage() {
  return (
    <LegalPage
      updated="Last updated 8 October 2026"
      title="Terms & conditions"
      description="The terms that apply when you use our website, enrol in a course or verify a certificate."
      sections={terms}
    />
  )
}
