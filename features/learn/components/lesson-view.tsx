import { Download, ExternalLink, FileText, Link2 } from "lucide-react"

import type {
  CourseModule,
  Material,
} from "@/features/manage-courses/services/types"
import { formatBytes } from "@/lib/format"

// A lesson: its written content (sanitised on the server), then its files and links.
export function LessonView({ module: m }: { module: CourseModule }) {
  return (
    <div className="flex flex-col gap-10">
      {m.content.trim() ? (
        <div
          className="rich-text text-base leading-relaxed text-neutral-800"
          // eslint-disable-next-line react/no-danger -- sanitised by the API before it is stored (content-sanitizer.ts)
          dangerouslySetInnerHTML={{ __html: m.content }}
        />
      ) : (
        <p className="rounded-xl bg-neutral-50 p-6 text-center text-muted-foreground">
          This lesson has no written notes. Its materials are below.
        </p>
      )}
      {m.materials.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Materials</h2>
          <ul className="flex flex-col gap-2">
            {m.materials.map((x) => (
              <MaterialItem key={x.id} material={x} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function MaterialItem({ material: x }: { material: Material }) {
  const isFile = x.type === "file"
  const Icon = isFile ? FileText : Link2
  return (
    <li>
      <a
        href={x.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-neutral-100 text-neutral-700">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-medium">{x.title}</span>
          <span className="truncate text-sm text-muted-foreground">
            {isFile
              ? [x.fileName, x.sizeBytes != null && formatBytes(x.sizeBytes)]
                  .filter(Boolean)
                  .join(" · ")
              : new URL(x.url).hostname}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-neutral-700 group-hover:text-neutral-900">
          {isFile ? (
            <>
              <Download className="size-4" aria-hidden /> Download
            </>
          ) : (
            <>
              <ExternalLink className="size-4" aria-hidden /> Open
            </>
          )}
        </span>
      </a>
    </li>
  )
}
