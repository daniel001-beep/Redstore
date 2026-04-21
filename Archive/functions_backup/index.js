const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require('firebase-functions/params');
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");

admin.initializeApp();

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

exports.getAIResponse = onCall({ 
  secrets: [GEMINI_API_KEY]
}, async (request) => {
  // Check auth if needed, but for a store assistant it might be public.
  const { query } = request.data;

  if (!query) {
    throw new HttpsError("invalid-argument", "The function must be called with a 'query' argument.");
  }

  try {
    // 1. Fetch inventory from Firestore
    const productsSnapshot = await admin.firestore().collection("products").get();
    
    if (productsSnapshot.empty) {
        return { response: "I'm sorry, I couldn't find any products in our catalog right now. Please try again later." };
    }

    const productList = productsSnapshot.docs.map(doc => {
      const data = doc.data();
      return `Name: ${data.name}, Price: $${data.price}, Category: ${data.category}, Description: ${data.description}, Features: ${data.features?.join(", ") || "N/A"}`;
    }).join("\n---\n");

    const context = `Store Inventory Catalog:\n${productList}`;

    // 2. Initialize Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.value());
    // Using gemini-1.5-flash for faster response and lower latency
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Construct the prompt with grounding
    const systemInstruction = `You are a professional, friendly, and helpful sales assistant for our e-commerce store "Redstore".
Use the provided inventory context below to answer user questions. 
If a user asks about a product that is not in the context, politely inform them that we do not carry that item. 
Do not make up (hallucinate) any products, prices, or features not found in the context.
Always follow this tone: helpful, professional, and concise.

STRICT RULE: Only use the following product catalog to answer questions:
---
${context}
---`;

    // 4. Generate content
    const result = await model.generateContent([
        { text: systemInstruction },
        { text: `User request: ${query}` }
    ]);
    
    const responseText = result.response.text();

    return { 
        response: responseText,
        timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error("Error in getAIResponse function:", error);
    throw new HttpsError("internal", "An error occurred while generating AI response.");
  }
});
