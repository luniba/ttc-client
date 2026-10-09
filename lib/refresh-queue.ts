import axios from "axios"

import { readCsrf, setAccessToken } from "@/lib/access-token"

// Bare instance: a failing refresh must not trigger another refresh.
const bare = axios.create({ baseURL: "/api", withCredentials: true })

let inFlight: Promise<void> | null = null

// Single flight: every 401 that arrives while a refresh runs waits for that same refresh, so a
// rotated refresh cookie is never presented twice (which would revoke the session).
export const refreshSession = () =>
  (inFlight ??= bare
    .post<{ data: { accessToken: string } }>("/auth/refresh", null, {
      headers: { "X-CSRF-Token": readCsrf() },
    })
    .then((res) => setAccessToken(res.data.data.accessToken))
    .finally(() => {
      inFlight = null
    }))
