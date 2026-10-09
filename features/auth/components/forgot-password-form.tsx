"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { MailCheck } from "lucide-react"
import { useForm } from "react-hook-form"

import { FeaturedIcon } from "@/components/custom/featured-icon"
import { InputField } from "@/components/custom/input-field"
import { LoadingButton } from "@/components/custom/loading-button"
import {
  forgotPasswordSchema,
  useForgotPassword,
  type ForgotPasswordPayload,
} from "@/features/auth/services/forgot-password"

export function ForgotPasswordForm() {
  const forgot = useForgotPassword()
  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })
  const error = form.formState.errors.email?.message

  if (forgot.isSuccess)
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl bg-neutral-100 p-6 text-center"
      >
        <FeaturedIcon icon={MailCheck} size="md" />
        <p className="text-lg font-semibold">Check your inbox</p>
        <p className="text-sm text-muted-foreground">
          {`If ${forgot.variables.email} has an account, we've emailed a link to reset your password. It works for 60 minutes.`}
        </p>
      </div>
    )

  return (
    <form
      onSubmit={form.handleSubmit((v) => forgot.mutate(v))}
      noValidate
      className="flex flex-col gap-5"
    >
      <InputField
        inputClassName="rounded-full px-5"
        id="email"
        type="email"
        autoComplete="email"
        autoFocus
        label="Email"
        placeholder="you@example.com"
        error={error}
        {...form.register("email")}
      />
      <LoadingButton
        type="submit"
        size="xl"
        loading={forgot.isPending}
        className="w-full rounded-full"
      >
        Send reset link
      </LoadingButton>
    </form>
  )
}
