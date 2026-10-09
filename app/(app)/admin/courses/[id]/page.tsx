import type { Metadata } from "next"

import { CourseDetails } from "@/features/manage-courses/components/course-details"
import { CourseShell } from "@/features/manage-courses/components/course-shell"

export const metadata: Metadata = { title: "Course details" }

export default async function Page({
  params,
}: PageProps<"/admin/courses/[id]">) {
  const { id } = await params
  return (
    <CourseShell id={id}>
      <CourseDetails id={id} />
    </CourseShell>
  )
}
