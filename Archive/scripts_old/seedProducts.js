const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // User needs to provide this

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const products = [
    {
        name: "Premium Red Cotton T-Shirt",
        price: 50.00,
        category: "T-shirt",
        description: "Made from 100% premium cotton, this red t-shirt offers exceptional comfort and breathability. Perfect for workouts or casual wear, it features moisture-wicking technology to keep you dry and comfortable during intense activities.",
        features: ["100% Premium Cotton Fabric", "Moisture-Wicking Technology", "Breathable & Comfortable", "Machine Washable", "Available in Multiple Sizes"]
    },
    {
        name: "Pro Running Sports Shoes",
        price: 65.00,
        category: "Shoes",
        description: "Engineered for performance runners, these sports shoes feature advanced cushioning technology and breathable mesh upper. The durable rubber outsole provides excellent traction on various surfaces.",
        features: ["Advanced Cushioning Technology", "Breathable Mesh Upper", "Durable Rubber Outsole", "Lightweight Design", "Available in Multiple Colors"]
    },
    {
        name: "Comfort Fit Jogger Pants",
        price: 65.00,
        category: "Pants",
        description: "These jogger pants combine style with functionality. Made from stretchable fabric with an elastic waistband and adjustable drawstring for perfect fit. Ideal for workouts or casual outings.",
        features: ["Stretchable Comfort Fabric", "Elastic Waistband with Drawstring", "Multiple Pocket Design", "Machine Washable", "Available in Multiple Colors"]
    },
    {
        name: "Classic Blue Polo Shirt",
        price: 45.00,
        category: "Shirt",
        description: "A timeless classic polo shirt made from premium pique cotton. Features a comfortable fit, ribbed collar, and short sleeves. Perfect for both casual and semi-formal occasions.",
        features: ["Premium Pique Cotton", "Ribbed Collar & Cuffs", "Comfortable Fit", "Easy Care & Machine Washable", "Available in Multiple Colors"]
    },
    {
        name: "Urban Style High Top Sneakers",
        price: 50.00,
        category: "Shoes",
        description: "Street-style high top sneakers with premium leather upper and cushioned insole. Features lace-up closure and durable rubber sole for all-day comfort and style.",
        features: ["Premium Leather Upper", "Cushioned Comfort Insole", "Lace-Up Closure", "Durable Rubber Sole", "Urban Street Style Design"]
    },
    {
        name: "Puma Performance T-Shirt",
        price: 55.00,
        category: "T-shirt",
        description: "Official Puma performance t-shirt with dryCELL technology that wicks sweat to keep you dry. Features the iconic Puma logo and comfortable athletic fit.",
        features: ["dryCELL Technology", "Moisture-Wicking Fabric", "Iconic Puma Branding", "Athletic Fit Design", "Quick-Dry Material"]
    },
    {
        name: "Performance Sports Socks",
        price: 50.00,
        category: "Accessories",
        description: "High-performance sports socks designed for intense workouts. Features ventilation panels and stretch fabric for maximum mobility and comfort during exercise.",
        features: ["Ventilation Panel Design", "4-Way Stretch Fabric", "Anti-Odor Technology", "Moisture-Wicking", "Cushioned Footbed"]
    },
    {
        name: "Fashion Sports Watch",
        price: 50.00,
        category: "Watch",
        description: "Stylish sports watch with digital display and multiple sport modes. Features water resistance, stopwatch, and backlight for low-light conditions.",
        features: ["Digital Display with Backlight", "Water Resistant (50m)", "Multiple Sport Modes", "Stopwatch Function", "Comfortable Silicone Strap"]
    },
    {
        name: "Smart Fitness Watch",
        price: 50.00,
        category: "Watch",
        description: "Advanced smart fitness watch with heart rate monitoring, GPS tracking, and smartphone connectivity. Tracks your workouts, sleep, and daily activity.",
        features: ["Heart Rate Monitor", "GPS Tracking", "Smartphone Connectivity", "Sleep Tracking", "7-Day Battery Life"]
    },
    {
        name: "Advanced Running Shoes",
        price: 50.00,
        category: "Shoes",
        description: "Next-generation running shoes with responsive cushioning and energy return technology. Designed for serious runners seeking performance and comfort.",
        features: ["Responsive Cushioning", "Energy Return Technology", "Breathable Knit Upper", "Strategic Traction Pattern", "Lightweight Construction"]
    },
    {
        name: "Urban Knit Walker",
        price: 50.00,
        category: "Shoes",
        description: "Effortless style meets all-day comfort. These lightweight, slip-on knit sneakers are perfect for navigating the city street with ease and a clean, modern look.",
        features: ["Breathable Knit Upper", "Effortless Slip-On Design", "Cushioned Rubber Outsole", "Minimalist Aesthetic", "Comfort-Fit Collar"]
    },
    {
        name: "Training Track Pants",
        price: 50.00,
        category: "Pants",
        description: "Versatile training track pants with tapered fit and elastic cuffs. Made from lightweight, stretchable fabric perfect for workouts or casual wear.",
        features: ["Tapered Fit with Elastic Cuffs", "Lightweight Stretch Fabric", "Multiple Pockets", "Drawstring Waistband", "Quick-Dry Material"]
    },
    {
        name: "Smart Band 4",
        price: 79.99,
        category: "Smart Band",
        description: "The Mi Smart Band 4 features a 39.9% larger AMOLED color full-touch display with adjustable brightness. Track your heart rate, monitor your sleep, and stay connected with smartphone notifications.",
        features: ["39.9% Larger AMOLED Color Display", "Heart Rate Monitoring", "Sleep Quality Tracking", "Water Resistant (50m)", "20-Day Battery Life", "Smartphone Notifications", "Multiple Sport Modes"]
    }
];

async function seed() {
  const collectionRef = db.collection('products');
  
  for (const product of products) {
    await collectionRef.add(product);
    console.log(`Added: ${product.name}`);
  }
  
  console.log('Seeding completed!');
}

seed().catch(console.error);
