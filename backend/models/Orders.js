const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    items: Array,
    deliveryStatus: String,
    shippingDetails: Array,
    paymentMode: String,
    createdAt: { type: Date, default: Date.now }
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
