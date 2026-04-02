# Technical Roadmap: High-Performance AI-Native Store

Our mission is to build a premium, AI-driven ecommerce platform that leverages the best of Vercel and Firebase while staying within the **Free Tier**.

## 🏗 Phase 1: Foundation (Secure Architecture)

### 1.1 Secure API Layer (Vercel Serverless)
Currently, your app might be making direct calls from the frontend. We will move all sensitive logic to Vercel Functions to hide API keys.
- **Goal**: Create `/api/*` routes for all AI features.
- **Tech**: `@ai-sdk/google` on the backend, Firebase Admin for Firestore.

### 1.2 Environment & Security Configuration
- Configure `.env.local` for local development.
- Ensure Firebase Service Account JSON is handled via environment variables (base64 encoded strings for Vercel).

## 🔋 Phase 2: Data & Content (The 200 Products)

### 2.1 Bulk Seeding Script
We will create `scripts/seedUnsplash.js` to populate our storefront.
- **Logic**: Fetch 200+ high-quality product images from Unsplash API.
- **Metadata**: Attach random names, categories (tech, fashion, home), and prices (USD).
- **Storage**: Batch upload to Firestore (`admin.firestore().batch()`).

## ✨ Phase 3: AI Features (The "Wow" Factor)

### 3.1 Review Summarizer (`/api/summarize`)
- **Backend**: Fetches reviews for a specific `productId`. Uses Gemini 1.5 Flash to generate a "Pros, Cons, Verdict" list.
- **Frontend**: Component with **Skeleton loaders** and **Streaming** support via Vercel AI SDK.

### 3.2 Visual Search (Multimodal) (`/api/visual-search`)
- **Logic**: User uploads an image. Vercel Function sends image to Gemini 1.5 Pro. Gemini identifies the product or category and returns potential Firebase IDs.
- **Tech**: Custom React hook `useVisualSearch`.

### 3.3 RAG-Powered Semantic Search
- **Implementation**: Advanced search logic that interprets user intent (e.g., "Show me things for a cozy kitchen").
- **UI**: Search bar with **300ms-500ms debounce** to save API credits.

## 🎨 Phase 4: UI/UX & Performance Polish

### 4.1 Premium Design System
- Modernize `index.css` with vibrant, premium aesthetics (Dark Mode, Glassmorphism).
- Use Google Fonts (Inter/Outfit) and smooth transitions.

### 4.2 Performance Audit
- Skeleton UI for all AI-generated content.
- Debounce everything.

---
> [!IMPORTANT]
> To proceed, I'll need to verify if we have a Firebase project set up and if the `.env.local` contains the necessary `GOOGLE_GENERATIVE_AI_API_KEY`.
