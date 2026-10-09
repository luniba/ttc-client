import { cn } from "cn"
import { ArrowRight } from "lucide-react"

export function ArrowCircle({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full bg-white text-neutral-900 transition-transform group-hover/button:translate-x-0.5 group-hover/pill:translate-x-0.5 motion-reduce:transition-none",
        className
      )}
    >
      <ArrowRight className="size-5" />
    </span>
  )
}
