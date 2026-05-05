import { decimal, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { user } from "./auth-schema"
import { bankAccounts } from "./accounts-schema"
import { clients } from "./clients-schema"

export const invoiceStatus = pgEnum("invoice_status", [
  "Draft",
  "Sent",
  "Paid",
  "Overdue",
  "Cancelled",
])

export const invoices = pgTable("invoices", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  clientId: text("clientId").references(() => clients.id, {
    onDelete: "set null",
  }),
  bankAccountId: text("bankAccountId")
    .notNull()
    .references(() => bankAccounts.id, { onDelete: "cascade" }),
  invoiceNumber: text("invoice_number").notNull(),
  issueDate: timestamp("issue_date").notNull().defaultNow(),
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  amount: decimal({ precision: 12, scale: 2 }).notNull(),
  tax: decimal({ precision: 12, scale: 2 }).default("0"),
  discount: decimal({ precision: 12, scale: 2 }).default("0"),
  notes: text("notes"),
  status: invoiceStatus("status").notNull().default("Draft"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
