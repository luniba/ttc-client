"use client"

import { Add, Book1 } from "iconsax-reactjs"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { EmptyState } from "@/components/custom/empty-state"
import { ListError } from "@/components/custom/list-error"
import { ListSkeleton } from "@/components/custom/list-skeleton"
import { Button } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { AddModuleDialog } from "@/features/manage-courses/components/add-module-dialog"
import { SortableModules } from "@/features/manage-courses/components/sortable-modules"
import {
  useDeleteModule,
  useModules,
  useReorderModules,
} from "@/features/manage-courses/services/modules"
import type { ModuleSummary } from "@/features/manage-courses/services/types"
import { useDeleteConfirm } from "@/hooks/use-delete-confirm"

// The course outline beside its details; a module opens on its own page to edit.
export function ModulesPanel({ courseId }: { courseId: string }) {
  const modules = useModules(courseId)
  const reorder = useReorderModules(courseId)
  const [adding, setAdding] = useState(false)
  const router = useRouter()
  const hrefOf = (m: { id: string }) => routes.adminModule(courseId, m.id)
  const del = useDeleteConfirm<ModuleSummary>({
    remove: useDeleteModule(courseId),
    title: "Delete this module?",
    describe: (m) =>
      `"${m.title}", its content and all its materials will be deleted for good.`,
    done: "Module deleted",
  })
  const add = (
    <Button size="sm" onClick={() => setAdding(true)}>
      <Add size={18} color="currentColor" aria-hidden />
      Add module
    </Button>
  )

  return (
    <section aria-labelledby="modules-heading" className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 id="modules-heading" className="text-lg font-medium">
            Modules
            {modules.data && (
              <span className="ms-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold tabular-nums">
                {modules.data.length}
              </span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground">
            Students work through them in this order. Drag to reorder.
          </p>
        </div>
        {!!modules.data?.length && add}
      </div>
      {modules.isPending ? (
        <ListSkeleton />
      ) : modules.isError ? (
        <ListError
          message="Couldn't load modules."
          retryLabel="Try again"
          onRetry={() => modules.refetch()}
        />
      ) : modules.data.length === 0 ? (
        <EmptyState
          icon={Book1}
          title="No modules yet"
          description="Add the first module, then write its content and attach materials."
          action={add}
        />
      ) : (
        <SortableModules
          modules={modules.data}
          onReorder={(ordered) => reorder.mutate(ordered)}
          hrefOf={hrefOf}
          onEdit={(m) => router.push(hrefOf(m))}
          onDelete={del.ask}
        />
      )}
      {adding && (
        <AddModuleDialog
          courseId={courseId}
          onClose={() => setAdding(false)}
          onCreated={(m) => router.push(hrefOf(m))}
        />
      )}
      {del.dialog}
    </section>
  )
}
