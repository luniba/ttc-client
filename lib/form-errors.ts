import type { FieldValues, Path, UseFormSetError } from "react-hook-form"

import { getErrorCode, getFieldErrors } from "@/lib/axios"

// Puts the API's per-field errors on the form's matching fields: a duplicate says what is taken
// (duplicate[field], or a general "already in use"), anything else asks to check the value.
// Returns false when none applied, so the caller shows a toast instead.
export function applyServerErrors<T extends FieldValues>(
  form: { setError: UseFormSetError<T> },
  error: unknown,
  fields: readonly Path<T>[],
  duplicate: Partial<Record<Path<T>, string>> = {}
) {
  const isDuplicate = getErrorCode(error) === "duplicate"
  let applied = false
  for (const field of Object.keys(getFieldErrors(error)) as Path<T>[]) {
    if (!fields.includes(field)) continue
    const message = isDuplicate
      ? (duplicate[field] ?? "This is already in use")
      : "Check this value"
    form.setError(field, { message }, { shouldFocus: !applied })
    applied = true
  }
  return applied
}
