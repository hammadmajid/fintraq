import * as z from "zod"

export const createAccountSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(100, "Title must be at most 100 characters."),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(500, "Description must be at most 500 characters."),
  icon: z.enum([
    "Wallet",
    "CreditCard",
    "PiggyBank",
    "DollarSign",
    "Banknote",
    "Coins",
    "Receipt",
    "Landmark",
    "Building",
    "CircleDollarSign",
  ]),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Please enter a valid hex color."),
  type: z.enum([
    "Cash",
    "Checking",
    "Savings",
    "Credit",
    "Debit",
    "Investment",
    "Loan",
    "Other",
  ]),
})

export type CreateAccountFormData = z.infer<typeof createAccountSchema>

export const updateAccountSchema = createAccountSchema.extend({
  id: z.string().min(1, "Account ID is required."),
})

export type UpdateAccountFormData = z.infer<typeof updateAccountSchema>
