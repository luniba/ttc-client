"use client"

import type { UseQueryResult } from "@tanstack/react-query"
import { Add, Book1, SearchStatus } from "iconsax-reactjs"
import Link from "next/link"
import { useState, type ReactNode } from "react"

import { EmptyState } from "@/components/custom/empty-state"
import { ListError } from "@/components/custom/list-error"
import { PageIntro } from "@/components/custom/page-intro"
import { SearchInput } from "@/components/custom/search-input"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import {
  CourseGrid,
  gridClass,
} from "@/features/manage-courses/components/course-grid"
import { adminCourses } from "@/features/manage-courses/services/courses"
import type { Course } from "@/features/manage-courses/services/types"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import type { Page } from "@/lib/resource"

// Twelve fills three rows of four.
const LIMIT = 12

export function CoursesPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const q = useDebouncedValue(search.replace(/\s+/g, " ").trim())
  const query = adminCourses.usePage({ page, limit: LIMIT, q })
  const add = (
    <Link href={routes.newCourse()} className={buttonVariants()}>
      <Add size={20} color="currentColor" aria-hidden />
      Add course
    </Link>
  )
  const searching = q !== "" || search.trim() !== ""
  const hasCourses = !!query.data?.pagination.total

  return (
    <div className="flex flex-col gap-6">
      <PageIntro action={hasCourses || searching ? add : undefined}>
        Courses on the website. Drafts stay hidden until you publish them.
      </PageIntro>
      {(hasCourses || searching) && (
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v)
            setPage(1)
          }}
          placeholder="Search courses"
          clearLabel="Clear search"
        />
      )}
      <CoursesBody
        query={query}
        search={q || search.trim()}
        add={add}
        grid={
          <CourseGrid
            query={query}
            hrefOf={(c) => routes.adminCourse(c.id)}
            onPage={setPage}
          />
        }
      />
    </div>
  )
}

type BodyProps = {
  query: UseQueryResult<Page<Course>>
  search: string
  add: ReactNode
  grid: ReactNode
}

// Loading, failure, nothing yet, no search results, or the grid.
function CoursesBody({ query, search, add, grid }: BodyProps) {
  if (query.isPending)
    return (
      <div className={gridClass} aria-busy>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="aspect-[4/4.6] animate-pulse rounded-2xl bg-neutral-100"
          />
        ))}
      </div>
    )
  if (query.isError && !query.data)
    return (
      <ListError
        message="Couldn't load courses."
        retryLabel="Try again"
        onRetry={() => query.refetch()}
      />
    )
  if (query.data.pagination.total > 0) return grid
  return search ? (
    <EmptyState
      icon={SearchStatus}
      title={`Nothing matches “${search}”`}
      description="Check the spelling, or search for another word in the title."
    />
  ) : (
    <EmptyState
      icon={Book1}
      title="No courses yet"
      description="Add your first course, then build its modules and materials."
      action={add}
    />
  )
}
