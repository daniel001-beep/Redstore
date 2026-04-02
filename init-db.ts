import { Pool } from "pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const rawUrl = new URL(
  process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL!
);

const pool = new Pool({
  host: rawUrl.hostname,
  user: decodeURIComponent(rawUrl.username),
  password: decodeURIComponent(rawUrl.password),
  database: rawUrl.pathname.replace(/^\//, ""),
  port: Number(rawUrl.port) || 5432,
  ssl: { rejectUnauthorized: false },
});

async function createTables() {
  try {
    console.log("Creating tables if missing...");
    
    // 1. Create Product Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS product (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DOUBLE PRECISION NOT NULL,
        imageUrl TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        tags TEXT[],
        createdAt TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("- Product table checked/created.");

    // 2. Create Review Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS review (
        id SERIAL PRIMARY KEY,
        productId INTEGER NOT NULL REFERENCES product(id) ON DELETE CASCADE,
        userId TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("- Review table checked/created.");

    // 3. Create Auth Tables (simplified for this check)
    await pool.query(`CREATE TABLE IF NOT EXISTS "user" (id TEXT PRIMARY KEY, name TEXT, email TEXT NOT NULL, image TEXT)`);
    console.log("- User table checked/created.");

    console.log("Database schema initialized successfully.");
  } catch (err: any) {
    console.error("Database initialization failed:", err.message);
  } finally {
    await pool.end();
  }
}

createTables();
