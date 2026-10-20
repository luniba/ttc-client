"use client"

import { cn } from "cn"
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import toast from "react-hot-toast"

import { ConfirmDialog } from "@/components/custom/confirm-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import {
  useVerifyCandidate,
  type Candidate,
} from "@/features/manage-candidates/services/candidates"
import { getErrorKey } from "@/lib/axios"
import { formatDateTime } from "@/lib/format"

// Verification status and the action that fits. Verifying asks first.
export function VerificationItem({ candidate: c }: { candidate: Candidate }) {
  const verify = useVerifyCandidate()
  const [asking, setAsking] = useState(false)
  const ready = !!c.certificateNo && !!c.issueDate

  if (c.isVerified)
    return (
      <Card
        tone="success"
        icon={ShieldCheck}
        title="Verified"
        text={
          c.verifiedAt
            ? `On ${formatDateTime(c.verifiedAt)}. This certificate passes the public check.`
            : "This certificate passes the public check."
        }
      />
    )

  return (
    <>
      <Card
        tone={ready ? "neutral" : "warning"}
        icon={ready ? ShieldQuestion : ShieldAlert}
        title="Not verified"
        text={
          ready
            ? "Verify it to make this certificate show as genuine on the public check."
            : "Add the certificate number and issue date before it can be verified."
        }
        action={
          ready ? (
            <Button type="button" onClick={() => setAsking(true)}>
              Verify certificate
            </Button>
          ) : (
            <Link
              href={routes.editCandidate(c.id)}
              className={buttonVariants({ variant: "outline" })}
            >
              Add details
            </Link>
          )
        }
      />
      <ConfirmDialog
        tone="primary"
        open={asking}
        onOpenChange={setAsking}
        title="Verify this certificate?"
        description={`${c.passportName} (certificate ${c.certificateNo ?? ""}) will show as genuine on the public certificate check. This can't be undone from here.`}
        confirmLabel="Verify"
        cancelLabel="Cancel"
        pending={verify.isPending}
        onConfirm={() =>
          verify.mutate(c.id, {
            onSuccess: () => {
              toast.success(`${c.passportName} is verified`)
              setAsking(false)
            },
            onError: (e) => toast.error(getErrorKey(e)),
          })
        }
      />
    </>
  )
}

const tones = {
  success: "bg-success-subtle text-success",
  warning: "bg-warning-subtle text-warning",
  neutral: "bg-neutral-100 text-neutral-600",
}

function Card({
  tone,
  icon: Icon,
  title,
  text,
  action,
}: {
  tone: keyof typeof tones
  icon: typeof ShieldCheck
  title: string
  text: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-background p-4 sm:col-span-2">
      <div className="flex min-w-0 flex-1 basis-64 items-start gap-3">
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full",
            tones[tone]
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-base font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{text}</p>
        </div>
      </div>
      {action}
    </div>
  )
}
