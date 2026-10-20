"use client"

import { Badge } from "@/components/ui/badge"
import {
  useAccount,
  type AccountCertificate,
} from "@/features/account/services/account"
import { formatDay } from "@/lib/format"
import type { ReactNode } from "react"

const box = "rounded-2xl bg-neutral-50 p-6 sm:p-8"

export function ProfilePage() {
  const account = useAccount()

  if (account.isPending)
    return <div aria-busy className="h-64 animate-pulse rounded-2xl bg-muted" />
  if (account.isError)
    return (
      <p className={box + " text-muted-foreground"}>
        We couldn&apos;t load your profile. Please refresh the page.
      </p>
    )

  const { profile, certificates } = account.data
  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <section className={box + " flex flex-col gap-5"}>
        <h2 className="text-lg font-semibold">Your details</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Item term="Name">{profile.name}</Item>
          <Item term="Username">{profile.username}</Item>
          <Item term="Email">{profile.email}</Item>
          <Item term="Member since">
            {formatDay(profile.createdAt.slice(0, 10))}
          </Item>
        </dl>
        <p className="text-sm text-muted-foreground">
          Change your name, username or password in Settings. Your email
          can&apos;t be changed.
        </p>
      </section>
      <section className={box + " flex flex-col gap-5"}>
        <h2 className="text-lg font-semibold">Your certificates</h2>
        {certificates.length === 0 ? (
          <p className="text-muted-foreground">
            Certificates appear here once you have requested a course.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {certificates.map((c, i) => (
              <Certificate key={i} certificate={c} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function Certificate({ certificate: c }: { certificate: AccountCertificate }) {
  const verified = c.status === "verified"
  return (
    <li className="flex flex-col gap-1 rounded-xl border border-neutral-200 bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold">{c.courseTitle}</span>
        <Badge variant={verified ? "success" : "gray"}>
          {verified ? "Verified" : "Being prepared"}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        {c.certificateNo
          ? `Certificate number ${c.certificateNo}`
          : "No certificate number yet"}
        {c.issueDate && ` · Issued ${formatDay(c.issueDate)}`}
      </p>
    </li>
  )
}

function Item({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs text-muted-foreground">{term}</dt>
      <dd className="text-base font-medium break-words">{children}</dd>
    </div>
  )
}
