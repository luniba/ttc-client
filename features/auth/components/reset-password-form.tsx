"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "cn"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { PasswordField } from "@/components/custom/password-field"
import { LoadingButton } from "@/components/custom/loading-button"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import {
  resetPasswordSchema,
  isInvalidLink,
  useResetPassword,
  type ResetPasswordForm as Values,
} from "@/features/auth/services/reset-password"

function Notice({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action: { href: string; label: string }
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 rounded-2xl bg-neutral-100 p-6 text-center"
    >
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Link
        href={action.href}
        className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
      >
        {action.label}
      </Link>
    </div>
  )
}

export function ResetPasswordForm({ token }: { token: string }) {
  const reset = useResetPassword()
  const form = useForm<Values>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirm_password: "" },
  })
  const { errors } = form.formState
  const eye = {
    showLabel: "Show password",
    hideLabel: "Hide password",
  }

  if (reset.isSuccess)
    return (
      <Notice
        title="Password updated"
        description="You've been signed out on every device. Log in with your new password."
        action={{ href: routes.login(), label: "Log in" }}
      />
    )
  if (!token || isInvalidLink(reset.error))
    return (
      <Notice
        title="This link has expired"
        description="Reset links work once and expire after 60 minutes. Ask for a new one."
        action={{
          href: routes.forgotPassword(),
          label: "Get a new link",
        }}
      />
    )

  return (
    <form
      onSubmit={form.handleSubmit(({ password }) =>
        reset.mutate({ token, password })
      )}
      noValidate
      className="flex flex-col gap-5"
    >
      <PasswordField
        inputClassName="rounded-full px-5"
        id="password"
        autoComplete="new-password"
        autoFocus
        label="New password"
        description="At least 8 characters, with a letter and a number."
        error={errors.password?.message}
        {...form.register("password")}
        {...eye}
      />
      <PasswordField
        inputClassName="rounded-full px-5"
        id="confirm_password"
        autoComplete="new-password"
        label="Confirm new password"
        error={errors.confirm_password?.message}
        {...form.register("confirm_password")}
        {...eye}
      />
      <LoadingButton
        type="submit"
        size="xl"
        loading={reset.isPending}
        className="w-full rounded-full"
      >
        Save password
      </LoadingButton>
    </form>
  )
}
