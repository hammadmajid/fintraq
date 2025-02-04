"use server";

import { db } from "@/drizzle/db/client";
import { bankAccounts, records } from "@/drizzle/db/schema";
import { accountSchema } from "@/lib/forms/account";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function createAccount(values: z.infer<typeof accountSchema>) {
  const { userId, title, color, type, icon, description, balance } = values;

  const [account] = await db
    .insert(bankAccounts)
    .values({
      userId,
      title,
      color,
      type,
      icon,
      description,
      balance: String(balance),
    })
    .returning();

  await db.insert(records).values({
    userId,
    amount: String(balance),
    type: "Transfer",
    account: account.id,
    category: "Transfer",
    status: "Completed",
    createdAt: new Date(),
  });
}

export async function getAccountById(accountId: string) {
  return await db
    .select()
    .from(bankAccounts)
    .where(eq(bankAccounts.id, accountId));
}

export async function getAllAccounts(userId: string) {
  return await db
    .select()
    .from(bankAccounts)
    .where(eq(bankAccounts.userId, userId));
}

export async function editAccount(values: z.infer<typeof accountSchema>) {
  await db
    .update(bankAccounts)
    .set({
      userId: values.userId,
      title: values.title,
      color: values.color,
      type: values.type,
      icon: values.icon,
      description: values.description,
      balance: String(values.balance),
    })
    .where(eq(bankAccounts.id, values.id));
}

export async function deleteAccount(accoundId: string) {
  await db.delete(bankAccounts).where(eq(bankAccounts.id, accoundId));
}
