import type { Metadata } from "next"

import { privacyPolicy } from "@/content/privacy"
import { LegalPage } from "@/features/legal/components/legal-page"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  path: "/privacy",
  title: "Privacy policy",
  description:
    "How TESOL TEFL Council collects, uses and protects information about students and visitors.",
})

export default function PrivacyPage() {
  return (
    <LegalPage
      updated="Last updated 8 October 2026"
      title="Privacy policy"
      description="How TESOL TEFL Council collects, uses and protects information about students and visitors."
      sections={privacyPolicy}
    />
  )
}
