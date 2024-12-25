"use server";

import { db } from "@/drizzle/db/client";
import { records, SelectRecord } from "@/drizzle/db/schema";
import { recordSchema } from "@/lib/forms/record";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getRecords(userId: string): Promise<SelectRecord[]> {
    return db.select().from(records).where(eq(records.userId, userId));
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
        })

        revalidatePath('/u/0/records');
        return { success: true, message: "Record created successfully" };
    } catch (error) {
        console.error("Failed to create record:", error);
        return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}
