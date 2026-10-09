// The access JWT lives only in memory; a reload gets a new one from the refresh cookie.
let token: string | null = null

export const getAccessToken = () => token
export const setAccessToken = (value: string | null) => {
  token = value
}

// The API's JS-readable CSRF cookie, echoed back in X-CSRF-Token (double submit).
export const readCsrf = () =>
  document.cookie
    .split("; ")
    .find((c) => c.startsWith("lms_csrf="))
    ?.slice("lms_csrf=".length)
