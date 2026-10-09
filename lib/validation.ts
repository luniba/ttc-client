import { z } from "zod"

// Building blocks for form schemas. Values are tidied before they are checked, so what the API
// receives is exactly what passed: text is trimmed with inner whitespace collapsed (the API does
// the same), numbers accept thousands separators. Messages are shown to the user as written.

const squish = (s: string) => s.replace(/\s+/g, " ").trim()

export const requiredText = (max: number) =>
  z
    .string()
    .transform(squish)
    .pipe(
      z.string().min(1, "This field is required").max(max, "This is too long")
    )

export const optionalText = (max: number) =>
  z.string().transform(squish).pipe(z.string().max(max, "This is too long"))

// A whole number typed into a text box. outOfRange is the message for anything below min or
// above max, so it can say what the limits are.
export const wholeNumber = (min: number, max: number, outOfRange: string) =>
  z
    .string()
    .transform((s) => s.replace(/[\s,]/g, ""))
    .pipe(
      z
        .string()
        .min(1, "This field is required")
        .regex(/^\d+$/, "Enter a whole number")
    )
    .transform(Number)
    .pipe(z.number().min(min, outOfRange).max(max, outOfRange))

export const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address"))

// A calendar day as "YYYY-MM-DD", or "" when left empty.
export const optionalDate = z
  .string()
  .regex(/^(\d{4}-\d{2}-\d{2})?$/, "Pick the year, month and day")

export const requiredDate = z
  .string()
  .min(1, "This field is required")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick the year, month and day")

// A USD amount typed into a text box: up to two decimals, 0 allowed.
export const usd = z
  .string()
  .transform((s) => s.replace(/[\s,$]/g, ""))
  .pipe(
    z
      .string()
      .min(1, "This field is required")
      .regex(/^\d+(\.\d{1,2})?$/, "Enter an amount like 99 or 99.50")
  )
  .transform(Number)
  .pipe(z.number().max(99999.99, "That's too high"))
