"use client"

import { Controller, useFormContext } from "react-hook-form"

import { DatePickerField } from "@/components/custom/date-picker-field"
import { InputField } from "@/components/custom/input-field"
import { SelectField } from "@/components/custom/select-field"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import type { CheckoutForm } from "@/features/checkout/services/checkout"
import { today } from "@/features/manage-candidates/services/candidates"

type Props = { courses: { value: string; label: string }[] }

// The details the council needs to issue the certificate, entered by the student instead of by an admin.
export function CheckoutFields({ courses }: Props) {
  const { register, control, formState } = useFormContext<CheckoutForm>()
  const { errors } = formState

  return (
    <>
      <Controller
        control={control}
        name="courseSlug"
        render={({ field }) => (
          <SelectField
            id="courseSlug"
            className="sm:col-span-2"
            label="Course"
            placeholder="Choose a course"
            items={courses}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.courseSlug?.message}
          />
        )}
      />
      <InputField
        id="passportName"
        label="Full name"
        autoComplete="name"
        description="Exactly as printed in your passport. It goes on your certificate."
        className="sm:col-span-2"
        error={errors.passportName?.message}
        {...register("passportName")}
      />
      <InputField
        id="passportNo"
        label="Passport number"
        autoComplete="off"
        error={errors.passportNo?.message}
        {...register("passportNo")}
      />
      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <DatePickerField
            id="dateOfBirth"
            label="Date of birth"
            max={today()}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.dateOfBirth?.message}
          />
        )}
      />
      <InputField
        id="nationality"
        label="Nationality"
        autoComplete="country-name"
        error={errors.nationality?.message}
        {...register("nationality")}
      />
      <InputField
        id="email"
        type="email"
        label="Email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <AddressField />
    </>
  )
}

function AddressField() {
  const { register, formState } = useFormContext<CheckoutForm>()
  const { errors } = formState
  return (
    <Field className="sm:col-span-2">
      <FieldLabel htmlFor="address">Address</FieldLabel>
      <Textarea
        id="address"
        className="min-h-24"
        autoComplete="street-address"
        aria-invalid={!!errors.address || undefined}
        aria-describedby={errors.address ? "address-hint" : undefined}
        {...register("address")}
      />
      {errors.address && (
        <FieldError id="address-hint">{errors.address.message}</FieldError>
      )}
    </Field>
  )
}
