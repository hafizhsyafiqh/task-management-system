const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔥 Connecting to MongoDB...");
    console.log("URI:", process.env.MONGO_URI);``

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:");
    console.error(error.message);
  }
};

module.exports = connectDB;