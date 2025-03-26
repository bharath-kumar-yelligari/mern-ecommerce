const express = require('express')
const { getAllProducts, getProductById } = require("../controllers/ProductController");
const { default: authMiddleware } = require('../middleware/auth');
const router = express.Router()

router
    .get("/", authMiddleware, getAllProducts)
    .get("/:id", getProductById)

module.exports = router