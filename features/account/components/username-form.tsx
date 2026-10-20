"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { InputField } from "@/components/custom/input-field"
import { LoadingButton } from "@/components/custom/loading-button"
import type { User } from "@/features/auth/services/me"
import {
  isUsernameTaken,
  usernameSchema,
  useUpdateUsername,
  type UsernameForm as Values,
  type UsernamePayload,
} from "@/features/account/services/account"

export function UsernameForm({ user }: { user: User }) {
  const update = useUpdateUsername()
  const form = useForm<Values, unknown, UsernamePayload>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: user.username },
  })

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit((v) =>
        update.mutate(v, {
          onSuccess: (u) => form.reset({ username: u.username }),
          onError: (e) =>
            isUsernameTaken(e) &&
            form.setError("username", {
              message: "That username is already taken. Try another one.",
            }),
        })
      )}
      className="flex flex-col gap-5"
    >
      <InputField
        id="username"
        autoComplete="username"
        label="Username"
        description="You can log in with your username or your email."
        error={form.formState.errors.username?.message}
        {...form.register("username")}
      />
      <LoadingButton
        type="submit"
        loading={update.isPending}
        disabled={!form.formState.isDirty}
        className="self-start"
      >
        Save username
      </LoadingButton>
    </form>
  )
}
