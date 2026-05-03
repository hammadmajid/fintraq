CREATE TYPE "public"."bank_account_icon" AS ENUM('Wallet', 'CreditCard', 'PiggyBank', 'DollarSign', 'Banknote', 'Coins', 'Receipt', 'Landmark', 'Building', 'CircleDollarSign');--> statement-breakpoint
CREATE TYPE "public"."bank_account_type" AS ENUM('Cash', 'Checking', 'Savings', 'Credit', 'Debit', 'Investment', 'Loan', 'Other');--> statement-breakpoint
CREATE TYPE "public"."record_category" AS ENUM('Salary', 'Bonus', 'Interest', 'Dividend', 'Gift', 'Investment', 'Rent', 'Utilities', 'Groceries', 'Dining', 'Transportation', 'Entertainment', 'Health', 'Insurance', 'Education', 'Charity', 'Transfer', 'Other');--> statement-breakpoint
CREATE TYPE "public"."record_status" AS ENUM('Pending', 'Completed', 'Failed');--> statement-breakpoint
CREATE TYPE "public"."record_type" AS ENUM('Income', 'Expense', 'Transfer In', 'Transfer Out');--> statement-breakpoint
CREATE TABLE "bank_account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon" "bank_account_icon" NOT NULL,
	"color" text NOT NULL,
	"type" "bank_account_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "budgets" (
	"userId" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"bank_account" text NOT NULL,
	"goal" numeric(10, 2) NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"starts_at" timestamp DEFAULT now() NOT NULL,
	"ends_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "preference" (
	"userId" text NOT NULL,
	"currency" text NOT NULL,
	"defaultAccount" text,
	"onboard_completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "records" (
	"userId" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"bank_account" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"category" "record_category" NOT NULL,
	"type" "record_type" NOT NULL,
	"status" "record_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_bank_account_bank_account_id_fk" FOREIGN KEY ("bank_account") REFERENCES "public"."bank_account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preference" ADD CONSTRAINT "preference_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preference" ADD CONSTRAINT "preference_defaultAccount_bank_account_id_fk" FOREIGN KEY ("defaultAccount") REFERENCES "public"."bank_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "records" ADD CONSTRAINT "records_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "records" ADD CONSTRAINT "records_bank_account_bank_account_id_fk" FOREIGN KEY ("bank_account") REFERENCES "public"."bank_account"("id") ON DELETE cascade ON UPDATE no action;