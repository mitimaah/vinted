import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { users } from "./schema/schema";

// const connectionString = process.env.DATABASE_URL;
const client = postgres(
  "postgres://postgres.yzssinzjcwongfnvcckj:WM!hks3@Ld8jtwUrGyTNYP@aws-0-eu-central-1.pooler.supabase.com:6543/postgres",
);
const db = drizzle(client);

const allUsers = await db.select().from(users);
