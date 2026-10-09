"use client"

import Link from "next/link"
import type { ReactNode } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { routes } from "@/config/routes"
import { VerifiedBadge } from "@/features/manage-candidates/components/candidate-columns"
import type { Candidate } from "@/features/manage-candidates/services/candidates"
import { formatDateTime, formatDay } from "@/lib/format"

type Props = { candidate: Candidate; onClose: () => void }

// Every field of one candidate, grouped: the certificate, then the person.
export function CandidateDetailsDialog({ candidate: c, onClose }: Props) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle>{c.passportName}</DialogTitle>
            <VerifiedBadge verified={c.isVerified} />
          </div>
          <DialogDescription className="font-mono">
            {c.certificateId}
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-6 pb-2">
          <Group title="Certificate">
            <Item term="Certificate ID" mono>
              {c.certificateId}
            </Item>
            <Item term="Certificate No">{c.certificateNo}</Item>
            <Item term="Assigned course" wide>
              {c.course.title}
            </Item>
            <Item term="Issue date">{formatDay(c.issueDate)}</Item>
            <Item term="Verified">
              {c.verifiedAt ? formatDateTime(c.verifiedAt) : "Not yet"}
            </Item>
          </Group>
          <Group title="Candidate">
            <Item term="Passport name">{c.passportName}</Item>
            <Item term="Passport No">{c.passportNo}</Item>
            <Item term="Date of birth">{formatDay(c.dateOfBirth)}</Item>
            <Item term="Nationality">{c.nationality}</Item>
            <Item term="Email" wide>
              <a
                href={`mailto:${c.email}`}
                className="text-brand-700 hover:underline"
              >
                {c.email}
              </a>
            </Item>
            <Item term="Address" wide>
              <span className="whitespace-pre-line">{c.address}</span>
            </Item>
          </Group>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          <Link href={routes.adminCandidate(c.id)} className={buttonVariants()}>
            Edit candidate
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      <dl className="grid gap-x-6 gap-y-4 rounded-xl bg-neutral-50 p-4 sm:grid-cols-2">
        {children}
      </dl>
    </section>
  )
}

function Item({
  term,
  wide,
  mono,
  children,
}: {
  term: string
  wide?: boolean
  mono?: boolean
  children: ReactNode
}) {
  return (
    <div
      className={
        wide ? "flex flex-col gap-1 sm:col-span-2" : "flex flex-col gap-1"
      }
    >
      <dt className="text-xs text-muted-foreground">{term}</dt>
      <dd
        className={
          mono
            ? "font-mono text-sm break-all"
            : "text-sm font-medium break-words"
        }
      >
        {children}
      </dd>
    </div>
  )
}
