CREATE TYPE "public"."bank_account_type" AS ENUM('Cash', 'Checking', 'Savings', 'Credit', 'Debit', 'Investment', 'Loan', 'Other');--> statement-breakpoint
CREATE TYPE "public"."record_category" AS ENUM('Salary', 'Bonus', 'Interest', 'Dividend', 'Gift', 'Investment', 'Rent', 'Utilities', 'Groceries', 'Dining', 'Transportation', 'Entertainment', 'Health', 'Insurance', 'Education', 'Charity', 'Transfer', 'Other');--> statement-breakpoint
CREATE TYPE "public"."record_status" AS ENUM('Pending', 'Completed', 'Failed');--> statement-breakpoint
CREATE TYPE "public"."record_type" AS ENUM('Income', 'Expense', 'Transfer');--> statement-breakpoint
ALTER TABLE "bank_account" ALTER COLUMN "type" SET DATA TYPE bank_account_type;--> statement-breakpoint
ALTER TABLE "records" ALTER COLUMN "category" SET DATA TYPE record_category;--> statement-breakpoint
ALTER TABLE "records" ALTER COLUMN "type" SET DATA TYPE record_type;--> statement-breakpoint
ALTER TABLE "records" ALTER COLUMN "status" SET DATA TYPE record_status;--> statement-breakpoint
ALTER TABLE "preference" ADD COLUMN "defaultAccount" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "preference" ADD CONSTRAINT "preference_defaultAccount_bank_account_id_fk" FOREIGN KEY ("defaultAccount") REFERENCES "public"."bank_account"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
