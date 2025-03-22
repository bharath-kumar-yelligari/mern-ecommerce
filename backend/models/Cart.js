const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    title: String,
    productId:String,
    brand:String,
    price: Number,
    thumbnail: String,
    quantity:Number
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
