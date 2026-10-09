import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { api, getErrorKey } from "@/lib/axios"
import { email } from "@/lib/validation"

export const forgotPasswordSchema = z.object({ email })

export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>

const forgotPassword = async (payload: ForgotPasswordPayload) => {
  await api.post("/auth/forgot-password", payload)
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onError: (e) => toast.error(getErrorKey(e)),
  })
}
