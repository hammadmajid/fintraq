"use server";

import { db } from "@/drizzle/db/client";
import { preferences } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getCurrency = cache(async (userId: string) => {
  const [result] = await db
    .select()
    .from(preferences)
    .where(eq(preferences.userId, userId));

  return result.currency;
});
