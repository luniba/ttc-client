import type { ComponentProps, ReactNode } from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Props = ComponentProps<typeof Input> & {
  id: string
  label: ReactNode
  description?: ReactNode
  error?: string
  inputClassName?: string
}

export function InputField({
  id,
  label,
  description,
  error,
  className,
  inputClassName,
  ...props
}: Props) {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        className={inputClassName}
        aria-invalid={!!error || undefined}
        aria-describedby={error || description ? `${id}-hint` : undefined}
        {...props}
      />
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
