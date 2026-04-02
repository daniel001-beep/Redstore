import { sql } from "@vercel/postgres";

async function listTables() {
  try {
    console.log("Listing tables...");
    const res = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log("Tables in public schema:", res.rows);
  } catch (err) {
    console.error("List tables failed:", err.message);
  }
}

listTables();
