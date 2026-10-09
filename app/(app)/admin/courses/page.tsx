import type { Metadata } from "next"

import { CoursesPage } from "@/features/manage-courses/components/courses-page"

export const metadata: Metadata = { title: "Courses" }

export default function Page() {
  return <CoursesPage />
}
