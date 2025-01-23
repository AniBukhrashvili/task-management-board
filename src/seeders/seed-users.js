require("dotenv").config();
const mongoose = require("mongoose");
const user = require("../models/user");

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const users = Array.from({ length: 10 }, (_, i) => ({
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

    await user.insertMany(users);
    console.log("10 Users have been added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
