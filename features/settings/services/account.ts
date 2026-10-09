import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { meQuery, type User } from "@/features/auth/services/me"
import { setAccessToken } from "@/lib/access-token"
import { api, getErrorCode, getErrorKey } from "@/lib/axios"
import { publishSession } from "@/lib/session-channel"
import { requiredText } from "@/lib/validation"

export const profileSchema = z.object({ name: requiredText(120) })
export type ProfileForm = z.input<typeof profileSchema>
export type ProfilePayload = z.output<typeof profileSchema>

export const useUpdateProfile = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: ProfilePayload) =>
      (await api.patch<{ data: User }>("/auth/me", body)).data.data,
    onSuccess: (user) => {
      qc.setQueryData(meQuery.queryKey, user)
      toast.success("Profile saved")
    },
    onError: (e) => toast.error(getErrorKey(e)),
  })
}

// Same rules as the API's @IsStrongPassword: 8–72 characters with a letter and a digit.
export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "This field is required"),
    newPassword: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72, "This is too long")
      .regex(/[a-z]/i, "Include at least one letter")
      .regex(/\d/, "Include at least one number"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  })
export type PasswordForm = z.infer<typeof passwordSchema>

export const isWrongPassword = (e: unknown) =>
  getErrorCode(e) === "INVALID_CREDENTIALS"

// The API revokes every session, this one included, so a success ends with signing out.
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({ currentPassword, newPassword }: PasswordForm) => {
      await api.post("/auth/change-password", { currentPassword, newPassword })
    },
    onSuccess: () => {
      toast.success("Password updated. Log in with your new password.")
      setAccessToken(null)
      publishSession("signed-out")
    },
    onError: (e) => {
      if (!isWrongPassword(e)) toast.error(getErrorKey(e))
    },
  })
}
