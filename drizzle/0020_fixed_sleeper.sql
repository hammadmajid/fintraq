CREATE TABLE "preference" (
	"userId" text NOT NULL,
	"currency" text NOT NULL,
	"defaultAccount" text,
	"onboard_completed" boolean DEFAULT false NOT NULL,
	"plan" "plan_type" DEFAULT 'Hobbyist' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "preference" ADD CONSTRAINT "preference_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preference" ADD CONSTRAINT "preference_defaultAccount_bank_account_id_fk" FOREIGN KEY ("defaultAccount") REFERENCES "public"."bank_account"("id") ON DELETE no action ON UPDATE no action;