"use server";

import { db } from "@/drizzle/db/client";
import { bankAccounts, preferences, records, users } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";
import { put, del } from '@vercel/blob';

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
    })
    .returning();

  await db.insert(records).values({
    userId,
    amount: String(balance),
    status: "Completed",
    account: account.id,
    category: "Transfer",
    type: "Income",
  });
}

export async function setName(userId: string, name: string) {
  await db.update(users).set({ name }).where(eq(users.id, userId));
}

export async function uploadImage(userId: string, image: File): Promise<string> {
  const pathname = `avatars/${userId}`;
  await del(pathname);

  const { url } = await put(pathname, image, {
    access: 'public',
    addRandomSuffix: false,
    contentType: image.type,
  });

  await db.update(users).set({ image: url }).where(eq(users.id, userId));

  return url;
}
