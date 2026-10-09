import type { Metadata } from "next"

import { ModuleEditor } from "@/features/manage-courses/components/module-editor"

export const metadata: Metadata = { title: "Edit module" }

export default async function Page({
  params,
}: PageProps<"/admin/courses/[id]/modules/[moduleId]">) {
  const { id, moduleId } = await params
  return <ModuleEditor courseId={id} moduleId={moduleId} />
}
