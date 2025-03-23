// routes/orders.js
const express = require('express');
const Address = require('../models/Address');
const router = express.Router();

let address = []; 
let updateAddress = [];

// Get all Addresses
router.get('/', async (req, res) => {
    try {
        address = await Address.find();
        console.log("orders find", address)

        res.json(address);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Add item to cart
router.post('/', async (req, res) => {
    try {
        console.log("newOrder inside")

        let { name, mobile, email, address } = req.body;
        let newAddress = {
            name: name,
            mobile: mobile,
            email: email,
            address: address,
        }

        console.log("newAddress", newAddress)

        let addressTemp = await Address.create(newAddress);

        res.json({ data: addressTemp, message: "Address Updated successfully" });
    } catch (err) {
        res.status(500).send(err);
    }

});

// Delete address item
router.delete('/delete/:_id', async (req, res) => {
    console.log(req.params)
    const { _id } = req.params;
    try {
        console.log("_id", _id)
        updateAddress = await Address.findByIdAndDelete(_id);

        console.log("delete address", updateAddress)

        if (!updateAddress) {
            // { success: false, message: "No cart found with this product" };
            return res.json({ success: false, message: "No Address found" });
        }
        return res.json({ success: true, address: updateAddress });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Create a new order
router.put('/update/:id', async (req, res) => {
    try {
        const { name, mobile, email, address } = req.body;
        // Find address by ID and update
        updateAddress = await Address.findByIdAndUpdate(
            req.params.id,
            { name, mobile, email, address },
            { new: true, runValidators: true }
        );

        if (!updateAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        return res.json({ success: true, address: updateAddress });
    } catch (error) {
        res.status(500).json({ message: "Error updating address", error });
    }
});


module.exports = router;
