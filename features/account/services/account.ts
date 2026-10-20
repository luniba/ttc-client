import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

import { meQuery, type User } from "@/features/auth/services/me"
import { api, getErrorCode, getErrorKey } from "@/lib/axios"

// GET /me/account: the student's profile, courses and certificates.
export type AccountCourse = {
  id: string
  slug: string
  title: string
  thumbnailUrl: string | null
  // enrolled: access granted. requested: still waiting.
  status: "enrolled" | "requested"
  since: string
}

export type AccountCertificate = {
  courseTitle: string
  certificateNo: string | null
  issueDate: string | null
  status: "verified" | "preparing"
}

export type Account = {
  profile: User & { createdAt: string }
  courses: AccountCourse[]
  certificates: AccountCertificate[]
}

export const accountQuery = queryOptions({
  queryKey: ["account"],
  queryFn: async () =>
    (await api.get<{ data: Account }>("/me/account")).data.data,
})

export const useAccount = () => useQuery(accountQuery)

// Mirrors the API: 3-30 characters, no "@".
export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .regex(
      /^[A-Za-z0-9][A-Za-z0-9._-]{2,29}$/,
      "Use 3 to 30 characters: letters, numbers, dots, dashes or underscores, starting with a letter or number"
    ),
})
export type UsernameForm = z.input<typeof usernameSchema>
export type UsernamePayload = z.output<typeof usernameSchema>

export const isUsernameTaken = (e: unknown) =>
  getErrorCode(e) === "USERNAME_TAKEN"

export const useUpdateUsername = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: UsernamePayload) =>
      (await api.patch<{ data: User }>("/me/username", body)).data.data,
    onSuccess: (user) => {
      qc.setQueryData(meQuery.queryKey, user)
      qc.invalidateQueries({ queryKey: accountQuery.queryKey })
      toast.success("Username updated")
    },
    onError: (e) => {
      // A taken name shows on the field.
      if (!isUsernameTaken(e)) toast.error(getErrorKey(e))
    },
  })
}
