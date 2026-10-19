import { CheckCircle2 } from "lucide-react"
import { Suspense } from "react"

import { Container } from "@/components/common/container"
import { PageHeader } from "@/components/common/page-header"
import { routes } from "@/config/routes"
import { ProgramBlock } from "@/features/courses/components/program-block"
import { getCoursesOrEmpty } from "@/features/courses/services/catalog"
import tefl from "@/public/images/course-tefl.jpg"
import tesol from "@/public/images/course-tesol.jpg"

const blocks = [
  {
    slug: "advanced-120-hour-tefl-course",
    image: tefl,
    text: 'Designed to be easy to follow and to prepare you to teach an "English as a Foreign Language" (EFL) class as quickly as possible. When you finish, you\'ll have a strong understanding of what it takes to provide quality instruction as a TEFL teacher.',
  },
  {
    slug: "advanced-120-hour-tesol-course",
    image: tesol,
    text: "Advanced teacher training that leads, once you pass the final examination, to a globally recognised international 120-hour TESOL certification. Your first step towards a TESOL career and a world of adventure, travel and experience.",
  },
] as const

const stats = [
  { value: "100K+", label: "Courses downloaded" },
  { value: "150K+", label: "Enrolments" },
  { value: "9", label: "Agencies we advise" },
  { value: "300", label: "Partner companies" },
] as const

const badges = [
  "Registration and e-copy",
  "Accredited certificate",
  "Accepted for work visas",
  "Internationally recognised",
  "Valid for life",
  "Practical & theoretical training",
]

export function ProgramPage() {
  return (
    <>
      <PageHeader
        eyebrow="TESOL & TEFL courses"
        title="Your ticket to teaching abroad"
        description="Two accredited 120-hour courses, one goal: get you qualified and teaching English as quickly as possible."
      />
      <Suspense fallback={<ProgramBlocksSkeleton />}>
        <ProgramBlocks />
      </Suspense>
      <section className="border-y border-border bg-muted py-16 md:py-20">
        <Container>
          <dl className="grid grid-cols-2 gap-10 text-center lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-2">
                <dt className="text-base text-muted-foreground">{s.label}</dt>
                <dd className="text-display-lg font-semibold text-primary">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <section className="py-16 md:py-24">
        <Container className="flex flex-col items-center gap-10">
          <h2 className="text-display-xs font-semibold md:text-display-sm">
            Every certificate includes
          </h2>
          <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 text-base font-medium shadow-xs"
              >
                <CheckCircle2
                  className="size-6 shrink-0 text-success"
                  aria-hidden
                />
                {b}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}

// Title and price come from the API; a course that isn't published is left out.
async function ProgramBlocks() {
  const courses = await getCoursesOrEmpty()
  const shown = blocks.flatMap((b) => {
    const course = courses.find((c) => c.slug === b.slug)
    return course ? [{ ...b, course }] : []
  })
  if (shown.length === 0) return null

  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-16 md:gap-24">
        {shown.map(({ course, image, text }, i) => (
          <ProgramBlock
            key={course.id}
            title={course.title}
            text={text}
            start={`Start your ${course.title} today.`}
            price={course.price}
            image={image}
            reverse={i % 2 === 1}
            enroll={{
              href: routes.checkout(course.slug),
              label: "Enroll now",
            }}
            details={{
              href: routes.course(course.slug),
              label: "Curriculum",
            }}
          />
        ))}
      </Container>
    </section>
  )
}

function ProgramBlocksSkeleton() {
  return (
    <section className="py-16 md:py-24" aria-busy aria-label="Loading courses">
      <Container className="flex flex-col gap-16 md:gap-24">
        {blocks.map((b) => (
          <div
            key={b.slug}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
          >
            <div className="aspect-4/3 animate-pulse rounded-3xl bg-muted" />
            <div className="flex flex-col gap-5">
              <div className="h-10 w-3/4 animate-pulse rounded-lg bg-muted" />
              <div className="h-28 animate-pulse rounded-lg bg-muted" />
              <div className="h-12 w-72 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}
