import { cn } from "cn"
import type * as React from "react"
import type { ReactNode } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { RowData } from "@tanstack/react-table"

import type { ListTable } from "@/lib/table"

type Props<T extends RowData> = {
  table: ListTable<T>
  label: string
  // Phones get a card per row instead of the table.
  mobile: (row: T) => ReactNode
  // Dims the rows while the next page loads behind them.
  busy?: boolean
  // Makes each row open something (e.g. a details dialog), by click or Enter.
  onRowClick?: (row: T) => void
}

// Buttons and links inside a row (edit, delete) keep their own click.
const fromControl = (e: React.SyntheticEvent) =>
  (e.target as HTMLElement).closest("button, a, input") !== null

const openableClass = "cursor-pointer focus-visible:outline-none"

// Click and Enter/Space handlers for an openable row; nothing when rows don't open.
function openable<T>(row: T, onRowClick?: (row: T) => void) {
  if (!onRowClick) return {}
  return {
    tabIndex: 0,
    className: openableClass,
    onClick: (e: React.MouseEvent) => !fromControl(e) && onRowClick(row),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (fromControl(e) || (e.key !== "Enter" && e.key !== " ")) return
      e.preventDefault()
      onRowClick(row)
    },
  }
}

// Renders a TanStack table: a real <table> from sm up, cards below.
export function DataTable<T extends RowData>({
  table,
  label,
  mobile,
  busy,
  onRowClick,
}: Props<T>) {
  const rows = table.getRowModel().rows

  return (
    <div
      aria-busy={busy || undefined}
      className={cn("transition-opacity", busy && "opacity-60")}
    >
      <div className="max-sm:hidden">
        <Table>
          <caption className="sr-only">{label}</caption>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id} className="hover:bg-transparent">
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={header.column.columnDef.meta?.className}
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} {...openable(row.original, onRowClick)}>
                {row.getAllCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cell.column.columnDef.meta?.className}
                  >
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ul aria-label={label} className="flex flex-col gap-1 sm:hidden">
        {rows.map((row) => (
          <li key={row.id}>
            <div
              {...openable(row.original, onRowClick)}
              className={cn(
                "rounded-xl p-4 transition-colors hover:bg-neutral-50 focus-visible:bg-neutral-50",
                onRowClick && openableClass
              )}
            >
              {mobile(row.original)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Placeholder table while the first page loads.
export function TableSkeleton({
  rows = 5,
  columns = 4,
}: {
  rows?: number
  columns?: number
}) {
  return (
    <div aria-busy>
      <div className="h-12 rounded-xl bg-neutral-100" />
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex items-center gap-6 px-4 py-5">
          {Array.from({ length: columns }, (_, c) => (
            <div
              key={c}
              className={cn(
                "h-3.5 animate-pulse rounded bg-neutral-100",
                c === 0 ? "w-1/4" : "w-1/6"
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
