import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "@/drizzle/db/client";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub,
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "no-reply@fintraq.xyz",
    }),
  ],
});
