import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { today } from "@/features/manage-candidates/services/candidates"
import { api, getErrorKey } from "@/lib/axios"
import { email, requiredDate, requiredText } from "@/lib/validation"

// The candidate form minus certificate number and issue date.
export const checkoutSchema = z.object({
  courseSlug: z.string().min(1, "Choose a course"),
  passportName: requiredText(160),
  passportNo: requiredText(40),
  dateOfBirth: requiredDate.refine((d) => d < today(), {
    message: "The date of birth must be in the past",
  }),
  nationality: requiredText(80),
  email: email.pipe(z.string().max(254, "This is too long")),
  address: requiredText(500),
})

export type CheckoutForm = z.input<typeof checkoutSchema>
export type CheckoutPayload = z.output<typeof checkoutSchema>

export const useRequestCourse = () =>
  useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      await api.post("/checkout", payload)
    },
    onError: (e) => toast.error(getErrorKey(e)),
  })
