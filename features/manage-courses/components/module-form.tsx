"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { InputField } from "@/components/custom/input-field"
import { LoadingButton } from "@/components/custom/loading-button"
import { RichTextEditor } from "@/components/custom/rich-text-editor"
import { Field, FieldLabel } from "@/components/ui/field"
import { PreviewField } from "@/features/manage-courses/components/preview-field"
import {
  moduleSchema,
  toModuleForm,
  useSaveModule,
  type ModuleForm as Values,
  type ModulePayload,
} from "@/features/manage-courses/services/modules"
import type { CourseModule } from "@/features/manage-courses/services/types"
import { getErrorKey } from "@/lib/axios"

export function ModuleForm({ module: m }: { module: CourseModule }) {
  const save = useSaveModule(m)
  const form = useForm<Values, unknown, ModulePayload>({
    resolver: zodResolver(moduleSchema),
    defaultValues: toModuleForm(m),
  })
  const { errors, isDirty } = form.formState

  const onSubmit = form.handleSubmit((v) =>
    save.mutate(v, {
      onSuccess: (saved) => {
        toast.success("Module saved")
        form.reset(toModuleForm(saved))
      },
      onError: (e) => toast.error(getErrorKey(e)),
    })
  )

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-[1fr_200px]">
        <InputField
          id="title"
          label="Title"
          error={errors.title?.message}
          {...form.register("title")}
        />
        <InputField
          id="durationMinutes"
          label="Duration (minutes)"
          inputMode="numeric"
          placeholder="45"
          error={errors.durationMinutes?.message}
          {...form.register("durationMinutes")}
        />
      </div>
      <Controller
        control={form.control}
        name="isPreview"
        render={({ field }) => (
          <PreviewField checked={field.value} onChange={field.onChange} />
        )}
      />
      <Controller
        control={form.control}
        name="content"
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <RichTextEditor
              id="content"
              value={field.value}
              onChange={field.onChange}
            />
          </Field>
        )}
      />
      <div className="sticky bottom-0 -mx-1 flex items-center gap-3 bg-neutral-50/90 px-1 py-2 backdrop-blur">
        <LoadingButton
          type="submit"
          loading={save.isPending}
          disabled={!isDirty}
        >
          Save module
        </LoadingButton>
        {isDirty && (
          <span className="text-sm text-muted-foreground">Unsaved changes</span>
        )}
      </div>
    </form>
  )
}
