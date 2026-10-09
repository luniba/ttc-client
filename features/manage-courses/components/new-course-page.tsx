import { BackLink } from "@/components/custom/back-link"
import { routes } from "@/config/routes"
import { CourseForm } from "@/features/manage-courses/components/course-form"

// Saving opens the new course's page, where its modules are added.
export function NewCoursePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <BackLink href={routes.admin("courses")}>All courses</BackLink>
        <h2 className="text-xl font-semibold">New course</h2>
      </div>
      <div className="rounded-2xl bg-neutral-50 p-6 sm:p-8">
        <CourseForm />
      </div>
    </div>
  )
}
