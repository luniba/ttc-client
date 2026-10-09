"use client"

import { ArrowDown2, ArrowUp2, Trash } from "iconsax-reactjs"
import { Controller, useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  optionLetters,
  type QuizForm,
} from "@/features/manage-courses/services/modules"

type OptionIndex = 0 | 1 | 2 | 3

type Props = {
  index: number
  count: number
  onMove: (to: number) => void
  onRemove: () => void
}

// One question: the prompt, options A–D, and a radio beside each option to mark the right one.
export function QuestionCard({ index, count, onMove, onRemove }: Props) {
  const { register, control, formState } = useFormContext<QuizForm>()
  const errors = formState.errors.questions?.[index]
  const n = index + 1
  const id = (part: string) => `q${index}-${part}`

  return (
    <li className="flex flex-col gap-4 rounded-xl bg-white p-4 sm:p-5">
      <Toolbar
        index={index}
        count={count}
        onMove={onMove}
        onRemove={onRemove}
      />
      <Field>
        <FieldLabel htmlFor={id("prompt")}>Question</FieldLabel>
        <Textarea
          id={id("prompt")}
          className="min-h-20"
          placeholder="Which of these words is a verb?"
          aria-invalid={!!errors?.prompt || undefined}
          {...register(`questions.${index}.prompt`)}
        />
        {errors?.prompt && <FieldError>{errors.prompt.message}</FieldError>}
      </Field>
      <Controller
        control={control}
        name={`questions.${index}.correctIndex`}
        render={({ field }) => (
          <RadioGroup
            aria-label={`Correct answer for question ${n}`}
            value={String(field.value)}
            onValueChange={(v) => field.onChange(Number(v))}
            className="flex flex-col gap-3"
          >
            <p className="text-sm font-medium">
              Options{" "}
              <span className="font-normal text-muted-foreground">
                (select the correct one)
              </span>
            </p>
            {optionLetters.map((letter, i) => (
              <Option
                key={letter}
                index={index}
                option={i as OptionIndex}
                letter={letter}
              />
            ))}
          </RadioGroup>
        )}
      />
    </li>
  )
}

function Option({
  index,
  option,
  letter,
}: {
  index: number
  option: OptionIndex
  letter: string
}) {
  const { register, formState } = useFormContext<QuizForm>()
  const error = formState.errors.questions?.[index]?.options?.[option]?.message
  const id = `q${index}-o${option}`
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <RadioGroupItem
          value={String(option)}
          size="md"
          aria-label={`Option ${letter} is correct`}
        />
        <span className="w-4 text-sm font-semibold text-muted-foreground">
          {letter}
        </span>
        <Input
          id={id}
          aria-label={`Option ${letter}`}
          aria-invalid={!!error || undefined}
          {...register(`questions.${index}.options.${option}`)}
        />
      </div>
      {error && <FieldError className="ps-14">{error}</FieldError>}
    </div>
  )
}

// "Question N" with move up / down and delete.
function Toolbar({ index, count, onMove, onRemove }: Props) {
  const n = index + 1
  return (
    <div className="flex items-center gap-2">
      <span className="flex-1 text-sm font-semibold">Question {n}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Move question ${n} up`}
        disabled={index === 0}
        onClick={() => onMove(index - 1)}
      >
        <ArrowUp2 size={18} color="currentColor" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Move question ${n} down`}
        disabled={index === count - 1}
        onClick={() => onMove(index + 1)}
      >
        <ArrowDown2 size={18} color="currentColor" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Delete question ${n}`}
        className="hover:bg-red-50 hover:text-red-700"
        onClick={onRemove}
      >
        <Trash size={18} color="currentColor" aria-hidden />
      </Button>
    </div>
  )
}
