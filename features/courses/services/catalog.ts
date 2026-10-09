import type {
  Course,
  ModuleSummary,
} from "@/features/manage-courses/services/types"
import { env } from "@/lib/env"

// The public site reads published courses on the server, so pages ship as HTML for search
// engines. Responses are cached and refreshed at most once a minute (ISR), so a course the admin
// publishes appears within that time.
// ponytail: time-based only; call revalidatePath/revalidateTag from the admin save if a minute is too slow.
const REVALIDATE_SECONDS = 60

export type PublicCourse = Omit<Course, "thumbnailKey">
export type PublicCourseDetail = PublicCourse & { modules: ModuleSummary[] }

// null for a 404 (unknown or unpublished); throws on anything else so error.tsx can show it.
async function get<T>(path: string): Promise<T | null> {
  const res = await fetch(`${env.API_URL}/api${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`)
  return ((await res.json()) as { data: T }).data
}

export const getCourses = async () =>
  (await get<PublicCourse[]>("/courses")) ?? []

export const getCourse = (slug: string) =>
  get<PublicCourseDetail>(`/courses/${encodeURIComponent(slug)}`)

// For sections that should still render when the API is down (home page, contact form, sitemap).
export const getCoursesOrEmpty = () => getCourses().catch(() => [])

// The description is plain text with blank lines between paragraphs.
export const paragraphs = (text: string) =>
  text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
