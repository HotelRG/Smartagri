const express = require('express');
const {
    createorder,
    getallorder,
    getorder,
    deleteorder,
    updateorder

}= require('../controllers/ordercontroller')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)
// Get all order
router.get('/', getallorder)

// Get a single  order
router.get('/:id',getorder)

// Create a new order
router.post('/',createorder)

// Delete a single order
router.delete('/:id',deleteorder)

// Update a single order
router.patch('/:id',updateorder)



module .exports = router