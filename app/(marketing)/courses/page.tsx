import type { Metadata } from "next"

import { CoursesPage } from "@/features/courses/components/courses-page"
import { getCourses } from "@/features/courses/services/catalog"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  path: "/courses",
  title: "All courses",
  description:
    "Browse all TESOL, TEFL and coaching certification courses from TESOL TEFL Council.",
})

export default async function Page() {
  return <CoursesPage courses={await getCourses()} />
}
