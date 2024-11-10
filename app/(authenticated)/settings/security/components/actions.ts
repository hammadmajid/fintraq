'use server'

import { sessionQueries } from "@/lib/db/queries/session"

export async function deleteSession(token: string) {
  await sessionQueries.deleteByToken(token)
}

export async function deleteExpiredSessions() {
  await sessionQueries.deleteExpiredSessions()
}