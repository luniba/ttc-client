"use client"

import Link from "next/link"

import { BackLink } from "@/components/custom/back-link"
import { ListError } from "@/components/custom/list-error"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import {
  RequestBadge,
  VerifiedBadge,
} from "@/features/manage-candidates/components/candidate-columns"
import { CandidateLoginGroup } from "@/features/manage-candidates/components/candidate-login"
import {
  CertificatePanel,
  PersonPanel,
} from "@/features/manage-candidates/components/candidate-panels"
import { CandidateTabs } from "@/features/manage-candidates/components/candidate-tabs"
import { useCandidate } from "@/features/manage-candidates/services/candidates"

// One candidate's page, in two tabs: details and student login.
export function CandidateDetailsPage({ id }: { id: string }) {
  const candidate = useCandidate(id)
  if (candidate.isError)
    return (
      <ListError
        message="Couldn't load this candidate."
        retryLabel="Try again"
        onRetry={() => candidate.refetch()}
      />
    )
  const c = candidate.data
  if (!c)
    return (
      <div className="mx-auto h-96 w-full max-w-3xl animate-pulse rounded-2xl bg-neutral-50" />
    )

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <BackLink href={routes.admin("candidates")}>All candidates</BackLink>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold">{c.passportName}</h2>
              <VerifiedBadge verified={c.isVerified} />
              <RequestBadge candidate={c} />
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              {c.certificateId}
            </p>
          </div>
          <Link href={routes.editCandidate(c.id)} className={buttonVariants()}>
            Edit candidate
          </Link>
        </div>
      </div>
      <CandidateTabs
        tabs={[
          {
            id: "details",
            label: "Details",
            panel: (
              <div className="flex flex-col gap-6">
                <CertificatePanel candidate={c} />
                <PersonPanel candidate={c} />
              </div>
            ),
          },
          {
            id: "login",
            label: "Student login",
            panel: <CandidateLoginGroup candidateId={c.id} />,
          },
        ]}
      />
    </div>
  )
}
