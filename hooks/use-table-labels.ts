"use client"

import type { TableLabels } from "@/components/custom/resource-table"
import { formatNumber } from "@/lib/format"

// The words every paged school list shares, translated.
export function useTableLabels(): TableLabels {
  return {
    showing: (from, to, total) =>
      `${formatNumber(from)}–${formatNumber(to)} of ${formatNumber(total)}`,
    rowsPerPage: "Rows per page",
    previous: "Previous page",
    next: "Next page",
    page: (n) => `Page ${formatNumber(n)}`,
    clearSearch: "Clear search",
    retry: "Try again",
    noResults: (search) => ({
      title: `Nothing matches “${search}”`,
      description: "Check the spelling, or search by another detail.",
    }),
    pageEmpty: "Nothing left on this page",
    firstPage: "Go to the first page",
  }
}
