import { Container } from "@/components/common/container"
import { BackLink } from "@/features/courses/components/course-detail"

const bar = "animate-pulse rounded-lg bg-background/60"

export default function Loading() {
  return (
    <div aria-busy aria-label="Loading course">
      <section className="bg-muted py-12 md:py-16">
        <Container className="flex flex-col items-start gap-5">
          <BackLink />
          <div className={`${bar} h-6 w-32 rounded-full`} />
          <div className={`${bar} h-12 w-full max-w-2xl`} />
          <div className={`${bar} h-14 w-full max-w-xl`} />
        </Container>
      </section>
      <section className="py-12 md:py-16">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_400px]">
          <div className="flex flex-col gap-4 lg:order-first">
            <div className="h-8 w-40 animate-pulse rounded-lg bg-muted" />
            <div className="h-24 animate-pulse rounded-lg bg-muted" />
            <div className="mt-8 h-80 animate-pulse rounded-xl bg-muted" />
          </div>
          <div className="h-[560px] animate-pulse rounded-2xl bg-muted" />
        </Container>
      </section>
    </div>
  )
}
