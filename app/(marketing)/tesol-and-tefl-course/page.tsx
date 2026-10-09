import type { Metadata } from "next"

import { ProgramPage } from "@/features/courses/components/program-page"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  path: "/tesol-and-tefl-course",
  title: "TESOL & TEFL courses",
  description:
    "Advanced 120-hour TEFL and TESOL courses: your ticket to teaching English abroad. Accredited, valid for life, accepted for work visas.",
})

export default function Page() {
  return <ProgramPage />
}
