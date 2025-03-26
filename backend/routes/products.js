const express = require('express')
const { getAllProducts, getProductById } = require("../controllers/ProductController");
const router = express.Router()

router
    .get("/", getAllProducts)
    .get("/:id", getProductById)

module.exports = router