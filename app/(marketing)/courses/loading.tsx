import { Container } from "@/components/common/container"
import { CourseCardSkeleton } from "@/features/courses/components/course-card"
import { CoursesHeader } from "@/features/courses/components/courses-page"

export default function Loading() {
  return (
    <>
      <CoursesHeader />
      <section
        className="py-12 md:py-16"
        aria-busy
        aria-label="Loading courses"
      >
        <Container className="flex flex-col gap-8">
          <div className="h-9 w-56 animate-pulse rounded-lg bg-muted" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
