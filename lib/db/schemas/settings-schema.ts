import { boolean, text, pgTable } from "drizzle-orm/pg-core"
import { user } from "./auth-schema"
import { bankAccounts } from "./accounts-schema"

export const preferences = pgTable("preference", {
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  currency: text("currency").notNull(),
  defaultAccount: text("defaultAccount").references(() => bankAccounts.id),
  onboardCompleted: boolean("onboard_completed").default(false).notNull(),
})
