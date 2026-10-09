"use client"

import { cn } from "cn"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { ListError } from "@/components/custom/list-error"
import { Logo } from "@/components/common/logo"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"
import type { PublicCourseDetail } from "@/features/courses/services/catalog"
import { ModuleContent } from "@/features/learn/components/module-content"
import { ModuleSidebar } from "@/features/learn/components/module-sidebar"
import { usePublicCourse } from "@/features/learn/services/learn"
import { getErrorCode } from "@/lib/axios"

type Props = { slug: string; moduleId: string }

// The course preview: module list on the left, the open module on the right. Light, like a
// reading room, whatever the rest of the public site looks like.
export function CoursePlayer({ slug, moduleId }: Props) {
  const course = usePublicCourse(slug)

  if (course.isPending) return <PlayerSkeleton />
  if (course.isError)
    return getErrorCode(course.error) === "NOT_FOUND" ? (
      <Missing
        title="Course not found"
        text="It may have been unpublished or moved."
        href={routes.courses()}
        cta="Browse courses"
      />
    ) : (
      <div className="p-10">
        <ListError
          message="Couldn't load this course."
          retryLabel="Try again"
          onRetry={() => course.refetch()}
        />
      </div>
    )

  const c = course.data
  const index = c.modules.findIndex((m) => m.id === moduleId)
  return (
    <Shell course={c}>
      <aside className="order-last border-t border-neutral-200 bg-neutral-50/70 lg:order-first lg:min-h-0 lg:border-t-0 lg:border-r">
        <ScrollArea className="lg:h-full">
          <div className="flex flex-col gap-3 p-4">
            <p className="px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Course content · {c.modules.length} modules
            </p>
            <ModuleSidebar
              slug={slug}
              modules={c.modules}
              currentId={moduleId}
            />
          </div>
        </ScrollArea>
      </aside>
      {/* Keyed so opening another module starts at the top. */}
      <ScrollArea key={moduleId} className="lg:min-h-0">
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-8 lg:px-10 lg:py-12">
          {index === -1 ? (
            <p className="rounded-xl bg-neutral-50 p-6 text-center text-muted-foreground">
              This module isn&apos;t part of the course any more.
            </p>
          ) : (
            <>
              <ModuleContent course={c} summary={c.modules[index]} />
              <PrevNext course={c} index={index} />
            </>
          )}
        </main>
      </ScrollArea>
    </Shell>
  )
}

// Header, then the two columns filling the rest of the screen on desktop.
function Shell({
  course: c,
  children,
}: {
  course: PublicCourseDetail
  children: ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-white text-foreground lg:h-dvh">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-neutral-200 px-4 lg:px-6">
        <Link href={routes.home()} aria-label={`${siteConfig.name} home`}>
          <Logo name={siteConfig.name} className="size-10" />
        </Link>
        <span aria-hidden className="h-6 w-px bg-neutral-200 max-sm:hidden" />
        <Link
          href={routes.course(c.slug)}
          className="flex min-w-0 flex-1 items-center gap-1 text-sm font-semibold hover:underline"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{c.title}</span>
        </Link>
        <Link
          href={routes.contact(c.slug)}
          className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
        >
          Enroll now
        </Link>
      </header>
      <div className="grid flex-1 lg:min-h-0 lg:grid-cols-[340px_minmax(0,1fr)]">
        {children}
      </div>
    </div>
  )
}

function PrevNext({
  course: c,
  index,
}: {
  course: PublicCourseDetail
  index: number
}) {
  const prev = c.modules[index - 1]
  const next = c.modules[index + 1]
  return (
    <nav
      aria-label="Previous and next module"
      className="grid gap-3 border-t border-neutral-200 pt-6 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={routes.courseModule(c.slug, prev.id)}
          className="flex flex-col gap-1 rounded-xl border border-neutral-200 p-4 hover:bg-neutral-50"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronLeft className="size-3.5" aria-hidden /> Previous
          </span>
          <span className="truncate text-sm font-medium">{prev.title}</span>
        </Link>
      ) : (
        <span className="max-sm:hidden" />
      )}
      {next && (
        <Link
          href={routes.courseModule(c.slug, next.id)}
          className="flex flex-col items-end gap-1 rounded-xl border border-neutral-200 p-4 text-end hover:bg-neutral-50"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Next <ChevronRight className="size-3.5" aria-hidden />
          </span>
          <span className="max-w-full truncate text-sm font-medium">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  )
}

function Missing({
  title,
  text,
  href,
  cta,
}: {
  title: string
  text: string
  href: string
  cta: string
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-white p-6 text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{text}</p>
      <Link href={href} className={cn(buttonVariants(), "mt-2 rounded-full")}>
        {cta}
      </Link>
    </div>
  )
}

function PlayerSkeleton() {
  return (
    <div aria-busy className="flex min-h-dvh flex-col bg-white lg:h-dvh">
      <div className="h-16 shrink-0 border-b border-neutral-200" />
      <div className="grid flex-1 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="hidden flex-col gap-2 border-r border-neutral-200 bg-neutral-50/70 p-4 lg:flex">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse rounded-xl bg-neutral-100"
            />
          ))}
        </div>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-5 py-12 lg:px-10">
          <div className="h-5 w-24 animate-pulse rounded bg-neutral-100" />
          <div className="h-9 w-2/3 animate-pulse rounded-lg bg-neutral-100" />
          <div className="h-64 animate-pulse rounded-2xl bg-neutral-100" />
        </div>
      </div>
    </div>
  )
}
