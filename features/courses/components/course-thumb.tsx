import { cn } from "cn"
import { ImageIcon } from "lucide-react"

// The course's uploaded thumbnail, or a quiet placeholder when it has none. Zooms a little when
// hovered inside a `group` (the course card).
export function CourseThumb({
  src,
  className,
}: {
  src: string | null
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative grid aspect-4/3 place-items-center overflow-hidden bg-muted text-muted-foreground",
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- storage URLs vary per environment
        <img
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-top transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
        />
      ) : (
        <ImageIcon className="size-10" aria-hidden />
      )}
    </div>
  )
}
