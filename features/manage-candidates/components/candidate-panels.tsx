import { VerificationItem } from "@/features/manage-candidates/components/candidate-verify"
import {
  Group,
  Item,
} from "@/features/manage-candidates/components/candidate-detail-parts"
import type { Candidate } from "@/features/manage-candidates/services/candidates"
import { formatDay } from "@/lib/format"

// Certificate section of the details tab.
export function CertificatePanel({ candidate: c }: { candidate: Candidate }) {
  return (
    <Group title="Certificate">
      <Item term="Certificate ID" mono>
        {c.certificateId}
      </Item>
      <Item term="Certificate No">{c.certificateNo ?? "Not issued yet"}</Item>
      <Item term="Assigned course" wide>
        {c.course.title}
      </Item>
      <Item term="Issue date">
        {c.issueDate ? formatDay(c.issueDate) : "Not issued yet"}
      </Item>
      <VerificationItem candidate={c} />
    </Group>
  )
}

// Candidate section of the details tab.
export function PersonPanel({ candidate: c }: { candidate: Candidate }) {
  return (
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
  )
}
