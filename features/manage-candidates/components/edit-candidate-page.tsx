"use client"

import { ListError } from "@/components/custom/list-error"
import { CandidateEditor } from "@/features/manage-candidates/components/candidate-editor"
import { useCandidate } from "@/features/manage-candidates/services/candidates"

export function EditCandidatePage({ id }: { id: string }) {
  const candidate = useCandidate(id)
  if (candidate.isError)
    return (
      <ListError
        message="Couldn't load this candidate."
        retryLabel="Try again"
        onRetry={() => candidate.refetch()}
      />
    )
  if (!candidate.data)
    return (
      <div className="mx-auto h-96 w-full max-w-3xl animate-pulse rounded-2xl bg-neutral-50" />
    )
  // Keyed so a refetch never fights the form's own state.
  return <CandidateEditor key={candidate.data.id} candidate={candidate.data} />
}
