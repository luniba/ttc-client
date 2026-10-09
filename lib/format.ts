const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })

export const formatNumber = (n: number) => number.format(n)

// A calendar day from the API ("1995-04-21") as "Apr 21, 1995". Read as UTC so no time zone can
// move it to the day before.
const day = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
})
export const formatDay = (isoDay: string) =>
  day.format(new Date(`${isoDay}T00:00:00Z`))

const usd = (cents: boolean) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
  })
const whole = usd(false)
const withCents = usd(true)

// "$99", but "$49.50" rather than "$49.5".
export const formatPrice = (n: number) =>
  (Number.isInteger(n) ? whole : withCents).format(n)

// A file size: "340 KB", "2.4 MB".
export const formatBytes = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`

// An exact moment ("2026-10-08T03:45:00Z") in the viewer's own zone: "Oct 8, 2026, 9:30 AM".
const moment = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
})
export const formatDateTime = (iso: string) => moment.format(new Date(iso))
