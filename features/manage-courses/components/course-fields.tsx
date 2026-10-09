"use client"

import { Controller, useFormContext } from "react-hook-form"
import toast from "react-hot-toast"

import { ImageUpload } from "@/components/custom/image-upload"
import { InputField } from "@/components/custom/input-field"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { CategorySelect } from "@/features/manage-courses/components/category-select"
import {
  useUploadImage,
  type CourseForm,
} from "@/features/manage-courses/services/courses"
import { getErrorKey } from "@/lib/axios"

export function CourseFields() {
  const { register, control, formState } = useFormContext<CourseForm>()
  const { errors } = formState
  const text = (
    name: "duration" | "level" | "studentCount" | "slug" | "price"
  ) => ({
    error: errors[name]?.message,
    ...register(name),
  })

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <InputField
        id="title"
        label="Title"
        placeholder="Advanced 120-Hour TEFL Course"
        className="sm:col-span-2"
        error={errors.title?.message}
        {...register("title")}
      />
      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <CategorySelect
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.categoryId?.message}
          />
        )}
      />
      <InputField
        id="price"
        label="Price (USD)"
        inputMode="decimal"
        placeholder="99"
        {...text("price")}
      />
      <InputField
        id="duration"
        label="Duration"
        placeholder="Lifetime access"
        {...text("duration")}
      />
      <InputField
        id="level"
        label="Level"
        placeholder="All levels"
        {...text("level")}
      />
      <InputField
        id="studentCount"
        label="Student count"
        placeholder="5,000+"
        description="Shown on the website as written."
        {...text("studentCount")}
      />
      <InputField
        id="slug"
        label="URL slug"
        placeholder="Made from the title if left empty"
        description="The course's web address: /courses/your-slug"
        {...text("slug")}
      />
      <DescriptionField />
      <ThumbnailField />
    </div>
  )
}

function DescriptionField() {
  const { register, formState } = useFormContext<CourseForm>()
  const error = formState.errors.description?.message
  return (
    <Field className="sm:col-span-2">
      <FieldLabel htmlFor="description">Description</FieldLabel>
      <Textarea
        id="description"
        className="min-h-40"
        placeholder="What students learn and who the course is for."
        aria-invalid={!!error || undefined}
        aria-describedby="description-hint"
        {...register("description")}
      />
      {error ? (
        <FieldError id="description-hint">{error}</FieldError>
      ) : (
        <FieldDescription id="description-hint">
          Plain text. Leave a blank line between paragraphs.
        </FieldDescription>
      )}
    </Field>
  )
}

function ThumbnailField() {
  const { control } = useFormContext<CourseForm>()
  const upload = useUploadImage()
  return (
    <Field className="sm:col-span-2">
      <FieldLabel htmlFor="thumbnail">Thumbnail</FieldLabel>
      <Controller
        control={control}
        name="thumbnail"
        render={({ field }) => (
          <ImageUpload
            id="thumbnail"
            value={field.value}
            onChange={field.onChange}
            pending={upload.isPending}
            hint="JPG, PNG, WebP or AVIF. A 4:3 image works best."
            upload={(file) =>
              upload.mutateAsync(file).catch((e) => {
                toast.error(getErrorKey(e))
                throw e
              })
            }
          />
        )}
      />
    </Field>
  )
}
