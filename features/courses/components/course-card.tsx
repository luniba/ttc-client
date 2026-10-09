import { Clock } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { CourseThumb } from "@/features/courses/components/course-thumb"
import {
  paragraphs,
  type PublicCourse,
} from "@/features/courses/services/catalog"
import { formatPrice } from "@/lib/format"

export function CourseCard({
  course,
  href,
}: {
  course: PublicCourse
  href: string
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-card shadow-xs transition-shadow hover:shadow-lg">
      <CourseThumb src={course.thumbnailUrl} />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Badge variant="gray" className="self-start">
          {course.category.name}
        </Badge>
        <h3 className="text-xl font-semibold">
          <Link href={href} className="after:absolute after:inset-0">
            {course.title}
          </Link>
        </h3>
        <p className="line-clamp-3 flex-1 text-base text-muted-foreground">
          {paragraphs(course.description)[0]}
        </p>
        <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" aria-hidden />
            {course.duration}
          </span>
          <span className="text-xl font-semibold">
            {formatPrice(course.price)}
          </span>
        </div>
      </div>
    </article>
  )
}

// Same footprint as CourseCard, for loading.tsx.
export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-card">
      <div className="aspect-4/3 animate-pulse bg-muted" />
      <div className="flex flex-col gap-4 p-6">
        <div className="h-6 w-28 animate-pulse rounded-full bg-muted" />
        <div className="h-7 w-4/5 animate-pulse rounded-lg bg-muted" />
        <div className="h-16 animate-pulse rounded-lg bg-muted" />
        <div className="h-7 animate-pulse rounded-lg bg-muted" />
      </div>
    </div>
  )
}
