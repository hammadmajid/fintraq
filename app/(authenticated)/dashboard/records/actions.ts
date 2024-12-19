'use server'

import { recordQueries } from "@/lib/db/queries/records";
import { recordSchema } from "@/lib/schemas/record";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createRecord(data: z.infer<typeof recordSchema>) {
    try {
        const { account, amount, category, type, status } = recordSchema.parse(data);

        await recordQueries.create(
            account,
            String(amount),
            category,
            type,
            status
        );

        revalidatePath('/dashboard'); // Adjust the path as needed
        return { success: true, message: "Record created successfully" };
    } catch (error) {
        console.error("Failed to create record:", error);
        return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}

