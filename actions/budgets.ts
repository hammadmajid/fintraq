"use server";

import { db } from "@/drizzle/db/client";
import { budgets, SelectBudget } from "@/drizzle/db/schema";
import { budgetSchema } from "@/lib/forms/budget";
import { eq } from "drizzle-orm";
import z from "zod";

export async function createBudget(data: z.infer<typeof budgetSchema>) {
  try {
    const { userId, account, goal, title, description, startsAt, endsAt } =
      data;

    await db.insert(budgets).values({
      userId,
      title,
      account,
      goal: String(goal),
      description,
      startsAt,
      endsAt,
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

export async function editBudget(data: z.infer<typeof budgetSchema>) {
  try {
    const { id, account, goal, title, description, startsAt, endsAt } = data;

    await db
      .update(budgets)
      .set({
        title,
        account,
        goal: String(goal),
        description,
        startsAt,
        endsAt,
      })
      .where(eq(budgets.id, id!));

    return { success: true, message: "Budget updated successfully" };
  } catch (error) {
    console.error("Failed to edit record:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getAllBudgets(userId: string): Promise<SelectBudget[]> {
  return await db.select().from(budgets).where(eq(budgets.userId, userId));
}

export async function getBudgetById(budgetId: string) {
  return await db.select().from(budgets).where(eq(budgets.id, budgetId));
}
