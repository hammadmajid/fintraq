import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  decimal,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  bio: varchar({ length: 1200 }),
  avatarURL: varchar("avatar_url", { length: 255 }),
});

export const sessions = pgTable("sessions", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(), // IPv6 max length is 45
  device: varchar("device", { length: 255 }).notNull(),
});

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  icon: varchar({ length: 255 }).notNull(),
  color: varchar({ length: 7 }).notNull(),
  balance: decimal({ precision: 10, scale: 2 }).notNull().default("0"),
  type: varchar({ length: 255 }).notNull(),
});

export const records = pgTable('records', {
  id: uuid().primaryKey().defaultRandom(),
  account: uuid().notNull().references(() => accounts.id, { onDelete: 'cascade' }),
  amount: decimal({ precision: 10, scale: 2 }).notNull(),
  category: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }).notNull(),
  status: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export type SelectSession = InferSelectModel<typeof sessions>;
export type InsertSession = InferInsertModel<typeof sessions>;

export type SelectAccount = InferSelectModel<typeof accounts>;
export type InsertAccount = InferInsertModel<typeof accounts>;

export type SelectRecord = InferSelectModel<typeof records>;
export type InsertRecord = InferInsertModel<typeof records>;