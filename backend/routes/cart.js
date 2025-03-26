const express = require('express')
const { getCartItems, cartAddOrUpdate, deleteCartById, clearCart } = require("../controllers/CartController");
const router = express.Router()

router
    .get("/", getCartItems)
    .post("/addOrUpdate", cartAddOrUpdate)
    .delete('/delete/:_id', deleteCartById)
    .delete('/clear', clearCart)

module.exports = router