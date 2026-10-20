import type { Metadata } from "next"

import { MyCourses } from "@/features/account/components/my-courses"

// Not for search results.
export const metadata: Metadata = {
  title: "My courses",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <MyCourses />
}
