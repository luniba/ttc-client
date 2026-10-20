"use client"

import { useState } from "react"
import toast from "react-hot-toast"

import { FormDialog } from "@/components/custom/form-dialog"
import { InputField } from "@/components/custom/input-field"
import { useSetLoginPassword } from "@/features/manage-candidates/services/candidates"
import { getErrorKey } from "@/lib/axios"

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

// Empty means generate one. Signs the student out everywhere.
export function ChangePasswordDialog({
  candidateId,
  onClose,
  onChanged,
}: {
  candidateId: string
  onClose: () => void
  onChanged: () => void
}) {
  const set = useSetLoginPassword(candidateId)
  const [value, setValue] = useState("")
  const [error, setError] = useState<string>()

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="Change password"
      description="This signs the student out everywhere. Share the new password with them yourself."
      submitLabel={value.trim() ? "Set password" : "Generate password"}
      cancelLabel="Cancel"
      pending={set.isPending}
      onSubmit={(e) => {
        e.preventDefault()
        const password = value.trim()
        if (password && !PASSWORD_RULE.test(password))
          return setError(
            "Use at least 8 characters, with a letter and a number"
          )
        set.mutate(password || undefined, {
          onSuccess: () => {
            toast.success("Password updated")
            onChanged()
            onClose()
          },
          onError: (err) => toast.error(getErrorKey(err)),
        })
      }}
    >
      <InputField
        id="new-password"
        label="New password"
        autoComplete="off"
        value={value}
        error={error}
        description="Leave it empty to generate a random one."
        onChange={(e) => {
          setValue(e.target.value)
          setError(undefined)
        }}
      />
    </FormDialog>
  )
}
