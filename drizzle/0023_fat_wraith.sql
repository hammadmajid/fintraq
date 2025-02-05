ALTER TABLE "public"."records" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."record_type";--> statement-breakpoint
CREATE TYPE "public"."record_type" AS ENUM('Income', 'Expense', 'Transfer In', 'Transfer Out');--> statement-breakpoint
ALTER TABLE "public"."records" ALTER COLUMN "type" SET DATA TYPE "public"."record_type" USING "type"::"public"."record_type";