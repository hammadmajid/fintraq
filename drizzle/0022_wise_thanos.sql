CREATE TABLE "budget" (
	"userId" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"bank_account" text NOT NULL,
	"spent" numeric(10, 2) NOT NULL,
	"target" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "budget" ADD CONSTRAINT "budget_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget" ADD CONSTRAINT "budget_bank_account_bank_account_id_fk" FOREIGN KEY ("bank_account") REFERENCES "public"."bank_account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public"."preference" ALTER COLUMN "plan" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."plan_type";--> statement-breakpoint
CREATE TYPE "public"."plan_type" AS ENUM('Hobbyist', 'Pro Monthly', 'Pro Yearly', 'Premium Monthly', 'Premium Yearly');--> statement-breakpoint
ALTER TABLE "public"."preference" ALTER COLUMN "plan" SET DATA TYPE "public"."plan_type" USING "plan"::"public"."plan_type";