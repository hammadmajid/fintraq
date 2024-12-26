"use server";

import { db } from "@/drizzle/db/client";
import { bankAccounts } from "@/drizzle/db/schema";
import { accountSchema } from "@/lib/forms/account";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function createAccount(values: z.infer<typeof accountSchema>) {
  await db.insert(bankAccounts).values({
    userId: values.userId,
    title: values.title,
    color: values.color,
    type: values.type,
    icon: values.icon,
    description: values.description,
    balance: String(values.balance),
  });
}

export async function getAllAccounts(userId: string) {
  return await db
    .select()
    .from(bankAccounts)
    .where(eq(bankAccounts.userId, userId));
}

export async function editAccount(values: z.infer<typeof accountSchema>) {
  await db.update(bankAccounts).set({
    userId: values.userId,
    title: values.title,
    color: values.color,
    type: values.type,
    icon: values.icon,
    description: values.description,
    balance: String(values.balance),
  });
}

export async function deleteAccount(accoundId: string) {
  await db.delete(bankAccounts).where(eq(bankAccounts.id, accoundId));
}
