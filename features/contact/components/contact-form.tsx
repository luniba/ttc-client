"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { LoadingButton } from "@/components/custom/loading-button"
import { ContactFields } from "@/features/contact/components/contact-fields"
import { ContactSuccess } from "@/features/contact/components/contact-success"
import {
  contactSchema,
  useSendMessage,
  type ContactForm as Values,
  type ContactPayload,
} from "@/features/contact/services/contact"

type Props = { courses: { value: string; label: string }[]; course?: string }

export function ContactForm({ courses, course = "" }: Props) {
  const send = useSendMessage()
  const defaults: Values = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course,
    message: "",
    subscribe: false,
  }
  const form = useForm<Values, unknown, ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaults,
  })

  if (send.isSuccess)
    return (
      <ContactSuccess
        onAgain={() => {
          form.reset(defaults)
          send.reset()
        }}
      />
    )

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit((v) => send.mutate(v))}
        className="grid gap-5 sm:grid-cols-2"
      >
        <ContactFields courses={courses} />
        <LoadingButton
          type="submit"
          size="xl"
          loading={send.isPending}
          loadingText="Sending…"
          className="rounded-full sm:col-span-2 sm:justify-self-start"
        >
          Send message
        </LoadingButton>
      </form>
    </FormProvider>
  )
}
