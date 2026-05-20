import { db } from "@/src/db";
import { products } from "@/src/db/schema";
import { NextResponse } from "next/server";
import { createClient } from "@/src/lib/supabase-server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: "Auth system offline" }, { status: 503 });
    }
    const { data: { user } } = await supabase.auth.getUser();
    
    const adminEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase().trim();
    const isAdmin = user?.email && adminEmail && user.email.toLowerCase().trim() === adminEmail;
    
    // API Zero-Trust Security: Ensure only authenticated admins can hit this endpoint
    if (!user || !isAdmin) {
      return NextResponse.json({ error: "Unauthorized access blocked by API Gateway" }, { status: 401 });
    }
    // Try to count products in the database
    const result = await db.select().from(products).limit(1);
    
    return NextResponse.json({
      status: "connected",
      message: "Database connection successful",
      productsExist: result.length > 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Database connection test failed:", error.message);
    
    return NextResponse.json(
      {
        status: "failed",
        message: "Database connection failed",
        error: error.message || "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
