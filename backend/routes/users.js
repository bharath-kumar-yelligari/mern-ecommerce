// routes/products.js
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require('../models/User');
const router = express.Router();

// Get all products
router.get("/register", async (req, res) => {
    const { email, password } = { email: "bharathkumar915@gmail.com", password: "Bharath7" };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    let user = await newUser.save();
    console.log("user", user)
    res.json({ message: "User registered successfully" });
});


// **Login Route**
router.post("/login", async (req, res) => {
    console.log("req.body", req.body)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("user", user)

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token , name: user.name});
});


router.get("/profile", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: "Profile Data", userId: decoded.userId });
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
});

module.exports = router;
