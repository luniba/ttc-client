"use client"

import { cn } from "cn"
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

import { LoadingButton } from "@/components/custom/loading-button"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCheckQuiz } from "@/features/learn/services/learn"
import { optionLetters } from "@/features/manage-courses/services/modules"
import type {
  CourseModule,
  QuizQuestion,
} from "@/features/manage-courses/services/types"
import { getErrorKey } from "@/lib/axios"

type Props = { slug: string; module: CourseModule }

// Pick an answer for each question, then check them. The server says which picks were right;
// the correct options are never sent here.
export function QuizView({ slug, module: m }: Props) {
  const check = useCheckQuiz(slug, m.id)
  const [answers, setAnswers] = useState<(number | undefined)[]>([])
  const result = check.data
  const answered = answers.filter((a) => a !== undefined).length
  const total = m.questions.length

  if (total === 0)
    return (
      <p className="rounded-xl bg-neutral-50 p-6 text-center text-muted-foreground">
        This quiz has no questions yet.
      </p>
    )

  return (
    <div className="flex flex-col gap-6">
      {result && (
        <Score
          score={result.score}
          total={result.total}
          onRetry={() => {
            check.reset()
            setAnswers([])
          }}
        />
      )}
      <ol className="flex flex-col gap-4">
        {m.questions.map((q, i) => (
          <QuestionItem
            key={q.id}
            question={q}
            index={i}
            total={total}
            value={answers[i]}
            correct={result?.results[i]}
            onChange={(v) =>
              setAnswers((a) => Object.assign([...a], { [i]: v }))
            }
          />
        ))}
      </ol>
      {!result && (
        <div className="flex flex-wrap items-center gap-4">
          <LoadingButton
            size="lg"
            loading={check.isPending}
            disabled={answered < total}
            onClick={() =>
              check.mutate(answers as number[], {
                onError: (e) => toast.error(getErrorKey(e)),
              })
            }
          >
            Check answers
          </LoadingButton>
          <span className="text-sm text-muted-foreground tabular-nums">
            {answered} of {total} answered
          </span>
        </div>
      )}
    </div>
  )
}

function Score({
  score,
  total,
  onRetry,
}: {
  score: number
  total: number
  onRetry: () => void
}) {
  const all = score === total
  return (
    <div
      role="status"
      className={cn(
        "flex flex-wrap items-center gap-4 rounded-2xl p-5",
        all ? "bg-success-subtle" : "bg-neutral-100"
      )}
    >
      <p className="flex-1 text-lg font-semibold">
        You got {score} of {total} right
        {all ? ". Well done!" : "."}
      </p>
      <Button variant="outline" onClick={onRetry}>
        <RotateCcw className="size-4" aria-hidden />
        Try again
      </Button>
    </div>
  )
}

type ItemProps = {
  question: QuizQuestion
  index: number
  total: number
  value?: number
  // undefined until checked.
  correct?: boolean
  onChange: (value: number) => void
}

function QuestionItem({
  question: q,
  index,
  total,
  value,
  correct,
  onChange,
}: ItemProps) {
  const checked = correct !== undefined
  return (
    <li
      className={cn(
        "flex flex-col gap-4 rounded-2xl border p-5",
        !checked && "border-neutral-200",
        correct === true && "border-success/40 bg-success-subtle",
        correct === false && "border-red-300 bg-red-50/40"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-muted-foreground tabular-nums">
            Question {index + 1} of {total}
          </span>
          <p className="font-medium">{q.prompt}</p>
        </div>
        {correct === true && (
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-success">
            <CheckCircle2 className="size-4" aria-hidden /> Correct
          </span>
        )}
        {correct === false && (
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-red-700">
            <XCircle className="size-4" aria-hidden /> Not quite
          </span>
        )}
      </div>
      <RadioGroup
        aria-label={`Question ${index + 1}`}
        value={value === undefined ? null : String(value)}
        onValueChange={(v) => onChange(Number(v))}
        disabled={checked}
        className="grid gap-2 sm:grid-cols-2"
      >
        {q.options.map((option, i) => (
          <label
            key={i}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm transition-colors hover:bg-neutral-50 has-data-checked:border-primary has-data-checked:bg-neutral-50 has-data-disabled:cursor-default"
          >
            <RadioGroupItem value={String(i)} size="md" />
            <span className="font-semibold text-muted-foreground">
              {optionLetters[i]}
            </span>
            <span>{option}</span>
          </label>
        ))}
      </RadioGroup>
    </li>
  )
}
