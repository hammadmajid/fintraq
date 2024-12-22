"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import { bankAccounts } from "@/lib/db/schema";
import { accountSchema } from "./schema";

export async function createAccount(values: z.infer<typeof accountSchema>) {
    await db.insert(bankAccounts).values({
        userId: values.userId,
        title: values.title,
        color: values.color,
        type: values.type,
        icon: values.icon,
        description: values.description,
        balance: String(values.balance),
        createdAt: new Date(),
    })
}