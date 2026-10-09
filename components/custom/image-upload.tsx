"use client"

import { Gallery } from "iconsax-reactjs"
import { useRef } from "react"

import { LoadingButton } from "@/components/custom/loading-button"
import { Button } from "@/components/ui/button"

type Image = { key: string; url: string }

type Props = {
  id: string
  value: Image | null
  onChange: (value: Image | null) => void
  upload: (file: File) => Promise<Image>
  pending: boolean
  hint?: string
}

// Pick an image, upload it straight away, keep the returned key; the form saves only the key.
export function ImageUpload({
  id,
  value,
  onChange,
  upload,
  pending,
  hint,
}: Props) {
  const input = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="grid aspect-4/3 w-full shrink-0 place-items-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-400 sm:w-48">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- storage URLs vary per environment
          <img src={value.url} alt="" className="size-full object-cover" />
        ) : (
          <Gallery size={32} color="currentColor" aria-hidden />
        )}
      </div>
      <div className="flex flex-col items-start gap-3">
        <input
          ref={input}
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            e.target.value = ""
            if (file) onChange(await upload(file))
          }}
        />
        <div className="flex gap-2">
          <LoadingButton
            type="button"
            variant="outline"
            loading={pending}
            loadingText="Uploading…"
            onClick={() => input.current?.click()}
          >
            {value ? "Replace image" : "Upload image"}
          </LoadingButton>
          {value && !pending && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => onChange(null)}
            >
              Remove
            </Button>
          )}
        </div>
        {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      </div>
    </div>
  )
}
