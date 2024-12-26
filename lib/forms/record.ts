import { z } from "zod";

export const recordSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  type: z.enum(["Income", "Expense", "Transfer"]),
  account: z.string(),
  category: z.string(),
  status: z.enum(["Cleared", "Pending"]),
  created: z.date().optional(),
  updated: z.date().optional(),
});
