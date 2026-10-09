"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { InputField } from "@/components/custom/input-field"
import { LoadingButton } from "@/components/custom/loading-button"
import type { User } from "@/features/auth/services/me"
import {
  profileSchema,
  useUpdateProfile,
  type ProfileForm as Values,
  type ProfilePayload,
} from "@/features/settings/services/account"

export function ProfileForm({ user }: { user: User }) {
  const update = useUpdateProfile()
  const form = useForm<Values, unknown, ProfilePayload>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name },
  })
  const error = form.formState.errors.name?.message

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit((v) =>
        update.mutate(v, { onSuccess: (u) => form.reset({ name: u.name }) })
      )}
      className="flex flex-col gap-5"
    >
      <InputField
        id="name"
        autoComplete="name"
        label="Full name"
        error={error}
        {...form.register("name")}
      />
      <InputField
        id="email"
        type="email"
        label="Email"
        description="Your email is your login and can't be changed here."
        value={user.email}
        disabled
        readOnly
      />
      <LoadingButton
        type="submit"
        loading={update.isPending}
        disabled={!form.formState.isDirty}
        className="self-start"
      >
        Save changes
      </LoadingButton>
    </form>
  )
}
