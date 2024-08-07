const express = require('express');
const {
    
    getallrental,
    getrental

}= require('../controllers/storerentalcontroller')

const router = express.Router()

// Get all rental
router.get('/', getallrental)

// Get a single  rental
router.get('/:id',getrental)



module .exports = router