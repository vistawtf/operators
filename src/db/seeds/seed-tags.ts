import "dotenv/config";
import { db } from "@/db";
import { projectTags } from "../schema";

const TAGS = [
  { code: "L1", label: "Layer 1" },
  { code: "L2", label: "Layer 2" },
  { code: "LST", label: "Liquid Staking" },
  { code: "LRT", label: "Liquid Restaking" },
  { code: "AI", label: "AI" },
  { code: "DVT", label: "Distributed Validator Technology" },
  { code: "DA", label: "Data Availability" },
  { code: "ZK_INFRA", label: "ZK Infrastructure" },
  { code: "MEV", label: "MEV" },
  { code: "AVS", label: "Actively Validated Service" },
  { code: "BRIDGE", label: "Bridge" },
  { code: "INTEROP", label: "Interoperability" },
  { code: "SEQUENCING", label: "Sequencing" },
  { code: "ORACLE", label: "Oracle" },
  { code: "DATA_INDEX", label: "Data Index" },
];

async function main() {
  await db.insert(projectTags).values(TAGS).onConflictDoNothing();
  console.log("✅ Seeded project_tags");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
