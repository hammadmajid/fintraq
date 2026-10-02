import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
    UPSTASH_REDIS_REST_URL: z.url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
  },
  // Next loads next.config.ts before exposing NEXT_PHASE during `next build`.
  // Keep build-time generation from requiring deployment secrets; runtime code
  // still receives the real process.env values on Vercel.
  skipValidation: process.env.NODE_ENV === "production",
  experimental__runtimeEnv: {},
})
