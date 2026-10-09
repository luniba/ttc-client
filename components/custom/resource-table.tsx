"use client"

import type { UseQueryResult } from "@tanstack/react-query"
import { useTable, type RowData } from "@tanstack/react-table"
import { SearchStatus, type Icon } from "iconsax-reactjs"
import type { ReactNode } from "react"

import { DataTable, TableSkeleton } from "@/components/custom/data-table"
import { EmptyState } from "@/components/custom/empty-state"
import { ListError } from "@/components/custom/list-error"
import {
  PaginationBar,
  type PaginationLabels,
} from "@/components/custom/pagination-bar"
import { SearchInput } from "@/components/custom/search-input"
import { Button } from "@/components/ui/button"
import { pageSizes, type TableState } from "@/hooks/use-table-state"
import type { Pagination } from "@/lib/resource"
import {
  listFeatures,
  type ListColumn,
  type ListFeatures,
  type ListState,
  type ListTable,
} from "@/lib/table"

export type TableLabels = PaginationLabels & {
  clearSearch: string
  retry: string
  noResults: (search: string) => { title: string; description: string }
  pageEmpty: string
  firstPage: string
}

type Props<T extends RowData> = {
  query: UseQueryResult<{ data: T[]; pagination: Pagination }>
  state: TableState
  // Must be stable (module scope or useMemo): TanStack rebuilds its models when they change.
  columns: ListColumn<T>[]
  rowId: (row: T) => string
  mobile: (row: T) => ReactNode
  labels: TableLabels
  label: string
  searchPlaceholder: string
  loadError: string
  // Opens a row (e.g. a details dialog) on click or Enter.
  onRowClick?: (row: T) => void
  // Shown when the school has none at all yet.
  empty: { icon: Icon; title: string; description: string; action?: ReactNode }
}

// Stable fallback: a fresh [] each render would make TanStack rebuild its row models.
const noRows: never[] = []

// A server-paged, searchable school list in every state: first load, failure, nothing added yet,
// no matches for the search, a page left empty (rows deleted elsewhere), and the table itself.
export function ResourceTable<T extends RowData>(p: Props<T>) {
  const { query, state, labels } = p
  const table = useTable<ListFeatures, T, ListState>({
    features: listFeatures,
    columns: p.columns,
    data: query.data?.data ?? (noRows as T[]),
    getRowId: p.rowId,
    rowCount: query.data?.pagination.total ?? 0,
    manualPagination: true,
    state: { pagination: state.pagination },
    onPaginationChange: state.setPagination,
  })

  const search = (
    <SearchInput
      value={state.search}
      onChange={state.setSearch}
      placeholder={p.searchPlaceholder}
      clearLabel={labels.clearSearch}
    />
  )
  if (query.isPending)
    return (
      <div className="flex flex-col gap-4">
        {search}
        <TableSkeleton columns={Math.max(2, p.columns.length - 1)} />
      </div>
    )
  if (query.isError && !query.data)
    return (
      <ListError
        message={p.loadError}
        retryLabel={labels.retry}
        onRetry={() => query.refetch()}
      />
    )

  const total = query.data.pagination.total
  const searching = state.search.trim() !== "" || state.q !== ""
  if (total === 0 && !searching) return <EmptyState {...p.empty} />

  return (
    <div className="flex flex-col gap-4">
      {search}
      <Body table={table} props={p} total={total} />
      {total > 0 && (
        <PaginationBar table={table} pageSizes={pageSizes} labels={labels} />
      )}
    </div>
  )
}

function Body<T extends RowData>({
  table,
  props: p,
  total,
}: {
  table: ListTable<T>
  props: Props<T>
  total: number
}) {
  const { state, labels } = p
  if (total === 0) {
    const none = labels.noResults(state.q || state.search.trim())
    return (
      <EmptyState
        icon={SearchStatus}
        title={none.title}
        description={none.description}
        action={
          <Button variant="outline" onClick={() => state.setSearch("")}>
            {labels.clearSearch}
          </Button>
        }
      />
    )
  }
  if (table.getRowModel().rows.length === 0)
    return (
      <EmptyState
        icon={SearchStatus}
        title={labels.pageEmpty}
        description=""
        action={
          <Button variant="outline" onClick={() => table.firstPage()}>
            {labels.firstPage}
          </Button>
        }
      />
    )
  return (
    <DataTable
      table={table}
      label={p.label}
      mobile={p.mobile}
      busy={p.query.isPlaceholderData}
      onRowClick={p.onRowClick}
    />
  )
}
