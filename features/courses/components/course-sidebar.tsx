import { cn } from "cn"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { CourseThumb } from "@/features/courses/components/course-thumb"
import type { PublicCourse } from "@/features/courses/services/catalog"
import { formatPrice } from "@/lib/format"

type Props = {
  course: PublicCourse
  labels: {
    oneTime: string
    enroll: string
    question: string
    contact: string
    rows: [string, string][]
  }
  enrollHref: string
  contactHref: string
}

export function CourseSidebar({
  course,
  labels,
  enrollHref,
  contactHref,
}: Props) {
  return (
    <aside className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-card shadow-xs lg:sticky lg:top-24">
      <CourseThumb src={course.thumbnailUrl} />
      <div className="flex flex-col gap-6 p-6">
        <p className="flex items-baseline gap-2">
          <span className="text-display-md font-semibold">
            {formatPrice(course.price)}
          </span>
          <span className="text-sm text-muted-foreground">
            {labels.oneTime}
          </span>
        </p>
        <Link
          href={enrollHref}
          className={cn(buttonVariants({ size: "xl" }), "rounded-full")}
        >
          {labels.enroll}
        </Link>
        <dl className="flex flex-col divide-y divide-neutral-200 text-sm">
          {labels.rows.map(([term, value]) => (
            <div key={term} className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">{term}</dt>
              <dd className="font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-muted-foreground">
          {labels.question}{" "}
          <Link
            href={contactHref}
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            {labels.contact}
          </Link>
        </p>
      </div>
    </aside>
  )
}
