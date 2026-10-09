import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

const sizes = ["sm", "md"] as const

export function ChoiceSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-display-xs font-semibold">
        Checkbox, radio and toggle
      </h2>
      <div className="grid max-w-5xl grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-3">
              <Checkbox size={size} aria-label="Unchecked" />
              <Checkbox size={size} defaultChecked aria-label="Checked" />
              <Checkbox size={size} indeterminate aria-label="Indeterminate" />
              <Checkbox
                size={size}
                shape="circle"
                defaultChecked
                aria-label="Check circle"
              />
              <Checkbox
                size={size}
                disabled
                defaultChecked
                aria-label="Disabled"
              />
            </div>
          ))}
          <Field orientation="horizontal">
            <Checkbox id="ds-remember" />
            <FieldLabel htmlFor="ds-remember">Remember me</FieldLabel>
          </Field>
        </div>
        <RadioGroup defaultValue="k" className="content-start">
          {[
            ["a", "Bike (A)"],
            ["k", "Scooter (K)"],
            ["b", "Car (B)"],
          ].map(([value, label]) => (
            <Field key={value} orientation="horizontal">
              <RadioGroupItem value={value} id={`ds-${value}`} />
              <FieldLabel htmlFor={`ds-${value}`}>{label}</FieldLabel>
            </Field>
          ))}
          <Field orientation="horizontal" data-disabled>
            <RadioGroupItem value="x" id="ds-x" size="md" disabled />
            <FieldLabel htmlFor="ds-x">Disabled</FieldLabel>
          </Field>
        </RadioGroup>
        <div className="flex flex-col gap-4">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-3">
              <Switch size={size} aria-label="Off" />
              <Switch size={size} defaultChecked aria-label="On" />
              <Switch size={size} disabled aria-label="Disabled" />
            </div>
          ))}
          <Field orientation="horizontal">
            <Switch id="ds-sms" size="md" defaultChecked />
            <FieldContent>
              <FieldLabel htmlFor="ds-sms" className="text-base">
                SMS reminders
              </FieldLabel>
              <FieldDescription className="text-base">
                Send students a reminder the day before class.
              </FieldDescription>
            </FieldContent>
          </Field>
        </div>
      </div>
    </section>
  )
}
