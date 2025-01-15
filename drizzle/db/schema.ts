import {
  bankAccountTypes,
  icons,
  recordCategories,
  recordStatuses,
  recordTypes,
  subscriptionPlans,
} from "@/lib/utils";
import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import type { AdapterAccountType } from "next-auth/adapters";
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  email_verified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "accounts",
  {
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    provider_account_id: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compound_key: primaryKey({
      columns: [account.provider, account.provider_account_id],
    }),
  }),
);

export const sessions = pgTable("sessions", {
  session_token: text("session_token").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verification_tokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    composite_pk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = pgTable(
  "authenticators",
  {
    credential_id: text("credential_id").notNull().unique(),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider_account_id: text("provider_account_id").notNull(),
    credential_public_key: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credential_device_type: text("credential_device_type").notNull(),
    credential_backed_up: boolean("credential_backed_up").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    composite_pk: primaryKey({
      columns: [authenticator.user_id, authenticator.credential_id],
    }),
  }),
);

export const subscription_plan_type = pgEnum(
  "subscription_plan_type",
  subscriptionPlans,
);

export const preferences = pgTable("preferences", {
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  currency: text("currency").notNull(),
  default_account: text("default_account").references(() => bank_accounts.id),
  onboard_completed: boolean("onboard_completed").default(false).notNull(),
  plan: subscription_plan_type("plan").default("Hobbyist").notNull(),
});

export const bank_account_icon = pgEnum("bank_account_icon", icons);
export const bank_account_type = pgEnum("bank_account_type", bankAccountTypes);

export const bank_accounts = pgTable("bank_accounts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: bank_account_icon("icon").notNull(),
  color: text("color").notNull(),
  balance: decimal({ precision: 10, scale: 2 }).notNull(),
  type: bank_account_type("type").notNull(),
});

const selectBankAccountSchema = createSelectSchema(bank_accounts);
export type SelectBankAccount = z.infer<typeof selectBankAccountSchema>;

export const record_type = pgEnum("record_type", recordTypes);
export const record_category = pgEnum("record_category", recordCategories);
export const record_status = pgEnum("record_status", recordStatuses);

export const records = pgTable("records", {
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  account_id: text("bank_account")
    .notNull()
    .references(() => bank_accounts.id, { onDelete: "cascade" }),
  amount: decimal({ precision: 10, scale: 2 }).notNull(),
  category: record_category("category").notNull(),
  type: record_type("type").notNull(),
  status: record_status("status").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

const selectRecordSchema = createSelectSchema(records);
export type SelectRecord = z.infer<typeof selectRecordSchema>;

export const budgets = pgTable("budgets", {
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  account_id: text("bank_account")
    .notNull()
    .references(() => bank_accounts.id, { onDelete: "cascade" }),
  spent: decimal({ precision: 10, scale: 2 }).notNull(),
  target: decimal({ precision: 10, scale: 2 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

const selectBudgetSchema = createSelectSchema(budgets);
export type Budget = z.infer<typeof selectBudgetSchema>;
