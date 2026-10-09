import type { Metadata } from "next"

import { CoursePlayer } from "@/features/learn/components/course-player"

// Read in the browser (see features/learn/services/learn.ts), so nothing here for search engines.
export const metadata: Metadata = {
  title: "Course preview",
  robots: { index: false },
}

export default async function Page({
  params,
}: PageProps<"/courses/[slug]/module/[moduleId]">) {
  const { slug, moduleId } = await params
  return <CoursePlayer slug={slug} moduleId={moduleId} />
}
