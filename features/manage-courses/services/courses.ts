import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import type { Course } from "@/features/manage-courses/services/types"
import { api } from "@/lib/axios"
import { resource } from "@/lib/resource"
import { requiredText, usd } from "@/lib/validation"

export const adminCourses = resource<Course, CoursePayload>("admin/courses")

export const courseKey = (id: string) => [...adminCourses.key, id]

export const useCourse = (id: string) =>
  useQuery({
    queryKey: courseKey(id),
    queryFn: async () =>
      (await api.get<{ data: Course }>(`/admin/courses/${id}`)).data.data,
  })

export const courseSchema = z.object({
  title: requiredText(160),
  // Empty means "make one from the title".
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^([a-z0-9]+(-[a-z0-9]+)*)?$/,
      "Use lowercase letters, numbers and single dashes"
    )
    .max(160, "This is too long")
    .transform((s) => s || undefined),
  categoryId: z.string().min(1, "Choose a category"),
  duration: requiredText(80),
  level: requiredText(80),
  studentCount: requiredText(40),
  // Not squished: line breaks separate paragraphs.
  description: z
    .string()
    .trim()
    .min(1, "This field is required")
    .max(20000, "This is too long"),
  price: usd,
  thumbnail: z.object({ key: z.string(), url: z.string() }).nullable(),
  isPublished: z.boolean(),
})

export type CourseForm = z.input<typeof courseSchema>
export type CourseValues = z.output<typeof courseSchema>
export type CoursePayload = Omit<CourseValues, "thumbnail"> & {
  thumbnailKey: string | null
}

export const toCourseForm = (c?: Course): CourseForm => ({
  title: c?.title ?? "",
  slug: c?.slug ?? "",
  categoryId: c?.category.id ?? "",
  duration: c?.duration ?? "",
  level: c?.level ?? "",
  studentCount: c?.studentCount ?? "",
  description: c?.description ?? "",
  price: c ? String(c.price) : "",
  thumbnail:
    c?.thumbnailKey && c.thumbnailUrl
      ? { key: c.thumbnailKey, url: c.thumbnailUrl }
      : null,
  isPublished: c?.isPublished ?? false,
})

export const toCoursePayload = ({
  thumbnail,
  ...rest
}: CourseValues): CoursePayload => ({
  ...rest,
  thumbnailKey: thumbnail?.key ?? null,
})

// Create or update one course; the cached detail is replaced with what the API returns.
export const useSaveCourse = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, body }: { id?: string; body: CoursePayload }) =>
      (id
        ? await api.patch<{ data: Course }>(`/admin/courses/${id}`, body)
        : await api.post<{ data: Course }>("/admin/courses", body)
      ).data.data,
    onSuccess: (course) => {
      qc.setQueryData(courseKey(course.id), course)
      void qc.invalidateQueries({ queryKey: adminCourses.key })
    },
  })
}

// Thumbnails go through the shared image upload; the course stores the returned key.
export const useUploadImage = () =>
  useMutation({
    mutationFn: async (file: File) => {
      const body = new FormData()
      body.append("file", file)
      return (
        await api.post<{ data: { key: string; url: string } }>("/uploads", body)
      ).data.data
    },
  })
