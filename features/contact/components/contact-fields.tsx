"use client"

import { Controller, useFormContext } from "react-hook-form"

import { InputField } from "@/components/custom/input-field"
import { SelectField } from "@/components/custom/select-field"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { SubscribeField } from "@/features/contact/components/subscribe-field"
import type { ContactForm } from "@/features/contact/services/contact"

type Props = { courses: { value: string; label: string }[] }

export function ContactFields({ courses }: Props) {
  const { register, control, formState } = useFormContext<ContactForm>()
  const { errors } = formState
  const optional = <Optional label="(optional)" />

  return (
    <>
      <InputField
        id="firstName"
        autoComplete="given-name"
        label="First name"
        error={errors.firstName?.message}
        {...register("firstName")}
      />
      <InputField
        id="lastName"
        autoComplete="family-name"
        label="Last name"
        error={errors.lastName?.message}
        {...register("lastName")}
      />
      <InputField
        id="email"
        type="email"
        autoComplete="email"
        label="Email"
        error={errors.email?.message}
        {...register("email")}
      />
      <InputField
        id="phone"
        type="tel"
        autoComplete="tel"
        label={
          <>
            {"Phone"} {optional}
          </>
        }
        error={errors.phone?.message}
        {...register("phone")}
      />
      <Controller
        control={control}
        name="course"
        render={({ field }) => (
          <SelectField
            id="course"
            className="sm:col-span-2"
            label={
              <>
                {"Course you're interested in"} {optional}
              </>
            }
            placeholder="Choose a course"
            items={courses}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="message">Questions or comments</FieldLabel>
        <Textarea
          id="message"
          placeholder="Your message…"
          aria-invalid={!!errors.message || undefined}
          aria-describedby={errors.message ? "message-hint" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <FieldError id="message-hint">{errors.message.message}</FieldError>
        )}
      </Field>
      <SubscribeField />
    </>
  )
}

const Optional = ({ label }: { label: string }) => (
  <span className="font-normal text-muted-foreground">{label}</span>
)
