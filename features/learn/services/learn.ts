import { useMutation, useQuery } from "@tanstack/react-query"

import type { PublicCourseDetail } from "@/features/courses/services/catalog"
import type { CourseModule } from "@/features/manage-courses/services/types"
import { api, getErrorCode } from "@/lib/axios"

// The course preview page reads everything in the browser: it's behind the outline, so search
// engines don't need it, and the module call is what decides free vs locked.

export const usePublicCourse = (slug: string) =>
  useQuery({
    queryKey: ["courses", slug],
    queryFn: async () =>
      (await api.get<{ data: PublicCourseDetail }>(`/courses/${slug}`)).data
        .data,
  })

// "locked" when the module isn't free to preview (the API answers 403 MODULE_LOCKED).
export type ModuleState =
  { kind: "open"; module: CourseModule } | { kind: "locked" }

export const useCourseModule = (slug: string, moduleId: string) =>
  useQuery({
    queryKey: ["courses", slug, "modules", moduleId],
    queryFn: async (): Promise<ModuleState> => {
      try {
        const res = await api.get<{ data: CourseModule }>(
          `/courses/${slug}/modules/${moduleId}`
        )
        return { kind: "open", module: res.data.data }
      } catch (e) {
        if (getErrorCode(e) === "MODULE_LOCKED") return { kind: "locked" }
        throw e
      }
    },
    // Signed file links last ~10 minutes; refetch before they go stale.
    staleTime: 5 * 60_000,
    retry: (count, e) => getErrorCode(e) !== "NOT_FOUND" && count < 2,
  })

export type QuizResult = { score: number; total: number; results: boolean[] }

export const useCheckQuiz = (slug: string, moduleId: string) =>
  useMutation({
    mutationFn: async (answers: number[]) =>
      (
        await api.post<{ data: QuizResult }>(
          `/courses/${slug}/modules/${moduleId}/quiz/check`,
          { answers }
        )
      ).data.data,
  })
