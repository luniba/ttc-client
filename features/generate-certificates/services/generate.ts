import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

import type { Option } from "@/components/custom/search-combobox"
import {
  adminCandidates,
  today,
  toPdfFile,
  type Candidate,
  type CertificateDocument,
  type CertificateVariant,
} from "@/features/manage-candidates/services/candidates"
import { api } from "@/lib/axios"
import { requiredDate, requiredText } from "@/lib/validation"

// What the certificate and transcript print. Nothing is saved.
export const generateSchema = z.object({
  passportName: requiredText(160),
  courseId: z.string().min(1, "Choose a course"),
  certificateNo: requiredText(60),
  dateOfBirth: requiredDate.refine((d) => d < today(), {
    message: "The date of birth must be in the past",
  }),
  issueDate: requiredDate,
})

export type GenerateForm = z.input<typeof generateSchema>
export type GeneratePayload = z.output<typeof generateSchema>

export const emptyGenerateForm = (): GenerateForm => ({
  passportName: "",
  courseId: "",
  certificateNo: "",
  dateOfBirth: "",
  issueDate: today(),
})

// The PDF for the details last generated, plus an object URL to show it (the preview revokes it).
// Not kept once off screen: switching back regenerates, which takes a moment.
export const useGeneratedDocument = (
  payload: GeneratePayload | null,
  document: CertificateDocument,
  variant: CertificateVariant
) =>
  useQuery({
    queryKey: ["admin", "certificates", payload, document, variant],
    queryFn: async () => {
      const res = await api.post<Blob>(
        `/admin/certificates/${document}/${variant}`,
        payload,
        { responseType: "blob" }
      )
      const file = toPdfFile(res, `${document}-${variant}.pdf`)
      return { ...file, url: URL.createObjectURL(file.blob) }
    },
    enabled: !!payload,
    gcTime: 0,
    retry: false,
  })

// A candidate in the picker; carries the record so picking one can fill in the form.
export type CandidateOption = Option & { candidate: Candidate }

// Searches every candidate by name, certificate number, passport number or email.
export function useCandidateOptions(q: string) {
  const page = adminCandidates.usePage({ page: 1, limit: 20, q })
  return {
    loading: page.isFetching,
    items: (page.data?.data ?? []).map((c): CandidateOption => ({
      value: c.id,
      label: c.passportName,
      hint: [c.certificateNo ?? "No certificate No yet", c.course.title].join(
        " · "
      ),
      candidate: c,
    })),
  }
}
