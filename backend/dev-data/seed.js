const bcrypt = require("bcryptjs");
const connectToDB = require("../database/db");
const Product = require("../models/Product");
const User = require("../models/User");
const products = require("../dev-data/products.json");
const users = require("../dev-data/users.json");

const seedData = async () => {
  try {
    await connectToDB();
    console.log('Seed started please wait..');
    await seedProducts();
    await seedUsers();
    console.log('Seed completed..');
  } catch (error) {
    console.log(error);
  }
}

seedProducts = async () => {
  try {

    await Product.deleteMany(); // Clears existing products
    console.log("Old products removed");

    await Product.insertMany(products);
    console.log("Product seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

seedUsers = async () => {
  try {
    await User.deleteMany(); // Clears existing users
    console.log("Old users removed");

    // Hash passwords before inserting
    const hashedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10) // Hash password
    }));

    await User.insertMany(hashedUsers);
    console.log("Product seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

seedData();