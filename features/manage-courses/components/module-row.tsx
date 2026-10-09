"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "cn"
import {
  Clock,
  DocumentText,
  Eye,
  HamburgerMenu,
  TaskSquare,
} from "iconsax-reactjs"
import Link from "next/link"

import { RowActions } from "@/components/custom/row-actions"
import { Badge } from "@/components/ui/badge"
import type { ModuleSummary } from "@/features/manage-courses/services/types"

type Props = {
  module: ModuleSummary
  index: number
  href: string
  onEdit: () => void
  onDelete: () => void
}

// One module in the course outline; drag it by the handle (or focus the handle and use the
// keyboard: space to lift, arrows to move, space to drop).
export function ModuleRow({ module: m, index, href, onEdit, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: m.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-xl bg-white p-3",
        isDragging && "relative z-10 shadow-lg ring-1 ring-neutral-200"
      )}
    >
      <button
        type="button"
        aria-label={`Move module: ${m.title}`}
        className="grid size-8 shrink-0 cursor-grab touch-none place-items-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-none active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <HamburgerMenu size={18} color="currentColor" aria-hidden />
      </button>
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100 text-sm font-semibold text-brand-700 tabular-nums">
        {index + 1}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link
          href={href}
          className="cursor-pointer truncate text-start text-[15px] font-medium focus-visible:underline focus-visible:outline-none"
        >
          {m.title}
        </Link>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {m.type === "quiz" ? (
            <>
              <Badge variant="warning" className="h-6">
                <TaskSquare size={14} color="currentColor" aria-hidden />
                Quiz
              </Badge>
              <span>
                {m.questionCount}{" "}
                {m.questionCount === 1 ? "question" : "questions"}
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5">
                <Clock size={14} color="currentColor" aria-hidden />
                {m.durationMinutes} min
              </span>
              <span className="flex items-center gap-1.5">
                <DocumentText size={14} color="currentColor" aria-hidden />
                {m.materialCount}{" "}
                {m.materialCount === 1 ? "material" : "materials"}
              </span>
            </>
          )}
          {m.isPreview && (
            <Badge variant="info" className="h-6">
              <Eye size={14} color="currentColor" aria-hidden />
              Free preview
            </Badge>
          )}
        </div>
      </div>
      <RowActions
        editLabel={`Edit module: ${m.title}`}
        deleteLabel={`Delete module: ${m.title}`}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </li>
  )
}
