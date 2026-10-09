import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { setAccessToken } from "@/lib/access-token"
import { api, getErrorKey } from "@/lib/axios"
import { publishSession } from "@/lib/session-channel"

const logout = async () => {
  await api.post("/auth/logout")
}

// Not fire-and-forget: the cookies are HttpOnly, so only a successful request ends the session.
// On failure the user stays where they are.
export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAccessToken(null)
      publishSession("signed-out")
    },
    onError: (e) => toast.error(getErrorKey(e)),
  })
}
