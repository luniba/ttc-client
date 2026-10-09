import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query"

import { api } from "@/lib/axios"

// The API's envelope: { success, data, meta?: { pagination } }.
export type Pagination = {
  total: number
  page: number
  limit: number
  pageCount: number
  hasNext: boolean
  hasPrev: boolean
}
export type PageParams = { page: number; limit: number; q: string }
export type Page<T> = { data: T[]; pagination: Pagination }

// List/create/update/delete hooks for one admin resource at /api/<path>. Every change refreshes
// the list. Error handling stays with the caller, which knows which form fields an error belongs to.
export function resource<T extends { id: string }, Payload>(path: string) {
  const key: QueryKey = [path]
  const invalidate = (qc: ReturnType<typeof useQueryClient>) =>
    qc.invalidateQueries({ queryKey: key })

  return {
    key,
    useList: (params?: Record<string, string>, enabled = true) =>
      useQuery({
        queryKey: params ? [...key, params] : key,
        queryFn: async () =>
          (await api.get<{ data: T[] }>(`/${path}`, { params })).data.data,
        enabled,
      }),
    // One page of a paged list; the previous page stays on screen while the next one loads.
    // Extra keys are filters the endpoint accepts (e.g. verified: "true").
    usePage: (
      params: PageParams & Record<string, string | number>,
      enabled = true
    ) =>
      useQuery({
        queryKey: [...key, "page", params],
        queryFn: async (): Promise<Page<T>> => {
          const res = await api.get<{
            data: T[]
            meta: { pagination: Pagination }
          }>(`/${path}`, { params: { ...params, q: params.q || undefined } })
          return { data: res.data.data, pagination: res.data.meta.pagination }
        },
        placeholderData: keepPreviousData,
        enabled,
      }),
    useSave: () => {
      const qc = useQueryClient()
      return useMutation({
        mutationFn: async ({ id, body }: { id?: string; body: Payload }) =>
          (id
            ? await api.patch<{ data: T }>(`/${path}/${id}`, body)
            : await api.post<{ data: T }>(`/${path}`, body)
          ).data.data,
        onSuccess: () => invalidate(qc),
      })
    },
    useRemove: () => {
      const qc = useQueryClient()
      return useMutation({
        mutationFn: (id: string) => api.delete(`/${path}/${id}`),
        onSuccess: () => invalidate(qc),
      })
    },
  }
}
