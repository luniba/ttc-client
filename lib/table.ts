import {
  createColumnHelper,
  rowPaginationFeature,
  tableFeatures,
  type ColumnDef,
  type ReactTable,
  type RowData,
  type TableState,
} from "@tanstack/react-table"

// The TanStack Table setup every school list shares: server-side pages, and a class name per
// column (same on its header and cells) for widths and alignment.
export const listFeatures = tableFeatures({
  rowPaginationFeature,
  columnMeta: {} as { className?: string },
})

export type ListFeatures = typeof listFeatures
export type ListState = TableState<ListFeatures>
export type ListColumn<T extends RowData> = ColumnDef<ListFeatures, T, unknown>
export type ListTable<T extends RowData> = ReactTable<
  ListFeatures,
  T,
  ListState
>

export const listColumns = <T extends RowData>() =>
  createColumnHelper<ListFeatures, T>()
