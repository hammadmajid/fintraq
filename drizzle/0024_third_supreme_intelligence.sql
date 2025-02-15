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
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_bank_account_bank_account_id_fk" FOREIGN KEY ("bank_account") REFERENCES "public"."bank_account"("id") ON DELETE cascade ON UPDATE no action;