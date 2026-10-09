"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { CourseForm } from "@/features/manage-courses/components/course-form"
import { DeleteCourse } from "@/features/manage-courses/components/delete-course"
import { ModulesPanel } from "@/features/manage-courses/components/modules-panel"
import { useCourse } from "@/features/manage-courses/services/courses"

// min-h-0 lets a pane shrink to its grid row and scroll, rather than grow the row to its content;
// the scrollbar is inset so it doesn't poke out past the rounded corners.
const pane =
  "rounded-2xl bg-neutral-50 lg:min-h-0 *:data-[slot=scroll-area-scrollbar]:py-3"

// Details in two thirds, the module outline in the last; each pane scrolls on its own.
export function CourseDetails({ id }: { id: string }) {
  const course = useCourse(id)
  if (!course.data)
    return <div className="h-96 animate-pulse rounded-2xl bg-muted lg:flex-1" />
  return (
    <div className="grid gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-3">
      <ScrollArea className={`${pane} lg:col-span-2`}>
        <div className="flex flex-col gap-12 p-4 sm:p-6">
          {/* Keyed so a refetch after saving doesn't fight the form's own reset. */}
          <CourseForm key={course.data.id} course={course.data} />
          <DeleteCourse course={course.data} />
        </div>
      </ScrollArea>
      <ScrollArea className={pane}>
        <div className="p-4 sm:p-6">
          <ModulesPanel courseId={id} />
        </div>
      </ScrollArea>
    </div>
  )
}
