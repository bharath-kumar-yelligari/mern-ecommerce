const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//To register user
const registerUser = async (req, res) => {
    const { email, password } = { email: "bharathkumar915@gmail.com", password: "Bharath7" };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    let user = await newUser.save();
    res.json({ message: "User registered successfully" });
}

//To login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,  // Cannot be true on HTTP
        sameSite: "Lax", // Works for same-site requests
        maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
    });

    res.json({ message: "Login successful", name: user.name, isLoggedIn: true });
}

//To logout user
const logoutUser = async (req, res) => {
    console.log("logout user route")
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // Set to `true` in production (HTTPS required)
        sameSite: "lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
}


module.exports = { registerUser, loginUser, logoutUser };