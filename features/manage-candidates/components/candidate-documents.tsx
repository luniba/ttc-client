"use client"

import { Award, Download, Eye, FileText, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

import { Button, buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { Group } from "@/features/manage-candidates/components/candidate-detail-parts"
import { DocumentViewerDialog } from "@/features/manage-candidates/components/document-viewer-dialog"
import {
  hasCertificateTemplate,
  useDownloadCertificateDocument,
  type Candidate,
  type CertificateDocument,
  type CertificateVariant,
} from "@/features/manage-candidates/services/candidates"

const documents: {
  id: CertificateDocument
  label: string
  hint: string
  icon: typeof Award
}[] = [
  {
    id: "certificate",
    label: "Certificate",
    hint: "Name, course, certificate number and issue date.",
    icon: Award,
  },
  {
    id: "transcript",
    label: "Transcript",
    hint: "Adds the date of birth and the 12 modules, all graded A.",
    icon: FileText,
  },
]

const variants: { id: CertificateVariant; label: string }[] = [
  { id: "digital", label: "Digital" },
  { id: "print", label: "Print" },
]

// Generates the certificate and transcript PDFs from this record. Editing the record changes the
// next download; nothing is stored.
export function CertificateDocumentsPanel({
  candidate: c,
}: {
  candidate: Candidate
}) {
  const ready = !!c.certificateNo && !!c.issueDate
  const supported = hasCertificateTemplate(c.course.title)

  if (!supported || !ready)
    return (
      <Group title="Certificate documents">
        <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
          <p className="min-w-0 flex-1 basis-64 text-sm text-muted-foreground">
            {!supported
              ? "Certificates can only be generated for TEFL courses for now."
              : "Add the certificate number and issue date to generate the certificate and transcript."}
          </p>
          {supported && (
            <Link
              href={routes.editCandidate(c.id)}
              className={buttonVariants({ variant: "outline" })}
            >
              Add details
            </Link>
          )}
        </div>
      </Group>
    )

  return (
    <Group title="Certificate documents">
      {documents.map((d) => (
        <DocumentRow key={d.id} candidateId={c.id} document={d} />
      ))}
      <p className="text-xs text-muted-foreground sm:col-span-2">
        Digital has a cream background for sending by email. Print is white for
        printing on paper.
      </p>
    </Group>
  )
}

// One document: view it in the portal, or download the Digital or Print PDF.
function DocumentRow({
  candidateId,
  document: d,
}: {
  candidateId: string
  document: (typeof documents)[number]
}) {
  const download = useDownloadCertificateDocument(candidateId)
  const [viewing, setViewing] = useState(false)
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-background p-4 sm:col-span-2">
      <div className="flex min-w-0 flex-1 basis-56 items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
          <d.icon className="size-5" aria-hidden />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-base font-semibold">{d.label}</p>
          <p className="text-sm text-muted-foreground">{d.hint}</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          aria-label={`View ${d.label.toLowerCase()}`}
          onClick={() => setViewing(true)}
        >
          <Eye className="size-4" aria-hidden />
          View
        </Button>
        {variants.map((v) => (
          <Button
            key={v.id}
            type="button"
            variant={v.id === "digital" ? "primary" : "outline"}
            size="sm"
            disabled={download.isPending}
            aria-label={`Download ${d.label.toLowerCase()}, ${v.label.toLowerCase()} PDF`}
            onClick={() =>
              download.mutate(
                { document: d.id, variant: v.id },
                {
                  onError: () =>
                    toast.error(
                      `Couldn't generate the ${d.label.toLowerCase()}. Please try again.`
                    ),
                }
              )
            }
          >
            {download.isPending && download.variables?.variant === v.id ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Download className="size-4" aria-hidden />
            )}
            {v.label}
          </Button>
        ))}
      </div>
      <DocumentViewerDialog
        candidateId={candidateId}
        document={d.id}
        label={d.label}
        open={viewing}
        onOpenChange={setViewing}
      />
    </div>
  )
}
