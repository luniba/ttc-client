import { BookOpen } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/common/container"
import { PageHeader } from "@/components/common/page-header"
import { routes } from "@/config/routes"
import { CourseCard } from "@/features/courses/components/course-card"
import type { PublicCourse } from "@/features/courses/services/catalog"

export function CoursesHeader() {
  return (
    <PageHeader
      eyebrow="All courses"
      title="Find the right course for you"
      description="Accredited, self-paced and 100% online. Pick a course and start today."
    />
  )
}

// One section per category, in the order categories first appear (newest course first).
export function CoursesPage({ courses }: { courses: PublicCourse[] }) {
  const groups = Map.groupBy(courses, (c) => c.category.name)

  return (
    <>
      <CoursesHeader />
      {groups.size === 0 ? (
        <section className="py-12 md:py-16">
          <Container>
            <div className="flex flex-col items-center gap-4 rounded-3xl bg-muted px-6 py-16 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-background text-primary">
                <BookOpen className="size-7" aria-hidden />
              </span>
              <h2 className="text-xl font-semibold">New courses coming soon</h2>
              <p className="max-w-md text-base text-muted-foreground">
                {
                  "We're preparing our next intake. Get in touch and we'll let you know when enrolment opens."
                }
              </p>
              <Link
                href={routes.contact()}
                className="font-semibold text-brand-700 hover:text-brand-800"
              >
                Contact us
              </Link>
            </div>
          </Container>
        </section>
      ) : (
        [...groups].map(([category, items]) => (
          <section key={category} className="py-12 md:py-16">
            <Container className="flex flex-col gap-8">
              <h2 className="text-display-xs font-semibold md:text-display-sm">
                {category}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    href={routes.course(course.slug)}
                  />
                ))}
              </div>
            </Container>
          </section>
        ))
      )}
    </>
  )
}
