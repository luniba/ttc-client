import { cn } from "cn"

const scales = {
  brand: [
    "bg-brand-25",
    "bg-brand-50",
    "bg-brand-100",
    "bg-brand-200",
    "bg-brand-300",
    "bg-brand-400",
    "bg-brand-500",
    "bg-brand-600",
    "bg-brand-700",
    "bg-brand-800",
    "bg-brand-900",
    "bg-brand-950",
  ],
  neutral: [
    "bg-neutral-50",
    "bg-neutral-100",
    "bg-neutral-200",
    "bg-neutral-300",
    "bg-neutral-400",
    "bg-neutral-500",
    "bg-neutral-600",
    "bg-neutral-700",
    "bg-neutral-800",
    "bg-neutral-900",
    "bg-neutral-950",
  ],
  red: [
    "bg-red-25",
    "bg-red-50",
    "bg-red-100",
    "bg-red-200",
    "bg-red-300",
    "bg-red-400",
    "bg-red-500",
    "bg-red-600",
    "bg-red-700",
    "bg-red-800",
    "bg-red-900",
    "bg-red-950",
  ],
  indigo: [
    "bg-indigo-50",
    "bg-indigo-100",
    "bg-indigo-200",
    "bg-indigo-300",
    "bg-indigo-400",
    "bg-indigo-500",
    "bg-indigo-600",
    "bg-indigo-700",
    "bg-indigo-800",
    "bg-indigo-900",
    "bg-indigo-950",
  ],
}

const statuses = [
  {
    name: "destructive",
    text: "text-destructive",
    bg: "bg-destructive-subtle",
  },
  { name: "success", text: "text-success", bg: "bg-success-subtle" },
  { name: "warning", text: "text-warning", bg: "bg-warning-subtle" },
  { name: "info", text: "text-info", bg: "bg-info-subtle" },
]

export function ColorSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-display-xs font-semibold">Colours</h2>
      {Object.entries(scales).map(([name, swatches]) => (
        <div key={name} className="flex flex-col gap-2">
          <p className="text-sm font-medium text-label">{name}</p>
          <div className="flex overflow-hidden rounded-lg border">
            {swatches.map((bg) => (
              <div key={bg} title={bg} className={cn("h-12 flex-1", bg)} />
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-3">
        {statuses.map((s) => (
          <span
            key={s.name}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-sm font-medium",
              s.text,
              s.bg
            )}
          >
            {s.name}
          </span>
        ))}
      </div>
    </section>
  )
}
