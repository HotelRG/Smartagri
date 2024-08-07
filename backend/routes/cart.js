const express = require('express');
const {
    createcart,
    getallcart,
    getcart,
    deletecart,
    updatecart

}= require('../controllers/cartcontroller')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)
// Get all cart
router.get('/', getallcart)

// Get a single  cart
router.get('/:id',getcart)

// Create a new cart
router.post('/',createcart)

// Delete a single cart
router.delete('/:id',deletecart)

// Update a single cart
router.patch('/:id',updatecart)



module .exports = router