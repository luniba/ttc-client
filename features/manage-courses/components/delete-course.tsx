"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { adminCourses } from "@/features/manage-courses/services/courses"
import type { Course } from "@/features/manage-courses/services/types"
import { useDeleteConfirm } from "@/hooks/use-delete-confirm"

// Deleting lives on the course itself rather than on its card in the list.
export function DeleteCourse({ course }: { course: Course }) {
  const router = useRouter()
  const del = useDeleteConfirm<Course>({
    remove: adminCourses.useRemove(),
    title: "Delete this course?",
    describe: (c) =>
      `"${c.title}" will be removed from the website and the course list.`,
    done: "Course deleted",
    onDone: () => router.replace(routes.admin("courses")),
  })

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-red-200 p-4">
      <div className="flex flex-col gap-0.5">
        <p className="text-[15px] font-medium">Delete course</p>
        <p className="text-sm text-muted-foreground">
          Removes it from the website and this panel.
        </p>
      </div>
      <Button variant="destructive-outline" onClick={() => del.ask(course)}>
        Delete course
      </Button>
      {del.dialog}
    </div>
  )
}
