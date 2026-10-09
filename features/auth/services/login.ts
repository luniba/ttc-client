import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { meQuery, type User } from "@/features/auth/services/me"
import { setAccessToken } from "@/lib/access-token"
import { api, getErrorKey } from "@/lib/axios"
import { publishSession } from "@/lib/session-channel"
import { email } from "@/lib/validation"

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "This field is required"),
})

export type LoginPayload = z.infer<typeof loginSchema>

type Session = { user: User; accessToken: string }

const login = async (payload: LoginPayload) =>
  (await api.post<{ data: Session }>("/auth/login", payload)).data.data

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: login,
    onSuccess: ({ user, accessToken }) => {
      setAccessToken(accessToken)
      // Clears every tab's cache first (synchronously), then primes this tab with the new user.
      publishSession("signed-in")
      queryClient.setQueryData(meQuery.queryKey, user)
    },
    onError: (e) => toast.error(getErrorKey(e)),
  })
}
