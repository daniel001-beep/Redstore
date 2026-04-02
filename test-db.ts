import { db } from "./src/db";
import { products } from "./src/db/schema";

async function check() {
  try {
    console.log("Checking DB connection...");
    const res = await db.select().from(products).limit(1);
    console.log("Query successful:", res);
  } catch (err) {
    console.error("Query failed with error:", err.message);
  }
}

check();
