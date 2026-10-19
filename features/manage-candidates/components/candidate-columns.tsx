"use client"

import { useMemo } from "react"

import { actionsColumn, RowActions } from "@/components/custom/row-actions"
import { Badge } from "@/components/ui/badge"
import type { Candidate } from "@/features/manage-candidates/services/candidates"
import { formatDay } from "@/lib/format"
import { listColumns } from "@/lib/table"

type Actions = {
  onEdit: (c: Candidate) => void
  onDelete: (c: Candidate) => void
}

// The essentials only; clicking a row opens every field in CandidateDetailsDialog.
export function useCandidateColumns({ onEdit, onDelete }: Actions) {
  return useMemo(() => {
    const col = listColumns<Candidate>()
    return [
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
        cell: ({ row }) => (
          <span className="flex flex-wrap items-center gap-2">
            {row.original.passportName}
            <RequestBadge candidate={row.original} />
          </span>
        ),
      }),
      col.display({
        id: "course",
        header: "Assigned course",
        meta: { className: "min-w-52" },
        cell: ({ row }) => row.original.course.title,
      }),
      col.display({
        id: "issueDate",
        header: "Issue date",
        meta: { className: "whitespace-nowrap tabular-nums" },
        cell: ({ row }) =>
          row.original.issueDate ? formatDay(row.original.issueDate) : "—",
      }),
      col.display({
        id: "isVerified",
        header: "Verified",
        cell: ({ row }) => <VerifiedBadge verified={row.original.isVerified} />,
      }),
      actionsColumn<Candidate>({
        header: "Actions",
        editLabel: (c) => `Edit candidate: ${c.passportName}`,
        deleteLabel: (c) => `Delete candidate: ${c.passportName}`,
        onEdit,
        onDelete,
      }),
    ]
  }, [onEdit, onDelete])
}

export function VerifiedBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <Badge variant="success">Verified</Badge>
  ) : (
    <Badge variant="gray">Not verified</Badge>
  )
}

// Someone who asked for a course on the website and has no certificate yet: the admin's to-do.
export function RequestBadge({ candidate }: { candidate: Candidate }) {
  return candidate.certificateNo ? null : (
    <Badge variant="warning">Website request</Badge>
  )
}

// The same essentials as a card, for phones; tapping it opens the details.
export function CandidateCard({
  candidate: c,
  onEdit,
  onDelete,
}: { candidate: Candidate } & Actions) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="flex flex-wrap items-center gap-2 font-medium">
          {c.passportName}
          <VerifiedBadge verified={c.isVerified} />
          <RequestBadge candidate={c} />
        </p>
        <p className="font-mono text-[13px] text-muted-foreground">
          {c.certificateId}
        </p>
        <p className="text-sm text-muted-foreground">
          {c.course.title} ·{" "}
          {c.issueDate ? formatDay(c.issueDate) : "Not issued"}
        </p>
      </div>
      <RowActions
        editLabel={`Edit candidate: ${c.passportName}`}
        deleteLabel={`Delete candidate: ${c.passportName}`}
        onEdit={() => onEdit(c)}
        onDelete={() => onDelete(c)}
      />
    </div>
  )
}
