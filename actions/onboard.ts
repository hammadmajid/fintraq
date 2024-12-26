"use server";

import { db } from "@/drizzle/db/client";
import { bankAccounts, preferences, records } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

export async function hasCurrencyPreference(userId: string): Promise<boolean> {
  const results = await db
    .select()
    .from(preferences)
    .where(eq(preferences.userId, userId));

  return results.length > 0;
}

export async function storePreferencce(
  userId: string,
  currency: string
): Promise<void> {
  await db.insert(preferences).values({
    userId,
    currency,
  });
}

export async function hasFirstRecord(userId: string): Promise<boolean> {
  const results = await db
    .select()
    .from(records)
    .where(eq(records.userId, userId));

  return results.length > 0;
}

export async function createFirstAccountAndRecord(
  userId: string,
  balance: number
) {
  const [account] = await db
    .insert(bankAccounts)
    .values({
      userId,
      title: "Cash",
      color: "#fafafa",
      type: "Checking",
      icon: "Coins",
      description: "Your default cash account",
      balance: String(balance),
      createdAt: new Date(),
    })
    .returning();

  await db.insert(records).values({
    userId,
    amount: String(balance),
    status: "Cleared",
    account: account.id,
    category: "Initial balance",
    type: "Income",
  });
}
