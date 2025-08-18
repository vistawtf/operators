CREATE TYPE "public"."entry_e" AS ENUM('permissioned', 'permissionless');--> statement-breakpoint
CREATE TYPE "public"."status_e" AS ENUM('mainnet', 'testnet', 'devnet');--> statement-breakpoint
CREATE TYPE "public"."storage_media_e" AS ENUM('NVME', 'SSD', 'HDD');--> statement-breakpoint
CREATE TYPE "public"."tier_e" AS ENUM('recommended', 'minimum');--> statement-breakpoint
CREATE TYPE "public"."type_e" AS ENUM('prover', 'sequencer', 'validator', 'full_node', 'light_client');--> statement-breakpoint
CREATE TABLE "hardware" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"requirement_id" uuid NOT NULL,
	"cpu_cores" smallint,
	"ram_gb" smallint,
	"storage_gb" integer,
	"storage_media" "storage_media_e",
	"iops_read" integer,
	"iops_write" integer,
	"up_mbps" integer,
	"down_mbps" integer,
	"static_ip_preferred" boolean DEFAULT false NOT NULL,
	"ups_required" boolean DEFAULT false NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "opportunities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"type" "type_e" NOT NULL,
	"status" "status_e" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_tag_links" (
	"project_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "pk_project_tag_links" PRIMARY KEY("project_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "project_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"label" text NOT NULL,
	CONSTRAINT "project_tags_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"website" text,
	"description" text,
	"documentation" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "requirement" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opportunity_id" uuid NOT NULL,
	"tier" "tier_e" NOT NULL,
	"entry" "entry_e" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hardware" ADD CONSTRAINT "hardware_requirement_id_requirement_id_fk" FOREIGN KEY ("requirement_id") REFERENCES "public"."requirement"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_tag_links" ADD CONSTRAINT "project_tag_links_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_tag_links" ADD CONSTRAINT "project_tag_links_tag_id_project_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."project_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "requirement" ADD CONSTRAINT "requirement_opportunity_id_opportunities_id_fk" FOREIGN KEY ("opportunity_id") REFERENCES "public"."opportunities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "u_hw_profile" ON "hardware" USING btree ("requirement_id");--> statement-breakpoint
CREATE INDEX "ix_hw_cpu_ram_storage" ON "hardware" USING btree ("cpu_cores","ram_gb","storage_gb");--> statement-breakpoint
CREATE UNIQUE INDEX "u_opp_project_type_stats" ON "opportunities" USING btree ("project_id","type","status");--> statement-breakpoint
CREATE INDEX "ix_opp_type_status" ON "opportunities" USING btree ("type","status");--> statement-breakpoint
CREATE INDEX "ix_ptl_tag" ON "project_tag_links" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "ix_ptl_project" ON "project_tag_links" USING btree ("project_id");--> statement-breakpoint
CREATE UNIQUE INDEX "u_req_opportunity_tier_entry" ON "requirement" USING btree ("opportunity_id","tier","entry");