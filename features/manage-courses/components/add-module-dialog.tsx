"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Book1, TaskSquare, type Icon } from "iconsax-reactjs"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { FormDialog } from "@/components/custom/form-dialog"
import { InputField } from "@/components/custom/input-field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  newModuleSchema,
  useCreateModule,
  type NewModuleForm,
} from "@/features/manage-courses/services/modules"
import type {
  CourseModule,
  ModuleType,
} from "@/features/manage-courses/services/types"
import { getErrorKey } from "@/lib/axios"

type Props = {
  courseId: string
  onClose: () => void
  onCreated: (m: CourseModule) => void
}

const types: { value: ModuleType; label: string; hint: string; icon: Icon }[] =
  [
    {
      value: "lesson",
      label: "Lesson",
      hint: "Content and materials to study",
      icon: Book1,
    },
    {
      value: "quiz",
      label: "Quiz",
      hint: "Multiple-choice questions",
      icon: TaskSquare,
    },
  ]

// Title and type only; the rest is filled in on the module's page. The type can't change later.
export function AddModuleDialog({ courseId, onClose, onCreated }: Props) {
  const create = useCreateModule(courseId)
  const form = useForm<NewModuleForm>({
    resolver: zodResolver(newModuleSchema),
    defaultValues: { title: "", type: "lesson" },
  })

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="New module"
      description="It's added at the end; drag it into place afterwards."
      submitLabel="Create and edit"
      cancelLabel="Cancel"
      pending={create.isPending}
      onSubmit={form.handleSubmit((v) =>
        create.mutate(v, {
          onSuccess: onCreated,
          onError: (e) => toast.error(getErrorKey(e)),
        })
      )}
    >
      <Controller
        control={form.control}
        name="type"
        render={({ field }) => (
          <RadioGroup
            aria-label="Module type"
            value={field.value}
            onValueChange={field.onChange}
            className="grid grid-cols-2 gap-3"
          >
            {types.map((t) => (
              <label
                key={t.value}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-4 transition-colors has-data-checked:border-brand-300 has-data-checked:bg-brand-25"
              >
                <RadioGroupItem value={t.value} className="mt-0.5" />
                <span className="flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <t.icon size={16} color="currentColor" aria-hidden />
                    {t.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t.hint}
                  </span>
                </span>
              </label>
            ))}
          </RadioGroup>
        )}
      />
      <InputField
        id="module-title"
        autoFocus
        label="Title"
        placeholder="Module 1: Introduction to teaching English"
        error={form.formState.errors.title?.message}
        {...form.register("title")}
      />
    </FormDialog>
  )
}
