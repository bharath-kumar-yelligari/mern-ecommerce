// routes/orders.js
const express = require('express');
const Address = require('../models/Address');
const router = express.Router();

let address = []; // Temporary in-memory order storage

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

        const {name,mobile,email,address} = req.body;
        const newAddress = {
            name: name,
            mobile: mobile,
            email: email,
            address:address,
        }

        console.log("newAddress",newAddress)

       address = await Address.create(newAddress);

       res.json({ data: address, message: "Address Updated successfully" });
    } catch (err) {
        res.status(500).send(err);
    }

});

// Delete address item
router.delete('/delete/:_id', async (req, res) => {
    console.log(req.params)
    const { _id } = req.params;
    try {
        console.log("_id",_id)
        const updateAddress = await Address.findByIdAndDelete(_id);

        console.log("delete address", updateAddress)

        if (!updateAddress) {
            // { success: false, message: "No cart found with this product" };
            return res.json({ success: false, message: "No Address found" });
        }
        return res.json({ success: true, address: updateAddress });
    } catch (err) {
        res.status(500).send(err);
    }
});


// Create a new order
router.put('/update/:id', async(req, res) => {
    try {
        const {name,mobile,email,address} = req.body;
        // Find address by ID and update
        const updatedAddress = await Address.findByIdAndUpdate(
          req.params.id,
          { name, mobile, email, address },
          { new: true, runValidators: true }
        );
    
        if (!updatedAddress) {
          return res.status(404).json({ message: "Address not found" });
        }
    
        return res.json({ success: true, address: updatedAddress });
      } catch (error) {
        res.status(500).json({ message: "Error updating address", error });
      }
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
