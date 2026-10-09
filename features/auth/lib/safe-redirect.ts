// Only a path on this site may come back from ?next=: "//evil.com" is a protocol-relative URL,
// and anything absolute could send the user elsewhere after logging in.
export const safeRedirect = (
  next: string | null | undefined,
  fallback: string
) =>
  next && next.startsWith("/") && !next.startsWith("//") && !next.includes("\\")
    ? next
    : fallback
