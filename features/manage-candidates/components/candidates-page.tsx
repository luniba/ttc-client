"use client"

import { Add, Profile2User } from "iconsax-reactjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

import { PageIntro } from "@/components/custom/page-intro"
import { ResourceTable } from "@/components/custom/resource-table"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { CandidateDetailsDialog } from "@/features/manage-candidates/components/candidate-details-dialog"
import {
  CandidateCard,
  useCandidateColumns,
} from "@/features/manage-candidates/components/candidate-columns"
import {
  adminCandidates,
  type Candidate,
} from "@/features/manage-candidates/services/candidates"
import { useDeleteConfirm } from "@/hooks/use-delete-confirm"
import { useTableLabels } from "@/hooks/use-table-labels"
import { useTableState } from "@/hooks/use-table-state"

// Adding and editing open their own pages; clicking a row shows all its details.
export function CandidatesPage() {
  const router = useRouter()
  const table = useTableState()
  const page = adminCandidates.usePage(table.params)
  const labels = useTableLabels()
  const [viewing, setViewing] = useState<Candidate>()
  const del = useDeleteConfirm<Candidate>({
    remove: adminCandidates.useRemove(),
    title: "Delete this candidate?",
    describe: (c) =>
      `${c.passportName} (${c.certificateId}) will be removed from the candidate list.`,
    done: "Candidate deleted",
    onDone: () => table.afterDelete(page.data?.data.length ?? 0),
  })
  const actions = {
    onEdit: useCallback(
      (c: Candidate) => router.push(routes.adminCandidate(c.id)),
      [router]
    ),
    onDelete: del.ask,
  }
  const columns = useCandidateColumns(actions)

  const add = (
    <Link href={routes.newCandidate()} className={buttonVariants()}>
      <Add size={20} color="currentColor" aria-hidden />
      Add candidate
    </Link>
  )

  return (
    <div className="flex flex-col gap-6">
      <PageIntro action={page.data?.pagination.total ? add : undefined}>
        Certificate holders. Each gets a certificate ID when added.
      </PageIntro>
      <ResourceTable
        query={page}
        state={table}
        columns={columns}
        rowId={(c) => c.id}
        onRowClick={setViewing}
        mobile={(c) => <CandidateCard candidate={c} {...actions} />}
        labels={labels}
        label="Candidates"
        searchPlaceholder="Search by certificate, passport, name or email"
        loadError="Couldn't load candidates."
        empty={{
          icon: Profile2User,
          title: "No candidates yet",
          description:
            "Add a certificate holder and their certificate ID is generated for you.",
          action: add,
        }}
      />
      {viewing && (
        <CandidateDetailsDialog
          candidate={viewing}
          onClose={() => setViewing(undefined)}
        />
      )}
      {del.dialog}
    </div>
  )
}
