"use server";

import { db } from "@/drizzle/db/client";
import { budgets, SelectBudget } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

export async function getAllBudgets(userId: string): Promise<SelectBudget[]> {
  return await db.select().from(budgets).where(eq(budgets.userId, userId));
}
