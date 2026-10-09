"use client"

import { Book1, Gallery } from "iconsax-reactjs"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import type { Course } from "@/features/manage-courses/services/types"
import { formatPrice } from "@/lib/format"

export function StatusBadge({ published }: { published: boolean }) {
  return published ? (
    <Badge variant="success">Published</Badge>
  ) : (
    <Badge variant="gray">Draft</Badge>
  )
}

type Props = {
  course: Course
  href: string
}

// One course in the admin grid; the whole card opens the course.
export function CourseCard({ course: c, href }: Props) {
  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-neutral-200/70 bg-neutral-50 p-3 transition-colors hover:bg-neutral-100/70">
      <div className="relative grid aspect-4/3 place-items-center overflow-hidden rounded-xl bg-neutral-100 text-neutral-400">
        {c.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- storage URLs vary per environment
          <img
            src={c.thumbnailUrl}
            alt=""
            className="size-full object-cover object-top"
          />
        ) : (
          <Gallery size={32} color="currentColor" aria-hidden />
        )}
        <span className="absolute top-2 left-2">
          <StatusBadge published={c.isPublished} />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-1">
        <p className="text-xs font-medium text-muted-foreground">
          {c.category.name}
        </p>
        <h3 className="line-clamp-2 text-[15px] font-semibold">
          <Link
            href={href}
            className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-4 focus-visible:after:ring-ring"
          >
            {c.title}
          </Link>
        </h3>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-neutral-200/70 px-1 pt-3 text-sm">
        <span className="font-semibold tabular-nums">
          {formatPrice(c.price)}
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <Book1 size={14} color="currentColor" aria-hidden />
          {c.moduleCount} {c.moduleCount === 1 ? "module" : "modules"}
        </span>
      </div>
    </article>
  )
}
