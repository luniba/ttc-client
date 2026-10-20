import axios, { isAxiosError, type InternalAxiosRequestConfig } from "axios"

import { getAccessToken, readCsrf } from "@/lib/access-token"
import { refreshSession } from "@/lib/refresh-queue"
import { hasSessionHint, publishSession } from "@/lib/session-channel"

export const api = axios.create({ baseURL: "/api", withCredentials: true })

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  config.headers["X-CSRF-Token"] = readCsrf()
  return config
})

type RetriableConfig = InternalAxiosRequestConfig & { retried?: boolean }

// 401s from these mean "wrong password" or "no session", not "access token expired".
const noRefresh = ["/auth/login", "/auth/refresh"]

// An expired access token gets one refresh and one replay. If the refresh fails the session is
// over: publish it and let the auth gate decide where to go. This never navigates.
api.interceptors.response.use(undefined, async (error) => {
  const config = isAxiosError(error)
    ? (error.config as RetriableConfig | undefined)
    : undefined
  if (
    !config ||
    error.response?.status !== 401 ||
    config.retried ||
    noRefresh.includes(config.url ?? "") ||
    !hasSessionHint()
  )
    throw error
  config.retried = true
  try {
    await refreshSession()
  } catch {
    publishSession("signed-out")
    throw error
  }
  return api(config)
})

// { success: false, error: { code, message } }; per-field details are not sent by the API.
type ErrorBody = {
  error?: { code?: string; details?: Record<string, string> }
}

// The API's ErrorCode values (backend-lms src/common/constants/error-codes.ts).
const errorKeys: Partial<Record<string, string>> = {
  VALIDATION_ERROR: "Please check the highlighted fields.",
  RATE_LIMITED: "Too many requests. Please wait a minute and try again.",
  INVALID_CREDENTIALS: "Email or password is incorrect.",
  EMAIL_NOT_VERIFIED: "Please verify your email before logging in.",
  EMAIL_TAKEN: "This email already has an account.",
  SLUG_TAKEN: "That slug is already taken. Try another one.",
  CATEGORY_TAKEN: "A category with this name already exists.",
  CERTIFICATE_NO_TAKEN: "This certificate number is already recorded.",
  USERNAME_TAKEN: "That username is already taken. Try another one.",
  UNSUPPORTED_MEDIA_TYPE: "This file type isn't allowed.",
  PAYLOAD_TOO_LARGE: "This file is too large.",
  FORBIDDEN: "Your role can't do this.",
  NOT_FOUND: "This record no longer exists. Refresh and try again.",
}

const body = (e: unknown): ErrorBody["error"] =>
  isAxiosError<ErrorBody>(e) ? e.response?.data?.error : undefined

export const getErrorKey = (e: unknown): string =>
  errorKeys[body(e)?.code ?? ""] ?? "Something went wrong. Please try again."

export const getErrorCode = (e: unknown) => body(e)?.code

export const getFieldErrors = (e: unknown) => body(e)?.details ?? {}
