import type { Metadata } from "next"

import { CandidateDetailsPage } from "@/features/manage-candidates/components/candidate-details-page"

export const metadata: Metadata = { title: "Candidate" }

export default async function Page({
  params,
}: PageProps<"/admin/candidates/[id]">) {
  const { id } = await params
  return <CandidateDetailsPage id={id} />
}
