import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CourseDetail } from "@/features/courses/components/course-detail"
import { getCourse, paragraphs } from "@/features/courses/services/catalog"
import { buildMetadata } from "@/lib/seo"

// No course is built ahead of time; each is rendered on its first visit, then cached and
// refreshed like the rest of the catalogue (see catalog.ts).
export const generateStaticParams = async () => []

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourse(slug)
  if (!course) return {}
  return buildMetadata({
    path: `/courses/${slug}`,
    title: course.title,
    description: paragraphs(course.description)[0] ?? course.title,
  })
}

export default async function Page({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params
  const course = await getCourse(slug)
  if (!course) notFound()
  return <CourseDetail course={course} />
}
