"use client"

import { cn } from "cn"
import { Download, ExternalLink, Loader2 } from "lucide-react"
import { useEffect, useSyncExternalStore } from "react"

import { ListError } from "@/components/custom/list-error"
import { Button, buttonVariants } from "@/components/ui/button"

// A generated PDF shown with the browser's own viewer, with loading and error states.
export function PdfFrame({
  url,
  isError,
  onRetry,
  title,
  errorMessage,
  onDownload,
}: {
  url: string | undefined
  isError: boolean
  onRetry: () => void
  title: string
  errorMessage: string
  onDownload: () => void
}) {
  useRevokeLater(url)
  const inline = useInlinePdf()
  if (isError)
    return (
      <ListError
        message={errorMessage}
        retryLabel="Try again"
        onRetry={onRetry}
      />
    )
  if (!url)
    return (
      <div className="grid size-full place-items-center rounded-xl bg-neutral-50">
        <Loader2
          className="size-6 animate-spin text-muted-foreground"
          aria-label="Generating"
        />
      </div>
    )
  // Phones (Android Chrome, most in-app browsers) can't show a PDF inside the page.
  if (!inline)
    return (
      <div className="flex size-full flex-col items-center justify-center gap-4 rounded-xl bg-neutral-50 p-6 text-center">
        <p className="max-w-xs text-sm text-muted-foreground">
          This browser can&apos;t show the PDF here. Open it or download it.
        </p>
        <div className="flex w-full max-w-xs flex-col gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener"
            className={buttonVariants({ variant: "outline" })}
          >
            <ExternalLink className="size-4" aria-hidden />
            Open PDF
          </a>
          <Button type="button" onClick={onDownload}>
            <Download className="size-4" aria-hidden />
            Download PDF
          </Button>
        </div>
      </div>
    )
  return (
    <iframe
      key={url}
      src={`${url}#view=Fit&toolbar=1`}
      title={title}
      className="size-full rounded-xl border border-neutral-200 bg-neutral-100"
    />
  )
}

// Frees a PDF's object URL once it's no longer shown. Delayed, not immediate: the frame has loaded
// by then (revoking doesn't affect a loaded document), and React's dev double-mount would
// otherwise revoke a URL that's still about to be used.
function useRevokeLater(url: string | undefined) {
  useEffect(() => {
    if (!url) return
    return () => {
      setTimeout(() => URL.revokeObjectURL(url), 30_000)
    }
  }, [url])
}

// navigator.pdfViewerEnabled: false where PDFs only download (Android Chrome). Assumed true on
// the server and in browsers too old to say.
const noSubscribe = () => () => {}
function useInlinePdf() {
  return useSyncExternalStore(
    noSubscribe,
    () => navigator.pdfViewerEnabled ?? true,
    () => true
  )
}

// A small two-or-more-way switch (Digital / Print, Certificate / Transcript).
export function Segmented<T extends string>({
  label,
  items,
  value,
  onChange,
  className,
}: {
  label: string
  items: readonly { id: T; label: string }[]
  value: T
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("flex rounded-lg bg-neutral-100 p-1", className)}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="radio"
          aria-checked={value === item.id}
          onClick={() => onChange(item.id)}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
            value === item.id
              ? "bg-background text-label shadow-sm"
              : "text-muted-foreground hover:text-label"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export const variantItems = [
  { id: "digital", label: "Digital" },
  { id: "print", label: "Print" },
] as const

export const documentItems = [
  { id: "certificate", label: "Certificate" },
  { id: "transcript", label: "Transcript" },
] as const
