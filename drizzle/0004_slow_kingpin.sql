CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"icon" varchar(255) NOT NULL,
	"color" varchar(7) NOT NULL,
	"balance" numeric(10, 2) DEFAULT '0' NOT NULL,
	"type" varchar(255) NOT NULL
);
