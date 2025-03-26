const express = require('express')
const { getAllOrders, createOrder } = require("../controllers/OrderController");
const router = express.Router()

router
    .get("/", getAllOrders)
    .post("/", createOrder)

module.exports = router