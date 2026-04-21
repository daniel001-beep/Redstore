// @ts-ignore - Legacy script, using Drizzle ORM
import { sql } from "@vercel/postgres";

async function listTables() {
  try {
    console.log("Listing tables...");
    // @ts-ignore
    const res = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log("Tables in public schema:", res.rows);
  } catch (err: any) {
    console.error("List tables failed:", err.message);
  }
}

listTables();
