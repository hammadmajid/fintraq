import { text, pgTable, pgEnum } from "drizzle-orm/pg-core"
import { user } from "./auth-schema"

export const bankAccountIcon = pgEnum("bank_account_icon", [
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
])

export const bankAccountType = pgEnum("bank_account_type", [
  "Cash",
  "Checking",
  "Savings",
  "Credit",
  "Debit",
  "Investment",
  "Loan",
  "Other",
])

export const bankAccounts = pgTable("bank_account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: bankAccountIcon("icon").notNull(),
  color: text("color").notNull(),
  type: bankAccountType("type").notNull(),
})
