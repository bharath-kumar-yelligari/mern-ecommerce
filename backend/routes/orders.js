// routes/orders.js
const express = require('express');
const Orders = require('../models/Orders');
const router = express.Router();

let orders = []; // Temporary in-memory order storage


// Get all orders
router.get('/', async (req, res) => {
    try {
        orders = await Orders.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Add item to cart
router.post('/', async (req, res) => {
    try {
        const payload = req.body.payload;
        const newOrder = {
            paymentMode: payload.paymentMode,
            shippingDetails: payload.shippingDetails,
            items: payload.items,
            deliveryStatus: payload.deliveryStatus
        }

       orders = await Orders.create(newOrder);

       res.json({ data: orders, message: "Orders Updated successfully" });
    } catch (err) {
        res.status(500).send(err);
    }

});


module.exports = router;
