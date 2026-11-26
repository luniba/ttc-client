"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useIsFetching } from "@tanstack/react-query"
import { DocumentText } from "iconsax-reactjs"
import { Download } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { LoadingButton } from "@/components/custom/loading-button"
import { PageIntro } from "@/components/custom/page-intro"
import { Button } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { GenerateFields } from "@/features/generate-certificates/components/generate-form"
import {
  emptyGenerateForm,
  generateSchema,
  useGeneratedDocument,
  type GenerateForm,
  type GeneratePayload,
} from "@/features/generate-certificates/services/generate"
import {
  documentItems,
  PdfFrame,
  Segmented,
  variantItems,
} from "@/features/manage-candidates/components/pdf-preview"
import {
  hasCertificateTemplate,
  saveBlob,
  type CertificateDocument,
  type CertificateVariant,
} from "@/features/manage-candidates/services/candidates"
import { adminCourses } from "@/features/manage-courses/services/courses"

// Type in the details (or pick a candidate to fill them in), generate, then view and download the
// certificate and transcript. Nothing is saved: adding a candidate is what puts a certificate on
// the public check.
export function GenerateCertificatesPage() {
  const form = useForm<GenerateForm, unknown, GeneratePayload>({
    resolver: zodResolver(generateSchema),
    defaultValues: emptyGenerateForm(),
  })
  const [payload, setPayload] = useState<GeneratePayload | null>(null)
  // Same key prefix as the preview's queries, so the button shows them loading.
  const generating =
    useIsFetching({ queryKey: ["admin", "certificates", payload] }) > 0
  const courses = useTeflCourses()

  const onSubmit = form.handleSubmit((values) => {
    setPayload(values)
    // Re-arm the "changed since" note against what was just generated.
    form.reset(values)
    // Stacked layout (below lg): the preview is under the form, so bring it into view.
    if (!window.matchMedia("(min-width: 64rem)").matches)
      requestAnimationFrame(() =>
        window.document
          .getElementById(previewId)
          ?.scrollIntoView({ behavior: "smooth" })
      )
  })
  const stale = !!payload && form.formState.isDirty

  return (
    <div className="flex flex-col gap-6">
      <PageIntro>
        Enter the details, or pick an existing candidate to fill them in, then
        view or download the certificate and transcript as PDF. Nothing here is
        saved. To make a certificate pass the public check,{" "}
        <Link
          href={routes.newCandidate()}
          className="font-medium text-brand-700 hover:underline"
        >
          add the candidate
        </Link>{" "}
        as well.
      </PageIntro>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-start">
        <FormProvider {...form}>
          <form
            noValidate
            onSubmit={onSubmit}
            className="flex flex-col gap-6 rounded-2xl bg-neutral-50 p-4 sm:p-6"
          >
            <GenerateFields courses={courses} />
            <div className="flex flex-col gap-2">
              <LoadingButton
                type="submit"
                className="w-full"
                loading={!!payload && generating}
              >
                {payload ? "Update preview" : "Generate"}
              </LoadingButton>
              {stale && (
                <p className="text-sm text-warning" role="status">
                  The details changed. Click Update preview to refresh it.
                </p>
              )}
            </div>
          </form>
        </FormProvider>
        <PreviewPanel payload={payload} />
      </div>
    </div>
  )
}

const previewId = "certificate-preview"

// The generated document, switchable between certificate / transcript and digital / print.
function PreviewPanel({ payload }: { payload: GeneratePayload | null }) {
  const [document, setDocument] = useState<CertificateDocument>("certificate")
  const [variant, setVariant] = useState<CertificateVariant>("digital")
  const pdf = useGeneratedDocument(payload, document, variant)
  const download = () => pdf.data && saveBlob(pdf.data.blob, pdf.data.filename)

  return (
    <section
      id={previewId}
      aria-label="Preview"
      className="flex h-[75svh] min-h-[28rem] scroll-mt-4 flex-col gap-3 rounded-2xl border border-neutral-200 p-3 sm:gap-4 sm:p-4 lg:sticky lg:top-4 lg:h-[calc(100dvh-10rem)]"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Segmented
            label="Document"
            items={documentItems}
            value={document}
            onChange={setDocument}
          />
          <Segmented
            label="Version"
            items={variantItems}
            value={variant}
            onChange={setVariant}
          />
        </div>
        <Button
          type="button"
          size="sm"
          className="w-full sm:w-auto"
          disabled={!pdf.data}
          onClick={download}
        >
          <Download className="size-4" aria-hidden />
          Download PDF
        </Button>
      </div>
      <div className="min-h-0 flex-1">
        {payload ? (
          <PdfFrame
            url={pdf.data?.url}
            isError={pdf.isError}
            onRetry={() => pdf.refetch()}
            onDownload={download}
            title={`${document}, ${variant} version`}
            errorMessage={`Couldn't generate the ${document}. Check the details and try again.`}
          />
        ) : (
          <EmptyPreview />
        )}
      </div>
    </section>
  )
}

function EmptyPreview() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 rounded-xl bg-neutral-50 p-6 text-center">
      <DocumentText
        size={32}
        color="currentColor"
        className="text-muted-foreground"
        aria-hidden
      />
      <p className="max-w-xs text-sm text-muted-foreground">
        Fill in the details and click Generate. The certificate and transcript
        appear here.
      </p>
    </div>
  )
}

// The courses that have a template. First 100 courses, like the candidate form.
function useTeflCourses() {
  const page = adminCourses.usePage({ page: 1, limit: 100, q: "" })
  return (page.data?.data ?? [])
    .filter((c) => hasCertificateTemplate(c.title))
    .map((c) => ({ value: c.id, label: c.title }))
}
