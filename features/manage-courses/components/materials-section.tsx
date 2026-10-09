"use client"

import { DocumentText, DocumentUpload, Link21 } from "iconsax-reactjs"
import { useRef, useState } from "react"
import toast from "react-hot-toast"

import { EmptyState } from "@/components/custom/empty-state"
import { LoadingButton } from "@/components/custom/loading-button"
import { Button } from "@/components/ui/button"
import { PageSection } from "@/features/dashboard/components/page-section"
import { AddLinkDialog } from "@/features/manage-courses/components/add-link-dialog"
import { MaterialRow } from "@/features/manage-courses/components/material-row"
import {
  fileProblem,
  fileTypes,
  useDeleteMaterial,
  useUploadMaterial,
} from "@/features/manage-courses/services/materials"
import type {
  CourseModule,
  Material,
} from "@/features/manage-courses/services/types"
import { useDeleteConfirm } from "@/hooks/use-delete-confirm"
import { getErrorKey } from "@/lib/axios"

export function MaterialsSection({ module: m }: { module: CourseModule }) {
  const [addingLink, setAddingLink] = useState(false)
  const del = useDeleteConfirm<Material>({
    remove: useDeleteMaterial(m),
    title: "Remove this material?",
    describe: (x) => `"${x.title}" will be removed from this module.`,
    done: "Material removed",
  })

  return (
    <PageSection
      title="Materials"
      description="PDF, Word or PowerPoint files up to 50 MB, and links to videos."
      aside={
        <div className="flex flex-wrap gap-2">
          <UploadButton module={m} />
          <Button variant="outline" onClick={() => setAddingLink(true)}>
            <Link21 size={20} color="currentColor" aria-hidden />
            Add video or link
          </Button>
        </div>
      }
    >
      {m.materials.length === 0 ? (
        <EmptyState
          icon={DocumentText}
          title="No materials yet"
          description="Upload handouts and slides, or link a video."
        />
      ) : (
        <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
          {m.materials.map((x) => (
            <MaterialRow key={x.id} material={x} onDelete={() => del.ask(x)} />
          ))}
        </ul>
      )}
      {addingLink && (
        <AddLinkDialog module={m} onClose={() => setAddingLink(false)} />
      )}
      {del.dialog}
    </PageSection>
  )
}

// Picks a file, checks type and size here first, then uploads it with a progress percentage.
function UploadButton({ module: m }: { module: CourseModule }) {
  const input = useRef<HTMLInputElement>(null)
  const upload = useUploadMaterial(m)
  const [progress, setProgress] = useState(0)

  const onFile = (file: File) => {
    const problem = fileProblem(file)
    if (problem) return void toast.error(problem)
    setProgress(0)
    upload.mutate(
      { file, onProgress: setProgress },
      {
        onSuccess: () => toast.success("File uploaded"),
        onError: (e) => toast.error(getErrorKey(e)),
      }
    )
  }

  return (
    <>
      <input
        ref={input}
        type="file"
        accept={fileTypes.join(",")}
        className="sr-only"
        aria-label="Upload a file"
        onChange={(e) => {
          const file = e.target.files?.[0]
          e.target.value = ""
          if (file) onFile(file)
        }}
      />
      <LoadingButton
        variant="outline"
        loading={upload.isPending}
        loadingText={`Uploading ${progress}%`}
        onClick={() => input.current?.click()}
      >
        <DocumentUpload size={20} color="currentColor" aria-hidden />
        Upload file
      </LoadingButton>
    </>
  )
}
