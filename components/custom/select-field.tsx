"use client"

import type { ReactNode } from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Item = { value: string; label: string }

type Props = {
  id: string
  label: ReactNode
  items: Item[]
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  description?: ReactNode
  error?: string
  className?: string
}

export function SelectField({
  id,
  label,
  items,
  value,
  onChange,
  onBlur,
  placeholder,
  description,
  error,
  className,
}: Props) {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select
        items={items}
        value={value || null}
        onValueChange={(v) => onChange((v as string | null) ?? "")}
      >
        <SelectTrigger
          id={id}
          className="w-full"
          onBlur={onBlur}
          aria-invalid={!!error || undefined}
          aria-describedby={error || description ? `${id}-hint` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <FieldError id={`${id}-hint`}>{error}</FieldError>
      ) : (
        description && (
          <FieldDescription id={`${id}-hint`}>{description}</FieldDescription>
        )
      )}
    </Field>
  )
}
