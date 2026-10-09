import type { ReactNode } from "react"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

type Props = {
  id: string
  label: ReactNode
  description?: ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
}

export function SwitchField({
  id,
  label,
  description,
  checked,
  onChange,
}: Props) {
  return (
    <Field orientation="horizontal" className="items-start gap-3">
      <Switch
        id={id}
        size="md"
        checked={checked}
        onCheckedChange={onChange}
        className="mt-0.5"
        aria-describedby={description ? `${id}-hint` : undefined}
      />
      <div className="flex flex-col gap-0.5">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {description && (
          <FieldDescription id={`${id}-hint`}>{description}</FieldDescription>
        )}
      </div>
    </Field>
  )
}
