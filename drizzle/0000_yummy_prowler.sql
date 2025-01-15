CREATE TYPE "public"."bank_account_icon" AS ENUM('Wallet', 'CreditCard', 'PiggyBank', 'DollarSign', 'Banknote', 'Coins', 'Receipt', 'Landmark', 'Building', 'CircleDollarSign');--> statement-breakpoint
CREATE TYPE "public"."bank_account_type" AS ENUM('Cash', 'Checking', 'Savings', 'Credit', 'Debit', 'Investment', 'Loan', 'Other');--> statement-breakpoint
CREATE TYPE "public"."record_category" AS ENUM('Salary', 'Bonus', 'Interest', 'Dividend', 'Gift', 'Investment', 'Rent', 'Utilities', 'Groceries', 'Dining', 'Transportation', 'Entertainment', 'Health', 'Insurance', 'Education', 'Charity', 'Transfer', 'Other');--> statement-breakpoint
CREATE TYPE "public"."record_status" AS ENUM('Pending', 'Completed', 'Failed');--> statement-breakpoint
CREATE TYPE "public"."record_type" AS ENUM('Income', 'Expense', 'Transfer');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan_type" AS ENUM('Hobbyist', 'Pro Monthly', 'Pro Yearly', 'Premium Monthly', 'Premium Yearly');--> statement-breakpoint
CREATE TABLE "accounts" (
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "authenticators" (
	"credential_id" text NOT NULL,
	"user_id" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"credential_public_key" text NOT NULL,
	"counter" integer NOT NULL,
	"credential_device_type" text NOT NULL,
	"credential_backed_up" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticators_user_id_credential_id_pk" PRIMARY KEY("user_id","credential_id"),
	CONSTRAINT "authenticators_credential_id_unique" UNIQUE("credential_id")
);
--> statement-breakpoint
CREATE TABLE "bank_accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon" "bank_account_icon" NOT NULL,
	"color" text NOT NULL,
	"balance" numeric(10, 2) NOT NULL,
	"type" "bank_account_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "budgets" (
	"user_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"bank_account" text NOT NULL,
	"spent" numeric(10, 2) NOT NULL,
	"target" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "preferences" (
	"user_id" text NOT NULL,
	"currency" text NOT NULL,
	"default_account" text,
	"onboard_completed" boolean DEFAULT false NOT NULL,
	"plan" "subscription_plan_type" DEFAULT 'Hobbyist' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "records" (
	"user_id" text NOT NULL,
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
CREATE TABLE "sessions" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"email_verified" timestamp,
	"image" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticators" ADD CONSTRAINT "authenticators_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_bank_account_bank_accounts_id_fk" FOREIGN KEY ("bank_account") REFERENCES "public"."bank_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_default_account_bank_accounts_id_fk" FOREIGN KEY ("default_account") REFERENCES "public"."bank_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "records" ADD CONSTRAINT "records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "records" ADD CONSTRAINT "records_bank_account_bank_accounts_id_fk" FOREIGN KEY ("bank_account") REFERENCES "public"."bank_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;