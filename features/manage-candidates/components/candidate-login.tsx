"use client"

import { Copy, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { ChangePasswordDialog } from "@/features/manage-candidates/components/change-password-dialog"
import {
  Group,
  Item,
} from "@/features/manage-candidates/components/candidate-detail-parts"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  useCandidateLogin,
  useCreateLogin,
  useSetCourseAccess,
} from "@/features/manage-candidates/services/candidates"
import { getErrorKey } from "@/lib/axios"

const copy = (text: string, what: string) =>
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success(`${what} copied`))
    .catch(() => toast.error("Couldn't copy. Select it and copy by hand."))

// Username (email) and, while it is still the starting one, the password.
export function CandidateLoginGroup({ candidateId }: { candidateId: string }) {
  const login = useCandidateLogin(candidateId)
  const [shown, setShown] = useState(false)
  const [changing, setChanging] = useState(false)
  const l = login.data

  return (
    <Group title="Student login">
      {login.isPending && (
        <Item term="Status" wide>
          Loading…
        </Item>
      )}
      {login.isError && (
        <Item term="Status" wide>
          Couldn&apos;t load the login details.
        </Item>
      )}
      {l && !l.hasAccount && <CreateLogin candidateId={candidateId} />}
      {l?.hasAccount && (
        <>
          <Item term="Username (email)" wide>
            <span className="flex items-center gap-2">
              <span className="break-all">{l.username}</span>
              <CopyButton
                label="Copy username"
                onClick={() => copy(l.username ?? "", "Username")}
              />
            </span>
          </Item>
          <Item term="Password" wide mono>
            {l.password ? (
              <span className="flex items-center gap-2">
                <span>{shown ? l.password : "••••••••••••"}</span>
                <CopyButton
                  label={shown ? "Hide password" : "Show password"}
                  onClick={() => setShown((v) => !v)}
                  icon={shown ? EyeOff : Eye}
                />
                <CopyButton
                  label="Copy password"
                  onClick={() => copy(l.password ?? "", "Password")}
                />
              </span>
            ) : (
              <span className="font-sans text-sm font-medium text-muted-foreground">
                {l.passwordChangedByStudent
                  ? "The student has set their own password."
                  : "Not available."}
              </span>
            )}
          </Item>
          <CourseAccess candidateId={candidateId} enrolled={l.enrolled} />
          <div className="sm:col-span-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setChanging(true)}
            >
              Change password
            </Button>
          </div>
        </>
      )}
      {changing && (
        <ChangePasswordDialog
          candidateId={candidateId}
          onClose={() => setChanging(false)}
          onChanged={() => setShown(true)}
        />
      )}
    </Group>
  )
}

// For a candidate with no login yet.
function CreateLogin({ candidateId }: { candidateId: string }) {
  const create = useCreateLogin(candidateId)
  const [sendEmail, setSendEmail] = useState(false)
  return (
    <Item term="Status" wide>
      <span className="flex flex-col items-start gap-3">
        <span className="text-muted-foreground">
          No login yet. Create one to give this student access to their course.
          It uses the email on this record.
        </span>
        <label className="flex cursor-pointer items-center gap-2 font-normal">
          <Checkbox
            size="md"
            checked={sendEmail}
            onCheckedChange={(v) => setSendEmail(v === true)}
          />
          Email the login details to the student
        </label>
        <Button
          type="button"
          size="sm"
          disabled={create.isPending}
          onClick={() =>
            create.mutate(sendEmail, {
              onSuccess: () =>
                toast.success(
                  sendEmail
                    ? "Login created. The details were emailed."
                    : "Login created"
                ),
              onError: (err) => toast.error(getErrorKey(err)),
            })
          }
        >
          Create login
        </Button>
      </span>
    </Item>
  )
}

// Course access is separate from the login.
function CourseAccess({
  candidateId,
  enrolled,
}: {
  candidateId: string
  enrolled: boolean
}) {
  const access = useSetCourseAccess(candidateId)
  return (
    <Item term="Course access" wide>
      <span className="flex flex-wrap items-center gap-3">
        <Badge variant={enrolled ? "success" : "gray"}>
          {enrolled ? "Granted" : "Not granted"}
        </Badge>
        <Button
          type="button"
          size="sm"
          variant={enrolled ? "outline" : "primary"}
          disabled={access.isPending}
          onClick={() =>
            access.mutate(!enrolled, {
              onSuccess: () =>
                toast.success(
                  enrolled
                    ? "Access removed"
                    : "Access granted. The student has been emailed."
                ),
              onError: (err) => toast.error(getErrorKey(err)),
            })
          }
        >
          {enrolled ? "Revoke access" : "Grant access"}
        </Button>
      </span>
    </Item>
  )
}

function CopyButton({
  label,
  onClick,
  icon: Icon = Copy,
}: {
  label: string
  onClick: () => void
  icon?: typeof Copy
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-7 shrink-0 place-items-center rounded-md text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900"
    >
      <Icon className="size-4" aria-hidden />
    </button>
  )
}
