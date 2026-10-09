"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { FormDialog } from "@/components/custom/form-dialog"
import { InputField } from "@/components/custom/input-field"
import {
  categorySchema,
  useCreateCategory,
  type CategoryForm,
  type CategoryPayload,
} from "@/features/manage-courses/services/categories"
import type { Category } from "@/features/manage-courses/services/types"
import { getErrorCode, getErrorKey } from "@/lib/axios"

type Props = { onClose: () => void; onCreated: (c: Category) => void }

// Mounted only while open, so every opening starts with an empty form.
export function CategoryDialog({ onClose, onCreated }: Props) {
  const create = useCreateCategory()
  const form = useForm<CategoryForm, unknown, CategoryPayload>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  })

  const onSubmit = form.handleSubmit((v) =>
    create.mutate(v, {
      onSuccess: (category) => {
        toast.success("Category added")
        onCreated(category)
        onClose()
      },
      onError: (e) =>
        getErrorCode(e) === "CATEGORY_TAKEN"
          ? form.setError("name", { message: getErrorKey(e) })
          : toast.error(getErrorKey(e)),
    })
  )

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="New category"
      description="Courses are grouped by category on the website."
      submitLabel="Add category"
      cancelLabel="Cancel"
      pending={create.isPending}
      onSubmit={(e) => {
        // The dialog's form sits inside the course form in the React tree; keep the submit here.
        e.stopPropagation()
        void onSubmit(e)
      }}
    >
      <InputField
        id="category-name"
        autoFocus
        label="Name"
        placeholder="e.g. Business English"
        error={form.formState.errors.name?.message}
        {...form.register("name")}
      />
    </FormDialog>
  )
}
