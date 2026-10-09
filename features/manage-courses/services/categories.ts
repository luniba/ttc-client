import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import type { Category } from "@/features/manage-courses/services/types"
import { api } from "@/lib/axios"
import { requiredText } from "@/lib/validation"

const key = ["admin/course-categories"]

export const useCategories = () =>
  useQuery({
    queryKey: key,
    queryFn: async () =>
      (await api.get<{ data: Category[] }>("/admin/course-categories")).data
        .data,
  })

export const categorySchema = z.object({ name: requiredText(80) })
export type CategoryForm = z.input<typeof categorySchema>
export type CategoryPayload = z.output<typeof categorySchema>

export const useCreateCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: CategoryPayload) =>
      (await api.post<{ data: Category }>("/admin/course-categories", body))
        .data.data,
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  })
}
