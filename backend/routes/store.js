const express = require('express');
const {
    
    getallproduct,
    getproduct

}= require('../controllers/storecontroller')

const router = express.Router()

// Get all product
router.get('/', getallproduct)

// Get a single  product
router.get('/:id',getproduct)



module .exports = router