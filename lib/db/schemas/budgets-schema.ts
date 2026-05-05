import { decimal, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { user } from "./auth-schema"
import { bankAccounts } from "./accounts-schema"

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
