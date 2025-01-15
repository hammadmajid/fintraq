"use server";

import { db } from "@/drizzle/db/client";
import { preferences } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

export async function getPlan(userId: string) {
  const [result] = await db
    .select()
    .from(preferences)
    .where(eq(preferences.userId, userId));

  return result.plan;
}
