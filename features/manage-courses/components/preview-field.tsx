"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  description?: string
}

export function PreviewField({
  checked,
  onChange,
  description = "Anyone can read this module on the website without logging in or paying. Its materials (files and links) are free to view as well.",
}: Props) {
  return (
    <Field
      orientation="horizontal"
      className="items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4"
    >
      <Checkbox
        id="isPreview"
        size="md"
        className="mt-0.5"
        checked={checked}
        onCheckedChange={onChange}
        aria-describedby="isPreview-hint"
      />
      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="isPreview">Free preview</FieldLabel>
        <FieldDescription id="isPreview-hint">{description}</FieldDescription>
      </div>
    </Field>
  )
}
