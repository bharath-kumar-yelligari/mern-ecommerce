const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: String,
    mobile:String,
    email:String,
    address:String
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
