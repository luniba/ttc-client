"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { LoadingButton } from "@/components/custom/loading-button"
import { PasswordField } from "@/components/custom/password-field"
import {
  isWrongPassword,
  passwordSchema,
  useChangePassword,
  type PasswordForm as Values,
} from "@/features/settings/services/account"

export function PasswordForm() {
  const change = useChangePassword()
  const form = useForm<Values>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })
  const { errors } = form.formState
  const eye = {
    showLabel: "Show password",
    hideLabel: "Hide password",
  }

  const onSubmit = form.handleSubmit((v) =>
    change.mutate(v, {
      onError: (e) =>
        isWrongPassword(e) &&
        form.setError("currentPassword", {
          message: "Your current password is incorrect",
        }),
    })
  )

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <PasswordField
        id="currentPassword"
        autoComplete="current-password"
        label="Current password"
        error={errors.currentPassword?.message}
        {...form.register("currentPassword")}
        {...eye}
      />
      <PasswordField
        id="newPassword"
        autoComplete="new-password"
        label="New password"
        description="At least 8 characters, with a letter and a number."
        error={errors.newPassword?.message}
        {...form.register("newPassword")}
        {...eye}
      />
      <PasswordField
        id="confirmPassword"
        autoComplete="new-password"
        label="Confirm new password"
        error={errors.confirmPassword?.message}
        {...form.register("confirmPassword")}
        {...eye}
      />
      <LoadingButton
        type="submit"
        loading={change.isPending}
        className="self-start"
      >
        Update password
      </LoadingButton>
    </form>
  )
}
