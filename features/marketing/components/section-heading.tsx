import { cn } from "cn"

type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "start"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: Props) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4 md:gap-5",
        align === "center" && "mx-auto items-center text-center"
      )}
    >
      <div className="flex flex-col gap-3">
        {eyebrow && (
          <p className="text-sm font-semibold text-brand-700 md:text-base">
            {eyebrow}
          </p>
        )}
        <h2 className="text-display-sm font-semibold md:text-display-md">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-lg text-muted-foreground md:text-xl">
          {description}
        </p>
      )}
    </div>
  )
}
