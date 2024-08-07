const express = require('express');
const {
    createpayment,

}= require('../controllers/stripe_paymentcontroller')

const router = express.Router()

// Create a new cart
router.post('/',createpayment)


module .exports = router