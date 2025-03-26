const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: String,
    stockQuantity: String,
    brand: String,
    category: String,
    thumbnail: String,
    images: Array,
    isDeleted: Boolean,
    rating:Number,
    ratingQuantity:Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
