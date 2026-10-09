import { z } from "zod"

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  API_URL: z.url().default("http://localhost:5010"),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
})

export const env = schema.parse({
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
})

export const isDev = env.NODE_ENV !== "production"
