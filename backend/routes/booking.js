const express = require('express');
const {
    createbooking,
    getallbooking,
    getbooking,
    deletebooking,
    updatebooking

}= require('../controllers/bookingcontroller')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)
// Get all booking
router.get('/', getallbooking)

// Get a single  booking
router.get('/:id',getbooking)

// Create a new booking
router.post('/',createbooking)

// Delete a single booking
router.delete('/:id',deletebooking)

// Update a single booking
router.patch('/:id',updatebooking)



module .exports = router