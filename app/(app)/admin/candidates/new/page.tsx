import type { Metadata } from "next"

import { CandidateEditor } from "@/features/manage-candidates/components/candidate-editor"

export const metadata: Metadata = { title: "Add candidate" }

export default function Page() {
  return <CandidateEditor />
}
