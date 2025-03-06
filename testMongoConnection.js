const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace with your actual MongoDB connection string
const uri = "mongodb+srv://zanefoster1:YOUR_PASSWORD@townsquare2.dx3l1.mongodb.net/?retryWrites=true&w=majority&appName=TownSquare2";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  } finally {
    await client.close();
  }
}

run();
