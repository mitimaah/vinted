import * as dotenv from "dotenv";

import "dotenv/config";

import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default {
  schema: "./schema/schema.ts",
  driver: "pg",
  out: "./migrations",
  dbCredentials: {
    connectionString: (process.env.DATABASE_URL as string) || "",
  },
} satisfies Config;
