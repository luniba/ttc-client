"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { LoadingButton } from "@/components/custom/loading-button"
import { Input } from "@/components/ui/input"
import {
  subscribeSchema,
  useSubscribe,
  type SubscribePayload,
} from "@/features/marketing/services/subscribe"

export function NewsletterForm() {
  const subscribe = useSubscribe()
  const form = useForm<SubscribePayload>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: "" },
  })
  const error = form.formState.errors.email?.message

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit((v) =>
        subscribe.mutate(v, { onSuccess: () => form.reset() })
      )}
      className="flex w-full flex-col gap-2 md:max-w-md"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          autoComplete="email"
          aria-label="Email address"
          placeholder="Email address"
          aria-invalid={!!error || undefined}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="rounded-full px-5"
          {...form.register("email")}
        />
        <LoadingButton
          type="submit"
          size="lg"
          loading={subscribe.isPending}
          className="h-11 rounded-full"
        >
          Subscribe
        </LoadingButton>
      </div>
      {error && (
        <p id="newsletter-error" className="px-5 text-sm text-destructive">
          {error}
        </p>
      )}
    </form>
  )
}
