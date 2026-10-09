"use client"

import { format, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState, type ReactNode } from "react"

import { Calendar } from "@/components/ui/calendar"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DAY = "yyyy-MM-dd"
const toDate = (day: string) => (day ? parse(day, DAY, new Date()) : undefined)

type Props = {
  id: string
  label: ReactNode
  // A calendar day as "YYYY-MM-DD", or "" when empty: what the form and API use.
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  // Latest day that can be picked, as "YYYY-MM-DD".
  max?: string
  placeholder?: string
  description?: ReactNode
  error?: string
}

// shadcn's date picker (a button opening a Calendar in a Popover), styled like the other inputs.
// Month and year dropdowns, since a date of birth is decades back.
export function DatePickerField({
  id,
  label,
  value,
  onChange,
  onBlur,
  max,
  placeholder = "Pick a date",
  description,
  error,
}: Props) {
  const [open, setOpen] = useState(false)
  const selected = toDate(value)
  const latest = max ? toDate(max) : undefined
  const hint = error || description ? `${id}-hint` : undefined

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Popover
        open={open}
        onOpenChange={(o) => {
          setOpen(o)
          if (!o) onBlur?.()
        }}
      >
        <PopoverTrigger
          id={id}
          aria-invalid={!!error || undefined}
          aria-describedby={hint}
          data-placeholder={selected ? undefined : ""}
          className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3.5 py-2.5 text-start text-base whitespace-nowrap text-foreground shadow-xs transition-[box-shadow,border-color] outline-none focus-visible:border-brand-300 focus-visible:ring-4 focus-visible:ring-ring aria-invalid:border-red-300 aria-invalid:focus-visible:ring-destructive-ring data-placeholder:text-placeholder"
        >
          {selected ? format(selected, "PPP") : placeholder}
          <CalendarIcon
            className="size-5 shrink-0 text-placeholder"
            aria-hidden
          />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={selected}
            defaultMonth={selected ?? latest}
            startMonth={new Date(1900, 0)}
            endMonth={latest ?? new Date(new Date().getFullYear() + 5, 11)}
            disabled={latest ? { after: latest } : undefined}
            onSelect={(day) => {
              onChange(day ? format(day, DAY) : "")
              setOpen(false)
              onBlur?.()
            }}
          />
        </PopoverContent>
      </Popover>
      {error ? (
        <FieldError id={hint}>{error}</FieldError>
      ) : (
        description && (
          <FieldDescription id={hint}>{description}</FieldDescription>
        )
      )}
    </Field>
  )
}
