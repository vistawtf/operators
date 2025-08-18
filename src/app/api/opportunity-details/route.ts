import { NextResponse } from "next/server";
import { db } from "@/db";
import { requirements, hardware } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const opportunityId = url.searchParams.get("opportunityId");
  if (!opportunityId)
    return NextResponse.json(
      { error: "opportunityId required" },
      { status: 400 }
    );

  const rows = await db
    .select({
      requirementId: requirements.id,
      tier: requirements.tier,
      entry: requirements.entry,
      hwId: hardware.id,
      cpuCores: hardware.cpuCores,
      ramGb: hardware.ramGb,
      storageGb: hardware.storageGb,
      storageMedia: hardware.storageMedia,
      iopsRead: hardware.iopsRead,
      iopsWrite: hardware.iopsWrite,
      upMbps: hardware.upMbps,
      downMbps: hardware.downMbps,
      staticIpPreferred: hardware.staticIpPreferred,
      upsRequired: hardware.upsRequired,
      notes: hardware.notes,
    })
    .from(requirements)
    .leftJoin(hardware, eq(hardware.requirementId, requirements.id))
    .where(eq(requirements.opportunityId, opportunityId));

  return NextResponse.json(rows);
}
