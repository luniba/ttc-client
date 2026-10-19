"use client"

import { useState } from "react"
import toast from "react-hot-toast"

import { FormDialog } from "@/components/custom/form-dialog"
import { SearchSelect, type Option } from "@/components/custom/search-combobox"
import {
  adminCandidates,
  useVerifyCandidate,
} from "@/features/manage-candidates/services/candidates"
import { getErrorKey } from "@/lib/axios"

// Every candidate is listed so a search never comes back empty just because they are already verified;
// those are marked and can't be picked.
function useCandidateSearch(q: string) {
  const page = adminCandidates.usePage({ page: 1, limit: 20, q })
  return {
    loading: page.isFetching,
    items: (page.data?.data ?? []).map((c): Option => ({
      value: c.id,
      label: c.passportName,
      hint: `${c.certificateId} · ${c.course.title}`,
      badge: c.isVerified ? "Verified" : undefined,
      disabled: c.isVerified,
    })),
  }
}

export function VerifyDialog({ onClose }: { onClose: () => void }) {
  const verify = useVerifyCandidate()
  const [picked, setPicked] = useState<Option | null>(null)
  const [error, setError] = useState<string>()

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="Verify candidate"
      description="Search for a candidate, then verify them. Already verified candidates are marked."
      submitLabel="Verify"
      cancelLabel="Cancel"
      pending={verify.isPending}
      onSubmit={(e) => {
        e.preventDefault()
        if (!picked) return setError("Choose a candidate")
        verify.mutate(picked.value, {
          onSuccess: () => {
            toast.success(`${picked.label} is verified`)
            onClose()
          },
          onError: (err) => toast.error(getErrorKey(err)),
        })
      }}
    >
      <SearchSelect
        id="candidate"
        label="Candidate"
        placeholder="Search by name, certificate ID or email"
        useSearch={useCandidateSearch}
        value={picked}
        onChange={(o) => {
          setPicked(o)
          setError(undefined)
        }}
        error={error}
      />
    </FormDialog>
  )
}
