"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { InputField } from "@/components/custom/input-field"
import { LoadingButton } from "@/components/custom/loading-button"
import { PasswordField } from "@/components/custom/password-field"
import { routes } from "@/config/routes"
import { safeRedirect } from "@/features/auth/lib/safe-redirect"
import {
  loginSchema,
  useLogin,
  type LoginPayload,
} from "@/features/auth/services/login"

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter()
  const login = useLogin()
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })
  const { errors } = form.formState

  const onSubmit = form.handleSubmit((values) =>
    login.mutate(values, {
      // Staff go to the admin panel, students to their account.
      onSuccess: ({ user }) =>
        router.replace(
          safeRedirect(
            next,
            user.role === "student" ? routes.account() : routes.admin()
          )
        ),
    })
  )

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <InputField
        inputClassName="rounded-full px-5"
        id="email"
        type="email"
        autoComplete="email"
        autoFocus
        label="Email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...form.register("email")}
      />
      <div className="flex flex-col gap-2">
        <PasswordField
          inputClassName="rounded-full px-5"
          id="password"
          autoComplete="current-password"
          label="Password"
          error={errors.password?.message}
          {...form.register("password")}
          showLabel="Show password"
          hideLabel="Hide password"
        />
        <Link
          href={routes.forgotPassword()}
          className="self-end text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Forgot password?
        </Link>
      </div>
      <LoadingButton
        type="submit"
        size="xl"
        loading={login.isPending}
        loadingText="Logging in…"
        className="w-full rounded-full"
      >
        Log in
      </LoadingButton>
    </form>
  )
}
