"use client"

import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { DatePickerField } from "@/components/custom/date-picker-field"
import { InputField } from "@/components/custom/input-field"
import { SearchSelect } from "@/components/custom/search-combobox"
import { SelectField } from "@/components/custom/select-field"
import {
  useCandidateOptions,
  type CandidateOption,
  type GenerateForm,
} from "@/features/generate-certificates/services/generate"
import { today } from "@/features/manage-candidates/services/candidates"

type Item = { value: string; label: string }

// The details printed on the certificate and transcript, one per row. Picking a candidate fills
// them in from the record; every field stays editable, and the issue date stays as set.
export function GenerateFields({ courses }: { courses: Item[] }) {
  const { register, formState, setValue, clearErrors } =
    useFormContext<GenerateForm>()
  const { errors } = formState
  const [picked, setPicked] = useState<CandidateOption | null>(null)

  const pick = (option: CandidateOption | null) => {
    setPicked(option)
    // Clearing the picker keeps what's typed.
    if (!option) return
    const c = option.candidate
    const fill = { shouldDirty: true, shouldValidate: false } as const
    setValue("passportName", c.passportName, fill)
    setValue("certificateNo", c.certificateNo ?? "", fill)
    setValue("dateOfBirth", c.dateOfBirth, fill)
    // Only a course with a template; otherwise the admin picks one.
    if (courses.some((i) => i.value === c.course.id))
      setValue("courseId", c.course.id, fill)
    clearErrors()
  }

  return (
    <div className="flex flex-col gap-5">
      <SearchSelect<CandidateOption>
        id="candidate"
        label="Existing candidate (optional)"
        placeholder="Search by name or certificate No"
        description="Fills in the details below. You can still change them."
        value={picked}
        onChange={pick}
        useSearch={useCandidateOptions}
      />
      <hr className="border-neutral-200" />
      <InputField
        id="passportName"
        label="Full name"
        autoComplete="off"
        description="As in the passport. Printed in capitals."
        error={errors.passportName?.message}
        {...register("passportName")}
      />
      <CourseField courses={courses} />
      <InputField
        id="certificateNo"
        label="Certificate No"
        autoComplete="off"
        placeholder="TTC-1132-8345"
        error={errors.certificateNo?.message}
        {...register("certificateNo")}
      />
      <DateField name="dateOfBirth" label="Date of birth" max={today()} />
      <DateField
        name="issueDate"
        label="Issue date"
        description="Today by default."
      />
    </div>
  )
}

function CourseField({ courses }: { courses: Item[] }) {
  const { control, formState } = useFormContext<GenerateForm>()
  return (
    <Controller
      control={control}
      name="courseId"
      render={({ field }) => (
        <SelectField
          id="courseId"
          label="Course"
          placeholder="Select a course"
          items={courses}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          description={
            courses.length
              ? "TEFL and TESOL courses."
              : "No TEFL or TESOL course found. Add one under Courses first."
          }
          error={formState.errors.courseId?.message}
        />
      )}
    />
  )
}

function DateField({
  name,
  label,
  max,
  description,
}: {
  name: "dateOfBirth" | "issueDate"
  label: string
  max?: string
  description?: string
}) {
  const { control, formState } = useFormContext<GenerateForm>()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePickerField
          id={name}
          label={label}
          max={max}
          description={description}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={formState.errors[name]?.message}
        />
      )}
    />
  )
}
