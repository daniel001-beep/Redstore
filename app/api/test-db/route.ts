import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { getResilientSession } from "@/src/lib/auth-session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getResilientSession();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized access blocked by Zero-Trust API gateway" }, { status: 403 });
  }

  console.log("[TestDB API] Running database test query...");
  try {
    const userList = await db.query.users.findMany({ limit: 1 });
    return NextResponse.json({
      success: true,
      message: "Database connection successful!",
      usersCount: userList.length,
      env: {
        hasPostgresUrl: !!process.env.POSTGRES_URL,
        postgresUrlType: typeof process.env.POSTGRES_URL,
        postgresUrlStart: process.env.POSTGRES_URL?.substring(0, 30) + "..."
      }
    });
  } catch (err: any) {
    console.error("[TestDB API] Query failed:", err);
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
      error: err.message || String(err),
      stack: err.stack,
      cause: err.cause ? (err.cause.message || String(err.cause)) : null,
      env: {
        hasPostgresUrl: !!process.env.POSTGRES_URL,
        postgresUrlType: typeof process.env.POSTGRES_URL,
        postgresUrlStart: process.env.POSTGRES_URL?.substring(0, 30) + "..."
      }
    }, { status: 500 });
  }
}
