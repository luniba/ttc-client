import type { Metadata } from "next"

import { GenerateCertificatesPage } from "@/features/generate-certificates/components/generate-certificates-page"

export const metadata: Metadata = { title: "Generate certificates" }

export default function Page() {
  return <GenerateCertificatesPage />
}
