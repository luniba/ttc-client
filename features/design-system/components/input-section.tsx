import { ChevronDown, CircleAlert, CircleHelp, Mail } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"

export function InputSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-display-xs font-semibold">Inputs</h2>
      <div className="grid max-w-3xl grid-cols-2 gap-8">
        <Field>
          <FieldLabel htmlFor="ds-email">Email</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
            <InputGroupInput id="ds-email" placeholder="ram@example.com" />
            <InputGroupAddon align="inline-end">
              <CircleHelp className="size-4 text-neutral-400" />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>This is a hint text to help user.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="ds-email-error">Email</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
            <InputGroupInput
              id="ds-email-error"
              aria-invalid
              defaultValue="ram@example"
            />
            <InputGroupAddon align="inline-end">
              <CircleAlert className="size-4 text-destructive" />
            </InputGroupAddon>
          </InputGroup>
          <FieldError>This is an error message.</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="ds-name">Full name</FieldLabel>
          <Input id="ds-name" placeholder="Ram Bahadur Thapa" />
        </Field>
        <Field>
          <FieldLabel htmlFor="ds-disabled">Disabled</FieldLabel>
          <Input id="ds-disabled" disabled placeholder="Not editable" />
        </Field>
        <Field>
          <FieldLabel htmlFor="ds-website">Website (leading text)</FieldLabel>
          <InputGroup>
            <InputGroupAddon className="h-full border-e border-input pe-3">
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="ds-website"
              placeholder="www.drivedesk.com.np"
            />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="ds-phone">Phone (leading dropdown)</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText className="text-foreground">
                NP <ChevronDown className="text-placeholder" />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput id="ds-phone" placeholder="+977 98XXXXXXXX" />
          </InputGroup>
        </Field>
        <Field className="col-span-2">
          <FieldLabel htmlFor="ds-notes">Notes</FieldLabel>
          <Textarea id="ds-notes" placeholder="Enter a description..." />
        </Field>
      </div>
    </section>
  )
}
