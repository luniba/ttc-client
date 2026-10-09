"use client"

import { Badge } from "@/components/ui/badge"
import { ListError } from "@/components/custom/list-error"
import type { PublicCourseDetail } from "@/features/courses/services/catalog"
import { LessonView } from "@/features/learn/components/lesson-view"
import { LockedView } from "@/features/learn/components/locked-view"
import { QuizView } from "@/features/learn/components/quiz-view"
import { useCourseModule } from "@/features/learn/services/learn"
import type { ModuleSummary } from "@/features/manage-courses/services/types"
import { getErrorCode } from "@/lib/axios"

type Props = { course: PublicCourseDetail; summary: ModuleSummary }

// The open module: its heading from the outline straight away, then whatever the API allows —
// a lesson, a quiz, or the locked notice.
export function ModuleContent({ course, summary: s }: Props) {
  const mod = useCourseModule(course.slug, s.id)
  const quiz = s.type === "quiz"

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={quiz ? "warning" : "gray"}>
            {quiz ? "Quiz" : "Lesson"}
          </Badge>
          {s.isPreview && <Badge variant="success">Free preview</Badge>}
        </div>
        <h1 className="text-2xl font-semibold text-balance md:text-3xl">
          {s.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {quiz
            ? `${s.questionCount} ${s.questionCount === 1 ? "question" : "questions"} · choose one answer for each`
            : [
                s.durationMinutes > 0 && `${s.durationMinutes} min`,
                s.materialCount > 0 &&
                  `${s.materialCount} ${s.materialCount === 1 ? "material" : "materials"}`,
              ]
                .filter(Boolean)
                .join(" · ")}
        </p>
      </header>
      {mod.isPending ? (
        <div aria-busy className="flex flex-col gap-3">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-100" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-neutral-100" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-100" />
          <div className="mt-4 h-40 animate-pulse rounded-2xl bg-neutral-100" />
        </div>
      ) : mod.isError ? (
        getErrorCode(mod.error) === "NOT_FOUND" ? (
          <p className="rounded-xl bg-neutral-50 p-6 text-center text-muted-foreground">
            This module no longer exists.
          </p>
        ) : (
          <ListError
            message="Couldn't load this module."
            retryLabel="Try again"
            onRetry={() => mod.refetch()}
          />
        )
      ) : mod.data.kind === "locked" ? (
        <LockedView course={course} />
      ) : quiz ? (
        <QuizView key={s.id} slug={course.slug} module={mod.data.module} />
      ) : (
        <LessonView module={mod.data.module} />
      )}
    </article>
  )
}
