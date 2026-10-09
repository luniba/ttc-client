"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SearchX } from "lucide-react"
import { useForm } from "react-hook-form"

import { InputField } from "@/components/custom/input-field"
import { LoadingButton } from "@/components/custom/loading-button"
import { VerifiedDialog } from "@/features/certificate/components/verified-dialog"
import {
  useVerifyCertificate,
  verifySchema,
  type VerifyForm as Values,
  type VerifyPayload,
} from "@/features/certificate/services/verify"

// Checks the details against the register; a match opens VerifiedDialog, no match shows a note.
export function VerifyForm() {
  const verify = useVerifyCertificate()
  const form = useForm<Values, unknown, VerifyPayload>({
    resolver: zodResolver(verifySchema),
    defaultValues: { fullName: "", passportNumber: "", certificateId: "" },
  })
  const { errors } = form.formState
  // null: checked and nothing matched; undefined: not checked yet.
  const notFound = verify.isSuccess && verify.data === null

  return (
    <>
      <form
        noValidate
        onSubmit={form.handleSubmit((v) => verify.mutate(v))}
        // Editing after a miss clears the note, so it never describes old input.
        onChange={() => notFound && verify.reset()}
        className="flex flex-col gap-5"
      >
        <InputField
          id="fullName"
          autoComplete="off"
          label="Full name"
          placeholder="As printed on the certificate"
          error={errors.fullName?.message}
          {...form.register("fullName")}
        />
        <InputField
          id="passportNumber"
          autoComplete="off"
          label="Passport number"
          placeholder="Enter the passport number"
          error={errors.passportNumber?.message}
          {...form.register("passportNumber")}
        />
        <InputField
          id="certificateId"
          autoComplete="off"
          label="Certificate ID"
          placeholder="abcde-tesoltefl-12345"
          description="For example kuqwc-tesoltefl-35620"
          error={errors.certificateId?.message}
          {...form.register("certificateId")}
        />
        {notFound && <NotFoundNote />}
        <LoadingButton
          type="submit"
          size="xl"
          loading={verify.isPending}
          loadingText="Checking…"
          className="mt-2 w-full rounded-full"
        >
          Verify certificate
        </LoadingButton>
      </form>
      {verify.data && (
        <VerifiedDialog
          certificate={verify.data}
          onClose={() => {
            verify.reset()
            form.reset()
          }}
        />
      )}
    </>
  )
}

function NotFoundNote() {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-xl bg-red-500/10 p-4 text-sm"
    >
      <SearchX className="mt-0.5 size-5 shrink-0 text-red-400" aria-hidden />
      <p>
        <span className="font-semibold">No verified certificate matches.</span>{" "}
        <span className="text-muted-foreground">
          Check that the name, passport number and certificate ID match the
          certificate exactly. If you still can&apos;t find it, contact us.
        </span>
      </p>
    </div>
  )
}
