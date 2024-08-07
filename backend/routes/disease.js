const express = require('express');
const {
    createdisease,
    getalldisease,
    getdisease,
    deletedisease,
    updatedisease

}= require('../controllers/diseasecontroller')

const router = express.Router()

// Get all disease
router.get('/', getalldisease)

// Get a single  disease
router.get('/:id',getdisease)

// Create a new disease
router.post('/',createdisease)

// Delete a single disease
router.delete('/:id',deletedisease)

// Update a single disease
router.patch('/:id',updatedisease)



module .exports = router