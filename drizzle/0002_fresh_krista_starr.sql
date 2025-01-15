ALTER TABLE "budgets" RENAME COLUMN "created_at" TO "start_date";--> statement-breakpoint
ALTER TABLE "budgets" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "budgets" ADD COLUMN "end_date" timestamp DEFAULT now() NOT NULL;