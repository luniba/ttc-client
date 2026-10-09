import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { api, getErrorCode, getErrorKey } from "@/lib/axios"
import { requiredText } from "@/lib/validation"

export const verifySchema = z.object({
  fullName: requiredText(160),
  passportNumber: requiredText(40),
  // As printed: five letters, "tesoltefl", five digits. Case doesn't matter.
  certificateId: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z]{5}-tesoltefl-\d{5}$/,
      "Use the format abcde-tesoltefl-12345"
    ),
})

export type VerifyForm = z.input<typeof verifySchema>
export type VerifyPayload = z.output<typeof verifySchema>

export type VerifiedCertificate = {
  certificateId: string
  holderName: string
  courseTitle: string
  issuedAt: string
}

// null when nothing matches; the API answers 404 rather than saying which field was wrong.
const verify = async (payload: VerifyPayload) => {
  try {
    return (
      await api.post<{ data: VerifiedCertificate }>(
        "/certificates/verify",
        payload
      )
    ).data.data
  } catch (e) {
    if (getErrorCode(e) === "NOT_FOUND") return null
    throw e
  }
}

export const useVerifyCertificate = () => {
  return useMutation({
    mutationFn: verify,
    onError: (e) => toast.error(getErrorKey(e)),
  })
}
