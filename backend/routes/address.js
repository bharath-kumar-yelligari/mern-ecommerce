const express = require('express')
const { getAllAddresses, addAddress, updateAddressById, deleteAddressById } = require("../controllers/AddressController");
const router = express.Router()

router
    .get("/", getAllAddresses)
    .post("/", addAddress)
    .put('/update/:id', updateAddressById)
    .delete('/delete/:_id', deleteAddressById)

module.exports = router
