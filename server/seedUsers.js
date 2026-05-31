const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/userModel");

dotenv.config();

console.log("seedUsers.js has started...");

async function seedUsers() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("MONGO_URI is missing. Check your .env file inside the server folder.");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for user seeding");

    const users = [
      {
        name: "Guest User",
        email: "guest@example.com",
        password: "password123",
        role: "user",
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      },
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });

      if (existingUser) {
        console.log(`${userData.email} already exists`);
      } else {
        await User.create(userData);
        console.log(`${userData.email} created successfully`);
      }
    }

    console.log("User seeding completed");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("User seeding failed:", error.message);
    process.exit(1);
  }
}

seedUsers();
