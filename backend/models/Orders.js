const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    title: String,
    productId:String,
    brand:String,
    price: Number,
    thumbnail: String,
    quantity:Number,
    deliveryStatus: String
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
