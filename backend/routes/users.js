const express = require('express')
const { registerUser, loginUser, logoutUser } = require("../controllers/UserController");
const { default: authMiddleware, verifyToken } = require('../middleware/auth');
const router = express.Router()

router
    .post("/register", registerUser)
    .post("/login", loginUser)
    .get("/auth/check", verifyToken)
    .post("/logout", logoutUser)


module.exports = router
