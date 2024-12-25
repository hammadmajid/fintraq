ALTER TABLE "bank_account" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bank_account" ALTER COLUMN "balance" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "bank_account" DROP COLUMN IF EXISTS "created_at";