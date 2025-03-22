// routes/orders.js
const express = require('express');
const Orders = require('../models/Orders');
const router = express.Router();

let orders = []; // Temporary in-memory order storage


// Get all orders
router.get('/', async (req, res) => {
    try {
        orders = await Orders.find();
        console.log("orders find", orders)

        res.json(orders);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Add item to cart
router.post('/', async (req, res) => {
    try {
        console.log("newOrder inside")

        const payload = req.body;
        const newOrder = {
            title: payload.title,
            productId: payload._id,
            brand: payload.brand,
            price: payload.price,
            thumbnail: payload.thumbnail,
            quantity: 1,
            deliveryStatus: "Pending"
        }

        console.log("newOrder",newOrder)

        orders = await Orders.create(newOrder);

        res.json({ data: orders, message: "Orders Updated successfully" });
    } catch (err) {
        res.status(500).send(err);
    }

});


// Create a new order
router.post('/', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.json(order);
});

// Get order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});

module.exports = router;
