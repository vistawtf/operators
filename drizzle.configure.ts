import { config } from "@/config/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.directDatabaseUrl,
  },
});
