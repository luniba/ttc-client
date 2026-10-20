import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { api, getErrorCode, getErrorKey } from "@/lib/axios"
import { requiredText } from "@/lib/validation"

export const verifySchema = z.object({
  fullName: requiredText(160),
  passportNumber: requiredText(40),
  // Typed by an admin: no format to enforce.
  certificateNo: requiredText(60),
})

export type VerifyForm = z.input<typeof verifySchema>
export type VerifyPayload = z.output<typeof verifySchema>

export type VerifiedCertificate = {
  certificateNo: string
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
