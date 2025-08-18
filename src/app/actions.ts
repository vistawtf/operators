"use server";

import { db } from "@/db";
import {
  typeE,
  tierE,
  entryE,
  statusE,
  hardware,
  projects,
  requirements,
  storageMediaE,
  opportunities,
  projectTags,
  projectTagLinks,
} from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/** ====== HELPERS ====== */

const toNumOrNull = (v: FormDataEntryValue | null) => {
  if (v == null) return null;
  const s = String(v).trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};
const toBool = (v: FormDataEntryValue | null) => v === "on";

/** ====== READ ====== */

export async function listProjects() {
  const rows = await db
    .select({
      id: projects.id,
      name: projects.name,
      website: projects.website,
      isActive: projects.isActive,
      createdAt: projects.createdAt,
    })
    .from(projects)
    .orderBy(projects.createdAt);

  return rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));
}

export async function listProjectTags() {
  const rows = await db
    .select({ code: projectTags.code, label: projectTags.label })
    .from(projectTags)
    .orderBy(projectTags.label);
  return rows; // [{ code, label }]
}

/** ====== WRITE (forms) ====== */

export async function createProject(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim() || null;
  const documentation =
    String(formData.get("documentation") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const isActive = formData.get("isActive") === "on";
  const tagCodes = formData.getAll("tags").map(String).filter(Boolean);

  if (!name) throw new Error("Name is required");
  if (tagCodes.length === 0) throw new Error("Select at least one tag");

  await db.transaction(async (tx) => {
    const [project] = await tx
      .insert(projects)
      .values({ name, website, documentation, description, isActive })
      .returning({ id: projects.id });

    const tags = await tx
      .select({ id: projectTags.id })
      .from(projectTags)
      .where(inArray(projectTags.code, tagCodes));

    if (tags.length === 0) {
      throw new Error("Selected tags are invalid");
    }

    await tx
      .insert(projectTagLinks)
      .values(tags.map((t) => ({ projectId: project.id, tagId: t.id })))
      .onConflictDoNothing();
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/create");
}

export async function createOpportunity(formData: FormData) {
  const projectId = String(formData.get("projectId") ?? "");
  const type = String(formData.get("type") ?? "") as (typeof typeE.enumValues)[number]; // prettier-ignore
  const status = String(formData.get("status") ?? "") as (typeof statusE.enumValues)[number]; // prettier-ignore

  if (!projectId || !type || !status) throw new Error("Missing fields");

  try {
    await db
      .insert(opportunities)
      .values({ projectId, type, status })
      .returning({ id: opportunities.id });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/create");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e?.code === "23505") {
      throw new Error(
        "This project already has an opportunity with the same type & status."
      );
    }
    throw e;
  }
}

export async function upsertRequirementWithHardware(formData: FormData) {
  const opportunityId = String(formData.get("opportunityId") ?? "");
  const tier = String(formData.get("tier") ?? "") as (typeof tierE.enumValues)[number]; // prettier-ignore
  const entry = String(formData.get("entry") ?? "") as (typeof entryE.enumValues)[number]; // prettier-ignore

  const cpuCores = toNumOrNull(formData.get("cpuCores"));
  const ramGb = toNumOrNull(formData.get("ramGb"));
  const storageGb = toNumOrNull(formData.get("storageGb"));

  // prettier-ignore
  const storageMedia = ((): (typeof storageMediaE.enumValues)[number] | null => {
    const raw = String(formData.get("storageMedia") ?? "").trim();
    return raw ? (raw as (typeof storageMediaE.enumValues)[number]) : null;
  })();

  const iopsRead = toNumOrNull(formData.get("iopsRead"));
  const iopsWrite = toNumOrNull(formData.get("iopsWrite"));
  const upMbps = toNumOrNull(formData.get("upMbps"));
  const downMbps = toNumOrNull(formData.get("downMbps"));

  const staticIpPreferred = toBool(formData.get("staticIpPreferred"));
  const upsRequired = toBool(formData.get("upsRequired"));
  const notes = ((): string | null => {
    const v = String(formData.get("notes") ?? "").trim();
    return v || null;
  })();

  if (!opportunityId || !tier || !entry) throw new Error("Missing fields");

  await db.transaction(async (tx) => {
    const existingReq = await tx
      .select({ id: requirements.id })
      .from(requirements)
      .where(
        and(
          eq(requirements.opportunityId, opportunityId),
          eq(requirements.tier, tier),
          eq(requirements.entry, entry)
        )
      );

    const requirementId =
      existingReq[0]?.id ??
      (
        await tx
          .insert(requirements)
          .values({ opportunityId, tier, entry })
          .returning({ id: requirements.id })
      )[0].id;

    await tx
      .insert(hardware)
      .values({
        requirementId,
        cpuCores,
        ramGb,
        storageGb,
        storageMedia,
        iopsRead,
        iopsWrite,
        upMbps,
        downMbps,
        staticIpPreferred: !!staticIpPreferred,
        upsRequired: !!upsRequired,
        notes,
      })
      .onConflictDoUpdate({
        target: hardware.requirementId,
        set: {
          cpuCores,
          ramGb,
          storageGb,
          storageMedia,
          iopsRead,
          iopsWrite,
          upMbps,
          downMbps,
          staticIpPreferred: !!staticIpPreferred,
          upsRequired: !!upsRequired,
          notes,
        },
      });

    return requirementId;
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/create");
}
