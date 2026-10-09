import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const trainers = [
  { value: "ram", label: "Ram Thapa" },
  { value: "sita", label: "Sita Gurung" },
  { value: "hari", label: "Hari Shrestha" },
]

export function OverlaySection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-display-xs font-semibold">Select and tooltip</h2>
      <div className="flex flex-wrap items-end gap-8">
        <Field className="w-80">
          <FieldLabel>Trainer</FieldLabel>
          <Select items={trainers}>
            <SelectTrigger>
              <SelectValue placeholder="Select trainer" />
            </SelectTrigger>
            <SelectContent>
              {trainers.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Tooltip>
          <TooltipTrigger
            render={<Button variant="outline">Dark tooltip</Button>}
          />
          <TooltipContent>This is a tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={<Button variant="outline">Light tooltip</Button>}
          />
          <TooltipContent variant="light">
            <p>This is a tooltip</p>
            <p className="font-normal text-muted-foreground">
              Tooltips are used to describe or identify an element.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  )
}
