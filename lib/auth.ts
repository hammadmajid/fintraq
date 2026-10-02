import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { db } from "@/lib/db"
import * as schema from "@/lib/db/schemas/auth-schema"
import { sendPasswordResetEmail } from "@/lib/email"
import { env } from "@/env"

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: env.BETTER_AUTH_SECRET ?? "fintraq-build-placeholder-secret",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }, request) => {
      void sendPasswordResetEmail({
        email: user.email,
        resetUrl: url,
      })
    },
  },
  plugins: [nextCookies()],
})

export type Session = typeof auth.$Infer.Session
