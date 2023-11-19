import { defineConfig } from "drizzle-kit";

import { env } from "~/env.mjs";

export default defineConfig({
  schema: "./src/server/db/schema",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
  tablesFilter: ["soko_*"],
});
