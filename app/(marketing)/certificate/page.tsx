import type { Metadata } from "next"

import { CertificatePage } from "@/features/certificate/components/certificate-page"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  path: "/certificate",
  title: "Verify a certificate",
  description:
    "Check that a TESOL TEFL Council certificate is genuine using the holder's name, passport number and certificate number.",
})

export default function Page() {
  return <CertificatePage />
}
