import { decimal, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { user } from "./auth-schema"
import { bankAccounts } from "./accounts-schema"

export const recordType = pgEnum("record_type", [
  "Income",
  "Expense",
  "Transfer In",
  "Transfer Out",
])

export const recordCategory = pgEnum("record_category", [
  "Salary",
  "Bonus",
  "Interest",
  "Dividend",
  "Gift",
  "Investment",
  "Rent",
  "Utilities",
  "Groceries",
  "Dining",
  "Transportation",
  "Entertainment",
  "Health",
  "Insurance",
  "Education",
  "Charity",
  "Transfer",
  "Other",
])

export const recordStatus = pgEnum("record_status", [
  "Pending",
  "Completed",
  "Failed",
])

export const records = pgTable("records", {
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  account: text("bank_account")
    .notNull()
    .references(() => bankAccounts.id, { onDelete: "cascade" }),
  amount: decimal({ precision: 10, scale: 2 }).notNull(),
  category: recordCategory("category").notNull(),
  type: recordType("type").notNull(),
  status: recordStatus("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
