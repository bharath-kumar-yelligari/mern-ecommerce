// routes/products.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const { sort, order } = req.query; // Example: ?sort=price&order=asc
        let sortQuery = {};

        if (sort) {
            sortQuery[sort] = order === "desc" ? -1 : 1; // Sort order: ascending or descending
        }

        const products = await Product.find().sort(sortQuery);

        //const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
