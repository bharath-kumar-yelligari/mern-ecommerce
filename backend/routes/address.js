const express = require('express')
const { getAllAddresses, addAddress, updateAddressById, deleteAddressById } = require("../controllers/AddressController");
const { default: authMiddleware } = require('../middleware/auth');
const router = express.Router()

router
    .get("/", authMiddleware, getAllAddresses)
    .post("/", authMiddleware, addAddress)
    .put('/update/:id', authMiddleware, updateAddressById)
    .delete('/delete/:_id', authMiddleware, deleteAddressById)

module.exports = router
