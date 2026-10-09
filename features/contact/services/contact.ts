import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { api, getErrorKey } from "@/lib/axios"
import { email, optionalText, requiredText } from "@/lib/validation"

export const contactSchema = z.object({
  firstName: requiredText(80),
  lastName: requiredText(80),
  email,
  phone: optionalText(40),
  course: z.string(),
  message: requiredText(5000),
  subscribe: z.boolean(),
})

export type ContactForm = z.input<typeof contactSchema>
export type ContactPayload = z.output<typeof contactSchema>

const send = async ({ phone, course, ...rest }: ContactPayload) => {
  await api.post("/contact", {
    ...rest,
    phone: phone || undefined,
    courseSlug: course || undefined,
  })
}

export const useSendMessage = () => {
  return useMutation({
    mutationFn: send,
    onError: (e) => toast.error(getErrorKey(e)),
  })
}
