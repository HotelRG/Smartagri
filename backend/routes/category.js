const express = require('express');
const {
    createcategory,
    getallcategory,
    getcategory,
    deletecategory

}= require('../controllers/categorycontroller')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)
// Get all category
router.get('/', getallcategory)

// Get a single  category
router.get('/:id',getcategory)

// Create a new category
router.post('/',createcategory)

// Delete a single category
router.delete('/:id',deletecategory)




module .exports = router