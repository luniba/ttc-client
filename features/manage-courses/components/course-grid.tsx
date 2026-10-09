"use client"

import type { UseQueryResult } from "@tanstack/react-query"
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs"

import { Button } from "@/components/ui/button"
import { CourseCard } from "@/features/manage-courses/components/course-card"
import type { Course } from "@/features/manage-courses/services/types"
import type { Page } from "@/lib/resource"
import { formatNumber } from "@/lib/format"

type Props = {
  query: UseQueryResult<Page<Course>>
  hrefOf: (c: Course) => string
  onPage: (page: number) => void
}

export const gridClass =
  "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

// The cards plus a simple previous/next pager; the previous page stays while the next loads.
export function CourseGrid({ query, hrefOf, onPage }: Props) {
  const { data: items, pagination: p } = query.data!
  const from = (p.page - 1) * p.limit + 1
  const to = from + items.length - 1

  return (
    <div className="flex flex-col gap-6">
      <div
        className={gridClass}
        aria-busy={query.isPlaceholderData || undefined}
      >
        {items.map((c) => (
          <CourseCard key={c.id} course={c} href={hrefOf(c)} />
        ))}
      </div>
      {p.pageCount > 1 && (
        <nav
          aria-label="Pages"
          className="flex items-center justify-between gap-3 text-sm text-muted-foreground"
        >
          <span className="tabular-nums" aria-live="polite">
            {formatNumber(from)}–{formatNumber(to)} of {formatNumber(p.total)}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Previous page"
              disabled={!p.hasPrev}
              onClick={() => onPage(p.page - 1)}
            >
              <ArrowLeft2
                size={16}
                color="currentColor"
                aria-hidden
                className="rtl:rotate-180"
              />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Next page"
              disabled={!p.hasNext}
              onClick={() => onPage(p.page + 1)}
            >
              <ArrowRight2
                size={16}
                color="currentColor"
                aria-hidden
                className="rtl:rotate-180"
              />
            </Button>
          </div>
        </nav>
      )}
    </div>
  )
}
