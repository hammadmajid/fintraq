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
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
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
  "authenticators",
  {
    credentialId: text("credential_id").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("provider_account_id").notNull(),
    credentialPublicKey: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credential_device_type").notNull(),
    credentialBackedUp: boolean("credential_backed_up").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialId],
    }),
  }),
);

export const subscriptionPlanType = pgEnum(
  "subscription_plan_type",
  subscriptionPlans,
);

export const preferences = pgTable("preferences", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  currency: text("currency").notNull(),
  defaultAccount: text("default_account").references(() => bankAccounts.id),
  onboardCompleted: boolean("onboard_completed").default(false).notNull(),
  plan: subscriptionPlanType("plan").default("Hobbyist").notNull(),
});

export const bankAccountIcon = pgEnum("bank_account_icon", icons);
export const bankAccountType = pgEnum("bank_account_type", bankAccountTypes);

export const bankAccounts = pgTable("bank_accounts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: bankAccountIcon("icon").notNull(),
  color: text("color").notNull(),
  balance: decimal({ precision: 10, scale: 2 }).notNull(),
  type: bankAccountType("type").notNull(),
});

const selectBankAccountSchema = createSelectSchema(bankAccounts);
export type SelectBankAccount = z.infer<typeof selectBankAccountSchema>;

export const recordType = pgEnum("record_type", recordTypes);
export const recordCategory = pgEnum("record_category", recordCategories);
export const recordStatus = pgEnum("record_status", recordStatuses);

export const records = pgTable("records", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  accountId: text("bank_account_id")
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
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  accountId: text("bank_account")
    .notNull()
    .references(() => bankAccounts.id, { onDelete: "cascade" }),
  spent: decimal({ precision: 10, scale: 2 }).notNull(),
  title: text("title").notNull(),
  target: decimal({ precision: 10, scale: 2 }).notNull(),
  startDate: timestamp("start_date").notNull().defaultNow(),
  endDate: timestamp("end_date").notNull().defaultNow(),
});

const selectBudgetSchema = createSelectSchema(budgets);
export type Budget = z.infer<typeof selectBudgetSchema>;
