ALTER TABLE "sessions" ADD COLUMN "ip_address" varchar(45) NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "device" varchar(255) NOT NULL;