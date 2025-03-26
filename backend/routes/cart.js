const express = require('express')
const { getCartItems, cartAddOrUpdate, deleteCartById, clearCart } = require("../controllers/CartController");
const { default: authMiddleware } = require('../middleware/auth');
const router = express.Router()

router
    .get("/", authMiddleware, getCartItems)
    .post("/addOrUpdate", authMiddleware, cartAddOrUpdate)
    .delete('/delete/:_id', authMiddleware, deleteCartById)
    .delete('/clear', authMiddleware, clearCart)

module.exports = router