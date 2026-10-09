"use client"

import { cn } from "cn"
import { Eye, EyeSlash } from "iconsax-reactjs"
import { useState, type ComponentProps, type ReactNode } from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Props = Omit<ComponentProps<typeof Input>, "type"> & {
  id: string
  label: ReactNode
  description?: ReactNode
  error?: string
  inputClassName?: string
  // Accessible names for the eye button, already translated by the caller.
  showLabel: string
  hideLabel: string
}

export function PasswordField({
  id,
  label,
  description,
  error,
  className,
  inputClassName,
  showLabel,
  hideLabel,
  ...props
}: Props) {
  const [visible, setVisible] = useState(false)
  const Icon = visible ? EyeSlash : Eye

  return (
    <Field className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          className={cn("pe-12", inputClassName)}
          aria-invalid={!!error || undefined}
          aria-describedby={error || description ? `${id}-hint` : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
          aria-controls={id}
          className="absolute inset-y-0 end-1 my-auto grid size-9 place-items-center rounded-full text-placeholder transition-colors hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Icon size={20} color="currentColor" variant="Linear" aria-hidden />
        </button>
      </div>
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
