import { z } from 'zod';

export const recordSchema = z.object({
    id: z.string(),
    amount: z.number(),
    type: z.enum(["Income", "Expense", "Transfer"]),
    account: z.string(),
    category: z.string(),
    status: z.enum(["Cleared", "Pending"]),
    created: z.date().default(new Date),
    updated: z.date().default(new Date),
})