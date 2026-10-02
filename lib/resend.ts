import { env } from "@/env"
import { Resend } from "resend"

// Keep route-module imports buildable without local email credentials. The
// real key is used automatically in Vercel through env.RESEND_API_KEY.
export const resend = new Resend(env.RESEND_API_KEY ?? "re_build_placeholder")
