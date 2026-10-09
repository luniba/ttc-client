"use client"

import { ShieldTick } from "iconsax-reactjs"
import { useState } from "react"

import { PageIntro } from "@/components/custom/page-intro"
import { ResourceTable } from "@/components/custom/resource-table"
import { Button } from "@/components/ui/button"
import {
  adminCandidates,
  type Candidate,
} from "@/features/manage-candidates/services/candidates"
import { VerifyDialog } from "@/features/verification/components/verify-dialog"
import { useTableLabels } from "@/hooks/use-table-labels"
import { useTableState } from "@/hooks/use-table-state"
import { formatDateTime } from "@/lib/format"
import { listColumns } from "@/lib/table"

const col = listColumns<Candidate>()

// Module scope: the columns never change, so TanStack never rebuilds them.
const columns = [
  col.display({
    id: "certificateId",
    header: "Certificate ID",
    meta: {
      className: "whitespace-nowrap font-mono text-[13px] text-foreground",
    },
    cell: ({ row }) => row.original.certificateId,
  }),
  col.display({
    id: "passportName",
    header: "Passport name",
    meta: { className: "min-w-44 font-medium text-foreground" },
    cell: ({ row }) => row.original.passportName,
  }),
  col.display({
    id: "passportNo",
    header: "Passport No",
    meta: { className: "whitespace-nowrap" },
    cell: ({ row }) => row.original.passportNo,
  }),
  col.display({
    id: "course",
    header: "Course",
    meta: { className: "min-w-52" },
    cell: ({ row }) => row.original.course.title,
  }),
  col.display({
    id: "nationality",
    header: "Nationality",
    meta: { className: "whitespace-nowrap" },
    cell: ({ row }) => row.original.nationality,
  }),
  col.display({
    id: "verifiedAt",
    header: "Verified on",
    meta: { className: "whitespace-nowrap tabular-nums" },
    cell: ({ row }) =>
      row.original.verifiedAt && formatDateTime(row.original.verifiedAt),
  }),
]

// Verified candidates, newest first, and the button to verify another.
export function VerificationPage() {
  const table = useTableState()
  const page = adminCandidates.usePage({ ...table.params, verified: "true" })
  const labels = useTableLabels()
  const [verifying, setVerifying] = useState(false)

  const verify = (
    <Button onClick={() => setVerifying(true)}>
      <ShieldTick size={20} color="currentColor" aria-hidden />
      Verify Candidate
    </Button>
  )

  return (
    <div className="flex flex-col gap-6">
      <PageIntro action={verify}>
        Candidates whose certificates have been verified.
      </PageIntro>
      <ResourceTable
        query={page}
        state={table}
        columns={columns}
        rowId={(c) => c.id}
        mobile={(c) => (
          <div className="flex flex-col gap-1">
            <p className="font-medium">{c.passportName}</p>
            <p className="font-mono text-[13px] text-muted-foreground">
              {c.certificateId}
            </p>
            <p className="text-sm text-muted-foreground">
              {c.course.title}
              {c.verifiedAt && ` · Verified ${formatDateTime(c.verifiedAt)}`}
            </p>
          </div>
        )}
        labels={labels}
        label="Verified candidates"
        searchPlaceholder="Search by certificate, passport, name or email"
        loadError="Couldn't load verified candidates."
        empty={{
          icon: ShieldTick,
          title: "No verified candidates yet",
          description: "Use Verify Candidate to verify the first one.",
        }}
      />
      {verifying && <VerifyDialog onClose={() => setVerifying(false)} />}
    </div>
  )
}
