CREATE TABLE IF NOT EXISTS "bank_account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"icon" text NOT NULL,
	"color" text NOT NULL,
	"balance" numeric(10, 2) DEFAULT '0' NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
