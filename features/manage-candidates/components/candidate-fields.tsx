"use client"

import { Controller, useFormContext } from "react-hook-form"

import { DatePickerField } from "@/components/custom/date-picker-field"
import { InputField } from "@/components/custom/input-field"
import { SelectField } from "@/components/custom/select-field"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import {
  today,
  type CandidateForm,
} from "@/features/manage-candidates/services/candidates"

type Item = { value: string; label: string }

// Every field the admin fills in. Dates use the date picker; the course is a select.
export function CandidateFields({ courses }: { courses: Item[] }) {
  const { register, formState } = useFormContext<CandidateForm>()
  const { errors } = formState
  const text = (
    name: Exclude<keyof CandidateForm, "courseId" | "dateOfBirth" | "issueDate">
  ) => ({
    id: name,
    error: errors[name]?.message,
    ...register(name),
  })

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <InputField
        label="Certificate No"
        autoComplete="off"
        {...text("certificateNo")}
      />
      <Pick
        name="courseId"
        label="Assigned course"
        placeholder="Select a course"
        items={courses}
      />
      <InputField
        label="Passport name"
        autoComplete="off"
        description="Exactly as printed in the passport."
        {...text("passportName")}
      />
      <InputField
        label="Passport No"
        autoComplete="off"
        {...text("passportNo")}
      />
      <DateField name="dateOfBirth" label="Date of birth" max={today()} />
      <InputField
        label="Nationality"
        autoComplete="off"
        {...text("nationality")}
      />
      <InputField
        type="email"
        label="Email"
        autoComplete="off"
        {...text("email")}
      />
      <DateField name="issueDate" label="Issue date" />
      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="address">Address</FieldLabel>
        <Textarea
          id="address"
          className="min-h-24"
          aria-invalid={!!errors.address || undefined}
          aria-describedby={errors.address ? "address-hint" : undefined}
          {...register("address")}
        />
        {errors.address && (
          <FieldError id="address-hint">{errors.address.message}</FieldError>
        )}
      </Field>
    </div>
  )
}

type PickProps = {
  name: "courseId"
  label: string
  placeholder: string
  items: Item[]
}

function Pick({ name, label, placeholder, items }: PickProps) {
  const { control, formState } = useFormContext<CandidateForm>()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <SelectField
          id={name}
          label={label}
          placeholder={placeholder}
          items={items}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={formState.errors[name]?.message}
        />
      )}
    />
  )
}

type DateFieldProps = {
  name: "dateOfBirth" | "issueDate"
  label: string
  max?: string
}

function DateField({ name, label, max }: DateFieldProps) {
  const { control, formState } = useFormContext<CandidateForm>()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePickerField
          id={name}
          label={label}
          max={max}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={formState.errors[name]?.message}
        />
      )}
    />
  )
}
