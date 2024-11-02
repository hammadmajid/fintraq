import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  bio: varchar({ length: 1200 }),
  avatarURL: varchar("avatar_url", { length: 255 }),
});

export const sessions = pgTable('sessions', {
  userId: uuid('user_id').notNull().references(() => users.id),
  token: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: varchar('ip_address', { length: 45 }).notNull(), // IPv6 max length is 45
  device: varchar('device', { length: 255 }).notNull(),
});

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export type SelectSession = InferSelectModel<typeof sessions>;
export type InsertSession = InferInsertModel<typeof sessions>;