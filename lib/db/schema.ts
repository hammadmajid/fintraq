import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  bio: varchar({ length: 1200 }),
  avatarURL: varchar("avatar_url", { length: 255 }),
});

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);
export type SelectUser = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export const sessions = pgTable("sessions", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(), // IPv6 max length is 45
  device: varchar({ length: 255 }).notNull(),
});

export const selectSessionSchema = createSelectSchema(sessions);
export const insertSessionSchema = createInsertSchema(sessions);
export type SelectSession = z.infer<typeof selectSessionSchema>;
export type InsertSession = z.infer<typeof insertSessionSchema>;

export const accounts = pgTable("accounts", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  icon: varchar({ length: 255 }).notNull(),
  color: varchar({ length: 7 }).notNull(),
  balance: decimal({ precision: 10, scale: 2 }).notNull().default("0"),
  type: varchar({ length: 255 }).notNull(),
});

export const selectAccountSchema = createSelectSchema(accounts);
export const insertAccountSchema = createInsertSchema(accounts);
export type SelectAccount = z.infer<typeof selectAccountSchema>;
export type InsertAccount = z.infer<typeof insertAccountSchema>;

export const records = pgTable("records", {
  id: uuid().primaryKey().defaultRandom(),
  account: uuid()
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  amount: decimal({ precision: 10, scale: 2 }).notNull(),
  category: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }).notNull(),
  status: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectRecordSchema = createSelectSchema(records);
export const insertRecordSchema = createInsertSchema(records);
export type SelectRecord = z.infer<typeof selectRecordSchema>;
export type InsertRecord = z.infer<typeof insertRecordSchema>;
