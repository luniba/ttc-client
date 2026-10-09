import type { Metadata } from "next"

import { VerificationPage } from "@/features/verification/components/verification-page"

export const metadata: Metadata = { title: "Verification" }

export default function Page() {
  return <VerificationPage />
}
