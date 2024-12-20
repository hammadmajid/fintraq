CREATE TABLE IF NOT EXISTS "preference" (
	"userId" text NOT NULL,
	"currency" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "preference" ADD CONSTRAINT "preference_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
