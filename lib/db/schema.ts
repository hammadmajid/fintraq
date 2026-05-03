export * from "./auth-schema"

import {
  boolean,
  decimal,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { user } from "./auth-schema"

export const preferences = pgTable("preference", {
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  currency: text("currency").notNull(),
  defaultAccount: text("defaultAccount").references(() => bankAccounts.id),
  onboardCompleted: boolean("onboard_completed").default(false).notNull(),
})

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

export const budgets = pgTable("budgets", {
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  account: text("bank_account")
    .notNull()
    .references(() => bankAccounts.id, { onDelete: "cascade" }),
  goal: decimal({ precision: 10, scale: 2 }).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  startsAt: timestamp("starts_at").notNull().defaultNow(),
  endsAt: timestamp("ends_at").notNull().defaultNow(),
})
