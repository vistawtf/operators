import {
  text,
  uuid,
  index,
  pgEnum,
  pgTable,
  boolean,
  timestamp,
  primaryKey,
  uniqueIndex,
  smallint,
  integer,
} from "drizzle-orm/pg-core";

export const tierE           = pgEnum('tier_e', ["recommended", "minimum"]) // prettier-ignore
export const typeE           = pgEnum("type_e", ["prover", "sequencer", "validator", "full_node", "light_client"]); // prettier-ignore
export const entryE          = pgEnum("entry_e", ["permissioned", "permissionless"]) // prettier-ignore
export const statusE         = pgEnum("status_e", ["mainnet", "testnet", "devnet"]); // prettier-ignore
export const storageMediaE   = pgEnum("storage_media_e", ["NVME", "SSD", "HDD"]); // prettier-ignore

export const projectTags = pgTable("project_tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(),
  label: text("label").notNull(),
});

export const projectTagLinks = pgTable(
  "project_tag_links",
  {
    projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }), // prettier-ignore
    tagId: uuid("tag_id").notNull().references(() => projectTags.id, { onDelete: "cascade" }), // prettier-ignore
  },
  (t) => [
    primaryKey({ columns: [t.projectId, t.tagId], name: "pk_project_tag_links" }), // prettier-ignore
    index("ix_ptl_tag").on(t.tagId),
    index("ix_ptl_project").on(t.projectId),
  ]
);

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  website: text("website"),
  description: text("description"),
  documentation: text("documentation"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), // prettier-ignore
});

export const opportunities = pgTable(
  "opportunities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }), // prettier-ignore
    type: typeE("type").notNull(),
    status: statusE("status").notNull(),
  },
  (t) => [
    uniqueIndex("u_opp_project_type_stats").on(t.projectId, t.type, t.status), // prettier-ignore
    index("ix_opp_type_status").on(t.type, t.status),
  ]
);

export const requirements = pgTable(
  "requirement",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    opportunityId: uuid("opportunity_id").notNull().references(() => opportunities.id, { onDelete: "cascade" }), // prettier-ignore
    tier: tierE("tier").notNull(),
    entry: entryE("entry").notNull(),
  },
  (t) => [
    uniqueIndex("u_req_opportunity_tier_entry").on(t.opportunityId, t.tier, t.entry), // prettier-ignore
  ]
);

export const hardware = pgTable(
  "hardware",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requirementId: uuid("requirement_id").notNull().references(() => requirements.id, { onDelete: "cascade" }), // prettier-ignore
    cpuCores: smallint("cpu_cores"),
    ramGb: smallint("ram_gb"),
    storageGb: integer("storage_gb"),
    storageMedia: storageMediaE("storage_media"),
    iopsRead: integer("iops_read"),
    iopsWrite: integer("iops_write"),
    upMbps: integer("up_mbps"),
    downMbps: integer("down_mbps"),
    staticIpPreferred: boolean("static_ip_preferred").notNull().default(false),
    upsRequired: boolean("ups_required").notNull().default(false),
    notes: text("notes"),
  },
  (t) => [
    uniqueIndex("u_hw_profile").on(t.requirementId),
    index("ix_hw_cpu_ram_storage").on(t.cpuCores, t.ramGb, t.storageGb),
  ]
);
