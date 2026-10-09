"use client"

import { DocumentText, Link21, Trash } from "iconsax-reactjs"

import { Button } from "@/components/ui/button"
import type { Material } from "@/features/manage-courses/services/types"
import { formatBytes } from "@/lib/format"

export function MaterialRow({
  material: x,
  onDelete,
}: {
  material: Material
  onDelete: () => void
}) {
  const Icon = x.type === "link" ? Link21 : DocumentText
  return (
    <li className="flex items-center gap-4 p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-neutral-200 text-neutral-600 shadow-xs">
        <Icon size={20} color="currentColor" aria-hidden />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <a
          href={x.url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-[15px] font-medium hover:underline"
        >
          {x.title}
        </a>
        <span className="truncate text-sm text-muted-foreground">
          {x.type === "link"
            ? x.url
            : `${x.fileName}${x.sizeBytes == null ? "" : ` · ${formatBytes(x.sizeBytes)}`}`}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={`Remove material: ${x.title}`}
        title="Remove"
        onClick={onDelete}
        className="hover:bg-red-50 hover:text-red-700"
      >
        <Trash size={18} color="currentColor" aria-hidden />
      </Button>
    </li>
  )
}
