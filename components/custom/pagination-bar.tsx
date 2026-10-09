"use client"

import type { RowData } from "@tanstack/react-table"
import { cn } from "cn"
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ListTable } from "@/lib/table"

export type PaginationLabels = {
  showing: (from: number, to: number, total: number) => string
  rowsPerPage: string
  previous: string
  next: string
  page: (n: number) => string
}

type Props<T extends RowData> = {
  table: ListTable<T>
  pageSizes: readonly number[]
  labels: PaginationLabels
}

// "1–10 of 34", rows per page, and page buttons (1 … 4 5 6 … 12 when there are many), all driven
// by the TanStack table's pagination state.
export function PaginationBar<T extends RowData>({
  table,
  pageSizes,
  labels,
}: Props<T>) {
  const { pageIndex, pageSize } = table.state.pagination
  const total = table.getRowCount()
  const pages = table.getPageCount()
  const page = pageIndex + 1
  const from = total === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min(total, page * pageSize)

  return (
    <nav
      aria-label={labels.page(page)}
      className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground"
    >
      <div className="flex items-center gap-4">
        <span className="tabular-nums" aria-live="polite">
          {labels.showing(from, to, total)}
        </span>
        <PageSizeSelect
          value={pageSize}
          sizes={pageSizes}
          label={labels.rowsPerPage}
          onChange={(size) => {
            table.setPageSize(size)
            table.setPageIndex(0)
          }}
        />
      </div>
      {pages > 1 && <PageButtons table={table} labels={labels} />}
    </nav>
  )
}

function PageButtons<T extends RowData>({
  table,
  labels,
}: {
  table: ListTable<T>
  labels: PaginationLabels
}) {
  const page = table.state.pagination.pageIndex + 1
  const pages = table.getPageCount()
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon-sm"
        aria-label={labels.previous}
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        <ArrowLeft2
          size={16}
          color="currentColor"
          aria-hidden
          className="rtl:rotate-180"
        />
      </Button>
      {pageList(page, pages).map((n, i) =>
        n === null ? (
          <span
            key={`gap-${i}`}
            aria-hidden
            className="w-6 text-center max-sm:hidden"
          >
            …
          </span>
        ) : (
          <Button
            key={n}
            variant={n === page ? "secondary" : "ghost"}
            size="icon-sm"
            aria-label={labels.page(n)}
            aria-current={n === page ? "page" : undefined}
            onClick={() => table.setPageIndex(n - 1)}
            className={cn("tabular-nums", n !== page && "max-sm:hidden")}
          >
            {n}
          </Button>
        )
      )}
      <Button
        variant="outline"
        size="icon-sm"
        aria-label={labels.next}
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        <ArrowRight2
          size={16}
          color="currentColor"
          aria-hidden
          className="rtl:rotate-180"
        />
      </Button>
    </div>
  )
}

function PageSizeSelect(p: {
  value: number
  sizes: readonly number[]
  label: string
  onChange: (size: number) => void
}) {
  const items = p.sizes.map((n) => ({ value: String(n), label: String(n) }))
  return (
    <span className="flex items-center gap-2 max-sm:hidden">
      {p.label}
      <Select
        items={items}
        value={String(p.value)}
        onValueChange={(v) => v && p.onChange(Number(v))}
      >
        <SelectTrigger size="sm" aria-label={p.label} className="h-9 w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </span>
  )
}

// Every page when there are few; otherwise the first, last and the current page's neighbours,
// with null where pages are skipped.
function pageList(current: number, last: number): (number | null)[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1)
  const near = [current - 1, current, current + 1].filter(
    (n) => n > 1 && n < last
  )
  const out: (number | null)[] = [1]
  if (near[0] > 2) out.push(null)
  out.push(...near)
  if (near[near.length - 1] < last - 1) out.push(null)
  out.push(last)
  return out
}
