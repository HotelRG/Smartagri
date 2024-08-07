const express = require('express');
const {
    createsms,

}= require('../controllers/twiliocontroller')

const router = express.Router()

// Create a new cart
router.post('/',createsms)


module.exports = router