import type { Metadata } from "next"

import { EditCandidatePage } from "@/features/manage-candidates/components/edit-candidate-page"

export const metadata: Metadata = { title: "Edit candidate" }

export default async function Page({
  params,
}: PageProps<"/admin/candidates/[id]/edit">) {
  const { id } = await params
  return <EditCandidatePage id={id} />
}
