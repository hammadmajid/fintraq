import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.url(),
        BETTER_AUTH_SECRET: z.string().min(1),
        BETTER_AUTH_URL: z.url(),
        UPSTASH_REDIS_REST_URL: z.url(),
        UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
        RESEND_API_KEY: z.string().min(1)
    },
    experimental__runtimeEnv: {}
})