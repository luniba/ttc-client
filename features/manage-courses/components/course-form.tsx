"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Controller, FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { LoadingButton } from "@/components/custom/loading-button"
import { SwitchField } from "@/components/custom/switch-field"
import { routes } from "@/config/routes"
import { CourseFields } from "@/features/manage-courses/components/course-fields"
import {
  courseSchema,
  toCourseForm,
  toCoursePayload,
  useSaveCourse,
  type CourseForm as Values,
  type CourseValues,
} from "@/features/manage-courses/services/courses"
import type { Course } from "@/features/manage-courses/services/types"
import { getErrorCode, getErrorKey } from "@/lib/axios"

// A new course, or the details of an existing one.
export function CourseForm({ course }: { course?: Course }) {
  const router = useRouter()
  const save = useSaveCourse()
  const form = useForm<Values, unknown, CourseValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: toCourseForm(course),
  })
  const { isDirty } = form.formState

  const onSubmit = form.handleSubmit((values) =>
    save.mutate(
      { id: course?.id, body: toCoursePayload(values) },
      {
        onSuccess: (saved) => {
          if (course) {
            toast.success("Changes saved")
            form.reset(toCourseForm(saved))
            return
          }
          toast.success("Course created. Now add its modules.")
          router.push(routes.adminCourse(saved.id))
        },
        onError: (e) =>
          getErrorCode(e) === "SLUG_TAKEN"
            ? form.setError(
                "slug",
                { message: getErrorKey(e) },
                { shouldFocus: true }
              )
            : toast.error(getErrorKey(e)),
      }
    )
  )

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-8">
        <CourseFields />
        <Controller
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <SwitchField
              id="isPublished"
              label="Published"
              description="Published courses appear on the website. Keep it off while you build the modules."
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <div className="flex gap-3">
          <LoadingButton
            type="submit"
            loading={save.isPending}
            disabled={!!course && !isDirty}
          >
            {course ? "Save changes" : "Create course"}
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  )
}
