import type { Metadata } from "next"

import { CandidatesPage } from "@/features/manage-candidates/components/candidates-page"

export const metadata: Metadata = { title: "Candidates" }

export default function Page() {
  return <CandidatesPage />
}
