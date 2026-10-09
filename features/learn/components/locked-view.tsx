import { cn } from "cn"
import { Lock } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import type { PublicCourseDetail } from "@/features/courses/services/catalog"
import { formatPrice } from "@/lib/format"

// A module that isn't free to preview: what unlocks it, and a way back to one that is.
export function LockedView({ course }: { course: PublicCourseDetail }) {
  const free = course.modules.find((m) => m.isPreview)
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl bg-neutral-50 px-6 py-14 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-white text-primary shadow-xs">
        <Lock className="size-6" aria-hidden />
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">
          This module is part of the full course
        </h2>
        <p className="max-w-md text-muted-foreground">
          Enrol to unlock all {course.modules.length} modules, their materials
          and quizzes, for a one-time {formatPrice(course.price)}.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={routes.contact(course.slug)}
          className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
        >
          Enroll now
        </Link>
        {free && (
          <Link
            href={routes.courseModule(course.slug, free.id)}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full"
            )}
          >
            Open a free module
          </Link>
        )}
      </div>
    </div>
  )
}
