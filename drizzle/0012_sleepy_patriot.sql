CREATE TYPE "public"."bank_account_icon" AS ENUM('Wallet', 'CreditCard', 'PiggyBank', 'DollarSign', 'Banknote', 'Coins', 'Receipt', 'Landmark', 'Building', 'CircleDollarSign');--> statement-breakpoint
ALTER TABLE "bank_account" ALTER COLUMN "icon" SET DATA TYPE bank_account_icon;