"use client"

import { BookOpen } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { CourseThumb } from "@/features/courses/components/course-thumb"
import {
  useAccount,
  type AccountCourse,
} from "@/features/account/services/account"
import { cn } from "cn"

export function MyCourses() {
  const account = useAccount()

  if (account.isPending) return <Skeleton />
  if (account.isError)
    return (
      <p className="rounded-2xl bg-neutral-50 p-6 text-muted-foreground">
        We couldn&apos;t load your courses. Please refresh the page.
      </p>
    )

  const { courses } = account.data
  if (courses.length === 0)
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-neutral-50 px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-background text-primary">
          <BookOpen className="size-7" aria-hidden />
        </span>
        <h2 className="text-xl font-semibold">No courses yet</h2>
        <p className="max-w-md text-muted-foreground">
          When you request a course, it appears here. Once our team has opened
          it for you, you can start learning.
        </p>
        <Link
          href={routes.courses()}
          className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
        >
          Browse courses
        </Link>
      </div>
    )

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => (
        <CourseTile key={c.id} course={c} />
      ))}
    </div>
  )
}

function CourseTile({ course: c }: { course: AccountCourse }) {
  const open = c.status === "enrolled"
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-card shadow-xs">
      <CourseThumb src={c.thumbnailUrl} />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Badge variant={open ? "success" : "warning"} className="self-start">
          {open ? "Access granted" : "Request received"}
        </Badge>
        <h2 className="flex-1 text-xl font-semibold">{c.title}</h2>
        {open ? (
          <Link
            href={routes.course(c.slug)}
            className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
          >
            Continue
          </Link>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Our team will contact you very soon to complete your enrolment.
            </p>
            <Link
              href={routes.course(c.slug)}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full"
              )}
            >
              View course
            </Link>
          </>
        )}
      </div>
    </article>
  )
}

function Skeleton() {
  return (
    <div aria-busy className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
  )
}
