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

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const subscriptionPlanType = pgEnum("plan_type", subscriptionPlans);

export const preferences = pgTable("preference", {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  currency: text("currency").notNull(),
  defaultAccount: text("defaultAccount").references(() => bankAccounts.id),
  onboardCompleted: boolean("onboard_completed").default(false).notNull(),
  plan: subscriptionPlanType("plan").default("Hobbyist").notNull(),
});

export const bankAccountIcon = pgEnum("bank_account_icon", icons);
export const bankAccountType = pgEnum("bank_account_type", bankAccountTypes);

export const bankAccounts = pgTable("bank_account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: bankAccountIcon("icon").notNull(),
  color: text("color").notNull(),
  type: bankAccountType("type").notNull(),
});

const selectBankAccountSchema = createSelectSchema(bankAccounts);
export type SelectBankAccount = z.infer<typeof selectBankAccountSchema>;

export const recordType = pgEnum("record_type", recordTypes);
export const recordCategory = pgEnum("record_category", recordCategories);
export const recordStatus = pgEnum("record_status", recordStatuses);

export const records = pgTable("records", {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
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
});

const selectRecordSchema = createSelectSchema(records);
export type SelectRecord = z.infer<typeof selectRecordSchema>;

export const budgets = pgTable("budgets", {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
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
});

const selectBudgetSchema = createSelectSchema(budgets);
export type SelectBudget = z.infer<typeof selectBudgetSchema>;
