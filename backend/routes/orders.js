const express = require('express')
const { getAllOrders, createOrder } = require("../controllers/OrderController");
const { default: authMiddleware } = require('../middleware/auth');
const router = express.Router()

router
    .get("/", authMiddleware, getAllOrders)
    .post("/", authMiddleware, createOrder)

module.exports = router