// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

let cart = [];
let productId;
// Get all cart
router.get('/', async (req, res) => {
    try {
        cart = await Cart.find();
        console.log("cart find", cart)
        res.json(cart);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Add item to cart
router.post('/addOrUpdate', async (req, res) => {
    try {
        const payload = req.body;

        productId = payload._id;
        if (payload.action) {
            productId = payload.productId;
        }

        console.log("payload", payload.action)

        let cartItem = await Cart.findOne({ productId });
        if (cartItem) {
            console.log("cart item existing", cartItem)
            if (payload.action === "remove") {
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                    cart = await cartItem.save();
                } else {
                    cart = await Cart.findByIdAndDelete(payload._id).lean();;
                    cart["action"] = "remove";
                }
            }
            else {
                cartItem.quantity += 1;
                cart = await cartItem.save();
            }

            return res.json({ message: "Cart updated", cart: cart });
        } else {
            console.log("new cart item", cartItem)

            const newCartItem = {
                title: payload.title,
                productId: payload._id,
                brand: payload.brand,
                price: payload.price,
                thumbnail: payload.thumbnail,
                quantity: 1
            }
            cart = await Cart.create(newCartItem);

            res.json({ cart: cart, message: "cart Updated successfully" });
        }
    } catch (err) {
        res.status(500).send(err);
    }

});


// Delete cart item
router.delete('/delete/:_id', async (req, res) => {
    console.log(req.params)
    const { _id } = req.params;
    try {
        console.log("_id", _id)
        cart = await Cart.findByIdAndDelete(_id);

        console.log("updatedCart", cart)

        if (!cart) {
            // { success: false, message: "No cart found with this product" };
            return res.json({ success: false, message: "No cart found with this product" });
        }
        return res.json({ success: true, cart: cart });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Clear cart
router.delete('/clear', (req, res) => {
    cart = [];
    res.send('Cart cleared');
});

module.exports = router;
