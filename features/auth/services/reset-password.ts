import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { api, getErrorCode, getErrorKey } from "@/lib/axios"

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72, "This is too long")
      .regex(/[a-z]/i, "Include at least one letter")
      .regex(/\d/, "Include at least one number"),
    confirm_password: z.string(),
  })
  .refine((v) => v.password === v.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords don't match",
  })

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

const resetPassword = async ({
  token,
  password,
}: {
  token: string
  password: string
}) => {
  await api.post("/auth/reset-password", { token, password })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    // A 400 means the link is unknown, used or expired; the form shows that instead of a toast.
    onError: (e) => {
      if (!isInvalidLink(e)) toast.error(getErrorKey(e))
    },
  })
}

export const isInvalidLink = (e: unknown) => getErrorCode(e) === "BAD_REQUEST"
