"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { LoadingButton } from "@/components/custom/loading-button"
import { CheckoutFields } from "@/features/checkout/components/checkout-fields"
import { CheckoutSuccess } from "@/features/checkout/components/checkout-success"
import {
  checkoutSchema,
  useRequestCourse,
  type CheckoutForm as Values,
  type CheckoutPayload,
} from "@/features/checkout/services/checkout"

type Props = { courses: { value: string; label: string }[]; course?: string }

export function CheckoutForm({ courses, course = "" }: Props) {
  const request = useRequestCourse()
  const form = useForm<Values, unknown, CheckoutPayload>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      courseSlug: course,
      passportName: "",
      passportNo: "",
      dateOfBirth: "",
      nationality: "",
      email: "",
      address: "",
    },
  })

  if (request.isSuccess) return <CheckoutSuccess />

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit((v) => request.mutate(v))}
        className="grid gap-5 sm:grid-cols-2"
      >
        <CheckoutFields courses={courses} />
        <LoadingButton
          type="submit"
          size="xl"
          loading={request.isPending}
          loadingText="Sending…"
          className="rounded-full sm:col-span-2 sm:justify-self-start"
        >
          Request this course
        </LoadingButton>
      </form>
    </FormProvider>
  )
}
