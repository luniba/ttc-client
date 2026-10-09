"use client"

import { Add } from "iconsax-reactjs"
import { useState } from "react"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CategoryDialog } from "@/features/manage-courses/components/category-dialog"
import { useCategories } from "@/features/manage-courses/services/categories"

const NEW = "__new__"

type Props = {
  value: string
  onChange: (id: string) => void
  onBlur?: () => void
  error?: string
}

// Categories, plus "Add new category" at the end, which opens a dialog and selects the result.
export function CategorySelect({ value, onChange, onBlur, error }: Props) {
  const categories = useCategories().data ?? []
  const [adding, setAdding] = useState(false)
  const items = [
    ...categories.map((c) => ({ value: c.id, label: c.name })),
    { value: NEW, label: "Add new category" },
  ]

  return (
    <Field>
      <FieldLabel htmlFor="categoryId">Category</FieldLabel>
      <Select
        items={items}
        value={value || null}
        onValueChange={(v) =>
          v === NEW ? setAdding(true) : onChange((v as string | null) ?? "")
        }
      >
        <SelectTrigger
          id="categoryId"
          className="w-full"
          onBlur={onBlur}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? "categoryId-hint" : undefined}
        >
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
          {categories.length > 0 && <SelectSeparator />}
          <SelectItem value={NEW} className="text-brand-700">
            <Add size={18} color="currentColor" aria-hidden />
            Add new category
          </SelectItem>
        </SelectContent>
      </Select>
      {error && <FieldError id="categoryId-hint">{error}</FieldError>}
      {adding && (
        <CategoryDialog
          onClose={() => setAdding(false)}
          onCreated={(c) => onChange(c.id)}
        />
      )}
    </Field>
  )
}
