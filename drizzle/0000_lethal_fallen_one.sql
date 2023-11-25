CREATE SCHEMA "pepecon";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pepecon"."emojis" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"src" text NOT NULL
);
