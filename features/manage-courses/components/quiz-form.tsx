"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Add, TaskSquare } from "iconsax-reactjs"
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form"
import toast from "react-hot-toast"

import { EmptyState } from "@/components/custom/empty-state"
import { InputField } from "@/components/custom/input-field"
import { LoadingButton } from "@/components/custom/loading-button"
import { Button } from "@/components/ui/button"
import { PreviewField } from "@/features/manage-courses/components/preview-field"
import { QuestionCard } from "@/features/manage-courses/components/question-card"
import {
  emptyQuestion,
  quizSchema,
  toQuizForm,
  useSaveQuiz,
  type QuizForm as Values,
  type QuizValues,
} from "@/features/manage-courses/services/modules"
import type { CourseModule } from "@/features/manage-courses/services/types"
import { getErrorKey } from "@/lib/axios"

// A quiz module's page: title, preview, and every question, saved together.
export function QuizForm({ module: m }: { module: CourseModule }) {
  const save = useSaveQuiz(m)
  const form = useForm<Values, unknown, QuizValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: toQuizForm(m),
  })
  const { errors, isDirty } = form.formState

  const onSubmit = form.handleSubmit(
    (v) =>
      save.mutate(v, {
        onSuccess: (saved) => {
          toast.success("Quiz saved")
          form.reset(toQuizForm(saved))
        },
        onError: (e) => toast.error(getErrorKey(e)),
      }),
    () => toast.error("Some questions need fixing. They're marked in red.")
  )

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
        <InputField
          id="title"
          label="Title"
          error={errors.title?.message}
          {...form.register("title")}
        />
        <Controller
          control={form.control}
          name="isPreview"
          render={({ field }) => (
            <PreviewField
              checked={field.value}
              onChange={field.onChange}
              description="Anyone can try this quiz on the website without logging in or paying. The correct answers are never shown."
            />
          )}
        />
        <QuestionList />
        <div className="sticky bottom-0 -mx-1 flex items-center gap-3 bg-neutral-50/90 px-1 py-2 backdrop-blur">
          <LoadingButton
            type="submit"
            loading={save.isPending}
            disabled={!isDirty}
          >
            Save quiz
          </LoadingButton>
          {isDirty && (
            <span className="text-sm text-muted-foreground">
              Unsaved changes
            </span>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

function QuestionList() {
  const { control } = useFormContext<Values>()
  const questions = useFieldArray({ control, name: "questions" })
  const add = (
    <Button
      type="button"
      variant="outline"
      onClick={() => questions.append(emptyQuestion())}
    >
      <Add size={20} color="currentColor" aria-hidden />
      Add question
    </Button>
  )

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">
        Questions{" "}
        <span className="text-sm font-normal text-muted-foreground tabular-nums">
          ({questions.fields.length})
        </span>
      </h3>
      {questions.fields.length === 0 ? (
        <EmptyState
          icon={TaskSquare}
          title="No questions yet"
          description="Each question has four options and one correct answer."
          action={add}
        />
      ) : (
        <>
          <ol className="flex flex-col gap-3">
            {questions.fields.map((f, i) => (
              <QuestionCard
                key={f.id}
                index={i}
                count={questions.fields.length}
                onMove={(to) => questions.move(i, to)}
                onRemove={() => questions.remove(i)}
              />
            ))}
          </ol>
          <div>{add}</div>
        </>
      )}
    </section>
  )
}
