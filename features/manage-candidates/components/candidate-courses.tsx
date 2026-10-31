"use client"

import type { ReactNode } from "react"
import toast from "react-hot-toast"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  useCandidateCourses,
  useSetCourseAccess,
  type CandidateCourse,
} from "@/features/manage-candidates/services/candidates"
import { getErrorKey } from "@/lib/axios"
import { formatDateTime } from "@/lib/format"

// Each course the student asked for or ordered, with access granted or not. A completed order
// grants its courses on its own; this is where an admin grants or revokes by hand.
export function CandidateCoursesGroup({
  candidateId,
}: {
  candidateId: string
}) {
  const list = useCandidateCourses(candidateId)
  const data = list.data

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Courses
      </h3>
      <div className="rounded-xl bg-neutral-50">
        {list.isPending && <Note>Loading…</Note>}
        {list.isError && <Note>Couldn&apos;t load the courses.</Note>}
        {data && !data.hasAccount && (
          <Note>
            No login yet. Create one on the Student login tab before granting
            access.
          </Note>
        )}
        {data && (
          <ul className="divide-y divide-neutral-200">
            {data.courses.map((c) => (
              <CourseRow
                key={c.id}
                candidateId={candidateId}
                course={c}
                canGrant={data.hasAccount}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function CourseRow({
  candidateId,
  course: c,
  canGrant,
}: {
  candidateId: string
  course: CandidateCourse
  canGrant: boolean
}) {
  const access = useSetCourseAccess(candidateId)
  return (
    <li className="flex flex-wrap items-center gap-3 p-4">
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-medium break-words">{c.title}</span>
        {c.grantedAt && (
          <span className="text-xs text-muted-foreground">
            Granted {formatDateTime(c.grantedAt)}
          </span>
        )}
      </span>
      <Badge variant={c.granted ? "success" : "gray"}>
        {c.granted ? "Granted" : "Not granted"}
      </Badge>
      <Button
        type="button"
        size="sm"
        variant={c.granted ? "outline" : "primary"}
        disabled={access.isPending || (!c.granted && !canGrant)}
        onClick={() =>
          access.mutate(
            { courseId: c.id, grant: !c.granted },
            {
              onSuccess: () =>
                toast.success(
                  c.granted
                    ? "Access removed"
                    : "Access granted. The student has been emailed."
                ),
              onError: (err) => toast.error(getErrorKey(err)),
            }
          )
        }
      >
        {c.granted ? "Revoke access" : "Grant access"}
      </Button>
    </li>
  )
}

function Note({ children }: { children: ReactNode }) {
  return <p className="p-4 text-sm text-muted-foreground">{children}</p>
}
