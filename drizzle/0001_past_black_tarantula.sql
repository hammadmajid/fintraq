ALTER TABLE "sessions" ALTER COLUMN "token" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "token" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();