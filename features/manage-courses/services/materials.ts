import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import {
  moduleKey,
  modulesKey,
} from "@/features/manage-courses/services/modules"
import type {
  CourseModule,
  Material,
} from "@/features/manage-courses/services/types"
import { api } from "@/lib/axios"
import { requiredText } from "@/lib/validation"

export const MAX_FILE_BYTES = 50 * 1024 * 1024
export const fileTypes = [".pdf", ".doc", ".docx", ".ppt", ".pptx"]

// Checked again on the server by the file's actual bytes; this just saves a wasted upload.
export const fileProblem = (file: File) => {
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
  if (!fileTypes.includes(ext)) return "Only PDF, Word and PowerPoint files"
  if (file.size > MAX_FILE_BYTES) return "Files can be up to 50 MB"
  return null
}

export const linkSchema = z.object({
  title: requiredText(200),
  url: z
    .string()
    .trim()
    .pipe(
      z.url({
        protocol: /^https$/,
        error: "Enter a link starting with https://",
      })
    ),
})
export type LinkForm = z.input<typeof linkSchema>

// Every material change refreshes the module and the module list's material counts.
const useRefresh = (m: CourseModule) => {
  const qc = useQueryClient()
  return () =>
    Promise.all([
      qc.invalidateQueries({ queryKey: moduleKey(m.id) }),
      qc.invalidateQueries({ queryKey: modulesKey(m.courseId) }),
    ])
}

export const useUploadMaterial = (m: CourseModule) => {
  const refresh = useRefresh(m)
  return useMutation({
    mutationFn: async ({
      file,
      onProgress,
    }: {
      file: File
      onProgress: (percent: number) => void
    }) => {
      const body = new FormData()
      body.append("file", file)
      return (
        await api.post<{ data: Material }>(
          `/admin/modules/${m.id}/materials/file`,
          body,
          {
            onUploadProgress: (e) =>
              e.total && onProgress(Math.round((e.loaded / e.total) * 100)),
          }
        )
      ).data.data
    },
    onSuccess: refresh,
  })
}

export const useAddLink = (m: CourseModule) => {
  const refresh = useRefresh(m)
  return useMutation({
    mutationFn: async (body: LinkForm) =>
      (
        await api.post<{ data: Material }>(
          `/admin/modules/${m.id}/materials/link`,
          body
        )
      ).data.data,
    onSuccess: refresh,
  })
}

export const useDeleteMaterial = (m: CourseModule) => {
  const refresh = useRefresh(m)
  return useMutation({
    mutationFn: (id: string) => api.delete(`/admin/materials/${id}`),
    onSuccess: refresh,
  })
}
