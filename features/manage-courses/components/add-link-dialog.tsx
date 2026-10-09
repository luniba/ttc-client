"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { FormDialog } from "@/components/custom/form-dialog"
import { InputField } from "@/components/custom/input-field"
import {
  linkSchema,
  useAddLink,
  type LinkForm,
} from "@/features/manage-courses/services/materials"
import type { CourseModule } from "@/features/manage-courses/services/types"
import { getErrorKey } from "@/lib/axios"

export function AddLinkDialog({
  module: m,
  onClose,
}: {
  module: CourseModule
  onClose: () => void
}) {
  const add = useAddLink(m)
  const form = useForm<LinkForm>({
    resolver: zodResolver(linkSchema),
    defaultValues: { title: "", url: "" },
  })
  const { errors } = form.formState

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="Add a video or link"
      description="Videos aren't uploaded: paste a YouTube, Vimeo or Google Drive link instead."
      submitLabel="Add link"
      cancelLabel="Cancel"
      pending={add.isPending}
      onSubmit={form.handleSubmit((v) =>
        add.mutate(v, {
          onSuccess: () => {
            toast.success("Link added")
            onClose()
          },
          onError: (e) => toast.error(getErrorKey(e)),
        })
      )}
    >
      <InputField
        id="link-title"
        autoFocus
        label="Title"
        placeholder="Lesson video: classroom management"
        error={errors.title?.message}
        {...form.register("title")}
      />
      <InputField
        id="link-url"
        type="url"
        label="Link"
        placeholder="https://www.youtube.com/watch?v=…"
        error={errors.url?.message}
        {...form.register("url")}
      />
    </FormDialog>
  )
}
