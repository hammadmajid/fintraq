ALTER TABLE "records" RENAME COLUMN "bank_account" TO "bank_account_id";--> statement-breakpoint
ALTER TABLE "records" DROP CONSTRAINT "records_bank_account_bank_accounts_id_fk";
--> statement-breakpoint
ALTER TABLE "records" ADD CONSTRAINT "records_bank_account_id_bank_accounts_id_fk" FOREIGN KEY ("bank_account_id") REFERENCES "public"."bank_accounts"("id") ON DELETE cascade ON UPDATE no action;