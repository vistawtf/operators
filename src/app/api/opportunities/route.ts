import { NextResponse } from "next/server";
import { db } from "@/db";
import { opportunities } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId");
  if (!projectId)
    return NextResponse.json({ error: "projectId required" }, { status: 400 });

  const rows = await db
    .select({
      id: opportunities.id,
      type: opportunities.type,
      status: opportunities.status,
    })
    .from(opportunities)
    .where(eq(opportunities.projectId, projectId))
    .orderBy(opportunities.type);

  return NextResponse.json(rows);
}
