"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"

import { DatePickerField } from "@/components/custom/date-picker-field"
import { InputField } from "@/components/custom/input-field"
import {
  SearchMultiSelect,
  SearchSelect,
} from "@/components/custom/search-combobox"
import { SelectField } from "@/components/custom/select-field"
import {
  orderStatuses,
  useCandidateSearch,
  useCourseSearch,
  type OrderForm,
} from "@/features/manage-orders/services/orders"
import { formatPrice } from "@/lib/format"

// Candidate and courses are searched as you type; date and time are when the order was placed.
export function OrderFields() {
  const { control, register, formState } = useFormContext<OrderForm>()
  const { errors } = formState

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Controller
          control={control}
          name="candidate"
          render={({ field }) => (
            <SearchSelect
              id="candidate"
              label="Candidate"
              placeholder="Search by name, certificate ID or email"
              useSearch={useCandidateSearch}
              value={field.value}
              onChange={field.onChange}
              error={errors.candidate?.message}
            />
          )}
        />
      </div>
      <CoursesField />
      <Controller
        control={control}
        name="day"
        render={({ field }) => (
          <DatePickerField
            id="day"
            label="Order date"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.day?.message}
          />
        )}
      />
      <InputField
        id="time"
        type="time"
        label="Order time"
        error={errors.time?.message}
        {...register("time")}
      />
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <SelectField
            id="status"
            label="Status"
            items={[...orderStatuses]}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.status?.message}
          />
        )}
      />
    </div>
  )
}

// Several courses; the running total shows under the picks.
function CoursesField() {
  const { control, formState } = useFormContext<OrderForm>()
  const errors = formState.errors
  const courses = useWatch({ control, name: "courses" })
  // In cents, so the total never drifts.
  const total =
    courses.reduce((cents, c) => cents + Math.round(c.price * 100), 0) / 100

  return (
    <div className="sm:col-span-2">
      <Controller
        control={control}
        name="courses"
        render={({ field }) => (
          <SearchMultiSelect
            id="courses"
            label="Courses"
            placeholder="Search courses"
            useSearch={useCourseSearch}
            value={field.value}
            onChange={field.onChange}
            error={errors.courses?.message}
            description={
              courses.length > 0 &&
              `Total ${formatPrice(total)}. Prices are copied from the courses when saved.`
            }
          />
        )}
      />
    </div>
  )
}
