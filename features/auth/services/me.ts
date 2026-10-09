import { queryOptions, useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"

import { api } from "@/lib/axios"
import { hasSessionHint } from "@/lib/session-channel"

export type Role = "admin" | "instructor" | "student"

// The API's SafeUser.
export type User = {
  id: string
  email: string
  name: string
  role: Role
  emailVerified: boolean
}

export type SessionStatus = "unknown" | "authenticated" | "unauthenticated"

// null when signed out; a 401 that survived the interceptor's refresh means exactly that.
const fetchMe = async (): Promise<User | null> => {
  try {
    return (await api.get<{ data: User }>("/auth/me")).data.data
  } catch (e) {
    if (isAxiosError(e) && e.response?.status === 401) return null
    throw e
  }
}

export const meQuery = queryOptions({
  queryKey: ["session"],
  queryFn: () => (hasSessionHint() ? fetchMe() : null),
  staleTime: 5 * 60 * 1000,
  retry: false,
})

export const useAuth = () => {
  const { data } = useQuery(meQuery)
  const status: SessionStatus =
    data === undefined ? "unknown" : data ? "authenticated" : "unauthenticated"
  return { user: data ?? null, status }
}
