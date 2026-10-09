import type { Metadata } from "next"

import { NewCoursePage } from "@/features/manage-courses/components/new-course-page"

export const metadata: Metadata = { title: "New course" }

export default function Page() {
  return <NewCoursePage />
}
