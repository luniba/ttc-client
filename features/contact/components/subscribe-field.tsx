"use client"

import { Controller, useFormContext } from "react-hook-form"

import { Checkbox } from "@/components/ui/checkbox"
import type { ContactForm } from "@/features/contact/services/contact"

export function SubscribeField() {
  const { control } = useFormContext<ContactForm>()
  return (
    <Controller
      control={control}
      name="subscribe"
      render={({ field }) => (
        <label className="flex cursor-pointer items-start gap-3 text-base text-label sm:col-span-2">
          <Checkbox
            size="md"
            className="mt-0.5"
            checked={field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
          />
          {
            "I'd like to join the TESOL TEFL Council mailing list for course news, teaching tips and job opportunities."
          }
        </label>
      )}
    />
  )
}
