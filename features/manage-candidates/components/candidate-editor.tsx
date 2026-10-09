"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { useRouter } from "next/navigation"

import { BackLink } from "@/components/custom/back-link"
import { InputField } from "@/components/custom/input-field"
import { LoadingButton } from "@/components/custom/loading-button"
import { CandidateFields } from "@/features/manage-candidates/components/candidate-fields"
import {
  adminCandidates,
  candidateSchema,
  toCandidateForm,
  type Candidate,
  type CandidateForm,
  type CandidatePayload,
} from "@/features/manage-candidates/services/candidates"
import { adminCourses } from "@/features/manage-courses/services/courses"
import { routes } from "@/config/routes"
import { getErrorCode, getErrorKey } from "@/lib/axios"

// The add / edit page body. The certificate ID is generated on create and never edited.
export function CandidateEditor({ candidate }: { candidate?: Candidate }) {
  const router = useRouter()
  const save = adminCandidates.useSave()
  const form = useForm<CandidateForm, unknown, CandidatePayload>({
    resolver: zodResolver(candidateSchema),
    defaultValues: toCandidateForm(candidate),
  })
  const { isDirty } = form.formState
  const courses = useCourseItems(candidate)

  const onSubmit = form.handleSubmit((body) =>
    save.mutate(
      { id: candidate?.id, body },
      {
        onSuccess: (saved) => {
          toast.success(
            candidate
              ? "Candidate updated"
              : `Candidate added: ${saved.certificateId}`
          )
          router.push(routes.admin("candidates"))
        },
        onError: (e) =>
          getErrorCode(e) === "CERTIFICATE_NO_TAKEN"
            ? form.setError(
                "certificateNo",
                { message: getErrorKey(e) },
                { shouldFocus: true }
              )
            : toast.error(getErrorKey(e)),
      }
    )
  )

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <BackLink href={routes.admin("candidates")}>All candidates</BackLink>
        <h2 className="text-xl font-semibold">
          {candidate ? candidate.passportName : "Add candidate"}
        </h2>
      </div>
      <FormProvider {...form}>
        <form
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col gap-6 rounded-2xl bg-neutral-50 p-6 sm:p-8"
        >
          {candidate && (
            <InputField
              id="certificateId"
              label="Certificate ID"
              value={candidate.certificateId}
              readOnly
              disabled
              description="Generated when the candidate was added."
              inputClassName="font-mono"
            />
          )}
          <CandidateFields courses={courses} />
          <div className="sticky bottom-0 -mx-1 flex items-center gap-3 bg-neutral-50/90 px-1 py-2 backdrop-blur">
            <LoadingButton
              type="submit"
              loading={save.isPending}
              disabled={!!candidate && !isDirty}
            >
              {candidate ? "Save changes" : "Add candidate"}
            </LoadingButton>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

// Every course, drafts included; plus the candidate's own course if it has since been deleted.
// ponytail: first 100 courses only (the API's page cap); add a searchable picker past that.
function useCourseItems(candidate?: Candidate) {
  const page = adminCourses.usePage({ page: 1, limit: 100, q: "" })
  const items = (page.data?.data ?? []).map((c) => ({
    value: c.id,
    label: c.title,
  }))
  if (candidate && !items.some((i) => i.value === candidate.course.id))
    items.push({ value: candidate.course.id, label: candidate.course.title })
  return items
}
