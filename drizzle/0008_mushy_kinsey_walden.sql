ALTER TABLE "public"."accounts" ALTER COLUMN "icon" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."account_icon";--> statement-breakpoint
CREATE TYPE "public"."account_icon" AS ENUM('Wallet', 'CreditCard', 'PiggyBank', 'DollarSign', 'Banknote', 'Coins', 'Receipt', 'Landmark', 'Building', 'CircleDollarSign');--> statement-breakpoint
ALTER TABLE "public"."accounts" ALTER COLUMN "icon" SET DATA TYPE "public"."account_icon" USING "icon"::"public"."account_icon";