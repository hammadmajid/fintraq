"use server";

import {db} from "@/drizzle/db/client";
import {records, SelectRecord} from "@/drizzle/db/schema";
import {eq} from "drizzle-orm";

export async function getRecords(userId: string): Promise<SelectRecord[]> {
    return db.select().from(records).where(eq(records.userId, userId));
}