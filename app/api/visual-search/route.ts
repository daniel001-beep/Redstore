import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { put } from "@vercel/blob";
import { db } from "@/src/db";
import { products as productsTable } from "@/src/db/schema";
import { ilike, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // 1. Securely upload to Vercel Blob for CDN delivery
    const { url: blobUrl } = await put(`uploads/${imageFile.name}`, imageFile, {
      access: "public",
    });

    // 2. Multimodal analysis with Gemini 1.5 Pro
    const { text: description } = await generateText({
      model: google("models/gemini-1.5-pro-latest"),
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What product is this image showing? Provide 3-4 keywords describing its category, material, and style for an e-commerce catalog." },
            { type: "image", image: blobUrl },
          ],
        },
      ],
    });

    console.log("Gemini Visual Analysis:", description);

    // 3. Extract keywords (Gemini usually returns a comma-separated list or short sentence)
    const keywords = description.split(/[,\s]+/).slice(0, 5);

    // 4. Zero-Trust Postgres Query
    // We search the 'tags' or 'description' columns for the AI-extracted keywords
    const matches = await db.select()
        .from(productsTable)
        .where(
            or(...keywords.map(kw => ilike(productsTable.description, `%${kw}%`)))
        )
        .limit(8);

    return NextResponse.json({
        success: true,
        aiDescription: description,
        blobUrl: blobUrl,
        results: matches
    });

  } catch (error) {
    console.error("Visual Search Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
