import { env } from "@/env"
import { drizzle } from "drizzle-orm/neon-http"

// The public build does not need to connect to Neon, but Better Auth still
// imports this module while Next collects the API route. Keep that import
// safe when deployment secrets are not present locally; Vercel supplies the
// real URL at runtime.
const databaseUrl =
  env.DATABASE_URL ??
  "postgresql://build:placeholder@build-placeholder.neon.tech/neondb?sslmode=require"

export const db = drizzle(databaseUrl)
