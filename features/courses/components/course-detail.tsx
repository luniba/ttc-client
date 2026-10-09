import { ChevronLeft, Eye, ListChecks, Lock } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/common/container"
import { Badge } from "@/components/ui/badge"
import { routes } from "@/config/routes"
import { CourseSidebar } from "@/features/courses/components/course-sidebar"
import {
  paragraphs,
  type PublicCourseDetail,
} from "@/features/courses/services/catalog"
import type { ModuleSummary } from "@/features/manage-courses/services/types"

export function CourseDetail({ course }: { course: PublicCourseDetail }) {
  const [summary, ...overview] = paragraphs(course.description)

  return (
    <>
      <section className="bg-muted py-12 md:py-16">
        <Container className="flex flex-col items-start gap-5">
          <BackLink />
          <Badge variant="gray">{course.category.name}</Badge>
          <h1 className="max-w-3xl text-display-sm font-semibold text-balance md:text-display-lg">
            {course.title}
          </h1>
          {summary && (
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
              {summary}
            </p>
          )}
        </Container>
      </section>
      <section className="py-12 md:py-16">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_400px]">
          <div className="flex flex-col gap-12 lg:order-first">
            {overview.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-display-xs font-semibold">Overview</h2>
                {overview.map((p) => (
                  <p key={p} className="text-lg text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            )}
            <Curriculum slug={course.slug} modules={course.modules} />
          </div>
          <CourseSidebar
            course={course}
            enrollHref={routes.contact(course.slug)}
            contactHref={routes.contact()}
            labels={{
              oneTime: "One-time payment",
              enroll: "Enroll now",
              question: "Have a question?",
              contact: "Contact us",
              rows: [
                ["Duration", course.duration],
                ["Level", course.level],
                ["Modules", String(course.modules.length)],
                ["Students", course.studentCount],
                ["Certificate", "Included"],
              ],
            }}
          />
        </Container>
      </section>
    </>
  )
}

export function BackLink() {
  return (
    <Link
      href={routes.courses()}
      className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
    >
      <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden />
      All courses
    </Link>
  )
}

// Each module opens the course preview; free ones play, the rest show what enrolling unlocks.
function Curriculum({
  slug,
  modules,
}: {
  slug: string
  modules: ModuleSummary[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-display-xs font-semibold">Curriculum</h2>
        {modules.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {modules.length} {modules.length === 1 ? "module" : "modules"}
          </span>
        )}
      </div>
      {modules.length === 0 ? (
        <p className="rounded-xl bg-muted px-4 py-8 text-center text-base text-muted-foreground">
          The module list is on its way. Contact us for the full syllabus.
        </p>
      ) : (
        <ol className="divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200">
          {modules.map((m, i) => (
            <li key={m.id}>
              <Link
                href={routes.courseModule(slug, m.id)}
                className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-neutral-50"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-brand-700 tabular-nums">
                  {i + 1}
                </span>
                <span className="flex-1 text-base">{m.title}</span>
                {m.isPreview && (
                  <Badge variant="gray" className="shrink-0">
                    <Eye className="size-3.5" aria-hidden />
                    Free preview
                  </Badge>
                )}
                {m.type === "quiz" ? (
                  <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground tabular-nums">
                    <Badge variant="gray">
                      <ListChecks className="size-3.5" aria-hidden />
                      Quiz
                    </Badge>
                    {m.questionCount}{" "}
                    {m.questionCount === 1 ? "question" : "questions"}
                  </span>
                ) : (
                  m.durationMinutes > 0 && (
                    <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                      {m.durationMinutes} min
                    </span>
                  )
                )}
                {!m.isPreview && (
                  <Lock
                    className="size-4 shrink-0 text-muted-foreground"
                    aria-label="Locked"
                  />
                )}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
