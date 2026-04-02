import { db } from "@/src/db";
import { products, reviews } from "@/src/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

// Image IDs mapped to their actual content so names match images
const PRODUCT_TEMPLATES = [
  { unsplash: "1524758631624-e2822e304c36", category: "Furniture", nouns: ["Sofa", "Couch", "Sectional", "Loveseat"] },
  { unsplash: "1555041469-a586c88ca9bc", category: "Furniture", nouns: ["Armchair", "Lounge Chair", "Recliner", "Ottoman"] },
  { unsplash: "1586023492125-27b2c045efd7", category: "Furniture", nouns: ["Dining Chair", "Accent Chair", "Side Chair", "Stool"] },
  { unsplash: "1493663284031-b7e3aefcae8e", category: "Furniture", nouns: ["Coffee Table", "Console Table", "Side Table", "Desk"] },
  { unsplash: "1505740420928-5e560c06d30e", category: "Electronics", nouns: ["Headphones", "Earbuds", "Speakers", "Audio System"] },
  { unsplash: "1523275335684-37898b6baf30", category: "Electronics", nouns: ["Smart Watch", "Fitness Tracker", "Digital Watch", "Chronograph"] },
  { unsplash: "1526170375885-e0182afd275e", category: "Electronics", nouns: ["Camera", "DSLR", "Mirrorless Cam", "Lens Kit"] },
  { unsplash: "1491553895911-0055eca6402d", category: "Fashion", nouns: ["Running Shoes", "Sneakers", "Athletic Shoes", "Trainers"] },
  { unsplash: "1542291026-7eec264c27ff", category: "Fashion", nouns: ["Sport Shoes", "Lifestyle Kicks", "High-Tops", "Slip-Ons"] },
  { unsplash: "1503602642458-232111445657", category: "Fashion", nouns: ["Backpack", "Daypack", "Travel Bag", "Messenger Bag"] },
];

const ADJECTIVES = ["Elegant", "Modern", "Classic", "Vintage", "Minimalist", "Luxury", "Smart", "Compact", "Premium", "Sleek", "Nordic", "Urban", "Essential", "Pro", "Nova"];

const DESCRIPTIONS: Record<string, string[]> = {
  "Furniture": [
    "Crafted with precision from sustainably sourced materials, this piece brings timeless elegance to any living space.",
    "A perfect blend of comfort and style, designed for the modern home with attention to every detail.",
    "Featuring clean lines and ergonomic design, this furniture piece transforms your room into a sanctuary.",
    "Built to last with premium upholstery and a solid hardwood frame. A statement piece for any interior."
  ],
  "Electronics": [
    "Cutting-edge technology wrapped in premium design. Experience unparalleled performance and crystal-clear sound.",
    "Engineered for excellence with advanced features that seamlessly integrate into your digital lifestyle.",
    "Built with the latest innovations, offering exceptional quality and intuitive controls for everyday use.",
    "High-performance tech designed with precision engineering and a sleek, modern aesthetic."
  ],
  "Fashion": [
    "Designed for those who appreciate both style and comfort, made with premium materials that last.",
    "A statement piece that combines contemporary design with superior craftsmanship and durability.",
    "Versatile enough for any occasion, this accessory elevates your wardrobe with effortless style.",
    "Premium construction meets modern aesthetics — the perfect addition to your collection."
  ],
  "Kitchen": [
    "Transform your cooking experience with this beautifully designed kitchen essential made from quality materials.",
    "A chef's favorite — engineered for performance while looking stunning on your countertop.",
    "Blending form and function, this kitchen piece is designed for both everyday use and special occasions.",
    "Premium craftsmanship meets practical design in this must-have kitchen addition."
  ],
  "Decor": [
    "Add a touch of sophistication to any room with this carefully designed decorative piece.",
    "A conversation starter that brings artistic flair and warmth to your living space.",
    "Handcrafted with attention to detail, this decor item complements both modern and classic interiors.",
    "Transform your space with this elegantly designed piece that radiates style and personality."
  ]
};

export async function GET() {
  try {
    console.log("Starting Seeding Process...");

    console.log("Creating tables...");
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS product (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DOUBLE PRECISION NOT NULL,
        imageurl TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        tags TEXT[],
        createdat TIMESTAMP DEFAULT NOW()
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS review (
        id SERIAL PRIMARY KEY,
        productid INTEGER NOT NULL REFERENCES product(id) ON DELETE CASCADE,
        userid TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL,
        createdat TIMESTAMP DEFAULT NOW()
      )
    `);
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "user" (
        id TEXT PRIMARY KEY, 
        name TEXT, 
        email TEXT NOT NULL, 
        image TEXT
      )
    `);
    console.log("Tables verified! Clearing existing items...");
    await db.delete(reviews);
    await db.delete(products);
    
    // Ensure a seed user exists for review FK constraints
    await db.execute(sql`
      INSERT INTO "user" (id, name, email) 
      VALUES ('user_seed', 'Seed User', 'seed@redstore.com')
      ON CONFLICT (id) DO NOTHING
    `);
    
    const ALL_CATEGORIES = ["Furniture", "Electronics", "Fashion", "Kitchen", "Decor"];
    const productsToInsert = [];

    // We generate 200 items - each product uses a template that matches its image
    for (let i = 1; i <= 200; i++) {
        const template = PRODUCT_TEMPLATES[i % PRODUCT_TEMPLATES.length];
        const category = template.category;
        const rawUrl = `https://images.unsplash.com/photo-${template.unsplash}?auto=format&fit=crop&q=80&w=800`;
        
        const adj = ADJECTIVES[(i * 3 + Math.floor(i / 10)) % ADJECTIVES.length];
        const noun = template.nouns[(i * 7) % template.nouns.length];
        
        const descriptions = DESCRIPTIONS[category] || DESCRIPTIONS["Furniture"];
        const description = descriptions[i % descriptions.length];

        productsToInsert.push({
            name: `${adj} ${noun}`,
            description: description,
            price: Math.floor(Math.random() * 900) + 99.99,
            imageUrl: rawUrl, 
            category: category,
            tags: [category.toLowerCase(), "premium", "modern", "new-arrival"],
        });
    }

    // Batch insert for efficiency
    const insertedProducts = await db.insert(products).values(productsToInsert).returning({ id: products.id });

    // Seed Reviews
    const reviewsToInsert = [];
    const REVIEW_TEXTS = [
      "Absolutely love the quality. It's even better in person. High-end finish.",
      "The design is stunning but I wish it was slightly bigger. Still 5 stars.",
      "Delivery was prompt. The assembly was easy. 4/5.",
      "A bit pricey but you get what you pay for. Premium material.",
      "Doesn't fit my space perfectly but the style is top-notch.",
      "Exceeded my expectations! The craftsmanship is impeccable.",
      "Great value for money. Would recommend to anyone looking for quality.",
      "Beautiful design, exactly as pictured. Very happy with my purchase.",
    ];

    for (const p of insertedProducts) {
        for (let j = 0; j < 3; j++) {
            reviewsToInsert.push({
                productId: p.id,
                userId: "user_seed",
                rating: 4 + Math.floor(Math.random() * 2), // 4 or 5 stars
                comment: REVIEW_TEXTS[Math.floor(Math.random() * REVIEW_TEXTS.length)],
            });
        }
    }

    await db.insert(reviews).values(reviewsToInsert);

    return NextResponse.json({ 
        success: true, 
        message: "Successfully seeded 200 products and 600 reviews into Postgres.",
        count: productsToInsert.length 
    });
  } catch (error: any) {
    console.error("Seeding failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
