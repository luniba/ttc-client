import { cn } from "cn"

const styles = [
  ["Display xl", "text-display-xl"],
  ["Display lg", "text-display-lg"],
  ["Display md", "text-display-md"],
  ["Display sm", "text-display-sm"],
  ["Display xs", "text-display-xs"],
  ["Text xl", "text-xl"],
  ["Text lg", "text-lg"],
  ["Text md", "text-base"],
  ["Text sm", "text-sm"],
  ["Text xs", "text-xs"],
] as const

export function TypographySection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-display-xs font-semibold">
        Typography (General Sans)
      </h2>
      <div className="flex flex-col gap-4">
        {styles.map(([name, cls]) => (
          <div key={name} className="flex items-baseline gap-6">
            <span className="w-24 shrink-0 text-sm text-muted-foreground">
              {name}
            </span>
            <span className={cn(cls, "truncate font-semibold")}>
              Manage your driving school
            </span>
          </div>
        ))}
      </div>
      <p className="flex gap-6 text-base">
        <span className="font-normal">Regular 400</span>
        <span className="font-medium">Medium 500</span>
        <span className="font-semibold">Semibold 600</span>
      </p>
    </section>
  )
}
