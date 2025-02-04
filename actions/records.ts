"use server";

import { db } from "@/drizzle/db/client";
import { bankAccounts, records, SelectRecord } from "@/drizzle/db/schema";
import { recordSchema } from "@/lib/forms/record";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getRecords(userId: string): Promise<SelectRecord[]> {
  return db.select().from(records).where(eq(records.userId, userId));
}

export async function getRecordById(id: string) {
  return db.select().from(records).where(eq(records.id, id));
}

export async function createRecord(data: z.infer<typeof recordSchema>) {
  try {
    const { account, amount, category, type, status, userId, created } = data;

    await db.insert(records).values({
      userId,
      amount: String(amount),
      type,
      account,
      category,
      status,
      createdAt: created,
    });

    const [acc] = await db
      .select()
      .from(bankAccounts)
      .where(eq(bankAccounts.id, account));

    const newBalance = Number(acc.balance) + amount;

    await db
      .update(bankAccounts)
      .set({
        balance: String(newBalance),
      })
      .where(eq(bankAccounts.id, account));

    revalidatePath("/u/records");
    return { success: true, message: "Record created successfully" };
  } catch (error) {
    console.error("Failed to create record:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function editRecord(data: z.infer<typeof recordSchema>) {
  try {
    const { id, account, amount, category, type, status, userId, created } =
      data;

    await db
      .update(records)
      .set({
        userId,
        amount: String(amount),
        type,
        account,
        category,
        status,
        createdAt: created,
      })
      .where(eq(records.id, id as string));

    // TODO: Update balance in bank account based on

    revalidatePath("/u/records");
    return { success: true, message: "Record edited successfully" };
  } catch (error) {
    console.error("Failed to edit record:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function deleteRecord(id: string) {
  try {
    await db.delete(records).where(eq(records.id, id));
    revalidatePath("/u/records");

    return { success: true, message: "Record edited successfully" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
