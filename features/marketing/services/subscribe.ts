import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { api, getErrorKey } from "@/lib/axios"
import { email } from "@/lib/validation"

export const subscribeSchema = z.object({ email })

export type SubscribePayload = z.infer<typeof subscribeSchema>

const subscribe = async (payload: SubscribePayload) => {
  await api.post("/newsletter", payload)
}

export const useSubscribe = () => {
  return useMutation({
    mutationFn: subscribe,
    onSuccess: () => toast.success("You're subscribed. Thanks for joining!"),
    onError: (e) => toast.error(getErrorKey(e)),
  })
}
