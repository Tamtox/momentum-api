ALTER TABLE "applications" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "applications" CASCADE;--> statement-breakpoint
ALTER TABLE "access_attachments" DROP CONSTRAINT "access_attachments_application_id_applications_id_fk";
--> statement-breakpoint
ALTER TABLE "access_groups" DROP CONSTRAINT "access_groups_application_id_applications_id_fk";
--> statement-breakpoint
ALTER TABLE "access_members" DROP CONSTRAINT "access_members_application_id_applications_id_fk";
--> statement-breakpoint
ALTER TABLE "access_policies" DROP CONSTRAINT "access_policies_application_id_applications_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_application_id_applications_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_verified" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "access_attachments" DROP COLUMN IF EXISTS "application_id";--> statement-breakpoint
ALTER TABLE "access_groups" DROP COLUMN IF EXISTS "application_id";--> statement-breakpoint
ALTER TABLE "access_members" DROP COLUMN IF EXISTS "application_id";--> statement-breakpoint
ALTER TABLE "access_policies" DROP COLUMN IF EXISTS "application_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "application_id";