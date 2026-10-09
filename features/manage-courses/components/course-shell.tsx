"use client"

import type { ReactNode } from "react"

import { BackLink } from "@/components/custom/back-link"
import { ListError } from "@/components/custom/list-error"
import { routes } from "@/config/routes"
import { StatusBadge } from "@/features/manage-courses/components/course-card"
import { useCourse } from "@/features/manage-courses/services/courses"

// Back link and the course's title and status above the editor.
export function CourseShell({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  const course = useCourse(id)

  if (course.isError)
    return (
      <ListError
        message="Couldn't load this course."
        retryLabel="Try again"
        onRetry={() => course.refetch()}
      />
    )

  // On large screens the editor fills the page height and its panes scroll on their own;
  // basis-0 stops their content from stretching the page past the viewport.
  return (
    <div className="flex flex-col gap-6 lg:min-h-0 lg:flex-1 lg:basis-0">
      <div className="flex flex-col gap-3">
        <BackLink href={routes.admin("courses")}>All courses</BackLink>
        {course.data ? (
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold">{course.data.title}</h2>
            <StatusBadge published={course.data.isPublished} />
          </div>
        ) : (
          <div className="h-7 w-72 animate-pulse rounded-lg bg-muted" />
        )}
      </div>
      {children}
    </div>
  )
}
