"use client"

import { Download } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  PdfFrame,
  Segmented,
  variantItems,
} from "@/features/manage-candidates/components/pdf-preview"
import {
  saveBlob,
  useCertificateDocument,
  type CertificateDocument,
  type CertificateVariant,
} from "@/features/manage-candidates/services/candidates"

// Shows a candidate's generated certificate or transcript inside the portal.
export function DocumentViewerDialog({
  candidateId,
  document,
  label,
  open,
  onOpenChange,
}: {
  candidateId: string
  document: CertificateDocument
  label: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [variant, setVariant] = useState<CertificateVariant>("digital")
  const pdf = useCertificateDocument(candidateId, document, variant, open)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[calc(100dvh-2rem)] max-w-5xl">
        <DialogHeader className="flex-row flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <DialogTitle>{label}</DialogTitle>
            <DialogDescription>
              Generated from this candidate&apos;s record.
            </DialogDescription>
          </div>
          <Segmented
            className="w-full sm:w-auto"
            label="Version"
            items={variantItems}
            value={variant}
            onChange={setVariant}
          />
        </DialogHeader>
        <div className="min-h-0 flex-1 px-4 sm:px-6">
          <PdfFrame
            url={pdf.data?.url}
            isError={pdf.isError}
            onRetry={() => pdf.refetch()}
            title={`${label}, ${variant} version`}
            errorMessage={`Couldn't generate the ${label.toLowerCase()}.`}
            onDownload={() =>
              pdf.data && saveBlob(pdf.data.blob, pdf.data.filename)
            }
          />
        </div>
        <DialogFooter className="max-sm:flex-col-reverse max-sm:[&>*]:w-full">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            type="button"
            disabled={!pdf.data}
            onClick={() =>
              pdf.data && saveBlob(pdf.data.blob, pdf.data.filename)
            }
          >
            <Download className="size-4" aria-hidden />
            Download {variant === "digital" ? "Digital" : "Print"} PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
