import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { courseKey } from "@/features/manage-courses/services/courses"
import type {
  CourseModule,
  ModuleSummary,
} from "@/features/manage-courses/services/types"
import { api, getErrorKey } from "@/lib/axios"
import { requiredText, wholeNumber } from "@/lib/validation"

export const modulesKey = (courseId: string) => [
  ...courseKey(courseId),
  "modules",
]
export const moduleKey = (id: string) => ["admin/modules", id]

export const useModules = (courseId: string) =>
  useQuery({
    queryKey: modulesKey(courseId),
    queryFn: async () =>
      (
        await api.get<{ data: ModuleSummary[] }>(
          `/admin/courses/${courseId}/modules`
        )
      ).data.data,
  })

export const useModule = (id: string) =>
  useQuery({
    queryKey: moduleKey(id),
    queryFn: async () =>
      (await api.get<{ data: CourseModule }>(`/admin/modules/${id}`)).data.data,
  })

export const newModuleSchema = z.object({
  title: requiredText(200),
  type: z.enum(["lesson", "quiz"]),
})
export type NewModuleForm = z.input<typeof newModuleSchema>

export const useCreateModule = (courseId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: NewModuleForm) =>
      (
        await api.post<{ data: CourseModule }>(
          `/admin/courses/${courseId}/modules`,
          body
        )
      ).data.data,
    onSuccess: () => qc.invalidateQueries({ queryKey: courseKey(courseId) }),
  })
}

// Drag and drop: the new order shows at once and rolls back if the API refuses it.
export const useReorderModules = (courseId: string) => {
  const qc = useQueryClient()
  const key = modulesKey(courseId)
  return useMutation({
    mutationFn: async (ordered: ModuleSummary[]) =>
      (
        await api.patch<{ data: ModuleSummary[] }>(
          `/admin/courses/${courseId}/modules/order`,
          { moduleIds: ordered.map((m) => m.id) }
        )
      ).data.data,
    onMutate: async (ordered) => {
      await qc.cancelQueries({ queryKey: key })
      const previous = qc.getQueryData<ModuleSummary[]>(key)
      qc.setQueryData(key, ordered)
      return { previous }
    },
    onError: (e, _, ctx) => {
      qc.setQueryData(key, ctx?.previous)
      toast.error(getErrorKey(e))
    },
    onSuccess: (modules) => qc.setQueryData(key, modules),
  })
}

export const moduleSchema = z.object({
  title: requiredText(200),
  durationMinutes: wholeNumber(0, 10000, "Enter 0 to 10,000 minutes"),
  isPreview: z.boolean(),
  content: z.string(),
})
export type ModuleForm = z.input<typeof moduleSchema>
export type ModulePayload = z.output<typeof moduleSchema>

export const toModuleForm = (m: CourseModule): ModuleForm => ({
  title: m.title,
  durationMinutes: String(m.durationMinutes),
  isPreview: m.isPreview,
  content: m.content,
})

export const useSaveModule = (m: CourseModule) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: ModulePayload) =>
      (await api.patch<{ data: CourseModule }>(`/admin/modules/${m.id}`, body))
        .data.data,
    onSuccess: (saved) => {
      qc.setQueryData(moduleKey(m.id), saved)
      void qc.invalidateQueries({ queryKey: modulesKey(m.courseId) })
    },
  })
}

export const useDeleteModule = (courseId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/admin/modules/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: courseKey(courseId) }),
  })
}

// ---- Quizzes ---------------------------------------------------------------

export const optionLetters = ["A", "B", "C", "D"] as const

const question = z
  .object({
    prompt: requiredText(1000),
    options: z.tuple([
      requiredText(300),
      requiredText(300),
      requiredText(300),
      requiredText(300),
    ]),
    correctIndex: z.number().int().min(0).max(3),
  })
  .superRefine((q, ctx) => {
    // The API refuses repeats; point at the second copy so it's easy to find.
    const seen = new Map<string, number>()
    q.options.forEach((o, i) => {
      const key = o.toLowerCase()
      if (seen.has(key))
        ctx.addIssue({
          code: "custom",
          path: ["options", i],
          message: `Same as option ${optionLetters[seen.get(key)!]}`,
        })
      else seen.set(key, i)
    })
  })

export const quizSchema = z.object({
  title: requiredText(200),
  isPreview: z.boolean(),
  questions: z.array(question).max(200, "A quiz can have up to 200 questions"),
})

export type QuizForm = z.input<typeof quizSchema>
export type QuizValues = z.output<typeof quizSchema>

export const emptyQuestion = (): QuizForm["questions"][number] => ({
  prompt: "",
  options: ["", "", "", ""],
  correctIndex: 0,
})

export const toQuizForm = (m: CourseModule): QuizForm => ({
  title: m.title,
  isPreview: m.isPreview,
  questions: m.questions.map((q) => ({
    prompt: q.prompt,
    options: [q.options[0], q.options[1], q.options[2], q.options[3]],
    correctIndex: q.correctIndex ?? 0,
  })),
})

// One Save for the whole quiz page: title and preview, then the full question list.
export const useSaveQuiz = (m: CourseModule) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ questions, ...module }: QuizValues) => {
      await api.patch(`/admin/modules/${m.id}`, module)
      return (
        await api.put<{ data: CourseModule }>(
          `/admin/modules/${m.id}/questions`,
          { questions }
        )
      ).data.data
    },
    onSuccess: (saved) => {
      qc.setQueryData(moduleKey(m.id), saved)
      void qc.invalidateQueries({ queryKey: modulesKey(m.courseId) })
    },
  })
}
