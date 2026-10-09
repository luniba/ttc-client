import { cn } from "cn"
import { BookOpen, ListChecks, Lock } from "lucide-react"
import Link from "next/link"

import { routes } from "@/config/routes"
import type { ModuleSummary } from "@/features/manage-courses/services/types"

type Props = { slug: string; modules: ModuleSummary[]; currentId: string }

// The course outline: every module in order, the current one highlighted, paid ones locked.
export function ModuleSidebar({ slug, modules, currentId }: Props) {
  return (
    <nav aria-label="Course modules">
      <ol className="flex flex-col gap-1">
        {modules.map((m, i) => {
          const current = m.id === currentId
          return (
            <li key={m.id}>
              <Link
                href={routes.courseModule(slug, m.id)}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex items-start gap-3 rounded-xl p-3 transition-colors",
                  current
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-neutral-100"
                )}
              >
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold tabular-nums",
                    current ? "bg-white/15" : "bg-neutral-100 text-neutral-700"
                  )}
                >
                  {i + 1}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-sm leading-snug font-medium">
                    {m.title}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1.5 text-xs",
                      current ? "text-white/70" : "text-muted-foreground"
                    )}
                  >
                    <Meta module={m} />
                  </span>
                </span>
                {!m.isPreview && (
                  <Lock
                    className={cn(
                      "mt-1 size-3.5 shrink-0",
                      current ? "text-white/70" : "text-neutral-400"
                    )}
                    aria-label="Locked"
                  />
                )}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function Meta({ module: m }: { module: ModuleSummary }) {
  if (m.type === "quiz")
    return (
      <>
        <ListChecks className="size-3.5" aria-hidden />
        Quiz · {m.questionCount}{" "}
        {m.questionCount === 1 ? "question" : "questions"}
      </>
    )
  return (
    <>
      <BookOpen className="size-3.5" aria-hidden />
      Lesson{m.durationMinutes > 0 && ` · ${m.durationMinutes} min`}
      {m.isPreview && " · Free"}
    </>
  )
}
