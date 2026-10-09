"use client"

import type { PaginationState } from "@tanstack/react-table"
import { useState } from "react"

import { useDebouncedValue } from "@/hooks/use-debounced-value"

export const pageSizes = [10, 20, 50] as const

// Pagination (TanStack's PaginationState) and search for a server-paged list. A new search
// starts again at the first page; the API is only asked once typing pauses.
export function useTableState() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizes[0],
  })
  const [search, setSearch] = useState("")
  const q = useDebouncedValue(search.replace(/\s+/g, " ").trim())

  return {
    pagination,
    setPagination,
    search,
    q,
    setSearch: (value: string) => {
      setSearch(value)
      setPagination((p) => ({ ...p, pageIndex: 0 }))
    },
    // Call after deleting a row: if it was the only one on a later page, show the page before.
    afterDelete: (rowsOnPage: number) =>
      rowsOnPage === 1 &&
      setPagination((p) =>
        p.pageIndex > 0 ? { ...p, pageIndex: p.pageIndex - 1 } : p
      ),
    // What the API is asked for.
    params: {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      q,
    },
  }
}

export type TableState = ReturnType<typeof useTableState>
