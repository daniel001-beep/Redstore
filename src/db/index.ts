import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, Client } from "pg";
import * as schema from "./schema";

const isProduction = process.env.NODE_ENV === "production";

let dbInstance: any;

if (isProduction) {
  // CRITICAL: Force ignore self-signed certificates for Supabase on Vercel
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  
  client.connect().catch(err => console.error("Production DB Connect Error:", err));
  dbInstance = drizzle(client, { schema });
} else {
  // Development: Standard pool
  if (!(global as any).db) {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
    });
    
    (global as any).db = drizzle(pool, { schema });
  }
  dbInstance = (global as any).db;
}

export const db = dbInstance;
