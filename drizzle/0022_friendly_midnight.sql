ALTER TABLE "bank_account" DROP COLUMN "balance";--> statement-breakpoint
ALTER TABLE "public"."preference" ALTER COLUMN "plan" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."plan_type";--> statement-breakpoint
CREATE TYPE "public"."plan_type" AS ENUM('Hobbyist', 'Pro Monthly', 'Pro Yearly', 'Premium Monthly', 'Premium Yearly');--> statement-breakpoint
ALTER TABLE "public"."preference" ALTER COLUMN "plan" SET DATA TYPE "public"."plan_type" USING "plan"::"public"."plan_type";