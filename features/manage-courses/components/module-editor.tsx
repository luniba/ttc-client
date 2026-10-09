"use client"

import { BackLink } from "@/components/custom/back-link"
import { ListError } from "@/components/custom/list-error"
import { routes } from "@/config/routes"
import { MaterialsSection } from "@/features/manage-courses/components/materials-section"
import { ModuleForm } from "@/features/manage-courses/components/module-form"
import { QuizForm } from "@/features/manage-courses/components/quiz-form"
import { useCourse } from "@/features/manage-courses/services/courses"
import { useModule } from "@/features/manage-courses/services/modules"

// A module's own page: a lesson's content and materials, or a quiz's questions.
export function ModuleEditor({
  courseId,
  moduleId,
}: {
  courseId: string
  moduleId: string
}) {
  const course = useCourse(courseId)
  const mod = useModule(moduleId)

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <BackLink href={routes.adminCourse(courseId)}>
          {course.data?.title ?? "Back to course"}
        </BackLink>
        <h2 className="text-xl font-semibold">
          {mod.data?.type === "quiz" ? "Edit quiz" : "Edit module"}
        </h2>
      </div>
      {mod.isError ? (
        <ListError
          message="Couldn't load this module."
          retryLabel="Try again"
          onRetry={() => mod.refetch()}
        />
      ) : !mod.data ? (
        <div className="h-96 animate-pulse rounded-2xl bg-neutral-50" />
      ) : (
        <>
          {/* Keyed so a different module never inherits this one's form state. */}
          {mod.data.type === "quiz" ? (
            <div className="rounded-2xl bg-neutral-50 p-6 sm:p-8">
              <QuizForm key={mod.data.id} module={mod.data} />
            </div>
          ) : (
            <>
              <div className="rounded-2xl bg-neutral-50 p-6 sm:p-8">
                <ModuleForm key={mod.data.id} module={mod.data} />
              </div>
              <div className="rounded-2xl bg-neutral-50 p-6 sm:p-8">
                <MaterialsSection module={mod.data} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
