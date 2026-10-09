"use client"

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { ModuleRow } from "@/features/manage-courses/components/module-row"
import type { ModuleSummary } from "@/features/manage-courses/services/types"

type Props = {
  modules: ModuleSummary[]
  hrefOf: (m: ModuleSummary) => string
  onReorder: (ordered: ModuleSummary[]) => void
  onEdit: (m: ModuleSummary) => void
  onDelete: (m: ModuleSummary) => void
}

// Drag by the handle with a pointer, or with the keyboard (space, arrows, space).
export function SortableModules({
  modules,
  hrefOf,
  onReorder,
  onEdit,
  onDelete,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    const from = modules.findIndex((m) => m.id === active.id)
    const to = modules.findIndex((m) => m.id === over.id)
    onReorder(arrayMove(modules, from, to))
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={modules} strategy={verticalListSortingStrategy}>
        <ol className="flex flex-col gap-2">
          {modules.map((m, i) => (
            <ModuleRow
              key={m.id}
              module={m}
              index={i}
              href={hrefOf(m)}
              onEdit={() => onEdit(m)}
              onDelete={() => onDelete(m)}
            />
          ))}
        </ol>
      </SortableContext>
    </DndContext>
  )
}
