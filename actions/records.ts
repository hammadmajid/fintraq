"use server";

import { db } from "@/drizzle/db/client";
import { records, SelectRecord } from "@/drizzle/db/schema";
import { recordSchema } from "@/lib/forms/record";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function getRecords(userId: string): Promise<SelectRecord[]> {
  return db.select().from(records).where(eq(records.userId, userId));
}

export async function getRecordById(id: string) {
  return db.select().from(records).where(eq(records.id, id));
}

export async function getAccountRecords(accountId: string) {
  return db.select().from(records).where(eq(records.account, accountId));
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

    return { success: true, message: "Record edited successfully" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
