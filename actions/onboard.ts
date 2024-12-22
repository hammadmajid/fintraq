"use server";

import { db } from "@/lib/db/client";
import { preferences } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function hasCurrencyPreference(userId: string): Promise<boolean> {
    const results = await db.select().from(preferences).where(
        eq(preferences.userId, userId)
    );

    return results.length > 0;
}

export async function storePreferencce(userId: string, currency: string): Promise<void> {
    await db.insert(preferences).values({
        userId,
        currency,
    })
}