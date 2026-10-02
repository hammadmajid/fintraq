"use server"

import { db } from "@/lib/db"
import { bankAccounts } from "@/lib/db/schemas/accounts-schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "@/lib/auth-helpers"
import type {
  CreateAccountFormData,
  UpdateAccountFormData,
} from "@/features/accounts/schemas/accounts"

export async function getAccountsByUserId(userId: string) {
  try {
    const accounts = await db
      .select()
      .from(bankAccounts)
      .where(eq(bankAccounts.userId, userId))

    return { success: true, data: accounts }
  } catch (error) {
    console.error("Error fetching accounts:", error)
    return { success: false, error: "Failed to fetch accounts" }
  }
}

export async function getAccountById(id: string, userId: string) {
  try {
    const account = await db
      .select()
      .from(bankAccounts)
      .where(eq(bankAccounts.id, id))
      .limit(1)

    if (!account.length || account[0].userId !== userId) {
      return { success: false, error: "Account not found" }
    }

    return { success: true, data: account[0] }
  } catch (error) {
    console.error("Error fetching account:", error)
    return { success: false, error: "Failed to fetch account" }
  }
}

// Internal function - for server-to-server use
async function createAccount(userId: string, data: CreateAccountFormData) {
  try {
    const account = await db.insert(bankAccounts).values({
      userId,
      title: data.title,
      description: data.description,
      icon: data.icon,
      color: data.color,
      type: data.type,
    })

    return { success: true, data: account }
  } catch (error) {
    console.error("Error creating account:", error)
    return { success: false, error: "Failed to create account" }
  }
}

// Internal function - for server-to-server use
async function updateAccount(
  id: string,
  userId: string,
  data: Omit<UpdateAccountFormData, "id">
) {
  try {
    // Verify account belongs to user
    const existing = await db
      .select()
      .from(bankAccounts)
      .where(eq(bankAccounts.id, id))
      .limit(1)

    if (!existing.length || existing[0].userId !== userId) {
      return { success: false, error: "Account not found" }
    }

    const account = await db
      .update(bankAccounts)
      .set({
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        type: data.type,
      })
      .where(eq(bankAccounts.id, id))

    return { success: true, data: account }
  } catch (error) {
    console.error("Error updating account:", error)
    return { success: false, error: "Failed to update account" }
  }
}

// Server action wrapper - gets session internally
export async function createAccountAction(data: CreateAccountFormData) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to create an account",
      }
    }

    return createAccount(session.user.id, data)
  } catch (error) {
    console.error("Error in createAccountAction:", error)
    return { success: false, error: "Failed to create account" }
  }
}

// Server action wrapper - gets session internally
export async function updateAccountAction(
  id: string,
  data: Omit<UpdateAccountFormData, "id">
) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      return { success: false, error: "You must be logged in" }
    }

    return updateAccount(id, session.user.id, data)
  } catch (error) {
    console.error("Error in updateAccountAction:", error)
    return { success: false, error: "Failed to update account" }
  }
}

export async function deleteAccount(id: string, userId: string) {
  try {
    // Verify account belongs to user
    const existing = await db
      .select()
      .from(bankAccounts)
      .where(eq(bankAccounts.id, id))
      .limit(1)

    if (!existing.length || existing[0].userId !== userId) {
      return { success: false, error: "Account not found" }
    }

    await db.delete(bankAccounts).where(eq(bankAccounts.id, id))

    return { success: true }
  } catch (error) {
    console.error("Error deleting account:", error)
    return { success: false, error: "Failed to delete account" }
  }
}
