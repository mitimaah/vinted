import * as dotenv from "dotenv";

import * as schema from "./schema";

import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export { pgTable as tableCreator } from "./_table";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

export default db;
